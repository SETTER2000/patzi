module.exports = {


  friendlyName: 'Src image preparation',


  description: '',


  inputs: {
    year: {
      description: 'Год помёта.',
      type: 'string',
      maxLength: 4,
      required: true
    },

    letter: {
      type: 'string',
      description: 'Передаётся буква помёта',
      example: 'A',
      required: true
    },
    preferredLocale: {
      type: 'string',
      description: 'Какой язык выбран у пользователя',
      example: 'ru',
      required: true
    },
  },


  exits: {


    success: {
      outputFriendlyName: 'Email delivery report',
      outputDescription: 'A dictionary of information about what went down.',
      outputType: {
        loggedInsteadOfSending: 'boolean'
      }
    },
    // forbidden: {
    //   responseType: 'forbidden'
    // },
    // notFound: {
    //   responseType: 'notFound'
    // }

  },


  fn: async function (inputs) {
    // Бибилиотека Node.js
    const url = require('url');
    const moment = require('moment');
    // Формат отображаемой даты
    let format = 'LL';
    // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    moment.locale(inputs.preferredLocale);

    // Получаем объект конкретного помёта
    let litter = await Litter.findOne({letter: inputs.letter, year: inputs.year}).populate('owner');

    if (!litter) {
      console.log('Ошибка! Объект litter не создан.');
    }
    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    litter = await sails.helpers.cloudFrontUrl.with({
      collection: litter,
      collectionName: 'litter',
      // Этот объект обязателен, хотя может быть и пустой.
      edits: {
        // grayscale: true,
        /*    resize: {
              width: resizeX,
              height: resizeY
            }*/
      }
    });


    /* litter.images = (!_.isEmpty(litter.images)) ? await litter.images.map((image, i) => {
       // image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/download/litter/${litter.id}/images/${i}`) : '';
       // delete image.fd;
       return image;
     }) : '';*/

    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    /*litter = await sails.helpers.cloudFrontUrl.with({
      collection: litter,
      collectionName: 'litter',
      field:'puppies',
      // Этот объект обязателен, хотя может быть и пустой.
      edits: {
        // grayscale: true,
        /!*    resize: {
              width: resizeX,
              height: resizeY
            }*!/
      }
    });*/


    // Подготовка объекта фотоссессии
    litter.puppies = (!_.isEmpty(litter.puppies)) ? await litter.puppies.map(async (photoSet, i) => {
      photoSet.comments = _.isArray(photoSet.comments) ? photoSet.comments : [];
      console.log(' photoSet.photos:::: ' ,  photoSet);
      if (sails.config.environment !== 'production') {

        /**
         * Создаём поле imagesMin.
         * Поле imagesMin создаётся по умолчанию , если не указано другое название в параметре createField.
         * Новое свойство imagesMin будет содержать картинки из поля установленного в параметре field,
         * но уже с изменениями предложенными в свойстве edits.
         * Генерирует ссылки с параметрами изображения.
         * https://sharp.pixelplumbing.com/en/stable/api-resize/
         */
        photoSet = await sails.helpers.cloudFrontUrlMin.with({
          collection: photoSet,
          collectionName: 'litter',
          field: 'photos',
          photoSet: i,
          // Этот объект обязателен, хотя может быть и пустой.
          edits:
            {
              resize: {
                // fit: 'inside',
                width: 420
                // height:160
              }
            }
        });
        console.log(' return photoSet;:::: ', photoSet);
        return photoSet;
      } else {
        photoSet.photos.map((image, y) => {
          if (sails.config.environment === 'production') {

          } else {
            image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/download/litter/${litter.id}/puppies/${y}/${i}`) : '';
            // delete image.fd;
          }

        });
        return photoSet;
      }
    }) : '';

    litter.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/litters/${litter.id}`);
    litter.bornNt = moment.parseZone(litter.born).format(format);
    return litter;


  }
};

