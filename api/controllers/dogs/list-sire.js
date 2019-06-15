module.exports = {


  friendlyName: 'List sire',


  description: 'Обрабатывает сокет подключение клиента и отдаёт весь список объектов коллекции.',



  exits: {
    success: {
      anyData: 'Вы подключились к комнате dog и слушаете событие list-sire'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The dog who makes this request does not have permission to delete this entry.',
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
    const moment = require('moment');

    // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    moment.locale(this.req.me.preferredLocale);
    // Формат отображаемой даты
    let format = 'LL HH:mm';

    // Have the socket which made the request join the "dog" room.
    // Подключить сокет, который сделал запрос, к комнате «dog».
    await sails.sockets.join(req, 'dog');


    // Выбираем всех собак согласно гендорному признаку
    let sires = await Dog.find({gender: 'sire'}).populate('kennel').populate('images');

    // Определяем расположение названия питомника относительно имя собаки
    // и формируем динамически новое свойство value для элемента select
    _.each(sires, (sire) => {
      sire.value = (sire.kennel.rightName) ? `${sire.kennel.label} ${sire.label}` :
        `${sire.label} ${sire.kennel.label}`;
    });

    console.log('СИРЕСССС', sires);
    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('dog', 'list-sire', sires);

    // Respond with view.
    return exits.success();

  }


};
