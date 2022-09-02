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
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`,
        header:{ru:'Китайская Хохлатая Собака',en:'Chinese Crested Dog'},
        subTitle:{ru:'Каталог собак',en:'Dog catalog'},
        preferredLocale:this.req.me.preferredLocale,
        // Первый H3 на странице
        h3: {ru: 'Каталог собак мира', en: 'World Dog Directory'},
        // Текст параграфа под заголовко H3 в начале страницы
        textUnderHeading: {
          ru: 'На странице представлены собаки породы Китайская Хохлатая Собака. Это база собак данной породы не может претендовать на полноту информации, как и любая другая база данных в мире. Вопрос лишь того, кто ей пользуется. По мере роста и совершенствования механизма обновления и сбора данных по известным собакам, данная база будет собирать, поддерживать и обновлять актуальную информацию, появляющуюся в открытом доступе на других сайтах в автоматическом режиме, генерируя полный список собак мира в породе Китайская Хохлатая Собака.',
          en: 'The page contains dogs of the breed Chinese Crested Dog. This database of dogs of this breed cannot claim to be complete information, like any other database in the world. The only question is who uses it. As the mechanism for updating and collecting data on known dogs grows and improves, this database will collect, maintain and update relevant information that appears in the public domain on other sites in automatic mode. Generating a complete list of the world\'s dogs in the breed Chinese Crested Dog.'
        },
      },
      currentSection: 'dog',
      dogs
    });
  }


};
