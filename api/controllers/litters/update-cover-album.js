module.exports = {


  friendlyName: 'Update cover album',


  description: 'Обновляет обложку альбома.',


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

    // console.log('COVER INPUTS:: ', inputs.cover);




    // let info = await Image.findOne(q);
    // Update the record for the logged-in user.
    await Litter.updateOne({id: inputs.id})
      .set({
        cover: inputs.cover
      });


    // await sails.sockets.broadcast(inputs.collection, `list-${inputs.collection}`);

    // All done.
    return exits.success();

  }


};
