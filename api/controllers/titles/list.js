module.exports = {


  friendlyName: 'List',


  description: 'List titles.',



  exits: {
    success: {
      anyData: 'Вы подключились к комнате title и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The title who makes this request does not have permission to delete this entry.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    },
    badRequest: {
      description: 'Error.',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {
    let req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    // Have the socket which made the request join the "title" room.
    // Подключить сокет, который сделал запрос, к комнате «title».
    await sails.sockets.join(req, 'title');

    // Выбираем весь список объектов данной коллекции.
    let titles = await Title.find()
      .sort([
        {createdAt: 'DESC'}
      ]);
    // .populate('owners')
    ;

    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    titles = await sails.helpers.cloudFrontUrl.with({
      collection: titles,
      collectionName: 'title',
      edits: {
        resize: {}
      }
    });
    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    titles = await sails.helpers.cloudFrontUrl.with({
      collection: titles,
      collectionName: 'title',
      field:'titleBackground',
      edits: {
        resize: {}
      }
    });


    await titles.map(async (title) => {
      title.detail = title.label ? `/title/${title.id}` : '';
      title.imagesArrUrl = _.pluck(title.images, 'imageSrc'); // Массив url картинок для просмотра в слайдере
      // title.cover = title.imagesArrUrl[0]; // Обложка альбома
      return title;
    });


    await sails.sockets.broadcast('title', 'list-title', titles);
    // Respond with view.
    return exits.success();
  }
};
