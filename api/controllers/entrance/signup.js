module.exports = {


  friendlyName: 'Signup',


  description: 'Зарегистрировать новую учетную запись пользователя.',


  extendedDescription:
    `This creates a new user record in the database, signs in the requesting user agent
by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
(if emailing with Mailgun is enabled) sends an account verification email.

If a verification email is sent, the new user's account is put in an "unconfirmed" state
until they confirm they are using a legitimate email address (by clicking the link in
the account verification message.)

Это создает новую запись пользователя в базе данных, подписывает в запрашивающем пользовательском агенте
изменив его [сеанс] (https://sailsjs.com/documentation/concepts/sessions), и
(если включена электронная почта с Mailgun) отправляет письмо с подтверждением учетной записи.

Если письмо с подтверждением отправлено, учетная запись нового пользователя переводится в 
неподтвержденное состояние. Пока они не подтвердят, что они используют законный адрес электронной 
почты (нажав на ссылку в сообщение о подтверждении аккаунта.)
`,


  inputs: {

    emailAddress: {
      required: true,
      type: 'string',
      isEmail: true,
      description: 'The email address for the new account, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.'
    },

    fullName: {
      required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The user\'s full name.',
    }

  },


  exits: {

    success: {
      description: 'New user account was created successfully.'
    },

    invalid: {
      responseType: 'badRequest',
      description: 'Предоставленные полное имя, пароль и / или адрес электронной почты являются недействительными.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
      'parameters should have been validated/coerced _before_ they were sent.'
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

  },


  fn: async function (inputs) {

    let newEmailAddress = inputs.emailAddress.toLowerCase();
// Подключить сокет, который сделал запрос, к комнате «user».
    await sails.sockets.join(this.req, 'user');
    let fullName = await sails.helpers.startLetter.with({str: inputs.fullName});
    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    // Создаем данные для новой пользовательской записи и сохраняем их в базе данных.
    // (Также используйте `fetch`, чтобы получить новый идентификатор,
    // чтобы мы могли использовать его ниже.)
    let newUserRecord = await User.create(_.extend({
      emailAddress: newEmailAddress,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      fullName:fullName,
      fullNameEn: await sails.helpers.translitWord.with({str: fullName}),
      tosAcceptedByIp: this.req.ip
    }, sails.config.custom.verifyEmailAddresses ? {
      emailProofToken: await sails.helpers.strings.random('url-friendly'),
      emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
      emailStatus: 'unconfirmed'
    } : {}))
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();

    // If billing feaures are enabled, save a new customer entry in the Stripe API.
    // Then persist the Stripe customer id in the database.
    if (sails.config.custom.enableBillingFeatures) {
      let stripeCustomerId = await sails.helpers.stripe.saveBillingInfo.with({
        emailAddress: newEmailAddress
      }).timeout(5000).retry();
      await User.updateOne(newUserRecord.id)
        .set({
          stripeCustomerId
        });
    }

    //Сохраните новый идентификатор пользователя в его сеансе.
    this.req.session.userId = newUserRecord.id;
// User.find()
    // data.users = _.sortByOrder(users,['updatedAt'], ['desc']);


    if (sails.config.custom.verifyEmailAddresses) {
      // Send "confirm account" email
      await sails.helpers.sendTemplateEmail.with({
        to: newEmailAddress,
        subject: 'Пожалуйста, подтвердите свой аккаунт',
        template: 'email-verify-account',
        templateData: {
          fullName: inputs.fullName,
          token: newUserRecord.emailProofToken
        }
      });
    } else {
      sails.log.info('Пропуск подтверждения электронной почты для новой учетной записи ... (так как `verifyEmailAddresses` отключено)');
    }
    let data =  await sails.helpers.listUser.with({
      count: 20,
      query: '',
      req:  this.req,
    });

    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('user', 'list',data);
  }

};
