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
    field:{
      type:'string',
      defaultsTo:'images',
      description:`Название свойства в объекте коллекции, из которого 
      нужно взять картинки и создать миниатюры в createField.`,
      // required: true
    },
    createField:{
      type:'string',
      defaultsTo:'imagesMin',
      description:`Название свойства в объекте коллекции, которое будет создано
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
    let imageSrc = ''
      , objId = ''
      /*, resize = {
        fit: 'inside',
        width: 1424,
        height:800
      }*/
    ;
// Если не передан объект resize, то устанавливаем размер по умолчанию.
//     inputs.edits.resize = inputs.edits.resize ? inputs.edits.resize : resize;
    // console.log('inputs.collection::: ', inputs.collection);
    if (!_.isArray(inputs.collection)) {
      console.log('One object');
      if (sails.config.environment === 'production') {
        let imagesN = inputs.collection[inputs.field];
        inputs.collection[inputs.createField] = (!_.isEmpty(obj[inputs.field]) && !_.isUndefined(inputs.collection[inputs.field][0])) ?  imagesN : '';
        inputs.collection[inputs.createField] = (!_.isEmpty(inputs.collection[inputs.createField])) ? await inputs.collection[inputs.createField].map((image, i) => {
          let imageRequest = JSON.stringify({
            bucket: sails.config.uploads.bucket,
            key: image.fd,
            edits: inputs.edits
          });
          image.imageSrc = `${sails.config.custom.cloudFrontUrl}/${btoa(imageRequest)}`;
          // delete image.fd;
          return image;
        }) : '';
      } else {
        inputs.collection[inputs.field] = (!_.isEmpty(inputs.collection[inputs.field])) ? await inputs.collection[inputs.field].map((image, i) => {
          image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/download/${inputs.collectionName}/${inputs.collection.id}/${inputs.field}/${i}`) : '';
          // delete image.fd;
          return image;
        }) : '';
      }
    }
    else {
      await _.each(inputs.collection, async (obj) => {
        objId = obj.id;
        let imagesN = obj[inputs.field];
        console.log('OBJ::::' , obj);
        obj[inputs.createField] = (!_.isEmpty(obj[inputs.field]) && !_.isUndefined(obj[inputs.field][0])) ?  imagesN : '';

        console.log('obj[inputs.createField]:::: ' ,obj);

        obj[inputs.createField] = (!_.isEmpty(obj[inputs.createField]) && !_.isUndefined(obj[inputs.createField][0])) ? await obj[inputs.createField].map((img, i) => {
            console.log('img.imageSrc входной::::', img.imageSrc);
          if (sails.config.environment !== 'production') {
            console.log('inputs.edits:: ', inputs.edits);
            // 00f21b4c-9f24-45ae-a92e-e3282cf78d25.jpg
            // 0bec30fa-a61e-4fce-9844-9cc76e3015e4.jpg
            let imageRequest = JSON.stringify({
              bucket: 'paltos',
              key: '0bec30fa-a61e-4fce-9844-9cc76e3015e4.jpg',
              // key: img.fd,
              edits: inputs.edits
            });
            img.imageSrc = `${sails.config.custom.cloudFrontUrl}/${btoa(imageRequest)}`;
            console.log('img.imageSrc выходной::::', img.imageSrc);
            return img;
          }

        }) : '';
      });
    }


console.log('Выходная коллекция  images:::::: ', inputs.collection[0]);
// console.log('Выходная коллекция из Мин  inputs.collection[0].imagesMin:::::: ', inputs.collection[0].imagesMin);
    return inputs.collection;

  }


};

