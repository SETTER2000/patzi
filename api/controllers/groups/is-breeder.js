module.exports = {


  friendlyName: 'Is breeder',


  description: 'Проверяет на соответствие к группе breeder',

  inputs: {},

  exits: {
    success: {
      anyData: 'Вы подключились к комнате group и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The group who makes this request does not have permission to delete this entry.',
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
// Подключить сокет, который сделал запрос, к комнате «group».
    await sails.sockets.join(req, 'group');
    let groups = await Group.findOne({label: 'breeder'}).populate('users');
    console.log('req.me.id:::: ', req.me.id);
    console.log('PLUCK^^^', _.find(groups.users, {fullName: req.me.fullName, id: req.me.id}));
    if (!groups) {
      throw 'badRequest';
    }

    if (!_.find(groups.users, {fullName: req.me.fullName, id: req.me.id})) {
      throw 'notFound';
    }

    // await sails.sockets.broadcast('group', 'group-breeder', groups);
    // Respond with view.
    return exits.success();
  }


};
