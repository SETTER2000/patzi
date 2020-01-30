module.exports = {


  friendlyName: 'Create topic',


  description: '',


  inputs: {
    label: {
      type: 'string',
      required: true,
      description: `Официальное имя темы на английском. Поле обязательно для заполнения.`
    },

    labelRu: {
      type: 'string',
      required: true,
      description: `Официальное имя темы на русском. Поле обязательно для заполнения.`
    },

    fileList: {
      type: 'ref',
      description: 'Массив с файлами данных о загруженных файлах.'
    },

    topicBackground: {
      type: 'ref',
      description: 'Объект файла данных о загруженном файле. Фон темы.'
    },

    subtitle: {
      type: 'string',
      description: 'Дополнительная информация. Описание темы на английском языке.',
      maxLength: 700
    },

    subtitleRu: {
      type: 'string',
      description: 'Дополнительная информация. Описание темы на русском языке.',
      maxLength: 700
    },
    see: {
      type: 'boolean',
      description: `Флаг видимости темы. Видна или нет. По умолчанию видна.`
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
      description: 'Указанное имя темы уже используется.',
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
    if (inputs.topicBackground) {
      topicBackground = await inputs.topicBackground.filter(o => !_.isNull(o));
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
    // Проверка существования такой же темы.
    let conflicting = await Topic.findOne({labelRu: inputs.labelRu});
    if (conflicting) {
      throw (req.me.preferredLocale === 'ru') ? 'alreadyInUseRU' : 'alreadyInUse';
    }

//
    let newTopic = await Topic.create({
      label: inputs.label,
      labelRu: inputs.labelRu,
      images: images,
      topicBackground: topicBackground,
      subtitle: inputs.subtitle,
      subtitleRu: inputs.subtitleRu,
      see: inputs.see
    });


    // Выбираем весь список объектов данной коллекции.
    let topics = await Topic.find()
        .sort([{labelRu: 'DESC'}])
      // .populate('owners')
    ;

    await sails.sockets.broadcast('topic', 'list-topic');
    // Respond with view.
    return exits.success();

  }


};
