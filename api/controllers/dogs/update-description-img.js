module.exports = {
  friendlyName: 'Update description img',
  description: '',
  inputs: {
    id: {
      type: 'string',
      description: `Идентификатор собаки с которой работает действие.`
    },
    photoId: {
      type: 'string',
      description: `Идентификатор фото для которой предназначено описание.`
    },
    description: {
      type: 'string',
      maxLength: 300,
      description: `Описание файла картинки.`
    },
    dateTaken: {
      type: 'string',
      description: `Время съёмки.`
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
    const req = this.req;
    if (!req.isSocket) {
      throw 'badRequest';
    }
    let dog = await Dog.findOne(inputs.id);
    _.each(dog.images, img => {
      if(img.id === inputs.photoId) {img.description = inputs.description; img.dateTaken = inputs.dateTaken;}
    });
    let updateDog = await Dog.updateOne({id: inputs.id})
      .set({images: dog.images});
    return exits.success();
  }
};
