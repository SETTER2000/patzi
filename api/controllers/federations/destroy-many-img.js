module.exports = {


  friendlyName: 'Destroy many img',


  description: 'Множественное удаление картинок',


  inputs: {
    id: {
      type: 'string',
      description: `Идентификатор объекта с которым работает действие.`
    },
    removeImage: {
      type: 'ref',
      description: `Массив с ID о файлах-картинках, которые должны быть удалены.`
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
      description: 'The specified title name is already in use.',
    },

    dogAlreadyInUseRU: {
      statusCode: 409,
      description: 'Указанное имя собаки уже используется.',
    },
  },


  fn: async function (inputs, exits) {

    const req = this.req;
    if (!req.isSocket) {
      throw 'badRequest';
    }


    let title = await Title.findOne(inputs.id);
    console.log('IN:: ', inputs.removeImage);
    let removeImage = _.remove(title.images, img => _.indexOf(inputs.removeImage, img.id) > -1);
    console.log('Картинки для удаления removeImage::: ', removeImage);
    console.log('title.images::: ', title.images);

    let update = await Title.updateOne({id: inputs.id})
      .set({images: title.images});

    console.log('removeImage::: ', removeImage);

    await sails.helpers.removeImgS3(removeImage);

    return exits.success();
  }

};
