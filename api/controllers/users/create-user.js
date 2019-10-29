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


    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
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
      description: 'Надежно хешируется представление пароля пользователя для входа.',
      protect: true,
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

    /*  fullName: {
        type: 'string',
        required: true,
        description: `Официальное имя собаки. Поле обязательно для заполнения.
        В рамках всей коллекции это поле не может быть сделано уникальным, только проверка имени вместе
        с названием питомника может однозначно установить уникальность собаки в базе.`
      },


      letter: {
        type: 'string',
        description: `Буква помёта к которому пренадлежит собака.
        Информация нужна для фиксации кнопки о продаже на странице помёта.
        В случаи когда дата рождения щенков одного помёта разная.
        (например в 23:00 первый родился и через 2 часа второй. Помёт один, а дата рождения разная.).
        Если буква не указана, то автоматически берётся первая буква имени собаки.`,
        //required: true,
      },


      fileList: {
        type: 'ref',
        description: 'Массив с файлами данных о загруженных файлах.'
      },


      subtitle: {
        type: 'string',
        description: 'Дополнительная информация. Описание питомника.',
        maxLength: 700
      },


      see: {
        type: 'boolean',
        defaultsTo: true,
        description: `Флаг видимости собаки. Видна или нет. По умолчанию не видна.`
      },


      sire: {
        type: 'string',
        description: 'Отец.',
        maxLength: 80
      },


      dam: {
        type: 'string',
        description: 'Мать.',
        maxLength: 80
      },

      // winner: {
      //   type: 'boolean',
      //   defaultsTo: false,
      //   description: `Флаг устанавливается, если собака стала Чемпионом Мира.`
      // },

      saleDescription: {
        type: 'string',
        description: `Рекомендации к продаже. Сопроводительный текст, который будет виден на странице
         продаж для данной собаки.`,
        maxLength: 700
      },


      dateBirth: {
        type: 'string',
        required: true,
        description: 'Дата рождения.'
      },

      dateDeath: {
        type: 'string',
        description: 'Дата смерти.'
      },

      sale: {
        type: 'boolean',
        defaultsTo: false,
        description: `Флаг продажи собаки. Проадётся или нет. По умолчанию не продаётся.`
      },


      currency: {
        type: 'string',
        description: `Валюта продажи. Валюта за катоую можно купить собаку.`,
        example: 'dollar, рубль, euro',
        isIn: ['dollar', 'рубль', 'euro'],
        // required: true,
        minLength: 4,
        maxLength: 6
      },


      price: {
        type: 'number',
        // required: true,
        description: 'Цена продажи собаки.'
      },


      kennel: {
        type: 'string',
        description: 'Идентификатор питомника'
      },


      gender: {
        type: 'string',
        required: true,
        example: 'sire, dam',
        description: 'Пол собак. В смысле не пол собаки, а конец есть или нет.'
      },


      nickname: {
        type: 'string',
        description: 'Кличка, ласковое имя.'
      },


      weight: {
        type: 'number',
        description: 'Вес. В граммах.',
        example: 4500
      },


      growth: {
        type: 'number',
        description: 'Рост. В сантиметрах.',
        example: 30
      },


      type: {
        type: 'string',
        description: 'Тип. Возможны два варианта.',
        example: 'hairless, powderpuff',
      },

      color: {
        type: 'string',
        description: 'Цвет.',
        // example:'hairless, powderpuff',
      },

      stamp: {
        type: 'string',
        description: 'Клеймо. Номер собаки в реестре.',
        // example:'hairless, powderpuff',
      },


      canine: {
        type: 'string',
        description: 'Клыки. Количество клыков.',
        example: '4',
        defaultsTo:'4'
      },

      teethCountTop: {
        type: 'string',
        description: 'Количество зубов вверху.',
        example: '6',
        defaultsTo:'6'
      },


      teethCountBottom: {
        type: 'string',
        description: 'Количество зубов внизу.',
        example: '6',
        defaultsTo:'6'
      },


      bite: {
        type: 'string',
        description: 'Прикус.',
        example: 'ножнецеобразный',
        isIn: ['перекус', 'недокус', 'ножнецеобразный'],
        defaultsTo: 'ножнецеобразный'
      },


      userTests: {
        type: 'string',
        description: 'Тесты собаки.'
      },
  */

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

    userAlreadyInUse: {
      statusCode: 409,
      description: 'The specified user name is already in use.',
    },

    userAlreadyInUseRU: {
      statusCode: 409,
      description: 'Указанное имя собаки уже используется.',
    },
  },


  fn: async function (inputs, exits) {
    // Бибилиотека Node.js
    const req = this.req;
    const moment = require('moment');
    const tz = require('moment-timezone');
    moment.locale('en');
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    let images;

    // Have the socket which made the request join the "kennel" room.
    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'user');
    console.log('inputs.fileList:::: ', inputs.fileList);
    // console.log('inputs.fileList DOG-create: ', inputs.fileList);
    if (inputs.fileList) {
      images = inputs.fileList.filter(o => !_.isNull(o));

      console.log('images:::: ', images);
      console.log('inputs.dateBirth:::: ', inputs.dateBirth);

      _.each(images, img => {
        console.log('FDDDk:::', img);
        img.id = _.first(_.last(img.fd.split('\\')).split('.'));
        img.description = '';
        img.dateTaken = '';
        delete img.filename;
        delete img.status;
        delete img.field;
      });
    }
    // console.log('inputs.fileList после обработки: ', inputs.fileList);

    // Удаляем название питомника из имени собаки
    // let kennel = await Kennel.findOne({id: inputs.kennel});
    // inputs.fullName = inputs.fullName.replace(kennel.fullName, '');
    let emailAddress = inputs.emailAddress.toLowerCase();

    // Проверка существования такой же собаки.
    let conflictingUser = await User.findOne({
      emailAddress: emailAddress
    });

    if (conflictingUser) {
      throw (req.me.preferredLocale === 'ru') ? 'userAlreadyInUseRU' : 'userAlreadyInUse';
    }
    let fullName = _.startCase(inputs.fullName.toString().toLowerCase());
    // let rightFullName = _.startCase(fullName + ' ' + kennel.fullName);
    // let leftFullName = _.startCase(kennel.fullName + ' ' + fullName);


    // Создаём пользователя
    let newUser = await User.create({
      fullName: fullName,
      emailStatus: inputs.emailStatus,
      see: inputs.see,
      images:images,
      // currency: inputs.currency,
      // winner: inputs.winner,
      // price: inputs.price,
      // saleDescription: inputs.saleDescription,
      dateBirth: inputs.dateBirth ? await sails.helpers.dateFix(inputs.dateBirth):'',
      // dateDeath: await sails.helpers.dateFix(inputs.dateDeath),
      // nickname: inputs.nickname,
      // subtitle: inputs.subtitle,
      // see: inputs.see,
      // weight: inputs.weight,
      // growth: inputs.growth,
      // type: inputs.type,
      emailAddress: emailAddress,
      // images: images,
      // color: inputs.color,
      // stamp: inputs.stamp,
      // bite: inputs.bite,
      // canine: inputs.canine,
      // teethCountBottom: inputs.teethCountBottom,
      // teethCountTop: inputs.teethCountTop,
      // userTests: inputs.userTests,
      // letter: inputs.letter ? inputs.letter : fullName[0],
      // teethCount:`${inputs.teethCountTop}x${inputs.teethCountBottom}x${inputs.canine}`,

    }).fetch();
    // Если не создан возвращаем ошибку.
    if (!newUser) {

      throw 'badRequest';
    }

    // Добавить нового пользователя alexFox.id в группу 'admin'
    await User.addToCollection(newUser.id, 'groups', inputs.groups);


    /**
     * Для собаки с id 23 добавить родителя с  id 12
     * await User.addToCollection(23, 'parents', 12);
     * Для собаки 3 замените всех детей
     * из коллекции «children» на детей 99 и 98:
     * await User.replaceCollection(3, 'children').members([99,98]);
     *
     * Для собаки с updateUser.id меняем родителей в массиве идентификаторы
     */
    let parents = [];
    inputs.dam ? parents.push(inputs.dam) : '';
    inputs.sire ? parents.push(inputs.sire) : '';
    let parentFind = await User.find({fullName: parents});
    parents = _.pluck(parentFind, 'id');
    parents.length > 0 ? await User.addToCollection(newUser.id, 'parents').members(parents) : '';


    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('user', 'list-user');

    return exits.success();
  }

};
