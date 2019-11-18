module.exports = {


  friendlyName: 'Create user',


  description: 'Создать пользователя. Только для администраторов.',


  inputs: {


    fullName: {
      type: 'string',
      required: true,
      description: 'Полное представление имени пользователя.',
      maxLength: 120,
      example: 'Mary Sue van der McHenst'
    },


    continent: {
      type: 'string',
      description: 'Континент пользователя'
    },


    country: {
      type: 'string',
      description: 'Страна пользователя.'
    },


    region: {
      type: 'string',
      description: 'Область.'
    },


    city: {
      type: 'string',
      description: 'Город пользователя.'
    },

    emailAddress: {
      type: 'string',
      // required: true,
      // unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'mary.sue@example.com'
    },

    groups: {
      type: 'ref',
      description: 'Массив ID групп в которую входит пользователь.'
    },


    fileList: {
      type: 'ref',
      description: 'Массив с файлами данных о загруженных файлах.'
    },

    sendCodEmail: {
      type: 'string',
      isIn: ['unconfirmed', 'confirmed'],
      defaultsTo: 'confirmed',
      description: 'Отправить письмо с данными авторизации на email.',
    },

    emailStatus: {
      type: 'string',
      isIn: ['unconfirmed', 'change-requested', 'confirmed'],
      defaultsTo: 'confirmed',
      description: 'Статус подтверждения адреса электронной почты пользователя.',
      extendedDescription:
        `Пользователи могут быть созданы как «неподтвержденные» (например, обычная регистрация) или как «подтвержденные» (например, жестко запрограммированные)
пользователи админа). Когда функция проверки электронной почты включена, новые пользователи создаются с помощью
в форме регистрации есть \`emailStatus: 'unsfirmed'\`, пока они не нажмут на ссылку в электронном подтверждении.
Точно так же, когда существующий пользователь меняет свой адрес электронной почты, он переключается на «запрос на изменение»
статус электронной почты, пока они не нажмут на ссылку в электронном письме с подтверждением.`
    },

    emailChangeCandidate: {
      type: 'string',
      isEmail: true,
      description: 'Неподтвержденный адрес электронной почты, на который этот пользователь хочет изменить (при необходимости).'
    },


    password: {
      type: 'string',
      // required: true,
      /* minLength: 8,
       maxLength: 30,*/
      description: 'Надежно хешируется представление пароля пользователя для входа.',
      // protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    },

    checkPass: {
      type: 'string',
      // required: true,
      description: 'Повторный пароль.',
      // protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    },

    isAdmin: {
      type: 'boolean',
      description: 'Является ли этот пользователь «администратором»',
      defaultsTo: false
    },


    dateBirth: {
      type: 'string',
      description: 'Дата рождения.'
    },


    dateDeath: {
      type: 'string',
      description: 'Дата смерти.'
    },

    description: {
      type: 'string',
      maxLength: 200,
      description: `Описание пользователя.`
    },

  },


  exits: {
    success: {
      outputDescription: 'Information about the newly created record.',
      // Устанавливаем выходной тип данных. Хорошая практика для документирования кода.
      outputType: {
        id: 'number',
        imageSrc: 'string'
      },
    },
    badRequest: {
      description: 'No image upload was provided.',
      responseType: 'badRequest'
    },
    invalid: {
      responseType: 'badRequest',
      description: 'Предоставленные полное имя, пароль и / или адрес электронной почты являются недействительными.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
      'parameters should have been validated/coerced _before_ they were sent.'
    },
    userAlreadyInUse: {
      statusCode: 409,
      description: 'Such Email is already registered. Change email.',
    },

    userAlreadyInUseRU: {
      statusCode: 409,
      description: 'Такой Email уже зарегистрирован. Измените email.',
    },

    checkPassEN: {
      statusCode: 409,
      description: 'Passwords are not equal.',
    },

    checkPassRU: {
      statusCode: 409,
      description: 'Пароли не совпадают.',
    },
  },


  fn: async function (inputs, exits) {
    // Бибилиотека Node.js
    const url = require('url');
    const req = this.req;
    const moment = require('moment');
    moment.locale('en');
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    let images = [];

    // Have the socket which made the request join the "kennel" room.
    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'user');
    // console.log('inputs.fileList DOG-create: ', inputs.fileList);
    if (inputs.fileList) {
      images = inputs.fileList.filter(o => !_.isNull(o));

      _.each(images, img => {
        img.id = _.first(_.last(img.fd.split('\\')).split('.'));
        img.description = '';
        img.dateTaken = '';
        delete img.filename;
        delete img.status;
        delete img.field;
      });
    }

    let avatarFD = images.length > 0 ? images[0].fd : '';
    let avatarMime = images.length > 0 ? images[0].type : '';
    let filenameAvatar = images.length > 0 ? images[0].name : '';

    let emailAddress = await sails.helpers.genEmail.with({email: inputs.emailAddress, fullName: inputs.fullName});
    let conflictingEmail = (req.me.preferredLocale === 'ru') ? 'userAlreadyInUseRU' : 'userAlreadyInUse';
    let confirmedAccount = (req.me.preferredLocale === 'ru') ? 'Подтвердите ваш аккаунт' : 'Please confirm your account';
    let fullName = await sails.helpers.startLetter.with({str: inputs.fullName});


    // Проверка паролей на равенство
    if (inputs.password !== inputs.checkPass && (!_.isEmpty(inputs.password) && !_.isEmpty(inputs.checkPass))) {
      throw (req.me.preferredLocale === 'ru') ? 'checkPassRU' : 'checkPassEN';
    }

    // Если пароль не указан генерируем пароль самостоятельно
    let password = _.isEmpty(inputs.password) || _.isEmpty(inputs.checkPass) ? await sails.helpers.strings.random('alphanumeric', 8) : inputs.password;

    console.log('inputs.emailAddress::: ', inputs.emailAddress);
    console.log('emailAddress::: ', emailAddress);
    console.log('fullName::: ', fullName);
    let data = {
      fullName: fullName,
      fullNameEn: await sails.helpers.translitWord.with({str: fullName}),
      emailStatus: (inputs.sendCodEmail === 'confirmed') ? 'confirmed' : inputs.emailStatus,
      description: inputs.description,
      see: inputs.see,
      filename: filenameAvatar,
      avatarFD: avatarFD,
      region: inputs.region,
      city: inputs.city,
      continent: inputs.continent,
      country: inputs.country,
      avatarMime: avatarMime,
      password: await sails.helpers.passwords.hashPassword(password),
      images: images,
      dateBirth: inputs.dateBirth ? await sails.helpers.dateFix(inputs.dateBirth) : '',
      dateDeath: inputs.dateDeath ? await sails.helpers.dateFix(inputs.dateDeath) : '',
      emailAddress: emailAddress,
    };

    // Если установлен флаг отправки подтверждения email, то добавляются временные отметки
    // _.extend(data, (inputs.sendCodEmail === 'confirmed') ? {
    //   emailProofToken: await sails.helpers.strings.random('url-friendly'),
    //   emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
    //   emailStatus: 'unconfirmed'
    // } : {});

    console.log('DATA created: ', data);
    // Создаём пользователя
    let newUser = await User.create(data)
      .intercept('E_UNIQUE', conflictingEmail)
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();

    // console.log('inputs.sendCodEmail', inputs.sendCodEmail);
    if (sails.config.custom.verifyEmailAddresses && inputs.sendCodEmail === 'confirmed') {
      // Send "confirm account" email
      await sails.helpers.sendTemplateEmail.with({
        to: emailAddress,
        subject: confirmedAccount,
        template: 'email-send-password',
        templateData: {
          fullName: inputs.fullName,
          login: emailAddress,
          pass: password,
          // token: newUser.emailProofToken
        }
      });
    } else {
      sails.log.info('Skipping new account email verification... (since `verifyEmailAddresses` is disabled)');
    }

    console.log('inputs.groups::: ', inputs.groups);
    // Добавить нового пользователя alexFox.id в группу 'admin'
    !_.isEmpty(inputs.groups) > 0 ? await User.addToCollection(newUser.id, 'groups', inputs.groups) : '';


    // Устанавливаем ссылку на аватар
    images.length > 0 ? await User.updateOne(newUser).set({avatar: url.resolve(sails.config.custom.baseUrl, `/api/v1/account/${newUser.id}`)}) : '';


    /**
     * Для собаки с id 23 добавить родителя с  id 12
     * await User.addToCollection(23, 'parents', 12);
     * Для собаки 3 замените всех детей
     * из коллекции «children» на детей 99 и 98:
     * await User.replaceCollection(3, 'children').members([99,98]);
     *
     * Для собаки с updateUser.id меняем родителей в массиве идентификаторы
     */
    /*   let parents = [];
       inputs.dam ? parents.push(inputs.dam) : '';
       inputs.sire ? parents.push(inputs.sire) : '';
       let parentFind = await User.find({fullName: parents});
       parents = _.pluck(parentFind, 'id');
       parents.length > 0 ? await User.addToCollection(newUser.id, 'parents').members(parents) : '';
   */
    // console.log('DATA USER::: ', data);

    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('user', 'list-user');

    return exits.success();
  }

};
