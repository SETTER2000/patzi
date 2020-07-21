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
      // required: true,
      description: 'Дата события.'
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
      console.log('topic::: ' , inputs.topic);
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    // console.log('TITLE DOG:: ', inputs.titleDog);

    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'post');


    let post = await Post.findOne(inputs.id);
    let images = inputs.images ? inputs.images : post.images;
    let imagesNew = [];


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
    //
    // let label = _.startCase(inputs.label.toString().toLowerCase());
    // let letter = inputs.letter ? inputs.letter : label[0];

    let updateObj = {
      label: inputs.label,
      labelRu: inputs.labelRu,
      images: images,
      // postBackground: postBackground,
      subtitle: inputs.subtitle,
      backgroundPosition: inputs.backgroundPosition,
      subtitleRu: inputs.subtitleRu,
      see: inputs.see,
      rootPage: inputs.rootPage,
      topic:inputs.topic.id     ,
      /*label: label,
      gender: inputs.gender,
      see: inputs.see,
      allowEdit: inputs.allowEdit,
      currency: inputs.currency,
      price: inputs.price,
      saleDescription: inputs.saleDescription,
      dateBirth: await sails.helpers.dateConverter(inputs.dateBirth),
      // dateBirth: await sails.helpers.dateFix(inputs.dateBirth),
      // dateDeath: await sails.helpers.dateFix(inputs.dateDeath),
      dateDeath: await sails.helpers.dateFix(inputs.dateDeath),
      dateReceiving: await sails.helpers.dateFix(inputs.dateReceiving),
      nickname: inputs.nickname,
      subtitle: inputs.subtitle,
      weight: inputs.weight,
      birthWeight: inputs.birthWeight,
      growth: inputs.growth,
      showTeeth: inputs.showTeeth,
      type: inputs.type,
      sale: inputs.sale,
      color: inputs.color,
      stamp: inputs.stamp,
      bite: inputs.bite,
      dogTests: inputs.dogTests,
      letter: letter,
      canine: inputs.canine,
      teethCountBottom: inputs.teethCountBottom,
      teethCountTop: inputs.teethCountTop,
      teethCount: `${inputs.canine}x${inputs.teethCountTop}x${inputs.teethCountBottom}`,*/
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

    /*  if (inputs.titleDog && inputs.titleDog.fileList && _.size(inputs.titleDog.fileList) < 2) {
        throw (req.me.preferredLocale === 'ru') ? 'titleImageTwoRu' : 'titleImageTwo';
      }

      if (inputs.titleDog && inputs.titleDog.fileList) {
        inputs.titleDog.photos = inputs.titleDog.fileList.filter(o => !_.isNull(o));
        _.each(inputs.titleDog.photos, img => {
          img.id = _.isString(img.fd) ? _.first(_.last(img.fd.split('\\')).split('.')) : '';
          img.description = '';
          img.dateTaken = '';
          delete img.filename;
          delete img.status;
          delete img.field;
        });
        delete inputs.titleDog.fileList;
      }*/


    // console.log('post.titleDog::: ', post.titleDog);
    // console.log('post::: ', post);

    // фото собаки
    /* !_.isEmpty(images) || !_.isEmpty(imagesNew) ? updateObj.images = [...images, ...imagesNew] : '';

     // Фото-сканы дипломов-титулов
     let t = _.uniq([...post.titleDog, ...[inputs.titleDog]]);
     if (!_.isNull(t)) {
       updateObj.titleDog = t;
     }*/


    // Обновляем
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
    /* let parents = [];
     inputs.dam ? parents.push(inputs.dam) : '';
     inputs.sire ? parents.push(inputs.sire) : '';
     let parentFind = await Post.find({fullName: parents});
     parents = _.pluck(parentFind, 'id');
     parents.length > 0 ? await Post.replaceCollection(update.id, 'parents').members(parents) : '';
 */

    // Если не создан возвращаем ошибку.
    if (!update) {
      throw 'badRequest';
    }
    post = await Post.findOne(update.id).populate('topic');
    // let owner = inputs.owner ? inputs.owner : this.req.me.id;

    /**
     * Добавить питомца в коллекцию пользователя: "User.dogs",
     * где у пользователя есть идентификатор 10 и питомец имеет идентификатор 300.
     * await User.addToCollection(10, 'dogs', 300);
     * Для собаки с update.id меняем владельцев в owner (может быть массивом идентификаторов)
     */
    // await User.addToCollection(owner, 'dogs', newDog.id);
    /* await Post.replaceCollection(update.id, 'owners').members(owner);

     let siblings = await Post.siblings(inputs);
     console.log('БРАТЬЯ И СЕСТРЫ::: ', siblings);
     let year = _.trim(inputs.dateBirth.split('-')[0], '"');*/
    // Рассылаем данные всем подписанным на событие forSale-post данной комнаты.
    await sails.sockets.broadcast('post', 'update-post', post);
    return exits.success();
  }
};
