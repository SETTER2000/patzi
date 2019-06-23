module.exports = {


  friendlyName: 'List',


  description: 'Обрабатывает сокет подключение клиента и отдаёт весь список объектов коллекции.',


  inputs: {

  },


  exits: {
    success: {
      anyData: 'Вы подключились к комнате region и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The region who makes this request does not have permission to delete this entry.',
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
    let data={regions:[]};
    // Формат отображаемой даты
    // let format = 'LL HH:mm';

    // Have the socket which made the request join the "region" room.
    // Подключить сокет, который сделал запрос, к комнате «region».
    await sails.sockets.join(req, 'region');

    // Выбираем весь список объектов данной коллекции.
    /**
     * Здесь будем превращать поток байт в нормальное изображение для frontend
     * исключая некоторые данные не нужные для страницы.
     * Есть пару способов сделать это.
     * 1. В цикле
     * 2. С библиотекой Lodash
     */
    // _.each(regions, (region) => {
    // Устанавливаем свойство источника изображения
    // Первый аргумент, базовый url
    // region.imageSrc = region.imageUploadFD ? url.resolve(sails.config.custom.baseUrl, `/api/v1/regions/${region.id}`) : '';

    // Столбец: Дата регистрации. Форматировано, согласно языку для представления.
    // region.createdAtFormat = moment(region.createdAt).format(format);

    // Столбец: Дата регистрации. Формат фильтра.
    // region.createdAtFormatFilter = moment(region.createdAt).format(format);

    // Удаляем файловый дескриптор
    // delete region.imageUploadFD;

    // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию и т.д....
    // delete region.imageUploadMime;
    // });
    data.regions = await Region.find().sort('label ASC').populate('citys', {limit: 2000});
    // Рассылаем данные всем подписанным на событие list данной комнаты.
    sails.sockets.broadcast('region', 'list-region', data);


    // Respond with view.
    return exits.success();


  }

};
