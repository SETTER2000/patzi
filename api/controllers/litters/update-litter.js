module.exports = {


  friendlyName: 'Update litter',


  description: 'Обновляем данные помёта',

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

    description: {
      type: 'string',
      maxLength:500,
      example: 'Ожидается звёздный помёт. Прекрасные родословные, чистокровные производители.',
      description: 'Описание помёта. Какая то интересная информация.'
    },

    subtitle: {
      type: 'string',
      maxLength:100,
      example: 'Ожидается звёздный помёт. Прекрасные родословные, чистокровные производители.',
      description: 'Краткое  Описание помёта. Какая то интересная информация.'
    },


    descriptionPhotoSession: {
      type: 'string',
      maxLength:300,
      example: 'Ожидается звёздный помёт. Прекрасные родословные, чистокровные производители.',
      description: 'Описание фотосессии. Какая то интересная информация.'
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
    console.log('COVER INPUTS:: ', inputs.id);
    console.log('COVER sessionName:: ', inputs.sessionName);

    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
console.log('inputs.descriptionPhotoSession: ',inputs.descriptionPhotoSession);

    // let info = await Image.findOne(q);
    // Update the record for the logged-in user.
    await Litter.updateOne({id: inputs.id})
      .set({
        sessionName: inputs.sessionName,
        subtitle: inputs.subtitle,
        description: inputs.description,
        descriptionPhotoSession: _.isEmpty(inputs.descriptionPhotoSession) ? '' : inputs.descriptionPhotoSession
      });


    // await sails.sockets.broadcast(inputs.collection, `list-${inputs.collection}`);

    // All done.
    return exits.success();

  }


};
