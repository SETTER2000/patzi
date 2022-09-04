module.exports = {
  friendlyName: 'Status',
  description: 'Status users.',
  inputs: {},
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
    if (!req.isSocket) {
      throw 'badRequest';
    }
    await sails.sockets.join(req, 'user');
    let foundUser = await User.findOne(req.me.id).populate('groups');
    let status = _.last(_.pluck(foundUser.groups, 'label'));
    return exits.success();
  }
};
