module.exports = {


  friendlyName: 'Destroy one title',


  description: `Удалить одну федерацию.`,


  inputs: {
    id: {
      type: 'string',
      required: true
    }
  },


  exits: {
    notFound: {
      description: 'Не существует такого объекта с таким ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    }

    // forbidden: {
    //   description: 'The user making this request does\'t have the permissions to delete this kennel.',
    //   responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    // },
    // forbiddenDog: {
    //   description: 'Cannot be deleted! You have associated files: title.',
    //   responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    // },
    // forbiddenLitter: {
    //   description: 'Cannot be deleted! You have associated files: litter.',
    //   responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    // },
    //
    // badRequestDog: {
    //   description: 'Cannot be deleted! You have associated files: cattery. You should remove all dogs associated with this kennel.',
    //   responseType: 'badRequest'
    // }
  },


  fn: async function (inputs, exits) {
    const req = this.req;

    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    // Have the socket which made the request join the "title" room.
    // Подключить сокет, который сделал запрос, к комнате «title».
    await sails.sockets.join(req, 'title');
    // let litter = await Litter.findOne({id:inputs.id});
    // if(litter){
    //   throw 'forbiddenLitter';
    // }

    //
    // let kennel = await Kennel.find({id:inputs.id}).populate('dogs');
    // if (!_.isEmpty(kennel[0].dogs) ){
    //   throw 'badRequestDog';
    // }
    //
    let title = await Title.findOne({
      id: inputs.id
    });
    //
    if (!title) {
      throw 'notFound';
    }

    // if (title.owner !== this.req.me.id && !this.req.me.isSuperAdmin) {
    //   throw 'forbidden';
    // }


    // await Title.findOne({id: inputs.id});
    //
    await Title.destroy({id: inputs.id});


    // Remove photos
    let removeImage = (_.isArray(title.images) && title.images.length > 0 ) ? title.images : [];
    // let removeImage = [...litter.images, ...puppies];
    // console.log('Для удаления::: ', removeImage);
    await sails.helpers.removeImgS3(removeImage);

    // Вызываем помощника сформировать правильно данные для ответа.
    // let res = await sails.helpers.formatCollectionKennel(req);


    // Рассылаем данные всем подписанным на событие list данной комнаты.
    // await sails.sockets.broadcast('kennel', 'list-kennel', res.collection);

    // Respond with view.
    return exits.success();

  }


};
