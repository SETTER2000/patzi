module.exports = {


  friendlyName: 'Download photo',


  description: 'Скачать файл фотографии (возвращая поток).',


  inputs: {
    section: {
      description: 'Наименование коллекции.',
      type: 'string',
      required: true
    },
    id: {
      description: 'Идентификатор объекта из данной коллекции.',
      type: 'number',
      required: true
    },

  },


  exits: {
    success: {
      outputDescription: 'The streaming bytes of the specified kennel\'s photo.',
      outputType: 'ref'
    },
    forbidden: {
      responseType: 'forbidden'
    },
    notFound: {
      responseType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    let o = {};
    const url = require('url');
    o[inputs.section] = inputs.id;
    let imagesTry;
    let images;
    images = await Image.findOne(o);

    if (!images) {
      throw 'notFound';
    }

    images = imagesTry = images.img;

    console.log('images: ', images);
    _.each(images, (image) => {
      image.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/files/download/${image.id}`);
      delete image.fd;
      delete image.size;
      delete image.type;
      delete image.filename;
      delete image.status;
      delete image.field;
      delete image.name;

    });
    console.log('images: ', images);
    /**
     * ПЕРЕВЕРНУЛИ: === -> !== , || -> &&,  _.any -> !_.any
     * Так что теперь мы говорим:
     * "Если вы не являетесь владельцем фото и не один из ваших друзей тоже,
     * то это означает, что вам запрещено видеть эту вещь.
     */
    // if (this.req.me.id !== kennel.owner && !_.any(kennel.friends, {id: kennel.owner})) {
    //   throw 'forbidden';
    // }

    //************************************//
    // **** ФОРМИРУЕМ ЗАГРУЗКУ ФАЙЛА **** //
    //************************************//
    // Set the mime type for the response
    // Это устанавливает mime тип ответа
    this.res.type('image/jpeg');

    /**
     * startDownload - функция от модуля sails-hook-uploads
     * мы будем использовать этот метод для загрузки файла
     * Этот метод стартует загрузку в поток байтов файла, после
     * полной загрузки сервер отдаст success
     *
     * Ответ о благополучном завершении отдачи файла
     */
    return imagesTry[0].fd ? await sails.startDownload(imagesTry[0].fd) : '';

  }
};
