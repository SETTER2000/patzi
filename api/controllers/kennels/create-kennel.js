module.exports = {


  friendlyName: 'Upload kennel',


  description: 'Создаём, добавляем новый питомник.',


  inputs: {

    label: {
      type: 'string',
      required: true,
      description: 'Официальное наименование питомника.'

    },

    file: {
      type: 'ref',
      description: 'Массив с данными о загруженом файле.'
    },


    subtitle: {
      type: 'string',
      description: 'Дополнительная информация. Описание питомника.'
    },

    yourKennel: {
      type: 'boolean',
      description: 'Это ваш питомник?.',
      defaultsTo:false
    },

    registerNumber: {
      type: 'string',
      description: 'Регистрационный номаер.'
    },

    site: {
      type: 'string',
      description: 'Сайт.'
    },

    country: {
      type: 'string',
      description: 'Город где находится питомник.'
    },

    continent: {
      type: 'string',
      description: 'Континент где находится питомник.'
    },

    dateCreate: {
      type: 'string',
      description: 'Дата создания.'
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
    const req = this;


    console.log(inputs);
    // Have the socket which made the request join the "kennel" room.
    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'kennel');
    // inputs.file = inputs.file[0];


    inputs.file = (_.get(inputs.file, 'fd')) ? inputs.file : '';

    let newKennel = await Kennel.create({
      imageUploadFD: inputs.file.fd,
      imageUploadMime: inputs.file.type,
      filename: inputs.file.filename,
      label: inputs.label,
      yourKennel: (inputs.yourKennel) ? this.req.me.id : '',
      whoCreate: this.req.me.id,
      rightName: inputs.rightName,
      registerNumber: inputs.registerNumber,
      dateCreate: inputs.dateCreate,
      subtitle: inputs.subtitle,
      site: inputs.site,
      city: inputs.city,
      country: inputs.country,
      continent: inputs.continent,
      address: inputs.address
    }).fetch();

// Рассылаем данные всем подписанным на событие list данной комнаты.
    await sails.sockets.broadcast('kennel', 'list-kennel', newKennel);

    return exits.success();
  }

};
