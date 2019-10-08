module.exports = {


  friendlyName: 'View dog',


  description: 'Display "Dog" page.',

  inputs: {
    fullName: {
      description: 'Полное имя собаки',
      type: 'string',
      required: true
    }

  },

  exits: {
    success: {
      viewTemplatePath: 'pages/dogs/dog'
    },
    forbidden: {
      responseType: 'forbidden'
    },
    notFound: {
      responseType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    // Have the socket which made the request join the "dog" room.
    // Подключить сокет, который сделал запрос, к комнате «dog».

    // // Бибилиотека Node.js
    const url = require('url');
    // const moment = require('moment');
    // // Формат отображаемой даты
    // let format = 'LL';
    // let dog = await Dog.findOne({letter: inputs.letter}).populate('owner');
    let fullName = _.startCase(inputs.fullName);
    console.log('dogName::: ', fullName);
    let dog = await Dog.findOne({'fullName': fullName}).populate('kennel');
    //
    if (!dog) {
      throw 'notFound';
    }
    // // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    // moment.locale(this.req.me.preferredLocale);
    // Формируем массив с картинками

    // let dog = await sails.helpers.srcImagePreparation.with(
    //   {
    //     letter: inputs.letter,
    //     year:inputs.year,
    //     preferredLocale: this.req.me.preferredLocale
    //   });


    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    dog = await sails.helpers.cloudFrontUrl.with({
      collection: dog,
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
    /* dog.images = (!_.isEmpty(dog.images)) ? await dog.images.map((image, i) => {
       image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/download/dog/${dog.id}/images/${i}`) : '';
       // image.detail = `/litters/dog/${litterId}`;
       delete image.fd;
       return image;
     }) : '';*/
    //
    // // Подготовка объекта фотоссессии
    // dog.puppies = (!_.isEmpty(dog.puppies)) ? await dog.puppies.map((photoSet, i) => {
    //   photoSet.comments = _.isArray(photoSet.comments) ? photoSet.comments : [];
    //   photoSet.photos.map((image, y) => {
    //     image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/api/v1/files/download/dog/${dog.id}/puppies/${y}/${i}`) : '';
    //     delete image.fd;
    //   });
    //   // image.detail = `/litters/dog/${litterId}`;
    //
    //   return photoSet;
    // }) : '';
    //

    // dog.bornNt = moment(dog.born, moment.HTML5_FMT.DATETIME_LOCAL).format(format);
    // Устанавливаем свойство источника изображения
    // // Первый аргумент, базовый url
    // dog.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/litters/${dog.id}`);
    // // dog.bornNt = moment(dog.born).format(format);
    // dog.bornNt = moment.parseZone(dog.born).format(format);

    // ... затем мы удаляем наш файловый дескриптор
    // delete dog.imageUploadFD;
    // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию


    console.log('DOGG::: ', dog);
    // Рассылаем данные всем подписанным на событие list-* данной комнаты.

    // Respond with view.
    return exits.success({
      currentSection: 'dog',
      dog
    });

  }

};
