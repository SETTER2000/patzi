module.exports = {


  friendlyName: 'List',


  description: 'Обрабатывает сокет подключение клиента и отдаёт весь список объектов коллекции.',


  inputs: {
    regionId: {
      type: 'string',
      description: 'Идентификатор региона, по которому нужно вернуть города.'
    }
  },


  exits: {
    success: {
      anyData: 'Вы подключились к комнате city и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The city who makes this request does not have permission to delete this entry.',
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


    // Бибилиотека Node.js
    const moment = require('moment');
    let query = (!_.isUndefined(inputs.regionId) && !_.isObject(inputs.regionId)) ? {region: +inputs.regionId} : {region: 0};
    // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    moment.locale(this.req.me.preferredLocale);

    // Have the socket which made the request join the "city" room.
    // Подключить сокет, который сделал запрос, к комнате «city».
    await sails.sockets.join(req, 'city');
// console.log('QUERY::: ' , _.isNaN(query.region));
    // Выбираем весь список объектов данной коллекции.
    let citys =  _.isNaN(query.region) ? [] : await City.find(query);


    // Рассылаем данные всем подписанным на событие list данной комнаты.
    await sails.sockets.broadcast('city', 'list-city', citys);


    // Respond with view.
    return exits.success();

  }


};
