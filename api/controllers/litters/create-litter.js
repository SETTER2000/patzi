module.exports = {


  friendlyName: 'Create litter',


  description: 'Создаём, добавляем новый помёт.',


  inputs: {
    fileList: {
      type: 'ref',
      description: 'Массив с fd ссылками на фото родителей.'
    },
    puppies: {
      type: 'ref',
      description: 'Массив с fd ссылками на фото щенков.'
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


    sessionName: {
      type: 'string',
      example: 'Два дня от роду',
      description: 'Название фотосессии для щенков.'
    },


    dam: {
      type: 'ref',
      example: 'Sasquehanna (FCI) Ella',
      description: 'Сука.'
    },


    sire: {
      type: 'ref',
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
    const moment = require('moment');
    const tz = require('moment-timezone');
    moment.locale('en');

    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }


    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'litter');


    // console.log('inputs.fileList::', inputs.fileList);
    // // list = _.pluck(inputs.fileList, 'response');
    // console.log('list-1:: ', inputs.fileList);
    // let iterator = list.keys();
    if (inputs.fileList) {
      _.each(inputs.fileList, img => {
        delete img.filename;
        delete img.status;
        delete img.field;
      });
    }

    console.log('inputs.puppies: ', inputs.puppies);
    if (inputs.puppies) {
      _.each(inputs.puppies, img => {
        delete img.filename;
        delete img.status;
        delete img.field;
      });
    }

    // console.log('list-2:: ', inputs.fileList);
    //
    // console.log('CREATE-LITTER inputs.born:: ', inputs.born);

    let born = inputs.born.replace(/"([^"]+(?="))"/g, '$1');
    // Создать помёт
    let litter = await Litter.create({
      letter: _.trim(inputs.letter).toUpperCase(),
      sire: inputs.sire,
      images: inputs.fileList,
      puppies: inputs.puppies,
      dam: inputs.dam,
      born: moment.tz(born, 'Europe/Moscow').format(),
      owner: this.req.me.id,
      description: inputs.description,
      sessionName: inputs.sessionName.slice(0,60),
    }).fetch();


    // Если не создан возвращаем ошибку.
    if (!litter) {
      throw 'badRequest';
    }


    // Добавить помёт в коллекцию «Litter»
    // Первый аргумент Идентификатор помёта
    // Второй аргумент - это свойство модели по которому будет создана связь. Оно прописано во второй модели.
    // Третий аргумент Идентификаторы собак в массиве
    // Добавить собаку inputs.sire к помёту litter.id
    // await Litter.addToCollection(litter.id, 'dogs', inputs.sire);
    // await Litter.addToCollection(litter.id, 'dogs', inputs.dam);
    // await Litter.addToCollection(litter.id, 'dogs', [inputs.sire, inputs.dam]);

    // Если масиив с фотографиями не пустой, то добавляем его в коллекцию Image
    // if (!_.isEmpty(list)) {
    //   // Записываем фото на помёт
    //   let image = await Image.create({
    //     img: list,
    //     litter: litter.id
    //   }).fetch();
    // }


    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('litter', 'list-litter');


    return exits.success();

  }
};
