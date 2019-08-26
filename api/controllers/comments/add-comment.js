module.exports = {


  friendlyName: 'Add comment',


  description: 'Добавляем новый комментарий.',


  inputs: {
    comment: {
      type: 'string',
      example: 'Hello, world!',
      required: true,
      description: 'Текст комментария.'
    },


    nameModule: {
      type: 'string',
      example: 'Litter',
      // required: true,
      description: `Наименование модуля. Например модуль Litter.`
    },


    indexPhotoSet: {
      type: 'string',
      example: '2911bfggfhahdd',
       required: true,
      description: `Хэш-код объекта массива.`
    },


    userName: {
      type: 'string',
      example: 'Alex Fox',
      required: true,
      description: `Полное имя пользователя.`
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


    letter: {
      type: 'string',
      description: 'Передаётся буква помёта',
      example: 'A',
      // required: true
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
  },


  fn: async function (inputs, exits) {
    // Бибилиотека Node.js
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }


    // Have the socket which made the request join the "kennel" room.
    // Подключить сокет, который сделал запрос, к комнате «comment».
    await sails.sockets.join(req, 'comment');

    // console.log('inputs Comment-create: ', inputs);
    // let list  = _.pluck(inputs.fileList, 'response');


    // let litter = await sails.helpers.srcImagePreparation.with(
    //   {
    //     letter: inputs.letter,
    //     preferredLocale: this.req.me.preferredLocale
    //   });
    // if (!litter){ console.log('EEEEEEEErrror'); throw 'badRequest';}


    // Записываем комментарий
    let newComment = await Commentary.create({
      comment: inputs.comment,
      nameModule: inputs.nameModule,
      instanceModuleId: inputs.instanceModuleId,
      field: inputs.field,
      userName: inputs.userName,
      indexPhotoSet: inputs.indexPhotoSet,
      // avatarUrl: (user.defaultIcon === 'avatar') ? user.avatar : user.gravatar,
      owner: req.me.id
    }).fetch();

    if(!newComment) {throw 'badRequest';}


    let module = await sails.helpers.listComments.with({
      instanceModuleId: inputs.instanceModuleId,
      field: inputs.field
    });

    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('litter', 'list-comment', module );

    return exits.success();

  }
};
