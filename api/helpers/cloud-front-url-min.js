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
        inputs.collection[inputs.createField] = (!_.isEmpty(inputs.collection[inputs.field])) ? await inputs.collection[inputs.field].map((image, i) => {
          const imageRequest = JSON.stringify({
            bucket: sails.config.uploads.bucket,
            key: image.fd,
            edits: inputs.edits
          });
          image.imageSrc = `${sails.config.custom.cloudFrontUrl}/${btoa(imageRequest)}`;
          delete image.fd;
          return image;
        }) : '';
      } else {
        inputs.collection[inputs.field] = (!_.isEmpty(inputs.collection[inputs.field])) ? await inputs.collection[inputs.field].map((image, i) => {
          image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/download/${inputs.collectionName}/${inputs.collection.id}/${inputs.field}/${i}`) : '';
          // delete image.fd;
          return image;
        }) : '';
      }
    } else {
      await _.each(inputs.collection, async (obj) => {
        objId = obj.id;
        // console.log('obj::: ' , obj);
        // console.log('obj[inputs.field]::: ' ,  (!_.isEmpty(obj[inputs.field]) && !_.isUndefined(obj[inputs.field][0])) ? 'y':'n');
        // console.log('inputs.field::: ' , inputs.field);
        // console.log('!_.isEmpty(obj[inputs.field])::: ' , (!_.isEmpty(obj[inputs.field])&& obj[inputs.field].length>0) ? 'y':'e');
        obj[inputs.createField] = (!_.isEmpty(obj[inputs.field]) && !_.isUndefined(obj[inputs.field][0])) ? await obj[inputs.field].map((img, i) => {
          if (sails.config.environment === 'production') {
            // console.log('Объект img:: ', img);
            const imageRequest = JSON.stringify({
              bucket: sails.config.uploads.bucket,
              key: img.fd,
              edits: inputs.edits
            });
            img.imageSrc = `${sails.config.custom.cloudFrontUrl}/${btoa(imageRequest)}`;

          } else {
            // console.log('img local::: ' , img);
            img.imageSrc = img.fd ? url.resolve(sails.config.custom.baseUrl, `/download/${inputs.collectionName}/${objId}/${inputs.field}/${i}`) : '';
          }

          // img.detail = obj.fullName ? `/chinese-crested/${obj.fullName.split(" ").join('-')}` : '';
          // console.log('img.imageSrc::: ' , img.imageSrc);
          // console.log('img.detail::: ' , img.detail);
          // delete img.fd;
          return img;
        }) : '';
      });
    }



    return inputs.collection;

  }


};

