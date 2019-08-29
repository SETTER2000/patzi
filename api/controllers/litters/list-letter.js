module.exports = {


  friendlyName: 'List  letter',


  description: 'Отдаёт массив буковок помётов',


  inputs: {},


  exits: {
    success: {
      anyData: 'Вы подключились к комнате litter и слушаете событие list-sire'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The litter who makes this request does not have permission to delete this entry.',
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
    // const moment = require('moment');
    //
    // // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    // moment.locale(this.req.me.preferredLocale);
    // // Формат отображаемой даты
    // let format = 'LL HH:mm';

    // Have the socket which made the request join the "litter" room.
    // Подключить сокет, который сделал запрос, к комнате «litter».
    await sails.sockets.join(req, 'litter');


    // Выбираем все помёты, сортируя по полю letter
    let litters = await Litter.find().sort('letter ASC');

    let letters = [];
    // Определяем расположение названия питомника относительно имя собаки
    // и формируем динамически новое свойство value для элемента select
    _.each(litters, (litter) => {
      // letters.push({link:`/litters/litter/${litter.id}`, letter:litter.letter});
      letters.push({link:`/litter/${litter.letter}/${litter.year}/photo`, letter:litter.letter});
    });


    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('litter', 'list-letter', letters);

    // Respond with view.
    return exits.success();

  }


};
