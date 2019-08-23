module.exports = {


  friendlyName: 'Update ratio',


  description: 'Массив содержит все голосования пользователя.',


  inputs: {
    ratios: {
      type: 'ref',
      example: [{litter: [1, 2, 5]}, {dog: [4, 3, 5]}],
      description: 'Массив голосований'
    },
  },

  exits: {
    success: {
      anyData: 'Вы подключились к комнате user и слушаете событие list'
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


  fn: async function (inputs, exits) {
    const req = this.req;

    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }

    await sails.sockets.join(req, 'user');


    data = {ratio: inputs.ratios};

    await User.updateOne({id: req.me.id}).set(data);


    let user = await User.findOne({id: req.me.id});

    console.log('USER return ratio update: ', user.ratio);

    await sails.sockets.broadcast('user', 'user-ratio', user.ratio);

    return exits.success();
  }
};
