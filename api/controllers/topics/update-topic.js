module.exports = {


  friendlyName: 'Update topic',


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

    labelRu: {
      type: 'string',
      required: true,
      description: `Официальное имя темы на русском. Поле обязательно для заполнения.`
    },

    fileList: {
      type: 'ref',
      description: 'Массив с объектами данных о новых загруженных файлах.'
    },


    subtitle: {
      type: 'string',
      description: 'Дополнительная информация. Описание темы.',
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
    console.log('IDDD::: ' ,inputs.id);
    let topic = await Topic.findOne(inputs.id);
    let images = inputs.images ? inputs.images : topic.images;
    let imagesNew = [];
    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'topic');


    let updateObj = {
      label: inputs.label,
      labelRu: inputs.labelRu,
      see: inputs.see,
      subtitle: inputs.subtitle,

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

    !_.isEmpty(images) || !_.isEmpty(imagesNew) ? updateObj.images = [...images, ...imagesNew] : '';

    // Обновляем
    let updateTopic = await Topic.updateOne({id: inputs.id})
      .set(updateObj);

    // Если не создан возвращаем ошибку.
    if (!updateTopic) {
      throw 'badRequest';
    }

    await sails.sockets.broadcast('topic', 'update-topic');
    return exits.success();
  }


};
