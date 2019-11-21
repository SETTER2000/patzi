module.exports = {


  friendlyName: 'Update kennel',


  description: 'Обновить данные питомника',


  inputs: {
    id: {
      type: 'string',
      required: true,
      description: 'Идентификатор питомника'
    },

    label: {
      type: 'string',
      required: true,
      description: 'Официальное наименование питомника.'

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

    dateCreate: {
      type: 'string',
      required: true,
      description: 'Дата создания питомника.'
    },

    registerNumber: {
      type: 'string',
      required: true,
      description: 'Регистрационный номер.'
    },


    city: {
      type: 'string',
      description: 'Город где находится питомник.'
    },

    breeder: {
      type: 'string',
      description: 'Идентификатор хозяина питомника.'
    },


    file: {
      type: 'ref',
      description: 'Массив с данными о загруженом файле. Логотип в данной коллекции.'
    },


    rightName: {
      type: 'boolean',
      description: `С какой стороны пишется имя собаки от названия питомника.
                    true - имя собаки пишется справа от названия питомника (KennelName DogName).`,
    },


    action: {
      type: 'boolean',
      description: `Видимость питомника в системе. true - виден`,
    },


    yourKennel: {
      type: 'boolean',
      description: 'Это ваш питомник?.',
    },

    subtitle: {
      type: 'string',
      maxLength: 300,
      description: 'Дополнительная информация. Описание питомника.'
    },


    site: {
      type: 'string',
      description: 'Сайт.'
    },

    address: {
      type: 'string',
      description: 'Адрес где находится питомник.'
    },

    coOwner: {
      type: 'string',
      description: 'Совладелец питомника.'
    },


    phones: {
      description: 'Массив телефонов для связи.',
      // Тип массив словарей
      type: [{
        key: 'number',
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
    },

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
      console.log('ВАСЯ я дерево!');
      throw 'badRequest';
    }


    // Have the socket which made the request join the "kennel" room.
    // Подключить сокет, который сделал запрос, к комнате «kennel».
    await sails.sockets.join(req, 'kennel');
    console.log('INPUTS:::: ', inputs);

    inputs.file = (_.get(inputs.file, 'fd')) ? inputs.file : '';


    let obj = {
      imageUploadFD: inputs.file.fd,
      imageUploadMime: inputs.file.type,
      filename: inputs.file.filename,
      // label: _.startCase(inputs.label.toString().toLowerCase()).replace(/Fci\b/g, '(FCI)'),
      whoCreate: this.req.me.id,
      yourKennel: inputs.yourKennel,
      /**
       * Здесь устанавливаем владельца питомника.
       * В зависимости ответа на вопрос "Это ваш питомник?"
       * становятся видимы разные поля.
       * Если питомник ваш, то видно поле добавления совладельца питомника,
       * если питомник не ваш и вы есть суперадмин или админ, то видно поле
       * добавления владельца (breeder)
       */
      breeder: (inputs.yourKennel) ? this.req.me.id : inputs.breeder ? inputs.breeder : null,
      action: inputs.action,
      rightName: inputs.rightName,
      registerNumber: _.trim(inputs.registerNumber),
      dateCreate: await sails.helpers.dateFix(inputs.dateCreate),
      subtitle: inputs.subtitle,
      site: _.trim(inputs.site),
      city: inputs.city,
      country: inputs.country,
      continent: inputs.continent,
      region: inputs.region,
      address: inputs.address,
      phones: inputs.phones
    };

    let update = await Kennel.updateOne({id: inputs.id}).set(obj);

    /**
     * Если в поле inputs.breeder есть значение, то добавляем этого пользователя в группу breeder
     */
    inputs.breeder ? await sails.helpers.addGroup.with({
      groups: ['user', 'owner', 'breeder'],
      userId: inputs.breeder
    }) : '';

    /**
     * Для питомника с id 23 добавить владельца с  id 12
     * await Kennel.addToCollection(23, 'parents', 12);
     * Для собаки 3 замените всех детей
     * из коллекции «children» на детей 99 и 98:
     * await Dog.replaceCollection(3, 'children').members([99,98]);
     *
     * Для собаки с updateDog.id меняем родителей в массиве идентификаторы
     */

    let kennel = await Kennel.find({id: inputs.id}).populate('owners');
    let ownersId = _.pluck(kennel.owners, 'id');
    inputs.coOwner ? ownersId.push(inputs.coOwner) : '';

    // Если есть идентификаторы совладельцев ...
    if (ownersId.length > 0) {
      // ... то обновляет данные о совладельцах питомника
      await Kennel.addToCollection(inputs.id, 'owners').members(ownersId);
      // ...  то добавляем совладельцев в группы соответствия
      _.each(ownersId, async id => {
        await sails.helpers.addGroup.with({
          groups: ['user', 'owner', 'breeder'],
          userId: id
        })
      });
    }

    /**
     * Обновляем список групп для пользователя, который отказался от питомника как владелец и
     * при этом он не является админом или суперадмином.
     * Так же учитывается является ли пользователь совладельцем других питомников,
     * т.е. если питомник может принадлежать тебе только один, то совладельцем ты
     * можешь быть сколько угодно раз и так же будешь входить в группу breeder.
     *
     */
    if (!inputs.yourKennel && (!req.me.isAdmin && !req.me.isSuperAdmin)) {

      /**
       * Очищаем всех совладельцев этого питомника, т.к. только владелец питомника может
       * задавать данный параметр.
       */
      await Kennel.replaceCollection(inputs.id, 'owners').members([]);


      /**
       * Массив содержит идентификаторы всех совладельцев со всех питомников.
       * @type {Array}
       */
      let ids = [];
      let ownerToKennel = await Kennel.find().populate('owners');
      _.each(ownerToKennel, otk => {
        ids.push(_.pluck(otk.owners, 'id'));
      });

      console.log('_.flatten(ids).includes(req.me.id)::: ' , _.flatten(ids).includes(req.me.id));

      /**
       * Если пользователь не найден в качестве совладельца в других питомниках,
       * то убираем его из группы breeder
       */
      !_.flatten(ids).includes(req.me.id) ? await sails.helpers.addGroup.with({
        groups: ['user', 'owner'],
        userId: req.me.id
      }) : '';

    }


    // Если не создан возвращаем ошибку.
    if (!update) {
      throw 'badRequest';
    }

    return exits.success();

  }


};
