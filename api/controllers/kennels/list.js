module.exports = {


  friendlyName: 'List',



  description: 'Обрабатывает сокет подключение клиента и отдаёт весь список объектов коллекции.',


  inputs: {

  },


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

    // Формат отображаемой даты
    let format = 'LL HH:mm';

    // Have the socket which made the request join the "kennel" room.
    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'kennel');

    // Выбираем весь список объектов данной коллекции.
    let kennels = await Kennel.find().populate('country').populate('region').sort('label');

    _.each(kennels, (kennel) => {
      // Устанавливаем свойство источника изображения
      // Первый аргумент, базовый url
      kennel.imageSrc = kennel.imageUploadFD ? url.resolve(sails.config.custom.baseUrl, `/api/v1/kennels/${kennel.id}`) : '';

      // Столбец: Дата регистрации. Форматировано, согласно языку для представления.
      kennel.createdAtFormat = moment(kennel.createdAt).format(format);

      // Столбец: Дата регистрации. Формат фильтра.
      kennel.createdAtFormatFilter = moment(kennel.createdAt).format(format);
      // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве
      // [{id: ..., fullName: ...,},{id: ..., fullName: ...,},{id: ..., fullName: ...,}]
      kennel.groups = _.pluck(kennel.groups, 'id'); // friendIds: [id,id,id...]

      // Удаляем файловый дескриптор
      delete kennel.imageUploadFD;
      // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию и т.д....
      delete kennel.imageUploadMime;
    });





    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('kennel', 'list-kennel', kennels);


    // Respond with view.
    return exits.success();

  }


};
