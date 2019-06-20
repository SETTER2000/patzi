module.exports = {


  friendlyName: 'List',


  description: 'Обрабатывает сокет подключение клиента и отдаёт весь список объектов коллекции.',


  inputs: {
    countryId: {
      type: 'string',
      description: 'Идентификатор страны, по которой нужно вернуть города.'
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
    const url = require('url');
    const moment = require('moment');
    let query = (inputs.countryId) ? {region: inputs.countryId} : {};
    // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    moment.locale(this.req.me.preferredLocale);

    // Формат отображаемой даты
    // let format = 'LL HH:mm';

    // Have the socket which made the request join the "city" room.
    // Подключить сокет, который сделал запрос, к комнате «city».
    await sails.sockets.join(req, 'city');

    // Выбираем весь список объектов данной коллекции.
    let citys = await City.find(query);

    _.each(citys, (city) => {
      // Устанавливаем свойство источника изображения
      // Первый аргумент, базовый url
      // city.imageSrc = city.imageUploadFD ? url.resolve(sails.config.custom.baseUrl, `/api/v1/citys/${city.id}`) : '';

      // Столбец: Дата регистрации. Форматировано, согласно языку для представления.
      // city.createdAtFormat = moment(city.createdAt).format(format);
      //
      // // Столбец: Дата регистрации. Формат фильтра.
      // city.createdAtFormatFilter = moment(city.createdAt).format(format);
      // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве
      // [{id: ..., fullName: ...,},{id: ..., fullName: ...,},{id: ..., fullName: ...,}]
      // city.groups = _.pluck(city.groups, 'id'); // friendIds: [id,id,id...]

      // Удаляем файловый дескриптор
      // delete city.imageUploadFD;

      // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию и т.д....
      // delete city.imageUploadMime;
    });


    // Рассылаем данные всем подписанным на событие list данной комнаты.
    await sails.sockets.broadcast('city', 'list-city', citys);


    // Respond with view.
    return exits.success();

  }


};
