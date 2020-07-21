module.exports = {


  friendlyName: 'Destroy one breeder',


  description: `Отвязать заводчика от питомника. По сути удалить ID из свойства breeder.`,


  inputs: {
    id: {
      type: 'string',
      required: true,
      description: 'Идентификатор питомника от которого нужно отвязать заводчика (владельца)'
    }
  },


  exits: {
    success: {
      description: 'Password successfully updated, and requesting user agent is now logged in.'
    },
    notFound: {
      description: 'Не существует такого объекта с таким ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The user making this request does\'t have the permissions to delete this kennel.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    },
    //
    badRequest: {
      description: 'Cannot be  deleted breeder! ',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {
    const req = this.req;
    if (!req.isSocket) {
      throw 'forbidden';
    }
// Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'kennel');

    let kennel = await Kennel.findOne({id: inputs.id});
    if (!kennel) {
      throw 'notFound';
    }



    await Kennel.updateOne({id: inputs.id}).set({breeder: null});


    // Вызываем помощника сформировать правильно данные для ответа.
    let res = await sails.helpers.formatCollectionKennel(req);


    // Рассылаем данные всем подписанным на событие list данной комнаты.
    await sails.sockets.broadcast('kennel', 'list-kennel', res.collection);

    // Respond with view.
    return exits.success();
  }
};
