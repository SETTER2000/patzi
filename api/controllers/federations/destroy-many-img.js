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
      description: 'The specified federation name is already in use.',
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
    let federation = await Federation.findOne(inputs.id);
    let removeImage = _.remove(federation.images, img => _.indexOf(inputs.removeImage, img.id) > -1);
    let update = await Federation.updateOne({id: inputs.id})
      .set({images: federation.images});
    await sails.helpers.removeImgS3(removeImage);
    return exits.success();
  }
};
