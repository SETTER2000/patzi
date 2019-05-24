module.exports = {


  friendlyName: 'View litter',


  description: 'Display "Litter" page.',

  inputs: {
    id: {
      description: 'Идентификатор помёта.',
      type: 'number',
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

    let litter = await Litter.findOne({id: inputs.id});

    if (!litter) {
      throw 'notFound';
    }

    litter.born = moment(litter.born).format('LL');
    // Устанавливаем свойство источника изображения
    // Первый аргумент, базовый url
    litter.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/litters/${litter.id}`);
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
