module.exports = {


  friendlyName: 'Create litter',


  description: 'Создаём, добавляем новый помёт.',


  inputs: {
    fileList: {
      type: 'ref',
      description: 'Массив с файлами данных о загруженных файлах.'
    },

    letter: {
      type: 'string',
     required: true,
      description: 'Буква помёта.',
      example: 'A'
    },

    born: {
      type: 'string',
      required: true,
      description: 'Дата появления на свет помёта.',
      //required: true
    },


    description: {
      type: 'string',
      example: 'Прекрасный звёздный помёт!',
      description: 'Описание помёта.'

    },


    dam: {
      type: 'string',
      example: 'Sasquehanna (FCI) Ella',
      description: 'Сука.'
    },


    sire: {
      type: 'string',
      example: 'Poale Ell Adam',
      description: 'Кобель.'
    }

  },


  exits: {
    success: {
      // Информация о вновь созданной записи
      outputDescription: 'Information about the newly created record.',
      // Устанавливаем выходной тип данных. Хорошая практика для документирования кода.
      outputType: {
        id: 'number',
        imageSrc: 'string'
      },
    },
    badRequest: {
      description: 'The object was not created.',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {


    // Бибилиотека Node.js
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      console.log('HHIOOOo');
      throw 'badRequest';
    }


    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'litter');


    let list = [];
    list = _.pluck(inputs.fileList, 'response');


    // Создать помёт
    let litter = await Litter.create({
      letter: _.trim(inputs.letter).toUpperCase(),
      born: inputs.born,
      owner: this.req.me.id,
      description: inputs.description,
    }).fetch();


    // Если не создан возвращаем ошибку.
    if (!litter) {
      throw 'badRequest';
    }


    // Добавить помёт в коллекцию «Litter»
    // Первый аргумент Идентификатор помёта
    // Второй аргумент - это свойство модели по которому будет создана связь. Оно прописано во второй модели.
    // Третий аргумент Идентификаторы собак в массиве
    await Litter.addToCollection(litter.id, 'dogs', [inputs.sire, inputs.dam]);


    // Записываем фото на помёт
    let image = await Image.create({
      img: list,
      litter: litter.id
    }).fetch();


    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('litter', 'list-litter');


    return exits.success();

  }
};
