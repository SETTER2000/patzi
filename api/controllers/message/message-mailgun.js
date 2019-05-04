module.exports = {


  friendlyName: 'Message mailgun',


  description: 'Входящие сообщения для сайта, пересылаемые сервисом Mailgun.',


  inputs: {

    sender: {
      // required: true,
      type: 'string',
      // isEmail: true,
      description: 'The email address for the new account, e.g. m@example.com.'
      // extendedDescription: 'Must be a valid email address.',
    },

    recipient: {
      // required: true,
      type: 'string',
      // maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.'
    },

    subject: {
      // required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The user\'s full name.',
    },

    bodyPlain: {
      // required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The user\'s full name.',
    },

    bodyWithoutQuotes: {
      // required: true,
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
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
      'parameters should have been validated/coerced _before_ they were sent.'
    },
    emailAlreadyInUse: {
      statusCode: 409,
      description: 'Указанный адрес электронной почты уже используется.',
    },

  },


  fn: async function (inputs, exits) {

    let newEmailAddress = inputs.sender.toLowerCase();

    return exits.success(
      {
        sender: newEmailAddress,
        recipient: inputs.recipient,
        subject: inputs.subject,
        bodyPlain: inputs.bodyPlain,
        bodyWithoutQuotes: inputs.bodyWithoutQuotes,
      }
    );




    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    // Создаем данные для новой пользовательской записи и сохраняем их в базе данных.
    // (Также используйте `fetch`, чтобы получить новый идентификатор,
    // чтобы мы могли использовать его ниже.)
    /*var newUserRecord = await User.create(_.extend({
      emailAddress: newEmailAddress,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      fullName: inputs.fullName,
      tosAcceptedByIp: this.req.ip
    }, sails.config.custom.verifyEmailAddresses? {
      emailProofToken: await sails.helpers.strings.random('url-friendly'),
      emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
      emailStatus: 'unconfirmed'
    }:{}))
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();
*/
    // If billing feaures are enabled, save a new customer entry in the Stripe API.
    // Then persist the Stripe customer id in the database.
    /* if (sails.config.custom.enableBillingFeatures) {
       let stripeCustomerId = await sails.helpers.stripe.saveBillingInfo.with({
         emailAddress: newEmailAddress
       }).timeout(5000).retry();
       await User.updateOne(newUserRecord.id)
         .set({
           stripeCustomerId
         });
     }*/

    // Store the user's new id in their session.
    /* this.req.session.userId = newUserRecord.id;

     if (sails.config.custom.verifyEmailAddresses) {
       // Send "confirm account" email
       await sails.helpers.sendTemplateEmail.with({
         to: newEmailAddress,
         subject: 'Please confirm your account',
         template: 'email-verify-account',
         templateData: {
           fullName: inputs.fullName,
           token: newUserRecord.emailProofToken
         }
       });
     } else {
       sails.log.info('Skipping new account email verification... (since `verifyEmailAddresses` is disabled)');
     }*/

  }


};
