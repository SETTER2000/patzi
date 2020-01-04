module.exports = {


  friendlyName: 'View dogs home',


  description: 'Display "Dogs home" page.',

  inputs: {

    id: {
      type: 'string',
      description: `Идентификатор собаки. Если требуется страница собаки.`
    },
  },


  exits: {

    success: {
      viewTemplatePath: 'pages/dogs/dogs-home'
    },
    forbidden: {
      responseType: 'forbidden'
    },
    notFound: {
      responseType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    // Бибилиотека Node.js
    const url = require('url');
    const moment = require('moment');

    let dogs = await Dog.find()
      .populate('children')
      .populate('parents');

    if (!dogs) {
      throw 'notFound';
    }

    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля.
     * Все картинки по умолчанию примут высоту 800px
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    dogs = await sails.helpers.cloudFrontUrl.with({
      collection: dogs,
      collectionName: 'dog',
      // Этот объект обязателен, хотя может быть и пустой.
      edits: {
        // grayscale: true,
        /*    resize: {
              width: resizeX,
              height: resizeY
            }*/
      }
    });


    _.each(dogs, (dog) => {
      dog.born = moment(dog.born).format('LL');
      // Устанавливаем свойство источника изображения
      // Первый аргумент, базовый url
      // dog.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/dogs/${dog.id}`);
      // // ... затем мы удаляем наш файловый дескриптор
      // delete dog.imageUploadFD;
      // // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию
      // delete dog.imageUploadMime;
    });

    // Respond with view.
    return exits.success({
      seo: {
        description: `База данных породы Китайская Хохлатая Собака.`,
        title: `Каталог собак`,
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`
      },
      currentSection: 'dog',
      dogs
    });
  }


};
