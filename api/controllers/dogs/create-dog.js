module.exports = {


  friendlyName: 'Create dog',


  description: 'Создаём, добавляем новый питомник.',


  inputs: {

    label: {
      type: 'string',
      required: true,
      description: 'Официальное имя собаки.'

    },

  fileList: {
      type: 'ref',
      description: 'Массив с файлами данных о загруженных файлах.'
    },


    subtitle: {
      type: 'string',
      description: 'Дополнительная информация. Описание питомника.'
    },


   /* phones: {
      description: 'Массив телефонов для связи.',
      // Тип массив словарей
      type: [{
        key:'number',
        value: 'string',
        fullName: 'string'
      }],
      // type: ['string'],
      // Пример данных, которые ожидаются на входе в экшен
      example: [
        {
          key: 1,
          value: '+7 (910) 406 7 406',
          fullName: 'Olga Petrova'
        }
      ],
      // required: true

    },


    yourDog: {
      type: 'boolean',
      description: 'Это ваш питомник?.',
      defaultsTo:false
    },

    registerNumber: {
      type: 'string',
      required: true,
      description: 'Регистрационный номаер.'
    },

    site: {
      type: 'string',
      description: 'Сайт.'
    },

    country: {
      type: 'string',
      required: true,
      description: 'Страна где находится питомник.'
    },

    address: {
      type: 'string',
      description: 'Адрес где находится питомник.'
    },

    city: {
      type: 'string',
      description: 'Город где находится питомник.'
    },

    continent: {
      type: 'string',
      required: true,
      description: 'Континент где находится питомник.'
    },

    dateCreate: {
      type: 'string',
      required: true,
      description: 'Дата создания.'
    },

    rightName: {
      type: 'string',
      description: 'Имя собаки с какой стороны от названия питомника пишется.',
      example: 'left'
    }*/
  },


  exits: {
    success: {
      outputDescription: 'Information about the newly created record.',
      // Устанавливаем выходной тип данных. Хорошая практика для документирования кода.
      outputType: {
        id: 'number',
        imageSrc: 'string'
      },
    },
    badRequest: {
      description: 'No image upload was provided.',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {
    // Бибилиотека Node.js
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }


    // Have the socket which made the request join the "kennel" room.
    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'dog');
    // inputs.file = inputs.file[0];
console.log('FILELIST:', inputs.fileList.response);

let list = [];

list = _.pluck(inputs.fileList, 'response');
console.log('LIST: ' , list);
    // _.each(list, (file) => {
    //   // Устанавливаем свойство источника изображения
    //   // Первый аргумент, базовый url
    //   // file.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/things/${thing.id}`);
    //   //
    //   // imageUploadFD: info.fd,
    //   //   imageUploadMime: info.type,
    //   //   filename: info.filename,
    //   //
    //   // // ... затем мы удаляем наш файловый дескриптор
    //   // delete file.imageUploadFD;
    //   // // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию
    //   // delete file.imageUploadMime;
    // });
    // inputs.file = (_.get(inputs.file, 'fd')) ? inputs.file : '';

    let newDog = await Dog.create({
      fileList:list,
      // imageUploadFD: inputs.file.fd,
      // imageUploadMime: inputs.file.type,
      // filename: inputs.file.filename,
      label: _.trim(inputs.label),
      // yourDog: (inputs.yourDog) ? this.req.me.id : null,
      // whoCreate: this.req.me.id,
      // rightName: inputs.rightName,
      // registerNumber: _.trim(inputs.registerNumber),
      // dateCreate: inputs.dateCreate,
      subtitle: inputs.subtitle,
      // site: _.trim(inputs.site),
      // city: inputs.city,
      // country: inputs.country,
      // region: inputs.continent,
      // address: inputs.address,
      // phones: inputs.phones
    }).fetch();

    // Рассылаем данные всем подписанным на событие list данной комнаты.
    await sails.sockets.broadcast('dog', 'list-dog');

    return exits.success();
  }

};
