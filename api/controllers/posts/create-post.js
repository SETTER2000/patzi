module.exports = {


  friendlyName: 'Create post',


  description: 'Создать пост для блога',


  inputs: {
    label: {
      type: 'string',
      required: true,
      description: `Официальное имя поста на английском. Поле обязательно для заполнения.`
    },
    topicId: {
      type: 'string',
      required: true,
      description: `Идентификатор поста.`
    },

    labelRu: {
      type: 'string',
      required: true,
      description: `Официальное имя поста на русском. Поле обязательно для заполнения.`
    },

    fileList: {
      type: 'ref',
      description: 'Массив с файлами данных о загруженных файлах.'
    },

    postBackground: {
      type: 'ref',
      description: 'Объект файла данных о загруженном файле. Фон поста.'
    },

    subtitle: {
      type: 'string',
      description: 'Дополнительная информация. Описание поста на английском языке.',
      maxLength: 700
    },

    backgroundPosition: {
      type: 'string',
      description: 'Дополнительная информация. Описание поста на английском языке.',
      maxLength: 30
    },

    subtitleRu: {
      type: 'string',
      description: 'Дополнительная информация. Описание поста на русском языке.',
      maxLength: 700
    },
    see: {
      type: 'boolean',
      description: `Флаг видимости поста. Видна или нет. По умолчанию видна.`
    },
  },


  exits: {
    success: {
      outputDescription: 'Information about the newly created record.',
      // Устанавливаем выходной тип данных. Хорошая практика для документирования кода.
      outputType: {
        id: 'number',
        imageSrc: 'string'
      },
    },
    badRequest: {
      description: 'No image upload was provided.',
      responseType: 'badRequest'
    },

    alreadyInUse: {
      statusCode: 409,
      description: 'The specified post is already in use.',
    },

    alreadyInUseRU: {
      statusCode: 409,
      description: 'Указанное имя поста уже используется.',
    },

  },


  fn: async function (inputs, exits) {
    let req = this.req;
    const moment = require('moment');
    moment.locale('en');
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    let images = [];
    let postBackground = [];
    // Have the socket which made the request join the "dog" room.
    // Подключить сокет, который сделал запрос, к комнате «post».
    await sails.sockets.join(req, 'post');

    // Проверяем есть ли фото
    if (inputs.fileList) {
      images = await inputs.fileList.filter(o => !_.isNull(o));
      await _.each(images, img => {
        console.log('FDDDk:::', img);
        img.id = _.first(_.last(img.fd.split('\\')).split('.'));
        img.description = '';
        img.dateTaken = '';
        delete img.filename;
        delete img.status;
        delete img.field;
      });
    }
    // Проверяем есть файлы для фона
    if (inputs.postBackground) {
      postBackground = await inputs.postBackground.filter(o => !_.isNull(o));
      await _.each(images, img => {
        console.log('ВФЫЫ:::', img);
        img.id = _.first(_.last(img.fd.split('\\')).split('.'));
        img.description = '';
        img.dateTaken = '';
        delete img.filename;
        delete img.status;
        delete img.field;
      });
    }
    // Проверка существования такой же поста.
    let conflicting = await Post.findOne({labelRu: inputs.labelRu});
    if (conflicting) {
      throw (req.me.preferredLocale === 'ru') ? 'alreadyInUseRU' : 'alreadyInUse';
    }

    let newPost = await Post.create({
      label: inputs.label,
      labelRu: inputs.labelRu,
      images: images,
      postBackground: postBackground,
      subtitle: inputs.subtitle,
      backgroundPosition: inputs.backgroundPosition,
      subtitleRu: inputs.subtitleRu,
      see: inputs.see
    }).fetch();
    console.log('[newPost.id]', newPost);
    if (!newPost) {
      throw 'badRequest';
    }

    await Topic.addToCollection(inputs.topicId, 'posts').members([newPost.id]);

    // Выбираем весь список объектов данной коллекции.
    let posts = await Post.find()
        .sort([{labelRu: 'DESC'}])
      // .populate('owners')
    ;

    await sails.sockets.broadcast('post', 'list-post');
    // Respond with view.
    return exits.success();

  }


};
