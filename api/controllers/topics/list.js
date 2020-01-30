module.exports = {


  friendlyName: 'List',


  description: 'List topics.',


  inputs: {},


  exits: {
    success: {
      anyData: 'Вы подключились к комнате topic и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The topic who makes this request does not have permission to delete this entry.',
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
    // Have the socket which made the request join the "topic" room.
    // Подключить сокет, который сделал запрос, к комнате «topic».
    await sails.sockets.join(req, 'topic');

    // Выбираем весь список объектов данной коллекции.
    let topics = await Topic.find()
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
    topics = await sails.helpers.cloudFrontUrl.with({
      collection: topics,
      collectionName: 'topic',
      edits: {
        resize: {}
      }
    });
    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    topics = await sails.helpers.cloudFrontUrl.with({
      collection: topics,
      collectionName: 'topic',
      field:'topicBackground',
      edits: {
        resize: {}
      }
    });


    await topics.map(async (topic) => {
      topic.detail = topic.label ? `/topic/${topic.id}` : '';
      topic.imagesArrUrl = _.pluck(topic.images, 'imageSrc'); // Массив url картинок для просмотра в слайдере
      // topic.cover = topic.imagesArrUrl[0]; // Обложка альбома
      return topic;
    });


    await sails.sockets.broadcast('topic', 'list-topic', topics);
    // Respond with view.
    return exits.success();

  }


};
