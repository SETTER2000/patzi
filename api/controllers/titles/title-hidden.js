module.exports = {


  friendlyName: 'Title hidden',


  description: 'Количество титулов скрытых в системе',

  inputs: {

  },


  exits: {
    success: {
      anyData: 'Вы подключились к комнате title и слушаете событие is-hidden'
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
    let hidden = await Title.find({'see':false});
    await sails.sockets.broadcast('title', 'title-hidden', hidden.length);
    // Respond with view.
    return exits.success();

  }


};
