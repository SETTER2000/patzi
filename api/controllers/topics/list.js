module.exports = {


  friendlyName: 'List',


  description: 'List topics.',


  inputs: {

  },


  exits: {
    success: {
      anyData: 'Вы подключились к комнате dog и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The dog who makes this request does not have permission to delete this entry.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    },
    badRequest: {
      description: 'Error.',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs,exits) {
    let req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    // Have the socket which made the request join the "dog" room.
    // Подключить сокет, который сделал запрос, к комнате «topic».
    await sails.sockets.join(req, 'topic');

    // Выбираем весь список объектов данной коллекции.
    let topics = await Topic.find()
        .sort([{labelRu:'DESC'}])
        // .populate('owners')
    ;

    console.log('TOPICS::: ' , topics);
    await sails.sockets.broadcast('topic', 'list-topic', topics);
    // Respond with view.
    return exits.success();

  }


};
