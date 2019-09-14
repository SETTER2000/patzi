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
    _.each(dogs, (dog) => {
      dog.born = moment(dog.born).format('LL');
      // Устанавливаем свойство источника изображения
      // Первый аргумент, базовый url
      dog.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/dogs/${dog.id}`);
      // ... затем мы удаляем наш файловый дескриптор
      delete dog.imageUploadFD;
      // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию
      delete dog.imageUploadMime;
    });

    // Respond with view.
    return exits.success({
      currentSection: 'dog',
      dogs
    });
  }


};
