module.exports = {


  friendlyName: 'List',


  description: 'Обрабатывает сокет подключение клиента и отдаёт весь список объектов коллекции.',


  exits: {
    success: {
      anyData: 'Вы подключились к комнате dog и слушаете событие list'
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

    // Бибилиотека Node.js
    const url = require('url');
    const moment = require('moment');

    const resizeX = 1424
      , resizeY = 800
      , gravity = 'Center'// NorthWest, North, NorthEast, West, Center, East, SouthWest, South, SouthEast
      , Q = 45 // Качество изображения (100 - 0) http://www.graphicsmagick.org/GraphicsMagick.html#details-compress
    ;
    // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    moment.locale(this.req.me.preferredLocale);

    // Формат отображаемой даты
    let format = 'LL HH:mm';

    // Have the socket which made the request join the "dog" room.
    // Подключить сокет, который сделал запрос, к комнате «dog».
    await sails.sockets.join(req, 'dog');


    // Выбираем весь список объектов данной коллекции.
    let dogs = await Dog.find()
      .sort('createdAt DESC')
      .populate('kennel')
      .populate('children')
      .populate('parents');


    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    dogs = await sails.helpers.cloudFrontUrl.with({
      collection: dogs,
      collectionName:'dog',
      edits: {
        // grayscale: true,
        resize: {
          // fit: 'inside',
          // width: resizeX,
          // height: resizeY
        }
      }
    });

    await dogs.map(async (dog) => {
      dog.kennelName = dog.kennel.label;
      dog.fullName = dog.kennel.right ? `${dog.label} ${dog.kennel.label}` : `${dog.kennel.label} ${dog.label}`;
      dog.detail = dog.fullName ? `/chinese-crested/${dog.fullName.split(" ").join('-')}` : '';
      dog.imagesArrUrl = _.pluck(dog.images, 'imageSrc'); // Массив url картинок для просмотра в слайдере
      dog.cover = dog.imagesArrUrl[0]; // Обложка альбома
       return dog;
    });

    // console.log('ETTT: ', dogs);

    await sails.sockets.broadcast('dog', 'list-dog', dogs);

    // Respond with view.
    return exits.success();

  }


};
