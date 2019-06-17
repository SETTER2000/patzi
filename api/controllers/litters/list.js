module.exports = {


  friendlyName: 'List',

  description: 'Обрабатывает сокет подключение клиента и отдаёт весь список объектов коллекции.',



  exits: {
    success: {
      anyData: 'Вы подключились к комнате litter и слушаете событие list'
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

    // Бибилиотека Node.js
    const url = require('url');
    const moment = require('moment');

    // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    moment.locale(this.req.me.preferredLocale);

    // Формат отображаемой даты
    let format = 'LL HH:mm';

    // Have the socket which made the request join the "litter" room.
    // Подключить сокет, который сделал запрос, к комнате «litter».
    await sails.sockets.join(req, 'litter');


    // Выбираем весь список объектов данной коллекции.
    let litters = await Litter.find()
      .populate('dogs')
      .populate('owner')
      .populate('images');

    let kennels = '';

    _.each(litters, (litter) => {
      // Устанавливаем свойство источника изображения
      // Первый аргумент, базовый url
      //  litter.imageSrc = litter.imageUploadFD ? url.resolve(sails.config.custom.baseUrl, `/api/v1/litters/${litter.id}`) : '';

      // Столбец: Дата регистрации. Форматировано, согласно языку для представления.
      litter.createdAtFormat = moment(litter.createdAt).format(format);

      // Столбец: Дата регистрации. Формат фильтра.
      litter.createdAtFormatFilter = moment(litter.createdAt).format(format);
      // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве
      // [{id: ..., fullName: ...,},{id: ..., fullName: ...,},{id: ..., fullName: ...,}]
      litter.groups = _.pluck(litter.groups, 'id'); // friendIds: [id,id,id...]

    });

    await sails.sockets.broadcast('litter', 'list-litter', litters);

    // Respond with view.
    return exits.success();

  }

};
