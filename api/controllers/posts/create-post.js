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
    dateEvent: {
      type: 'string',
      required: true,
      description: 'Дата события.'
    },
    fileList: {
      type: 'ref',
      description: 'Массив с файлами данных о загруженных файлах.'
    },
    experts: {
      type: 'ref',
      description: 'Коллекция экспертов.'
    },
    postBackground: {
      type: 'ref',
      description: 'Объект файла данных о загруженном файле. Фон поста.'
    },
    subtitle: {
      type: 'string',
      description: 'Дополнительная информация. Описание поста на английском языке.',
      maxLength: 2000
    },
    backgroundPosition: {
      type: 'string',
      description: 'Дополнительная информация. Описание поста на английском языке.',
      maxLength: 30
    },
    subtitleRu: {
      type: 'string',
      description: 'Дополнительная информация. Описание поста на русском языке.',
      maxLength: 2000
    },
    see: {
      type: 'boolean',
      description: `Флаг видимости поста. Виден или нет. По умолчанию виден.`
    },
    rootPage: {
      type: 'boolean',
      description: `Флаг видимости поста на главной. Виден или нет. По умолчанию не виден.`
    },

    // https://www.youtube.com/embed/oH6XUwNL8-U?mute=0&amp;showinfo=0&amp;controls=0&amp;start=0"

    videoUrl: {
      type: 'string',
      example: 'https://youtu.be/TUar0_aUWq8',
      description: 'Часть url ролика c youtube.',
      maxLength: 700
    },
    videoShowinfo: {
      type: 'number',
      defaultsTo: 0,
      description: `Настройка для видео линка youtube.`
    },
    videoStart: {
      type: 'number',
      defaultsTo: 0,
      description: `Настройка для видео линка youtube.`
    },
    videoControls: {
      type: 'number',
      defaultsTo: 0,
      description: `Настройка для видео линка youtube.`
    },
    videoMute: {
      type: 'number',
      defaultsTo: 0,
      description: `Настройка для видео линка youtube.`
    },
    videoHeader: {
      type: 'string',
      description: `Заголовок для видео выводится на странице поста.`
    },
    videoDescription: {
      type: 'string',
      description: `Описание для видео выводится на странице поста.`
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
    let video = [];
// console.log('inputs.videoUrl::: ', inputs.videoUrl);
    if (inputs.videoUrl) {
      video = [{
        videoUrl: inputs.videoUrl.replace(/https:\/\/youtu.be\//gi, ''),
        videoShowinfo: inputs.videoShowinfo,
        videoStart: inputs.videoStart,
        videoControls: inputs.videoControls,
        videoMute: inputs.videoMute,
        videoHeader: inputs.videoHeader,
        videoDescription: inputs.videoDescription,
      }];
    }


    let newPost = await Post.create({
      label: inputs.label,
      labelRu: inputs.labelRu,
      dateEvent: await sails.helpers.dateFix(inputs.dateEvent),
      images: images,
      postBackground: postBackground,
      subtitle: inputs.subtitle,
      backgroundPosition: inputs.backgroundPosition,
      subtitleRu: inputs.subtitleRu,
      see: inputs.see,
      rootPage: inputs.rootPage,
      video: video
    }).fetch();
    console.log('[newPost.id]', newPost);
    if (!newPost) {
      throw 'badRequest';
    }

    await Topic.addToCollection(inputs.topicId, 'posts').members([newPost.id]);

    // Добавляем экспертов к посту
    await Post.addToCollection(newPost.id, 'experts').members(inputs.experts);
    // Выбираем весь список объектов данной коллекции.
    // let posts = await Post.find()
    //   .sort([{labelRu: 'DESC'}]);

    await sails.sockets.broadcast('post', 'list-post');
    // Respond with view.
    return exits.success();

  }
};
