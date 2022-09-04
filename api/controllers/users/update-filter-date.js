module.exports = {
  friendlyName: 'Update filter date',
  description: '',
  inputs: {
    count: {
      type: 'number',
      description: 'Кол-во отдаваемых объектов.'
    },
    query: {
      type: 'ref',
      description: 'Дата по которой следует отыскать всех пользователей.'
    }
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
    let format = 'LL HH:mm';
    let data = {};
    const url = require('url');
    const moment = require('moment');
    moment.locale(this.req.me.preferredLocale);
    await sails.sockets.join(req, 'user');
    inputs.count = inputs.count < 1 ? 5 : inputs.count;
    inputs.query = (_.isArray(inputs.query)) ?  _.uniq(inputs.query) : inputs.query;
    inputs.query = (_.isArray(inputs.query) && inputs.query.length < 1) ? {} :
      (_.isArray(inputs.query)) ? {or: inputs.query} :
        _.get(inputs, 'query') ? {'createdAt': {contains: inputs.query}} : {};
    inputs.query = {
     createdAt: {'>=': 1559134560000}
    };
    let users = await User.find();
    await sails.sockets.broadcast('user', 'list', users);
  }
};
