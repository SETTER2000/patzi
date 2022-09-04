module.exports = {
  friendlyName: 'Cloud front url',
  description: 'Отдаёт url картинки в зависимости от environment',
  inputs: {
    collectionName: {
      type: 'string',
      description: 'Название коллекции. Устанавливается в путь к файлу фотографии.',
      required: true
    },
    collection: {
      type: 'ref',
      description: 'Объекты коллекции со всеми данными',
      required: true
    },
    photoSet: {
      type: 'number',
      description: `Индекс фотосессии`
    },
    edits: {
      type: 'ref',
      description: `Объект преобразования картинки. `,
      required: true
    },
    field: {
      type: 'string',
      defaultsTo: 'images',
      description: `Название свойства в объекте коллекции, которое содержит массив фотосессий.`
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    const btoa = require('btoa');
    const url = require('url');
    let imageSrc = '',
      objId = '',
      resize = {
        fit: 'inside',
        width: 1424,
        height: 800
      };

    // Если не передан объект resize, то устанавливаем размер по умолчанию.
    inputs.edits.resize = inputs.edits.resize ? inputs.edits.resize : resize;
    if (!_.isArray(inputs.collection)) {
      if (sails.config.environment === 'production') {
        inputs.collection[inputs.field] = (!_.isEmpty(inputs.collection[inputs.field])) ? await inputs.collection[inputs.field].map((image, i) => {
          const imageRequest = JSON.stringify({
            bucket: sails.config.uploads.bucket,
            key: image.fd,
            edits: inputs.edits
          });
          image.imageSrc = `${sails.config.custom.CLOUD_FRONT_URL}/${btoa(imageRequest)}`;
          return image;
        }) : '';
      } else {
        inputs.collection[inputs.field] = (!_.isEmpty(inputs.collection[inputs.field])) ? await inputs.collection[inputs.field].map((image, i) => {
          i = inputs.photoSet ? `${i}/${inputs.photoSet}` : i;
          image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/download/${inputs.collectionName}/${inputs.collection.id}/${inputs.field}/${i}`) : '';
          return image;
        }) : '';
      }
    } else {
      await _.each(inputs.collection, async (obj) => {
        objId = obj.id ? obj.id : obj._id;
        obj[inputs.field] = (!_.isEmpty(obj[inputs.field]) && !_.isUndefined(obj[inputs.field][0])) ? await obj[inputs.field].map((img, i) => {
          if (sails.config.environment === 'production') {
            const imageRequest = JSON.stringify({
              bucket: sails.config.uploads.bucket,
              key: img.fd,
              edits: inputs.edits
            });
            img.imageSrc = `${sails.config.custom.CLOUD_FRONT_URL}/${btoa(imageRequest)}`;
          } else {
            i = inputs.photoSet ? `${i}/${inputs.photoSet}` : i;
            img.imageSrc = img.fd ? url.resolve(sails.config.custom.baseUrl, `/download/${inputs.collectionName}/${objId}/${inputs.field}/${i}`) : '';
          }
          return img;
        }) : '';
      });
    }
    return inputs.collection;
  }
};
