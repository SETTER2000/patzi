module.exports = {


  friendlyName: 'List',


  description: 'Обрабатывает сокет подключение клиента и отдаёт весь список объектов коллекции.',


  inputs: {},


  exits: {
    success: {
      anyData: 'Вы подключились к комнате country и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The country who makes this request does not have permission to delete this entry.',
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
    let data = {countrys: []};
    // Бибилиотека Node.js
    const url = require('url');
    const moment = require('moment');

    // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    moment.locale(this.req.me.preferredLocale);


    // Формат отображаемой даты
    let format = 'LL HH:mm';

    // Have the socket which made the request join the "country" room.
    // Подключить сокет, который сделал запрос, к комнате «country».
    await sails.sockets.join(req, 'country');

    // Выбираем весь список объектов данной коллекции.
    data.countrys = await Country.find().sort('label ASC').populate('regions', {limit: 1500});

    /**
     * Здесь будем превращать поток байт в нормальное изображение для frontend
     * исключая некоторые данные не нужные для страницы.
     * Есть пару способов сделать это.
     * 1. В цикле
     * 2. С библиотекой Lodash
     */
    // _.each(countrys, (country) => {
    // Устанавливаем свойство источника изображения
    // Первый аргумент, базовый url
    // country.imageSrc = country.imageUploadFD ? url.resolve(sails.config.custom.baseUrl, `/api/v1/countrys/${country.id}`) : '';

    // Столбец: Дата регистрации. Форматировано, согласно языку для представления.
    // country.createdAtFormat = moment(country.createdAt).format(format);

    // Столбец: Дата регистрации. Формат фильтра.
    // country.createdAtFormatFilter = moment(country.createdAt).format(format);

    // Удаляем файловый дескриптор
    // delete country.imageUploadFD;

    // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию и т.д....
    // delete country.imageUploadMime;
    // });


    // Рассылаем данные всем подписанным на событие list данной комнаты.
    sails.sockets.broadcast('country', 'list-country', data);


    // Respond with view.
    return exits.success();


  }
};
