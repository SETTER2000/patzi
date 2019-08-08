module.exports = {


  friendlyName: 'View litter',


  description: 'Display "Litter" page.',

  inputs: {
    id: {
      description: 'Идентификатор помёта.',
      type: 'string',
      // required: true
    },
    letter: {
      description: 'Идентификатор помёта.',
      type: 'string',
      required: true
    }
  },

  exits: {
    success: {
      viewTemplatePath: 'pages/litters/litter'
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
    // Формат отображаемой даты
    let format = 'LL';
    let litter = await Litter.findOne({letter: inputs.letter}).populate('owner');
    // let litter = await Litter.findOne({id: inputs.id}).populate('owner');

    if (!litter) {
      throw 'notFound';
    }
    // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    moment.locale(this.req.me.preferredLocale);
    // Формируем массив с картинками

    litter.images = (!_.isEmpty(litter.images)) ? await litter.images.map((image, i) => {
      image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/api/v1/files/download/litter/${litter.id}/images/${i}`) : '';
      // image.detail = `/litters/litter/${litterId}`;
      delete image.fd;
      return image;
    }) : '';

    // Подготовка объекта фотоссессии
    litter.puppies = (!_.isEmpty(litter.puppies)) ? await litter.puppies.map((photoSet, i) => {

      photoSet.photos.map((image,y)=>{
        image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/api/v1/files/download/litter/${litter.id}/puppies/${y}/${i}`) : '';
        delete image.fd;
      });
      // image.detail = `/litters/litter/${litterId}`;

      return photoSet;
    }) : '';


    // litter.bornNt = moment(litter.born, moment.HTML5_FMT.DATETIME_LOCAL).format(format);
    // Устанавливаем свойство источника изображения
    // Первый аргумент, базовый url
    litter.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/litters/${litter.id}`);
    // litter.bornNt = moment(litter.born).format(format);
    litter.bornNt = moment.parseZone(litter.born).format(format);

    // ... затем мы удаляем наш файловый дескриптор
    delete litter.imageUploadFD;
    // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию
    delete litter.imageUploadMime;


    // Respond with view.
    return exits.success({
      currentSection: 'litter',
      litter
    });

  }

};
