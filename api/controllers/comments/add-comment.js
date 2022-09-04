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
      required: true,
      description: `Наименование модуля. Например модуль Litter.`
    },


    parent: {
      type: 'string',
      example: '5d5fc8aac1717d2778adbfae',
      description: `Идентификатор родительского комментария.`
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
    let module;

    // Записываем комментарий
    let newComment = await Commentary.create({
      comment: inputs.comment,
      nameModule: inputs.nameModule,
      instanceModuleId: inputs.instanceModuleId,
      field: inputs.field,
      userName: inputs.userName,
      indexPhotoSet: inputs.indexPhotoSet,
      owner: req.me.id
    }).fetch();

    if (!newComment) {
      throw 'badRequest';
    }
    // Добавить новый комментарий newComment.id в группу 'admin'
    let newCommentary = inputs.parent ?  await Commentary.addToCollection(inputs.parent, 'child', newComment.id) : '';
    switch (inputs.nameModule) {
      case 'Litter':
        module = await Litter.findOne({id: inputs.instanceModuleId});
        _.each(module[inputs.field], ob => {
          ob.indexPhotoSet === inputs.indexPhotoSet ? ob.countComment++ : '';
        });
        await Litter.updateOne({id: inputs.instanceModuleId}).set(module);
        break;
    }
    let count = module[inputs.field].filter(ob => ob.indexPhotoSet === inputs.indexPhotoSet);
    count = _.last(_.pluck(count, 'countComment'));

    /**
     * Добавляет аватар к коментариям и возвращает собранный массив объектов комментариев согласно
     * идентификатору экземпляра модуля и его полю к которому относятся комментарии
     */
    let comment = await sails.helpers.oneComment(newComment.id);
    // Рассылаем данные всем подписанным на событие add-* данной комнаты.
    await sails.sockets.broadcast('litter', 'add-comment', {comments: comment, countComment: count});
    return exits.success();
  }
};
