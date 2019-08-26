module.exports = {


  friendlyName: 'Src image preparation',


  description: '',


  inputs: {
    year: {
      description: 'Год помёта.',
      type: 'string',
      maxLength:4,
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
    let litter = await Litter.findOne({letter: inputs.letter, year:inputs.year}).populate('owner');

    if (!litter) {
      console.log('Ошибка! Объект litter не создан.');
    }

    litter.images = (!_.isEmpty(litter.images)) ? await litter.images.map((image, i) => {
      image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/api/v1/files/download/litter/${litter.id}/images/${i}`) : '';
      delete image.fd;
      return image;
    }) : '';


    // Подготовка объекта фотоссессии
    litter.puppies = (!_.isEmpty(litter.puppies)) ? await litter.puppies.map((photoSet, i) => {
      photoSet.comments = _.isArray(photoSet.comments) ? photoSet.comments : [];
      photoSet.photos.map((image, y) => {
        image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/api/v1/files/download/litter/${litter.id}/puppies/${y}/${i}`) : '';
        delete image.fd;
      });
      return photoSet;
    }) : '';

    litter.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/litters/${litter.id}`);
    litter.bornNt = moment.parseZone(litter.born).format(format);
    return litter;


  }
};

