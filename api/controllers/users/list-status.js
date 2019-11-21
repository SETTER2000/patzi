module.exports = {


  friendlyName: 'Status',


  description: 'Status users.',


  inputs: {

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


    // // Бибилиотека Node.js
    // const url = require('url');
    // const moment = require('moment');
    // // Устанавливаем для пользователя его локаль. Для соответствующего отображения даты.
    // moment.locale(this.req.me.preferredLocale);

    // Have the socket which made the request join the "user" room.
    // Подключить сокет, который сделал запрос, к комнате «user».
    await sails.sockets.join(req, 'user');


    let foundUser = await User.findOne(req.me).populate('groups');


   let  status = _.last(_.pluck(foundUser.groups, 'label'));

   console.log('STATUS: ', status);

    // await sails.sockets.broadcast('user', 'list-status', status);
    // Respond with view.
    return exits.success();
  }


};
