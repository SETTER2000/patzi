module.exports = {


  friendlyName: 'Update litter session name',


  description: 'Обновляем название фото сессии',

  inputs: {
    id: {
      type: 'string',
      description: `Идентификатор помёта.`,
      required: true
    },


    sessionName: {
      type: 'string',
      example: 'Два дня от роду',
      description: 'Название фотосессии для щенков.'
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



    // let info = await Image.findOne(q);
    // Update the record for the logged-in user.
    await Litter.updateOne({id: inputs.id})
      .set({
        sessionName: inputs.sessionName
      });


    // await sails.sockets.broadcast(inputs.collection, `list-${inputs.collection}`);

    // All done.
    return exits.success();

  }


};
