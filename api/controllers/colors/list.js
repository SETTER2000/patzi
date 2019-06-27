module.exports = {


  friendlyName: 'List',


  description: 'Обрабатывает сокет подключение клиента и отдаёт весь список объектов коллекции.',


  inputs: {

  },


  exits: {
    success: {
      anyData: 'Вы подключились к комнате color и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The color who makes this request does not have permission to delete this entry.',
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

    // Бибилиотека Node.js
    const url = require('url');
    const moment = require('moment');

    // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    moment.locale(this.req.me.preferredLocale);
    let data={colors:[]};


    // Have the socket which made the request join the "color" room.
    // Подключить сокет, который сделал запрос, к комнате «color».
    await sails.sockets.join(req, 'color');

    data.colors = await Color.find().sort('value DESC').limit(2000);
    // Рассылаем данные всем подписанным на событие list данной комнаты.
    sails.sockets.broadcast('color', 'list-color', data);


    // Respond with view.
    return exits.success();


  }


};
