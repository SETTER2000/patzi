module.exports = {
  friendlyName: 'List',
  description: 'List posts.',
  inputs: {
    num: {
      type: 'number',
      description: `Кол-во постов выдаваемых по запросу.`
    },
  },
  exits: {
    success: {
      anyData: 'Вы подключились к комнате post и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The post who makes this request does not have permission to delete this entry.',
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
    // Have the socket which made the request join the "post" room.
    // Подключить сокет, который сделал запрос, к комнате «post».
    await sails.sockets.join(req, 'post');
    // Выбираем весь список объектов данной коллекции.
    let posts = await Post.find({see:true})
      .populate('experts')
      .sort([
        {rootPage: 'DESC'},
        {dateEvent: 'DESC'}
      ]);
    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    posts = await sails.helpers.cloudFrontUrl.with({
      collection: posts,
      collectionName: 'post',
      edits: {
        resize: {}
      }
    });
    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    posts = await sails.helpers.cloudFrontUrl.with({
      collection: posts,
      collectionName: 'post',
      field: 'postBackground',
      edits: {
        resize: {}
      }
    });
    await posts.map(async (post) => {
      post.detail = post.label ? `/post/${post.id}` : '';
      post.imagesArrUrl = _.pluck(post.images, 'imageSrc'); // Массив url картинок для просмотра в слайдере
      // post.cover = post.imagesArrUrl[0]; // Обложка альбома
      return post;
    });
    await sails.sockets.broadcast('post', 'list-post', posts);
    return exits.success();

  }


};
