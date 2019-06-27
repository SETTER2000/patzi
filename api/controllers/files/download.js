module.exports = {


  friendlyName: 'Download photo',


  description: 'Скачать файл фотографии (возвращая поток).',


  inputs: {
    collection: {
      description: 'Наименование коллекции.',
      type: 'string',
      required: true
    },

    id: {
      description: 'Идентификатор объекта из данной коллекции.',
      type: 'string',
      required: true
    },

    key: {
      description: 'Ключ картинки в массиве картинок.',
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


  fn: async function (inputs) {
    let query = {};
    query[inputs.collection] = inputs.id;

    let collectionObject = await Image.findOne(query);
    if (!collectionObject) {
      throw 'notFound';
    }
   let arr =  collectionObject.img.filter((im,index)=>inputs.key === index);
    if (!arr) {
      throw 'notFound';
    }
console.log('ARRRR: ', arr);
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
    // this.res.type(images.imageUploadMime);

    /**
     * startDownload - функция от модуля sails-hook-uploads
     * мы будем использовать этот метод для загрузки файла
     * Этот метод стартует загрузку в поток байтов файла, после
     * полной загрузки сервер отдасть success
     *
     * Ответ о благополучном завершении отдачи файла
     */

    return arr[0].fd ? await sails.startDownload(arr[0].fd) : '';
  }
};
