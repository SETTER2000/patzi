module.exports = {


  friendlyName: 'Is owner',


  description: 'Проверяет на соответствие к группе owner',

  inputs: {},

  exits: {
    success: {
      anyData: 'Вы подключились к комнате group и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
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

    if (!await sails.helpers.groupBy.with({group: 'owner', me: req.me})) {
      throw 'notFound';
    }

    return exits.success();
  }


};
