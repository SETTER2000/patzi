module.exports = {
  friendlyName: 'Update post',
  description: 'Обновить пост для блога',
  inputs: {
    id: {
      type: 'string',
      required: true,
      description: 'Идентификатор поста'
    },

    label: {
      type: 'string',
      required: true,
      description: `Официальное имя поста на английском. Поле обязательно для заполнения.`
    },
    topicId: {
      type: 'string',
      required: true,
      description: `Идентификатор темы.`
    },
    topic: {
      type: 'ref',
      required: true,
      description: `Объект темы.`
    },
    labelRu: {
      type: 'string',
      required: true,
      description: `Официальное имя поста на русском. Поле обязательно для заполнения.`
    },
    dateEvent: {
      type: 'string',
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
    const req = this.req;
    if (!req.isSocket) {
      throw 'badRequest';
    }
    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'post');
    let post = await Post.findOne(inputs.id);
    let images = inputs.images ? inputs.images : post.images;
    let imagesNew = [];
    console.log('inputs.fileList', inputs.fileList);
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
    let updateObj = {
      label: inputs.label,
      labelRu: inputs.labelRu,
      images: images,
      subtitle: inputs.subtitle,
      backgroundPosition: inputs.backgroundPosition,
      subtitleRu: inputs.subtitleRu,
      see: inputs.see,
      rootPage: inputs.rootPage,
      topic: inputs.topic.id,
    };
    if (inputs.dateEvent) {
      updateObj.dateEvent = await sails.helpers.dateFix(inputs.dateEvent);
    }
    if (inputs.fileList) {
      imagesNew = inputs.fileList.filter(o => !_.isNull(o));
      _.each(imagesNew, img => {
        img.id = _.isString(img.fd) ? _.first(_.last(img.fd.split('\\')).split('.')) : '';
        img.description = '';
        img.dateTaken = '';
        delete img.filename;
        delete img.status;
        delete img.field;
      });
    }
    let update = await Post.updateOne({id: inputs.id}).set(updateObj);
    /**
     * Для собаки с id 23 добавить родителя с  id 12
     * await Post.addToCollection(23, 'parents', 12);
     * Для собаки 3 замените всех детей
     * из коллекции «children» на детей 99 и 98:
     * await Post.replaceCollection(3, 'children').members([99,98]);
     *
     * Для собаки с update.id меняем родителей в массиве идентификаторы
     */
    inputs.experts ?  await Post.replaceCollection(inputs.id, 'experts').members(inputs.experts): '';
    if (!update) {
      throw 'badRequest';
    }
    post = await Post.findOne(update.id).populate('topic');
    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    post = await sails.helpers.cloudFrontUrl.with({
      collection: post,
      collectionName: 'post',
      edits: {
        resize: {}
      }
    });
    post.imagesArrUrl = _.pluck(post.images, 'imageSrc'); // Массив url картинок для просмотра в слайдере
    /**
     * Добавить питомца в коллекцию пользователя: "User.dogs",
     * где у пользователя есть идентификатор 10 и питомец имеет идентификатор 300.
     * await User.addToCollection(10, 'dogs', 300);
     * Для собаки с update.id меняем владельцев в owner (может быть массивом идентификаторов)
     */
    // Рассылаем данные всем подписанным на событие forSale-post данной комнаты.
    await sails.sockets.broadcast('post', 'update-post', post);
    return exits.success();
  }
};
