module.exports = {
  friendlyName: 'Create kennel',
  description: 'Создаём, добавляем новый питомник.',
  inputs: {
    label: {
      type: 'string',
      required: true,
      description: 'Официальное наименование питомника.'

    },
    registerNumber: {
      type: 'string',
      required: true,
      description: 'Регистрационный нssомер.'
    },
    dateCreate: {
      type: 'string',
      required: true,
      description: 'Дата создания питомника.'
    },
    continent: {
      type: 'string',
      required: true,
      description: 'Континент где находится питомник.'
    },
    country: {
      type: 'string',
      required: true,
      description: 'Страна где находится питомник.'
    },
    region: {
      type: 'string',
      required: true,
      description: 'Край, область где находится питомник.'
    },
    breeder: {
      type: 'string',
      description: 'Идентификатор хозяина питомника.',
      defaultsTo:''
    },
    file: {
      type: 'ref',
      description: 'Массив с данными о загруженом файле. Логотип в данной коллекции.'
    },
    subtitle: {
      type: 'string',
      maxLength: 300,
      description: 'Дополнительная информация. Описание питомника.'
    },
    manufacturers: {
      type: 'string',
      maxLength: 300,
      description: 'Описание производителей питомника. Абзац о собаках питомника.'
    },
    phones: {
      description: 'Массив телефонов для связи.',
      // Тип массив словарей
      type: [{
        key: 'number',
        value: 'string',
        fullName: 'string'
      }],
      example: [
        {
          key: 1,
          value: '+7 (910) 406 7 406',
          fullName: 'Olga Petrova'
        }
      ],
    },
    action: {
      type: 'boolean',
      description: 'Видимость питомника.',
      defaultsTo: false
    },
    yourKennel: {
      type: 'boolean',
      description: 'Это ваш питомник?.',
      defaultsTo: false
    },
    site: {
      type: 'string',
      description: 'Сайт.'
    },
    coOwner: {
      type: 'string',
      description: 'Совладелец питомника.'
    },
    city: {
      type: 'string',
      description: 'Город где находится питомник.'
    },
    address: {
      type: 'string',
      description: 'Адрес где находится питомник.'
    },
    rightName: {
      type: 'string',
      description: 'Имя собаки с какой стороны от названия питомника пишется.',
      example: 'left'
    }
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
    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'kennel');
    inputs.file = (_.get(inputs.file, 'fd')) ? inputs.file : '';
     let beforeNewKennel = {
       imageUploadFD: inputs.file.fd,
       imageUploadMime: inputs.file.type,
       filename: inputs.file.filename,
       label: _.startCase(inputs.label.toString().toLowerCase()).replace(/Fci\b/g, '(FCI)'),
       yourKennel: inputs.yourKennel,
       breeder: (inputs.yourKennel) ? this.req.me.id : null,
       whoCreate: this.req.me.id,
       rightName: inputs.rightName,
       registerNumber: _.trim(inputs.registerNumber),
       dateCreate: await sails.helpers.dateFix(inputs.dateCreate),
       subtitle: inputs.subtitle,
       manufacturers: inputs.manufacturers,
       site: _.trim(inputs.site),
       city: _.isEmpty(inputs.city) ? null : inputs.city,
       country: inputs.country,
       continent: inputs.continent,
       region: inputs.region,
       address: inputs.address,
       phones: inputs.phones
     };
    let newKennel = await Kennel.create(beforeNewKennel).fetch();
    if (!newKennel) {
      throw 'badRequest';
    }
    /**
     * Для питомника с id 23 добавить владельца с  id 12
     * await Kennel.addToCollection(23, 'parents', 12);
     * Для собаки 3 замените всех детей
     * из коллекции «children» на детей 99 и 98:
     * await Dog.replaceCollection(3, 'children').members([99,98]);
     *
     * Для собаки с updateDog.id меняем родителей в массиве идентификаторы
     */
    let owners = [];
    (inputs.coOwner) ? owners.push(inputs.coOwner) : '';
    let ownerFind = await Kennel.find({fullName: owners});
    owners.length > 0 ? await Kennel.addToCollection(newKennel.id, 'owners').members(owners) : '';
    let addGroup = await sails.helpers.addGroup.with({
      groups: ['user', 'breeder', 'owner'],
      userId: this.req.me.id
    });
    // Вызываем помощника сформировать правильно данные для ответа.
    let result = await sails.helpers.formatCollectionKennel(req);
    if (newKennel) {
      await sails.helpers.sendTemplateEmail.with({
        to: req.me.emailAddress,
        subject: 'Создан новый питомник в системе patzi',
        template: 'email-verify-new-email',
        templateData: {
          fullName: inputs.fullName||req.me.fullName,
          token: newKennel.id
        }
      });
    }
    // Рассылаем данные всем подписанным на событие list данной комнаты.
    await sails.sockets.broadcast('kennel', 'list-kennel', result.collection);
    return exits.success();
  }
};
