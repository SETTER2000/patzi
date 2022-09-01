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
      case 'Post':
        collectionObject = await Post.findOne(inputs.id);
        break;
      case 'Title':
        collectionObject = await Title.findOne(inputs.id);
        break;
      case 'Federation':
        collectionObject = await Federation.findOne(inputs.id);
        break;
    }

    if (!collectionObject) {
      throw 'notFound';
    }

    let arr = _.isArray(collectionObject[folder][inputs.photoSet]['photos']) ?
      await collectionObject[folder][inputs.photoSet]['photos'].filter((image, index) => inputs.key === index) :
      await collectionObject[folder].filter((image, index) => inputs.key === index);
    if (!arr) {
      throw 'notFound';
    }

    //************************************//
    // **** ФОРМИРУЕМ ЗАГРУЗКУ ФАЙЛА **** //
    //************************************//
    // Это устанавливает mime тип ответа
    if (!arr[0].fd) {
      throw 'notFound';
    }
    this.res.type(arr[0].type);

    /**
     * startDownload - функция от модуля sails-hook-uploads
     * Этот метод стартует загрузку в поток байтов файла, после
     * полной загрузки сервер отдаст success
     * Ответ о благополучном завершении отдачи файла
     */
    return await sails.startDownload(arr[0].fd);
  }
};
