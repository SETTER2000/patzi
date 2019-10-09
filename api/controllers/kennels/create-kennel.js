module.exports = {


  friendlyName: 'Create kennel',


  description: 'Создаём, добавляем новый питомник.',


  inputs: {

    label: {
      type: 'string',
      required: true,
      description: 'Официальное наименование питомника.'

    },

    file: {
      type: 'ref',
      description: 'Массив с данными о загруженом файле. Логотип в данной коллекции.'
    },


    subtitle: {
      type: 'string',
      maxLength:300,
      description: 'Дополнительная информация. Описание питомника.'
    },


    phones: {
      description: 'Массив телефонов для связи.',
      // Тип массив словарей
      type: [{
        key:'number',
        value: 'string',
        fullName: 'string'
      }],
      // type: ['string'],
      // Пример данных, которые ожидаются на входе в экшен
      example: [
        {
          key: 1,
          value: '+7 (910) 406 7 406',
          fullName: 'Olga Petrova'
        }
      ],
      // required: true

    },


    yourKennel: {
      type: 'boolean',
      description: 'Это ваш питомник?.',
      defaultsTo:false
    },

    registerNumber: {
      type: 'string',
      required: true,
      description: 'Регистрационный номаер.'
    },

    site: {
      type: 'string',
      description: 'Сайт.'
    },


    continent: {
      type: 'string',
      required: true,
      description: 'Континент где находится питомник.'
    },


    country: {
      type: 'string',
      required: true,
      description: 'Страна где находится питомник.'
    },



    region: {
      type: 'string',
      required: true,
      description: 'Край, область где находится питомник.'
    },



    city: {
      type: 'string',
      description: 'Город где находится питомник.'
    },



    address: {
      type: 'string',
      description: 'Адрес где находится питомник.'
    },


    dateCreate: {
      type: 'string',
      required: true,
      description: 'Дата создания питомника.'
    },

    rightName: {
      type: 'string',
      description: 'Имя собаки с какой стороны от названия питомника пишется.',
      example: 'left'
    }
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
    }
  },


  fn: async function (inputs, exits) {
    // Бибилиотека Node.js
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }


    // Have the socket which made the request join the "kennel" room.
    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'kennel');
console.log('INPUTS:::: ' , inputs);

    inputs.file = (_.get(inputs.file, 'fd')) ? inputs.file : '';

    let newKennel = await Kennel.create({
      imageUploadFD: inputs.file.fd,
      imageUploadMime: inputs.file.type,
      filename: inputs.file.filename,
      label: _.startCase(inputs.label.toString().toLowerCase()).replace(/Fci\b/g, '(FCI)'),
      yourKennel: (inputs.yourKennel) ? this.req.me.id : null,
      whoCreate: this.req.me.id,
      rightName: inputs.rightName,
      registerNumber: _.trim(inputs.registerNumber),
      dateCreate: inputs.dateCreate,
      subtitle: inputs.subtitle,
      site: _.trim(inputs.site),
      city: inputs.city,
      country: inputs.country,
      continent: inputs.continent,
      region: inputs.region,
      address: inputs.address,
      phones: inputs.phones
    }).fetch();

    if (!newKennel) {
      throw 'badRequest';
    }

    // Вызываем помощника сформировать правильно данные для ответа.
    let result = await sails.helpers.formatCollectionKennel(req);

    console.log('RESULT COL::: ' , result);
    // Рассылаем данные всем подписанным на событие list данной комнаты.
    await sails.sockets.broadcast('kennel', 'list-kennel',result.collection);

    return exits.success();
  }

};
