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

    let littersNew = [];


    await _.each(litters, async (litter) => {
      // litter.images = litter.images[0].img;
      const {dogs, images, description, cover, letter, id} = litter;
      const {img} = !_.isEmpty(images[0]) ? images[0] : '';
      // img = !_.isEmpty(img) ? img : {imageSrc:''};

      littersNew.push({dogs, images: img, description, id, cover, letter, owner: litter.owner.fullName});
      // let i = 0;
      // await  _.each(litter.images[0].img, (img) => {
      //   // console.log('IMG_FD', img.fd);
      //   img.imageSrc = img.fd ? url.resolve(sails.config.custom.baseUrl, `/api/v1/files/download/litter/${litter.id}/${i = i + 1}`) : '';
      //   console.log('img.imageSrc:::: ', img.imageSrc);
      // });
      // Устанавливаем свойство источника изображения
      // Первый аргумент, базовый url
      //  litter.imageSrc = litter.imageUploadFD ? url.resolve(sails.config.custom.baseUrl, `/api/v1/litters/${litter.id}`) : '';

      // Столбец: Дата регистрации. Форматировано, согласно языку для представления.
      // litter.createdAtFormat = moment(litter.createdAt).format(format);

      // Столбец: Дата регистрации. Формат фильтра.
      //litter.createdAtFormatFilter = moment(litter.createdAt).format(format);
      // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве
      // [{id: ..., fullName: ...,},{id: ..., fullName: ...,},{id: ..., fullName: ...,}]
      // litter.groups = _.pluck(litter.groups, 'id'); // friendIds: [id,id,id...]

    });


    // Формируем массив с картинками
    let litterId;
    _.each(littersNew, async (litter) => {
      litterId = litter.id;
      litter.images = (!_.isEmpty(litter.images))? await litter.images.map((img, i) => {
        img.imageSrc = img.fd ? url.resolve(sails.config.custom.baseUrl, `/api/v1/files/download/litter/${litterId}/${i}`) : '';
        img.detail = `/litters/litter/${litterId}`;
        return img;
      }): '';
      // litter.images.push({imageSrc:'https://via.placeholder.com/150.png'});
    });
    // console.log('litters:::: ', litters);
    console.log('littersNew:::: ', littersNew);

    await sails.sockets.broadcast('litter', 'list-litter', littersNew);

    // Respond with view.
    return exits.success();

  }

};
