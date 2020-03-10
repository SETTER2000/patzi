module.exports = {


  friendlyName: 'First topic',


  description: '',


  inputs: {
    id: {
      type: 'string',
      description: `Идентификатор темы, которая должна выводиться первой в списке.`
    },
  },


  exits: {
    notFound: {
      description: 'Не существует такого объекта с таким ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    }
  },


  fn: async function (inputs, exits) {
    const req = this.req;

    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    // Have the socket which made the request join the "topic" room.
    // Подключить сокет, который сделал запрос, к комнате «topic».
    await sails.sockets.join(req, 'topic');

    let topic = await Topic.update({}).set({'firstTopic': false});
    topic = await Topic.updateOne({id: inputs.id}).set({'firstTopic': true});
    if (!topic) {
      throw 'notFound';
    }

    // Respond with view.
    return exits.success();
  }


};
