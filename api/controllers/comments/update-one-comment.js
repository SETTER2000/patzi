module.exports = {


  friendlyName: 'Change one comment',


  description: 'Обновляет комментарий.',


  inputs: {

    id: {
      type: 'string',
      description: `Идентификатор комментария.`,
      required: true
    },


    comment: {
      type: 'string',
      example: 'Hello, world!',
      required: true,
      description: 'Текст комментария.'
    },


    instanceModuleId: {
      type: 'string',
      example: '5d5fc8aac1717d2778adbfae',
      required: true,
      description: `Идентификатор экземпляра модуля в котором оставлен комментарий. Например в модуле Litter
      (помёты) их может быть несколько, следовательно кажый помёт имеет свой ID, он и записывается здесь.`
    },


    field: {
      type: 'string',
      example: 'puppies',
      required: true,
      description: `Наименование поля в объекте экземпляра модуля в котором содержится контент к 
      которому относится комментарий.`
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

    // console.log('COVER INPUTS:: ', inputs.cover);


    // let info = await Image.findOne(q);
    // Update the record for the logged-in user.
    await Commentary.updateOne({id: inputs.id})
      .set({
        comment: inputs.comment
      });


    let allModule = await sails.helpers.listComments.with({
      instanceModuleId: inputs.instanceModuleId,
      field: inputs.field
    });

    console.log('allModule:::: ',allModule);

    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('litter', 'list-comment', allModule);

    // All done.
    return exits.success();

  }


};
