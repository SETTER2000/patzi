module.exports = {


  friendlyName: 'Destroy one coowner',


  description: '',


  inputs: {
    id: {
      type: 'string',
      description: `Идентификатор питомника с которым работает действие.`
    },
    coownerId: {
      type: 'string',
      description: `Идентификатор совладельца, которые должны быть удалены.`
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


    await Kennel.removeFromCollection(inputs.id, 'owners').members(inputs.coownerId);



    return exits.success();
  }


}
;
