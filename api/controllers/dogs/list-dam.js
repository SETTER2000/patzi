module.exports = {


  friendlyName: 'List dam',


  description: 'Обрабатывает сокет подключение клиента и отдаёт весь список объектов коллекции.',




  exits: {
    success: {
      anyData: 'Вы подключились к комнате dog и слушаете событие list-dam'
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
    let dams = await Dog.find({gender: 'dam'}).populate('kennel').populate('images');
    // Определяем расположение названия питомника относительно имя собаки
    // и формируем динамически новое свойство value для элемента select
    _.each(dams, (dam) => {
      dam.value = (dam.kennel.rightName) ? `${dam.kennel.label} ${dam.label}` :
        `${dam.label} ${dam.kennel.label}`;
    });

    await sails.sockets.broadcast('dog', 'list-dam', dams);


    // Respond with view.
    return exits.success();

  }


};
