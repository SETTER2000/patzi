module.exports = {


  friendlyName: 'Create federation',


  description: 'Создать федерацию',


  inputs: {
    label: {
      type: 'string',
      required: true,
      description: `Официальное имя титула на английском. Поле обязательно для заполнения.`
    },

    flag: {
      type: 'string',
      description: `ССылка на флаг страны. Из Википедии можно взять. SVG`
    },

    site: {
      type: 'string',
      description: `Сайт Федерации`,
      maxLength:170
    },

    dateBirth: {
      type: 'string',
      required: true,
      description: 'Дата образования.'
    },
    labelRu: {
      type: 'string',
      description: `Официальное имя титула на русском. Поле обязательно для заполнения.`
    },

    fileList: {
      type: 'ref',
      description: 'Массив с файлами данных о загруженных файлах.'
    },

    topicBackground: {
      type: 'ref',
      description: 'Объект файла данных о загруженном файле. Фон титула.'
    },

    subtitle: {
      type: 'string',
      description: 'Дополнительная информация. Описание титула на английском языке.',
      maxLength: 700
    },

    subtitleRu: {
      type: 'string',
      description: 'Дополнительная информация. Описание титула на русском языке.',
      maxLength: 700
    },
    see: {
      type: 'boolean',
      description: `Флаг видимости титула. Видна или нет. По умолчанию видна.`
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
      description: 'The specified topic is already in use.',
    },

    alreadyInUseRU: {
      statusCode: 409,
      description: 'Указанное имя титула уже используется.',
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
    let topicBackground = [];
    // Have the socket which made the request join the "dog" room.
    // Подключить сокет, который сделал запрос, к комнате «topic».
    await sails.sockets.join(req, 'topic');

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
    if (inputs.topicBackground) {
      topicBackground = await inputs.topicBackground.filter(o => !_.isNull(o));
      await _.each(images, img => {
        img.id = _.first(_.last(img.fd.split('\\')).split('.'));
        img.description = '';
        img.dateTaken = '';
        delete img.filename;
        delete img.status;
        delete img.field;
      });
    }
    // Проверка существования такой же титула.
    let conflicting = await Federation.findOne({label: inputs.label});
    if (conflicting) {
      throw (req.me.preferredLocale === 'ru') ? 'alreadyInUseRU' : 'alreadyInUse';
    }

    let newObj = await Federation.create({
      label: inputs.label.toUpperCase(),
      labelRu: inputs.labelRu,
      dateBirth: await sails.helpers.dateConverter(inputs.dateBirth),
      flag: inputs.flag,
      site: inputs.site,
      images: images,
      topicBackground: topicBackground,
      subtitle: _.startCase(inputs.subtitle.toString().toLowerCase()),
      subtitleRu: inputs.subtitleRu,
      see: inputs.see
    });


    // Выбираем весь список объектов данной коллекции.
    let topics = await Federation.find()
      .sort([{labelRu: 'DESC'}]);

    await sails.sockets.broadcast('topic', 'list-topic');
    // Respond with view.
    return exits.success();
  }

};
