module.exports = {


  friendlyName: 'Cloud front url min',


  description: `
  Хелпер работает только для production.
  Создаёт новую, преобразованную колекцию ссылок на
  картинки из входящей коллекции картинок.
  Создаём поле imagesMin.
  Поле imagesMin создаётся по умолчанию , если не указано другое название в параметре createField.
  Новое свойство imagesMin будет содержать картинки из поля установленного в параметре field,
  но уже с изменениями предложенными в свойстве edits.
  Генерирует ссылки с параметрами изображения.

  `,


  inputs: {
    edits: {
      type: 'ref',
      description: `Объект преобразования картинки.`,
      required: true
    },
    collectionName: {
      type: 'string',
      description: 'Название коллекции. Устанавливается в путь к файлу фотографии.',
      required: true
    },
    collectionToCollection: {
      type: 'boolean',
      defaultsTo: false
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
    },
    photoSet: {
      type: 'string',
      description: `Индекс фотосессии`
    },
    collectionId: {
      type: 'string',
      description: `Идентификатор коллекции`
    },

    subfolder: {
      type: 'string',
      description: `Название вложенной папки с фото, дополнительный вариант вставки в линк.
      Заменяет входной параметр field`
    }
  },


  exits: {
    success: {
      description: 'All done.',
    },
  },


  fn: async function (inputs) {
    const btoa = require('btoa');
    let resultImgRecursion = '';
    const url = require('url');
    /* resize = {
        fit: 'inside',
        width: 1424,
        height:800
      }*/


    if (_.isArray(inputs.collection) && inputs.collectionToCollection) {
      /**
       * Рекурсивная функция. обновляет свойство imagesSrc все объекты где есть свойство fd.
       * Св-во imagesSrc формируется из строки fd.
       */
      const imgRecursion = (collection, options) => {
        if (_.isArray(collection)) {
          for (let o of collection) {
            if (_.isObject(o)) {
              if (sails.config.environment === 'production' && o.fd) {
                let imageRequest = JSON.stringify({
                  bucket: 'paltos',
                  key: o.fd,
                  edits: inputs.edits
                });
                o.imageSrc = `${sails.config.custom.cloudFrontUrl}/${btoa(imageRequest)}`;
              }else{
                o.imageSrc = o.fd ? url.resolve(sails.config.custom.baseUrl, `/download/${options.collectionName}/${options.objectCollectionId}/${options.field}/0`) : '';
              }
              imgRecursion(o, options);
            } else {
              return o;
            }
          }
        } else {
          let s = [];
          options.objectCollectionId = collection.id ? collection.id : '';
          for (let o of Object.values(collection)) {
            if (_.isArray(o)) {
              let ret = imgRecursion(o, options);
              if (!_.isUndefined(ret)) s.push(ret);
            }
            if (!_.isUndefined(o)) s.push(o);
          }
          return s;
        }
      };

      let options = {
        collectionName: inputs.collectionName,
        collectionId: inputs.collection.id ? inputs.collection.id : inputs.collectionId,
        subfolder: inputs.subfolder ? inputs.subfolder : inputs.field,
        field: inputs.field,
      };
      resultImgRecursion = imgRecursion(inputs.collection, options);
      // console.log('Recursia - resultImgRecursion:::: ', resultImgRecursion);
      inputs.collection[inputs.createField] = resultImgRecursion;
    }

    /**
     * Переработать коллекцию в другую коллекцию
     * @param object - объект который содержит в одном из свойств коллекцию для переработки
     * @param fieldName - свойство объекта, в котором содержится коллекция
     * @returns [{fd: value fieldName, imageSrc: ''},{fd: value fieldName, imageSrc: ''}]
     */
    function reprocessedObj(object, fieldName) {
      let a = [];
      _.pluck(object, fieldName).map((y, i) => y === y ? a.push({
        fd: y,
        imageSrc: '',
        title: object[i].title ? object[i].title : '',
        name: object[i].name
      }) : '');
      return a;
    }

    let getCloudFrontImg = im => {
     return im.map(img => {
        let imageRequest = JSON.stringify({
          bucket: 'paltos',
          key: img.fd,
          edits: inputs.edits
        });
        img.imageSrc = `${sails.config.custom.cloudFrontUrl}/${btoa(imageRequest)}`;
        return img;
      })
    };
    if (!_.isArray(inputs.collection)) {
      if (sails.config.environment === 'production') {
        let im = reprocessedObj(inputs.collection[inputs.field], 'fd');
        (!_.isEmpty(inputs.collection[inputs.field]) && !_.isUndefined(inputs.collection[inputs.field][0])) ?
          getCloudFrontImg(im) : '';
        inputs.collection[inputs.createField] = im;
      }
      else {
        let im = reprocessedObj(inputs.collection[inputs.field], 'name');
        let collectionId = inputs.collection.id ? inputs.collection.id : inputs.collectionId;
        let subfolder = inputs.subfolder ? inputs.subfolder : inputs.field;

        (!_.isEmpty(inputs.collection[inputs.field])) ? im.map((image, i) => {
          let id = inputs.photoSet ? `${i}/${inputs.photoSet}` : i;
          image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/download/${inputs.collectionName}/${collectionId}/${subfolder}/${id}`) : '';
          return image;
        }) : '';
        inputs.collection[inputs.createField] = im;
      }
    }
    else {
      await _.each(inputs.collection, async (obj) => {
        // console.log('Collections Many Production');
        if (sails.config.environment === 'production') {
          let im = reprocessedObj(obj[inputs.field], 'fd');
          (!_.isEmpty(obj[inputs.field]) && !_.isUndefined(obj[inputs.field][0])) ?
           getCloudFrontImg(im) : '';
          obj[inputs.createField] = im;
        }
        else {
          obj[inputs.createField] = (!_.isEmpty(obj[inputs.field])) ? await obj[inputs.field].map((image, i) => {
            i = inputs.photoSet ? `${i}/${inputs.photoSet}` : i;
            image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/download/${inputs.collectionName}/${obj.id}/${inputs.field}/${i}`) : '';
            return image;
          }) : '';
        }
      });
    }
    return inputs.collection;
  }
};

