module.exports = {


  friendlyName: 'Update cover album',


  description: '',


  inputs: {
    cover: {
      type: 'number',
      description: `Ключ картинки в массиве фоторгафий привязанных к объекту коллекции. 
      Согласно которому это фото будет обложкой.`,
      required: true
    } ,

    id: {
      type: 'string',
      description: `Идентификатор помёта.`,
      required: true
    }

  },


  exits: {
    success: {
      // Информация о вновь созданной записи
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
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }

    console.log('COVER INPUTS:: ', inputs.cover);
    // Бибилиотека Node.js
    const url = require('url');

    let q = {};
    q[inputs.collection] = inputs.id;

    let info = Image.findOne(q);

    console.log('Выбрали коллекцию с фотографиями:', info);

    await sails.sockets.broadcast(inputs.collection, `list-${inputs.collection}`);

    // All done.
    return exits.success();

  }


};
