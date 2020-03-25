module.exports = {


  friendlyName: 'Update dog',


  inputs: {
    id: {
      type: 'string',
      required: true,
      description: 'Идентификатор собаки'
    },

    label: {
      type: 'string',
      required: true,
      description: `Официальное имя собаки. Поле обязательно для заполнения.
      В рамках всей коллекции это поле не может быть уникальным, только проверка имени вместе 
      с названием питомника может однозначно установить уникальность собаки в базе.`
    },

    gender: {
      type: 'string',
      required: true,
      example: 'sire, dam',
      description: 'Пол собак. В смысле не пол собаки, а конец есть или нет.'
    },


    dateBirth: {
      type: 'string',
      required: true,
      description: 'Дата рождения.'
    },

    titleDog: {
      type: 'ref',
      description: `Титула собаки.`
    },


    see: {
      type: 'boolean',
      description: `Флаг видимости блока собаки. Видна или нет. По умолчанию не видна.`
    },


    allowEdit: {
      type: 'boolean',
      description: `Флаг. При установки заводчиком в true, даёт возможность владельцу 
      редактировать собаку.`
    },


    owner: {
      type: 'string',
      description: 'Идентификатор владельца собаки.'
    },


    dateDeath: {
      type: 'string',
      description: 'Дата смерти.'
    },


    letter: {
      type: 'string',
      description: `Буква помёта к которому пренадлежит собака. 
      Информация нужна для фиксации кнопки о продаже на странице помёта. 
      В случаи когда дата рождения щенков одного помёта разная. 
      (например в 23:00 первый родился и через 2 часа второй. Помёт один, а дата рождения разная.). 
      Если буква не указана, то автоматически берётся первая буква имени собаки.`,
    },

    fileList: {
      type: 'ref',
      description: 'Массив с объектами данных о новых загруженных файлах.'
    },

    titleScan: {
      type: 'ref',
      description: 'Массив с объектами данных о новых загруженных файлах картинок титулов.'
    },


    showTeeth: {
      type: 'boolean',
      defaultsTo: true,
      description: `Флаг видимости зубов собаки. Виднен или нет блок на сайте. По умолчанию не виден.`
    },


    imagesArrUrl: {
      type: 'ref',
      description: 'Массив с url ссылками на картинки.'
    },


    subtitle: {
      type: 'string',
      description: 'Дополнительная информация. Описание питомника.',
      maxLength: 700
    },


    sire: {
      type: 'string',
      description: 'Отец.',
      maxLength: 80
    },


    dam: {
      type: 'string',
      description: 'Мать.',
      maxLength: 80
    },


    saleDescription: {
      type: 'string',
      description: `Рекомендации к продаже. Сопроводительный текст, который будет виден на странице
       продаж для данной собаки.`,
      maxLength: 700
    },


    sale: {
      type: 'boolean',
      defaultsTo: false,
      description: `Флаг продажи собаки. Проадётся или нет. По умолчанию не продаётся.`
    },


    currency: {
      type: 'string',
      description: `Валюта продажи. Валюта за катоую можно купить собаку.`,
      example: 'dollar, рубль, euro',
      isIn: ['dollar', 'рубль', 'euro'],
      // required: true,
      minLength: 4,
      maxLength: 6
    },


    price: {
      type: 'number',
      // required: true,
      description: 'Цена продажи собаки.'
    },


    // kennel: {
    //   type: 'string',
    //   description: 'Идентификатор питомника'
    // },


    nickname: {
      type: 'string',
      description: 'Кличка, ласковое имя.'
    },


    weight: {
      type: 'number',
      description: 'Вес. В граммах.',
      example: 4500
    },


    growth: {
      type: 'number',
      description: 'Рост. В сантиметрах.',
      example: 30
    },


    type: {
      type: 'string',
      description: 'Тип. Возможны два варианта.',
      example: 'hairless, powderpuff',
    },

    color: {
      type: 'string',
      description: 'Цвет.',
      // example:'hairless, powderpuff',
    },

    stamp: {
      type: 'string',
      description: 'Клеймо. Номер собаки в реестре.',
      // example:'hairless, powderpuff',
    },


    canine: {
      type: 'string',
      description: 'Клыки. Количество клыков.',
      example: '4',
      defaultsTo: '4'
    },

    teethCountTop: {
      type: 'string',
      description: 'Количество зубов вверху.',
      example: '6',
      defaultsTo: '6'
    },


    teethCountBottom: {
      type: 'string',
      description: 'Количество зубов внизу.',
      example: '6',
      defaultsTo: '6'
    },


    bite: {
      type: 'string',
      description: 'Прикус.',
      example: 'ножнецеобразный',
      isIn: ['перекус', 'недокус', 'ножнецеобразный'],
      defaultsTo: 'ножнецеобразный'
    },


    dogTests: {
      type: 'string',
      description: 'Тесты собаки.'
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

    titleImageTwo: {
      statusCode: 409,
      description: 'Two photos must be submitted for the title.',
    },

    titleImageTwoRu: {
      statusCode: 409,
      description: 'Для титула должно быть представлено две фотографии.',
    },

    dogAlreadyInUse: {
      statusCode: 409,
      description: 'The specified dog name is already in use.',
    },

    dogAlreadyInUseRU: {
      statusCode: 409,
      description: 'Указанное имя собаки уже используется.',
    },
  },


  fn: async function (inputs, exits) {
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    // console.log('TITLE DOG:: ', inputs.titleDog);
    let dog = await Dog.findOne(inputs.id);
    let images = inputs.images ? inputs.images : dog.images;
    let imagesNew = [];


    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'dog');
    let label = _.startCase(inputs.label.toString().toLowerCase());
    let letter = inputs.letter ? inputs.letter : label[0];

    let updateObj = {
      label: label,
      gender: inputs.gender,
      see: inputs.see,
      allowEdit: inputs.allowEdit,
      currency: inputs.currency,
      price: inputs.price,
      saleDescription: inputs.saleDescription,
      dateBirth: await sails.helpers.dateFix(inputs.dateBirth),
      dateDeath: await sails.helpers.dateFix(inputs.dateDeath),
      dateReceiving: await sails.helpers.dateFix(inputs.dateReceiving),
      nickname: inputs.nickname,
      subtitle: inputs.subtitle,
      weight: inputs.weight,
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
      teethCount: `${inputs.canine}x${inputs.teethCountTop}x${inputs.teethCountBottom}`,
    };


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

    if (inputs.titleDog && inputs.titleDog.fileList && _.size(inputs.titleDog.fileList) < 2) {
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
    }


    // console.log('dog.titleDog::: ', dog.titleDog);
    // console.log('dog::: ', dog);

    // фото собаки
    !_.isEmpty(images) || !_.isEmpty(imagesNew) ? updateObj.images = [...images, ...imagesNew] : '';

    // Фото-сканы дипломов-титулов
    let t = _.uniq([...dog.titleDog, ...[inputs.titleDog]]);
    if (!_.isNull(t)) {
      updateObj.titleDog = t;
    }


    // Обновляем
    let updateDog = await Dog.updateOne({id: inputs.id}).set(updateObj);


    /**
     * Для собаки с id 23 добавить родителя с  id 12
     * await Dog.addToCollection(23, 'parents', 12);
     * Для собаки 3 замените всех детей
     * из коллекции «children» на детей 99 и 98:
     * await Dog.replaceCollection(3, 'children').members([99,98]);
     *
     * Для собаки с updateDog.id меняем родителей в массиве идентификаторы
     */
    let parents = [];
    inputs.dam ? parents.push(inputs.dam) : '';
    inputs.sire ? parents.push(inputs.sire) : '';
    let parentFind = await Dog.find({fullName: parents});
    parents = _.pluck(parentFind, 'id');
    parents.length > 0 ? await Dog.replaceCollection(updateDog.id, 'parents').members(parents) : '';


    // Если не создан возвращаем ошибку.
    if (!updateDog) {
      throw 'badRequest';
    }

    let owner = inputs.owner ? inputs.owner : this.req.me.id;

    /**
     * Добавить питомца в коллекцию пользователя: "User.dogs",
     * где у пользователя есть идентификатор 10 и питомец имеет идентификатор 300.
     * await User.addToCollection(10, 'dogs', 300);
     * Для собаки с updateDog.id меняем владельцев в owner (может быть массивом идентификаторов)
     */
    // await User.addToCollection(owner, 'dogs', newDog.id);
    await Dog.replaceCollection(updateDog.id, 'owners').members(owner);
    let year = _.trim(inputs.dateBirth.split('-')[0], '"');
    // Рассылаем данные всем подписанным на событие forSale-dog данной комнаты.
    await sails.sockets.broadcast('dog', 'forSale-dog', await sails.helpers.forSaleDog.with({
      letter: inputs.letter,
      year: year
    }));
    return exits.success();
  }
};
