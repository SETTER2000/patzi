module.exports = {


  friendlyName: 'Create dog',


  description: 'Создаём, добавляем новую собаку.',


  inputs: {
    label: {
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


    owner: {
      type: 'string',
      description: `Кто является владельцем собаки. (ID)`,
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


    showTeeth: {
      type: 'boolean',
      description: `Флаг видимости блока зубов собаки. Виднен или нет блок на сайте. По умолчанию не виден.`
    },


    see: {
      type: 'boolean',
      defaultsTo: true,
      description: `Флаг видимости собаки. Видна или нет. По умолчанию не видна.`
    },

    allowEdit: {
      type: 'boolean',
      description: `Флаг. При установки заводчиком в true, даёт возможность владельцу
      редактировать собаку.`
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
      defaultsTo: '4'
    },

    teethCountTop: {
      type: 'string',
      description: 'Количество зубов вверху.',
      example: '6',
      defaultsTo: '6'
    },


    teethCountBottom: {
      type: 'string',
      description: 'Количество зубов внизу.',
      example: '6',
      defaultsTo: '6'
    },


    bite: {
      type: 'string',
      description: 'Прикус.',
      example: 'ножнецеобразный',
      isIn: ['перекус', 'недокус', 'ножнецеобразный'],
      defaultsTo: 'ножнецеобразный'
    },


    dogTests: {
      type: 'string',
      description: 'Тесты собаки.'
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

    dogAlreadyInUse: {
      statusCode: 409,
      description: 'The specified dog name is already in use.',
    },

    dogAlreadyInUseRU: {
      statusCode: 409,
      description: 'Указанное имя собаки уже используется.',
    },

    dogAddedUse: {
      statusCode: 409,
      description: `You do not have the right to add a dog to this kennel,
      because you are not the owner or co-owner of this nursery.`,
    },
    dogAddedUseRU: {
      statusCode: 409,
      description: `У вас нет права на добавления собаки в данный питомник,
      т.к. вы не являетесь владельцем или совладельцем этого питомника.`,
    },
  },


  fn: async function (inputs, exits) {
    const req = this.req;
    const moment = require('moment');
    moment.locale('en');
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }

    let images = [];

    // hAVE THE SOCKET WHICH MADE THE REQUEST JOIN THE "KENNEL" ROOM.
    // пОДКЛЮЧИТЬ СОКЕТ, КОТОРЫЙ СДЕЛАЛ ЗАПРОС, К КОМНАТЕ «KENNEL».
    await sails.sockets.join(req, 'dog');


    // Проверяем есть ли фото
    if (inputs.fileList) {
      images = inputs.fileList.filter(o => !_.isNull(o));
      _.each(images, img => {
        // console.log('FDDDk:::', img);
        img.id = _.first(_.last(img.fd.split('\\')).split('.'));
        img.description = '';
        img.dateTaken = '';
        delete img.filename;
        delete img.status;
        delete img.field;
      });
    }


    // Получаем объект питомника
    let kennel = await Kennel.findOne({id: inputs.kennel})
      .populate('breeder')
      .populate('owners');

    // Если ты не админ и не суперадмин, то проверяем являешься ли ты
    // владельцем питомника или совладельцем.
    if (!req.me.isAdmin && !req.me.isSuperAdmin) {
      console.log('1 - one');
      if (kennel.breeder.id !== req.me.id || !_.sample(kennel.owners, {'id': req.me.id})) {

        console.log('2 - one');
        throw (req.me.preferredLocale === 'ru') ? 'dogAddedUseRU' : 'dogAddedUse';
      }
    }


    // Удаляем название питомника из имени собаки
    inputs.label = inputs.label.replace(kennel.label, '');


    // Проверка существования такой же собаки.
    let conflictingDog = await Dog.findOne({
      kennel: inputs.kennel,
      label: inputs.label
    });

    if (conflictingDog) {
      throw (req.me.preferredLocale === 'ru') ? 'dogAlreadyInUseRU' : 'dogAlreadyInUse';
    }
    // с заглавной буквы
    let label = _.startCase(inputs.label.toString().toLowerCase());
    let rightFullName = _.startCase(kennel.label + ' ' + label);
    let leftFullName =  _.startCase(label + ' ' + kennel.label);

    const inData = {
      label: label,
      kennel: inputs.kennel,
      gender: inputs.gender,
      currency: inputs.currency,
      showTeeth: inputs.showTeeth,
      winner: inputs.winner,
      price: inputs.price,
      saleDescription: inputs.saleDescription,
      dateBirth: await sails.helpers.dateConverter(inputs.dateBirth),
      dateDeath: await sails.helpers.dateFix(inputs.dateDeath),
      /*     dateBirth: await sails.helpers.dateFix(inputs.dateBirth),
           dateDeath: await sails.helpers.dateFix(inputs.dateDeath),*/
      nickname: inputs.nickname,
      subtitle: inputs.subtitle,
      see: inputs.see,
      allowEdit: inputs.allowEdit,
      weight: inputs.weight,
      growth: inputs.growth,
      type: inputs.type,
      sale: inputs.sale,
      images: images,
      color: inputs.color,
      stamp: inputs.stamp,
      bite: inputs.bite,
      canine: inputs.canine,
      teethCountBottom: inputs.teethCountBottom,
      teethCountTop: inputs.teethCountTop,
      dogTests: inputs.dogTests,
      letter: inputs.letter ? inputs.letter : label[0],
      teethCount: `${inputs.canine}x${inputs.teethCountTop}x${inputs.teethCountBottom}`,
      fullName: kennel.rightName ? `${rightFullName}`  : `${leftFullName}`
    };
    // Создаём собаку
    let newDog = await Dog.create(inData).fetch();
    // Если не создан возвращаем ошибку.
    if (!newDog) {
      throw 'badRequest';
    }

    /**
     * Для собаки с id 23 добавить родителя с  id 12
     * await Dog.addToCollection(23, 'parents', 12);
     * Для собаки 3 замените всех детей
     * из коллекции «children» на детей 99 и 98:
     * await Dog.replaceCollection(3, 'children').members([99,98]);
     *
     * Для собаки с updateDog.id меняем родителей в массиве идентификаторы
     */
    let parents = [];
    inputs.dam ? parents.push(inputs.dam) : '';
    inputs.sire ? parents.push(inputs.sire) : '';
    let parentFind = await Dog.find({fullName: parents});
    parents = _.pluck(parentFind, 'id');
    parents.length > 0 ? await Dog.addToCollection(newDog.id, 'parents').members(parents) : '';

    let owner = inputs.owner ? inputs.owner : this.req.me.id;

    /**
     * Добавить питомца в коллекцию пользователя: "User.dogs",
     * где у пользователя есть идентификатор 10 и питомец имеет идентификатор 300.
     * await User.addToCollection(10, 'dogs', 300);
     */
    await User.addToCollection(owner, 'dogs', newDog.id);


    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('dog', 'list-dog');

    return exits.success();
  }

};
