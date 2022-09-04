module.exports = {
  friendlyName: 'Destroy one comment',
  description: 'Удалить комментарий.',
  inputs: {
    id: {
      type: 'string',
      required: true
    },
    nameModule: {
      type: 'string',
      example: 'Litter',
      required: true,
      description: `Наименование модуля. Например модуль Litter.`
    },
    instanceModuleId: {
      type: 'string',
      example: '5d5fc8aac1717d2778adbfae',
      required: true,
      description: `Идентификатор экземпляра модуля в котором оставлен комментарий. Например в модуле Litter
      (помёты) их может быть несколько, следовательно кажый помёт имеет свой ID, он и
      записывается здесь (Litter.id).`
    },
    indexPhotoSet: {
      type: 'string',
      example: '2911bfggfhahdd',
      required: true,
      description: `Хэш-код объекта массива.`
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
    notFound: {
      description: 'Не существует такого объекта с таким ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'Пользователь делающий данный запрос не имеет право на удаление этого объекта.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    },
    badRequest: {
      description: 'No image upload was provided.',
      responseType: 'badRequest'
    },
  },

  fn: async function (inputs, exits) {
    let req = this.req;
    if (!req.me.isSuperAdmin && !req.me.isAdmin) {
      let comment = await Commentary.findOne({
        id: inputs.id,
        owner: req.me.id
      });
      if (!comment) {
        throw 'notFound';
      }
      if (comment.owner !== this.req.me.id) {
        throw 'forbidden';
      }
    }
    let destroyedRecords;
    destroyedRecords = await Commentary.destroyOne({id: inputs.id});
    if (!destroyedRecords) {
      throw 'badRequest';
    }
    // Подключить сокет, который сделал запрос, к комнате «comment».
    await sails.sockets.join(req, 'comment');
    let allModule = await sails.helpers.listComments.with({
      instanceModuleId: inputs.instanceModuleId,
      field: inputs.field
    });
    let module;
    // console.log(`MODULE ::: ${inputs.nameModule}`, inputs.nameModule);
    switch (inputs.nameModule) {
      case 'Litter':
        module = await Litter.findOne({id: inputs.instanceModuleId});
        _.each(module[inputs.field], ob => {
          ob.indexPhotoSet === inputs.indexPhotoSet ? ob.countComment= _.pluck(allModule, inputs.indexPhotoSet).length : '';
        });
        await Litter.updateOne({id: inputs.instanceModuleId}).set(module);
        break;
    }
    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('litter', 'list-comment', allModule);
    await sails.sockets.broadcast('litter', 'delete-comment', _.zipObject([[inputs.indexPhotoSet,inputs.id]]));
    return exits.success();
  }
};
