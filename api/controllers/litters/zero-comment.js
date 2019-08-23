module.exports = {


  friendlyName: 'Zero comment',


  description: 'Обнуляем число новых комментариев. Типо пользовательпрочитал все и новых больше нет.',


  inputs: {
    id: {
      type: 'string',
      description: `Идентификатор помёта.`,
      required: true
    },

    letter: {
      type: 'string',
      description: 'Передаётся буква помёта',
      example: 'A',
      required: true
    },

    indexPhotoSet: {
      type: 'string',
      description: 'Хэш-код в массиве фотосессий.',
      required: true
    },

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
      description: 'The object was not created.',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }

    let litter = await sails.helpers.srcImagePreparation.with(
      {
        letter: inputs.letter,
        preferredLocale: this.req.me.preferredLocale
      });


    if (!litter) throw 'badRequest';


    // litter.puppies[inputs.indexPhotoSet].countNewComments = 0;
    //
    //
    // let litterUpdate = await Litter.updateOne(inputs.id).set({puppies: litter.puppies});
    // if (!litterUpdate) throw 'badRequest';
    //
    //
    // // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('litter', 'list-comment', litter);


    // Respond with view.
    return exits.success();


  }
};
