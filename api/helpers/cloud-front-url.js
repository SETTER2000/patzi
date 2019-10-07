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
    edits: {
      type: 'ref',
      description: `Объект преобразования картинки.
      https://sharp.pixelplumbing.com/en/stable/api-resize/#examples
      `,
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    let imageSrc = ''
      , objId = ''
      , resize = {
        width: 1424,
        height: 800
      }
    ;
// Если не передан объект resize, то устанавливаем размер по умолчанию.
    inputs.edits.resize = inputs.edits.resize ? inputs.edits.resize : resize;
    console.log('inputs.collection::: ', inputs.collection);
    if (!_.isArray(inputs.collection)) {

      inputs.collection.images = (!_.isEmpty(inputs.collection.images)) ? await inputs.collection.images.map((image, i) => {
        image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/download/${inputs.collectionName}/${inputs.collection.id}/images/${i}`) : '';
        delete image.fd;
        return image;
      }) : '';
    } else{
      await _.each(inputs.collection, async (obj) => {
        objId = obj.id;
        obj.images = (!_.isEmpty(obj.images)) ? await obj.images.map((img, i) => {
          if (sails.config.environment === 'production') {
            const imageRequest = JSON.stringify({
              bucket: sails.config.uploads.bucket,
              key: img.name,
              edits: inputs.edits
            });
            img.imageSrc = `${sails.config.custom.cloudFrontUrl}/${btoa(imageRequest)}`;
          } else {
            img.imageSrc = img.fd ? url.resolve(sails.config.custom.baseUrl, `/download/${inputs.collectionName}/${objId}/images/${i}`) : '';
          }

          img.detail = obj.fullName ? `/chinese-crested/${obj.fullName.split(" ").join('-')}` : '';
          delete img.fd;
          return img;
        }) : '';
      });
    }


    return inputs.collection;

  }
};

