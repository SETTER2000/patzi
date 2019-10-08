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
    let format = 'LL';

    // Have the socket which made the request join the "litter" room.
    // Подключить сокет, который сделал запрос, к комнате «litter».
    await sails.sockets.join(req, 'litter');


    // Выбираем весь список объектов данной коллекции.
    let litters = await Litter.find()
      .limit(1000)
      .sort('born DESC')
      .populate('owner');

    await _.each(litters, async (litter) => {
      litter.bornNt = moment.parseZone(litter.born).format(format);
      // litter.bornNt = moment.unix(litter.born).format(format);
      // litter.bornNt = moment(litter.born).format(format);
      litter.ownerFullName = litter.owner.fullName;
      delete litter.createdAt;
      delete litter.updatedAt;
      delete litter.owner;
    });



    // Формируем массив с картинками
    let litterId;
    await _.each(litters, async (litter) => {
      litterId = litter.id;
      litter.images = (!_.isEmpty(litter.images)) ? await litter.images.map((img, i) => {
        // img.imageSrc = img.fd ? url.resolve(sails.config.custom.baseUrl, `/download/litter/${litterId}/images/${i}`) : '';
        img.detail = `/litter/${litter.letter}/${litter.year}/photo`;
        // delete img.fd;
        return img;
      }) : '';

      // litter.puppies = (!_.isEmpty(litter.puppies)) ? await litter.puppies.map((img, i) => {
      //   // img.imageSrc = img.fd ? url.resolve(sails.config.custom.baseUrl, `/download/litter/${litterId}/puppies/${i}`) : '';
      //   img.detail = `/litter/${litter.letter}/${litter.year}/photo`;
      //   // delete img.fd;
      //   return img;
      // }) : '';
    });


    await litters.map(async (litter) => {
      litter.kennelName = litter.damKennelId ? await sails.helpers.fullNameKennel(litter.damKennelId) : '';
      return litter;
    });


    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    litters = await sails.helpers.cloudFrontUrl.with({
      collection: litters,
      collectionName: 'litter',
      // Этот объект обязателен, хотя может быть и пустой.
      edits: {
        // grayscale: true,
        /*    resize: {
              width: resizeX,
              height: resizeY
            }*/
      }
    });

    if (!litters) {
      throw 'badRequest';
    }


    await sails.sockets.broadcast('litter', 'list-litter', litters);
    return exits.success();
  }
};
