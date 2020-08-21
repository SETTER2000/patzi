module.exports = {


  friendlyName: 'Update federation',

  description: '',


  inputs: {
    id:{
      type: 'string',
      required: true,
      description: `Идентификатор записи`
    },
    label: {
      type: 'string',
      required: true,
      description: `Официальное имя темы на английском. Поле обязательно для заполнения.`
    },
    flag: {
      type: 'string',
      description: `ССылка на флаг страны. Из Википедии можно взять. SVG`
    },
    labelRu: {
      type: 'string',
      description: `Официальное имя темы на русском. Поле обязательно для заполнения.`
    },

    fileList: {
      type: 'ref',
      description: 'Массив с объектами данных о новых загруженных файлах.'
    },
    titleBackground: {
      type: 'ref',
      description: 'Объект файла данных о загруженном файле. Фон темы.'
    },

    backgroundPosition: {
      type: 'string',
      description: 'Дополнительная информация. Описание темы на английском языке.',
      maxLength: 30
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

  },


  fn: async function (inputs,exits) {

    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }

    let federation = await Federation.findOne(inputs.id);
    let images = inputs.images ? inputs.images : federation.images;
    let titleBackground = inputs.titleBackground ? inputs.titleBackground : federation.titleBackground;
    let imagesNew = [];
    let titleBackgroundNew = [];
    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'federation');


    let updateObj = {
      label: inputs.label.toUpperCase(),
      labelRu: inputs.labelRu,
      flag: inputs.flag,
      backgroundPosition: inputs.backgroundPosition,
      see: inputs.see,
      subtitle:_.startCase(inputs.subtitle.toString().toLowerCase()),
      subtitleRu: inputs.subtitleRu,

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

    if (inputs.titleBackground) {
      titleBackgroundNew = inputs.titleBackground.filter(o => !_.isNull(o));
      _.each(titleBackgroundNew, img => {
        img.id = _.isString(img.fd) ? _.first(_.last(img.fd.split('\\')).split('.')) : '';
        img.description = '';
        img.dateTaken = '';
        delete img.filename;
        delete img.status;
        delete img.field;
      });
    }

    !_.isEmpty(images) || !_.isEmpty(imagesNew) ? updateObj.images = [...images, ...imagesNew] : '';
    !_.isEmpty(titleBackground) || !_.isEmpty(titleBackgroundNew) ? updateObj.titleBackground = _.uniq([...titleBackground, ...titleBackgroundNew], 'uid') : '';

    // Обновляем
    let updateTitle = await Federation.updateOne({id: inputs.id})
      .set(updateObj);

    // Если не создан возвращаем ошибку.
    if (!updateTitle) {
      throw 'badRequest';
    }

    await sails.sockets.broadcast('federation', 'update-federation');
    return exits.success();
  }


};
