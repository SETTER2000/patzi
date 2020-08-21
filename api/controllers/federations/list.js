module.exports = {


  friendlyName: 'List',


  description: 'List federations.',



  exits: {
    success: {
      anyData: 'Вы подключились к комнате federation и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The federation who makes this request does not have permission to delete this entry.',
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
    // Have the socket which made the request join the "federation" room.
    // Подключить сокет, который сделал запрос, к комнате «federation».
    await sails.sockets.join(req, 'federation');

    // Выбираем весь список объектов данной коллекции.
    let federations = await Federation.find()
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
    federations = await sails.helpers.cloudFrontUrl.with({
      collection: federations,
      collectionName: 'federation',
      edits: {
        resize: {}
      }
    });
    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    federations = await sails.helpers.cloudFrontUrl.with({
      collection: federations,
      collectionName: 'federation',
      field:'titleBackground',
      edits: {
        resize: {}
      }
    });


    await federations.map(async (federation) => {
      federation.detail = federation.label ? `/federation/${federation.id}` : '';
      federation.imagesArrUrl = _.pluck(federation.images, 'imageSrc'); // Массив url картинок для просмотра в слайдере
      // federation.cover = federation.imagesArrUrl[0]; // Обложка альбома
      return federation;
    });


    await sails.sockets.broadcast('federation', 'list-federation', federations);
    // Respond with view.
    return exits.success();
  }
};
