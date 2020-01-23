module.exports = {


  friendlyName: 'Download photo',


  description: 'Скачать файл фотографии (возвращая поток).',


  inputs: {
    collection: {
      type: 'string',
      required: true,
      description: 'Наименование коллекции.'
    },


    folder: {
      type: 'string',
      required: true,
      description: 'Наименование альбома.'
    },

    id: {
      description: 'Идентификатор объекта из данной коллекции.',
      type: 'string',
      required: true
    },

    key: {
      description: 'Ключ картинки в массиве картинок данного альбома.',
      type: 'number',
      required: true
    },

    photoSet: {
      description: 'Ключ фотосессии в массиве фотосессий данного альбома.',
      type: 'number',
      example: 0
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
      outputDescription: 'I can not find a photo..',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs) {
    /*const btoa = require('btoa');
    const resizeX = 1424
      , resizeY = 800
      , gravity = 'Center'// NorthWest, North, NorthEast, West, Center, East, SouthWest, South, SouthEast
      , Q = 45 // Качество изображения (100 - 0) http://www.graphicsmagick.org/GraphicsMagick.html#details-compress
    ;*/
    let collection = _.capitalize(inputs.collection);
    let collectionObject = '';
    inputs.photoSet = inputs.photoSet ? inputs.photoSet : 0;
    // Если название альбома существует, то выводим его | images
    let folder = inputs.folder ? inputs.folder : 'images';


    switch (collection) {
      case 'Litter':
        collectionObject = await Litter.findOne(inputs.id);
        break;
      case 'Kennel':
        collectionObject = await Kennel.findOne(inputs.id);
        break;
      case 'User':
        collectionObject = await User.findOne(inputs.id);
        break;
      case 'Dog':
        collectionObject = await Dog.findOne(inputs.id);
        break;
      case 'Thing':
        collectionObject = await Thing.findOne(inputs.id);
        break;
      case 'Topic':
        collectionObject = await Topic.findOne(inputs.id);
        break;
    }

    if (!collectionObject) {
      // console.log('Не найдено!' + collectionObject);
      throw 'notFound';
    }

    // if (_.isArray(collectionObject[folder][inputs.photoSet]['photos'])) {
    //   // console.log('ARRRAY!', collectionObject[folder][inputs.photoSet]['photos']);
    // }
    // else {
    //   // console.log('NE ARRAY!', collectionObject[folder][inputs.photoSet]['photos']);
    // }


    let arr = _.isArray(collectionObject[folder][inputs.photoSet]['photos']) ?
      await collectionObject[folder][inputs.photoSet]['photos'].filter((image, index) => inputs.key === index) :
      await collectionObject[folder].filter((image, index) => inputs.key === index);
    if (!arr) {
      throw 'notFound';
    }


    // console.log('Выходной массив arr:', arr);


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
    if (!arr[0].fd) {
      throw 'notFound';
    }
    this.res.type(arr[0].type);


    // const imageRequest = JSON.stringify({
    //   bucket: 'paltos',
    //   key: arr[0].name,
    //   edits: {
    //     grayscale: true,
    //     resize: {
    //       width: resizeX,
    //       height: resizeY
    //     }
    //   }
    // });
    // arr[0].fd = `${sails.config.custom.cloudFrontUrl}/${btoa(imageRequest)}`;

// console.log('arr[0].cloudFrontUrl:::: ' , arr[0].cloudFrontUrl);
// console.log('arr[0].fd:::: ' , arr[0].fd);

// console.log('skp.read(arr[0].cloudFrontUrl)::: ' , await sails.startDownload(arr[0].cloudFrontUrl));
// console.log('await sails.startDownload(arr[0].fd)::: ' , await sails.startDownload(arr[0].fd));

    /**
     * startDownload - функция от модуля sails-hook-uploads
     * мы будем использовать этот метод для загрузки файла
     * Этот метод стартует загрузку в поток байтов файла, после
     * полной загрузки сервер отдасть success
     *
     * Ответ о благополучном завершении отдачи файла
     */
    // return await sails.startDownload(arr[0].fd);
    return await sails.startDownload(arr[0].fd);
  }
};
