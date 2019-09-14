module.exports = {


  friendlyName: 'Update dog',


  inputs: {
    id: {
      type: 'string',
      required: true,
      description: 'Идентификатор собаки'
    },

    label: {
      type: 'string',
      required: true,
      description: `Официальное имя собаки. Поле обязательно для заполнения.
      В рамках всей коллекции это поле не может быть сделано уникальным, только проверка имени вместе 
      с названием питомника может однозначно установить уникальность собаки в базе.`
    },


    gender: {
      type: 'string',
      required: true,
      example: 'sire, dam',
      description: 'Пол собак. В смысле не пол собаки, а конец есть или нет.'
    },


    dateBirth: {
      type: 'string',
      required: true,
      description: 'Дата рождения.'
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


    saleDescription: {
      type: 'string',
      description: `Рекомендации к продаже. Сопроводительный текст, который будет виден на странице
       продаж для данной собаки.`,
      maxLength: 700
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
    let fileList;

    // Have the socket which made the request join the "kennel" room.
    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'dog');

    // console.log('inputs.fileList DOG-create: ', inputs.fileList);
    if (inputs.fileList) {
      fileList = inputs.fileList.filter(o => !_.isNull(o));
      _.each(fileList, img => {
        img.id = _.first(_.last(img.fd.split('\\')).split('.'));
        delete img.filename;
        delete img.status;
        delete img.field;
      });
    }


    // Удаляем название питомника из имени собаки
    let kennel = await Kennel.findOne({id: inputs.kennel});
    inputs.label = inputs.label.replace(kennel.label, '');


    /*// Проверка существования такой же собаки.
    let conflictingDog = await Dog.findOne({
      kennel: inputs.kennel,
      label: inputs.label
    });

    if (conflictingDog) {
      throw (req.me.preferredLocale === 'ru') ? 'dogAlreadyInUseRU' : 'dogAlreadyInUse';
    }*/


    let label = _.startCase(inputs.label.toString().toLowerCase());
    let rightFullName = _.startCase(label + ' ' + kennel.label);
    let leftFullName = _.startCase(kennel.label + ' ' + label);
    let dateBirth = inputs.dateBirth.replace(/"([^"]+(?="))"/g, '$1');

    // Создаём собаку
    let updateDog = await Dog.updateOne({id: inputs.id})
      .set({
        label: label,
        kennel: inputs.kennel,
        gender: inputs.gender,
        currency: inputs.currency,
        price: inputs.price,
        saleDescription: inputs.saleDescription,
        dateBirth: inputs.dateBirth,
        born: moment.tz(dateBirth, 'Europe/Moscow').format(),
        nickname: inputs.nickname,
        subtitle: inputs.subtitle,
        weight: inputs.weight,
        growth: inputs.growth,
        type: inputs.type,
        sale: inputs.sale,
        images: fileList,
        color: inputs.color,
        stamp: inputs.stamp,
        fullName: kennel.right ? `${rightFullName}` : `${leftFullName}`
      });


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
    parents.length > 0 ? await Dog.replaceCollection(updateDog.id, 'parents').members(parents) : '';


    // Если не создан возвращаем ошибку.
    if (!updateDog) {
      throw 'badRequest';
    }

    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    // await sails.sockets.broadcast('dog', 'list-dog');

    return exits.success();
  }


};
