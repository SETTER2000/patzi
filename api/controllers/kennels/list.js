module.exports = {


  friendlyName: 'List',


  description: 'Обрабатывает сокет подключение клиента и отдаёт весь список объектов коллекции.',


  inputs: {},


  exits: {
    success: {
      anyData: 'Вы подключились к комнате kennel и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The kennel who makes this request does not have permission to delete this entry.',
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


    // Have the socket which made the request join the "kennel" room.
    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'kennel');


    // Вызываем помощника сформировать правильно данные для ответа.
    let result = await sails.helpers.formatCollectionKennel(req);


    // Рассылаем данные всем подписанным на событие list данной комнаты.
    await sails.sockets.broadcast('kennel', 'list-kennel',result.collection);


    // Respond with view.
    return exits.success();

  }

};
