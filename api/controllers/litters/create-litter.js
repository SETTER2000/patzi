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
    let fileList, puppies = '';
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }


    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'litter');


    if (inputs.fileList) {
      fileList = inputs.fileList.filter(o => !_.isNull(o));
      _.each(fileList, img => {
        delete img.filename;
        delete img.status;
        delete img.field;
      });
    }


    if (inputs.puppies) {
      puppies = inputs.fileList.filter(o => !_.isNull(o));
      _.each(puppies, img => {
        delete img.filename;
        delete img.status;
        delete img.field;
      });
    }


    let born = inputs.born.replace(/"([^"]+(?="))"/g, '$1');


    // Создать помёт
    let litter = await Litter.create({
      letter: _.trim(inputs.letter).toUpperCase(),
      sire: inputs.sire,
      images: fileList,
      puppies: puppies,
      dam: inputs.dam,
      born: moment.tz(born, 'Europe/Moscow').format(),
      owner: this.req.me.id,
      description: inputs.description,
      sessionName: inputs.sessionName.slice(0, 60),
    }).fetch();


    // Если не создан возвращаем ошибку.
    if (!litter) {
      throw 'badRequest';
    }


    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('litter', 'list-litter');


    return exits.success();

  }
};
