module.exports = {

  friendlyName: 'Count all',


  description: 'Количество титулов в системе',

  exits: {
    success: {
      anyData: 'Вы подключились к комнате title и слушаете событие count-all'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The user who makes this request does not have permission to delete this entry.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    },
    badRequest: {
      description: 'Error.',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs,exits) {
    const req = this.req;

    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }

    // Подключить сокет, который сделал запрос, к комнате «user».
    await sails.sockets.join(req, 'title');

    // let count = await User.find();
    let count = await Title.count();

    await sails.sockets.broadcast('title', 'count-title', count);
    // Respond with view.
    return exits.success();

  }


};
