module.exports = {
  friendlyName: 'List expert',
  description: 'Выдаёт экспертов по запросу',
  inputs: {
    count: {
      type: 'number',
      description: 'Кол-во отдаваемых объектов.'
    },
    query: {
      type: 'ref',
      description: 'Строка, которую пытаемся найти в fullName.'
    },
  },
  exits: {
    success: {
      anyData: 'Вы подключились к комнате user и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound'
    },
    forbidden: {
      description: 'The user who makes this request does not have permission to delete this entry.',
      responseType: 'forbidden'
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
    // Подключить сокет, который сделал запрос, к комнате «user».
    await sails.sockets.join(req, 'user');
    let data = await sails.helpers.listUser.with({
      query: inputs.query,
      groups:['expert'],
      preferredLocale: req.me.preferredLocale,
    });
    await sails.sockets.broadcast('user', 'list-expert', data);
    return exits.success();
  }
};
