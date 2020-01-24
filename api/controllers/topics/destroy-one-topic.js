module.exports = {


  friendlyName: 'Destroy one topic',


  description: `Удалить одну собаку. При удалении собаки все объекты связанные с ней, 
  кроме родительского т.е Kennel, не должны быть затронуты ошибкой рассинхронизации данных. Так как 
  они имеют тип документов и содержат данные о собаки, а не ссылки на данный объект.`,


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
    //   description: 'Cannot be deleted! You have associated files: topic.',
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
    let topic = await Topic.findOne({
      id: inputs.id
    });
    //
    if (!topic) {
      throw 'notFound';
    }

    // if (topic.owner !== this.req.me.id && !this.req.me.isSuperAdmin) {
    //   throw 'forbidden';
    // }


    // await Topic.findOne({id: inputs.id});
    //
    await Topic.destroy({id: inputs.id});


    // Remove photos
    let removeImage = (_.isArray(topic.images) && topic.images.length > 0 ) ? topic.images : [];
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
