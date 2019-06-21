module.exports = {


  friendlyName: 'List',


  description: 'Обрабатывает сокет подключение клиента и отдаёт весь список объектов коллекции.',


  inputs: {

  },


  exits: {
    success: {
      anyData: 'Вы подключились к комнате continent и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The continent who makes this request does not have permission to delete this entry.',
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

    let data={continents:[]};
    // Бибилиотека Node.js
    const url = require('url');
    const moment = require('moment');

    // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    moment.locale(this.req.me.preferredLocale);

    // Формат отображаемой даты
    let format = 'LL HH:mm';

    // Have the socket which made the request join the "continent" room.
    // Подключить сокет, который сделал запрос, к комнате «continent».
    await sails.sockets.join(req, 'continent');

    // Выбираем весь список объектов данной коллекции.
    let continents = await Continent.find().populate('countrys').sort('label ASC');
    // По какому полю делать сортировку городов, зависит от языка
    let sort = (this.req.me.preferredLocale === 'ru')? 'labelRu' : 'value';
    // let continents = await Continent.find().populate('countrys');

    // let ken = '';
    // await Continent.stream()
    //   .sort('label ASC')
    //   .populate('countrys', {
    //     sort: 'label ASC'
    //   })
    //   .eachRecord(async (records)=>{
    //     ken++;
    //   });

    /**
     * Здесь будем превращать поток байт в нормальное изображение для frontend
     * исключая некоторые данные не нужные для страницы.
     * Есть пару способов сделать это.
     * 1. В цикле
     * 2. С библиотекой Lodash
     */
    // _.each(continents, (continent) => {
    //   // Устанавливаем свойство источника изображения
    //   // Первый аргумент, базовый url
    //   // continent.imageSrc = continent.imageUploadFD ? url.resolve(sails.config.custom.baseUrl, `/api/v1/continents/${continent.id}`) : '';
    //
    //   // Столбец: Дата регистрации. Форматировано, согласно языку для представления.
    //   // continent.createdAtFormat = moment(continent.createdAt).format(format);
    //   //
    //   // // Столбец: Дата регистрации. Формат фильтра.
    //   // continent.createdAtFormatFilter = moment(continent.createdAt).format(format);
    //
    //   // Удаляем файловый дескриптор
    //   delete continent.imageUploadFD;
    //
    //   // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию и т.д....
    //   delete continent.imageUploadMime;
    // });
    data.continents = continents;

    // Рассылаем данные всем подписанным на событие list данной комнаты.
    await sails.sockets.broadcast('continent', 'list-continent', data);


    // Respond with view.
    return exits.success();


  }
};
