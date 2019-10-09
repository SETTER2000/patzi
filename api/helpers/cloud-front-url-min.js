module.exports = {


  friendlyName: 'Cloud front url min',


  description: 'Создаёт новую, преобразованную колекцию ссылок на картинки из входящей коллекции картинок.',


  inputs: {
    edits: {
      type: 'ref',
      description: `Объект преобразования картинки.
      https://sharp.pixelplumbing.com/en/stable/api-resize/#examples
      `,
      required: true
    },
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
    field: {
      type: 'string',
      defaultsTo: 'images',
      description: `Название свойства в объекте коллекции, из которого 
      нужно взять картинки и создать миниатюры в createField.`,
      // required: true
    },
    createField: {
      type: 'string',
      defaultsTo: 'imagesMin',
      description: `Название свойства в объекте коллекции, которое будет создано
       и заполнено коллекцией картинок.`,
      // required: true
    }
  },


  exits: {
    success: {
      description: 'All done.',
    },
  },


  fn: async function (inputs) {
    const btoa = require('btoa');

    /* resize = {
        fit: 'inside',
        width: 1424,
        height:800
      }*/


    /**
     * Переработать коллекцию в другую коллекцию
     * @param object - объект который содержит в одном из свойств коллекцию для переработки
     * @param fieldName - свойство объекта, в котором содержится коллекция
     * @returns [{fd: value fieldName, imageSrc: ''},{fd: value fieldName, imageSrc: ''}]
     */
    function reprocessedObj(object, fieldName) {
      let a = [];
      _.pluck(object, fieldName).map(y => y === y ? a.push({fd: y, imageSrc: ''}) : '');
      return a;
    }

    if (!_.isArray(inputs.collection)) {
      if (sails.config.environment === 'production') {
        let imagesN = inputs.collection[inputs.field];
        inputs.collection[inputs.createField] = (!_.isEmpty(obj[inputs.field]) && !_.isUndefined(inputs.collection[inputs.field][0])) ? imagesN : '';
        inputs.collection[inputs.createField] = (!_.isEmpty(inputs.collection[inputs.createField])) ? await inputs.collection[inputs.createField].map((image, i) => {
          let imageRequest = JSON.stringify({
            bucket: sails.config.uploads.bucket,
            key: image.fd,
            edits: inputs.edits
          });
          image.imageSrc = `${sails.config.custom.cloudFrontUrl}/${btoa(imageRequest)}`;
          return image;
        }) : '';
      } else {
        inputs.collection[inputs.field] = (!_.isEmpty(inputs.collection[inputs.field])) ? await inputs.collection[inputs.field].map((image, i) => {
          image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/download/${inputs.collectionName}/${inputs.collection.id}/${inputs.field}/${i}`) : '';
          return image;
        }) : '';
      }
    }
    else {

        await _.each(inputs.collection, async (obj) => {
          if (sails.config.environment === 'production') {
            let im = reprocessedObj(obj[inputs.field], 'fd');
            (!_.isEmpty(obj[inputs.field]) && !_.isUndefined(obj[inputs.field][0])) ?
              im.map(img => {
                let imageRequest = JSON.stringify({
                  bucket: sails.config.uploads.bucket,
                  key: img.fd,
                  // key: '0bec30fa-a61e-4fce-9844-9cc76e3015e4.jpg',
                  edits: inputs.edits
                });
                img.imageSrc = `${sails.config.custom.cloudFrontUrl}/${btoa(imageRequest)}`;
                return img;
              }) : '';
            obj[inputs.createField] = im;
          }else{
            obj[inputs.createField] = (!_.isEmpty(obj[inputs.field])) ? await obj[inputs.field].map((image, i) => {
              image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/download/${inputs.collectionName}/${obj.id}/${inputs.field}/${i}`) : '';
              return image;
            }) : '';
          }
        });
    }
    console.log('Выходная коллекция:::: ' , inputs.collection[0]);
    return inputs.collection;
  }
};

