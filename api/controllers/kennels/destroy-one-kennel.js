module.exports = {


  friendlyName: 'Destroy one kennel',

  description: `Удалить один питомник. Питомник может быть удалён после того как удалены 
  все собаки привязанные к питомнику.`,


  inputs: {
    id: {
      type: 'string',
      required: true
    }
  },


  exits: {
    // notFound: {
    //   description: 'Не существует такого объекта с таким ID.',
    //   responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    // },
    forbidden: {
      description: 'The user making this request does\'t have the permissions to delete this kennel.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    },
    forbiddenRu: {
      description: 'Пользователь, делающий этот запрос, не имеет прав на удаление данного питомника.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    },
    /*
        forbiddenDog: {
          description: 'Cannot be deleted! You have associated files: dog.',
          responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
        },
        forbiddenLitter: {
          description: 'Cannot be deleted! You have associated files: litter.',
          responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
        },
    */

    badRequestRu: {
      description: 'Не может быть удалено! У вас есть связанные файлы. Вы должны удалить всех собак, связанных с этим питомником.',
      responseType: 'badRequest'
    },
    badRequest: {
      description: 'Cannot be deleted! You have associated files: cattery. You should remove all dogs associated with this kennel.',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {
    const req = this.req;


    // let litter = await Litter.findOne({id:inputs.id});
    // if(litter){
    //   throw 'forbiddenLitter';
    // }


    let kennel = await Kennel.find({id: inputs.id})
      .populate('owners')
      .populate('dogs');
    if (!_.isEmpty(kennel[0].dogs)) {
      throw this.req.me.preferredLocale === 'ru' ? 'badRequestRu' : 'badRequest';
    }
    //
    // let kennel = await Kennel.findOne({
    //   id: inputs.id
    // });
    //
    // if (!kennel) {
    //   throw 'notFound';
    // }

    console.log('KENNELS: ' , kennel);

    if ((_.isEmpty(kennel.owners) ? false : _.isEmpty(kennel.owners.filter(o => o.id === this.req.me.id))) && (!this.req.me.isSuperAdmin || !this.req.me.isAdmin)) {
      throw this.req.me.preferredLocale === 'ru' ? 'forbiddenRu' : 'badRequest';
    }


    await Dog.findOne({id: inputs.id});

    await Kennel.destroy({id: inputs.id});

    // Вызываем помощника сформировать правильно данные для ответа.
    let res = await sails.helpers.formatCollectionKennel(req);


    // Рассылаем данные всем подписанным на событие list данной комнаты.
    await sails.sockets.broadcast('kennel', 'list-kennel', res.collection);

    // Respond with view.
    return exits.success();
  }
};
