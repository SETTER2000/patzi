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

    continentId: {
      type: 'string',
      required: true,
      description: 'Континент где находится питомник.'
    },


    countryId: {
      type: 'string',
      required: true,
      description: 'Страна где находится питомник.'
    },


    regionId: {
      type: 'string',
      // required: true,
      description: 'Край, область где находится питомник.'
    },


    cityId: {
      type: 'string',
      description: 'Идентификатор города где находится питомник.'
    },


    city: {
      type: 'ref',
      description: 'Идентификатор города где находится питомник.'
    },


    registerNumber: {
      type: 'string',
      required: true,
      description: 'Регистрационный номер.'
    },

    dateCreate: {
      type: 'string',
      required: true,
      description: 'Дата создания питомника.'
    },

    breederId: {
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


    manufacturers: {
      type: 'string',
      maxLength: 300,
      description: 'Описание производителей питомника. Абзац о собаках питомника.'
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
    notFound: {
      responseType: 'notFound'
    },
    forbidden: {
      description: 'Access is denied.',
      responseType: 'forbidden'
    },
    badRequest: {
      description: 'No image upload was provided.',
      responseType: 'badRequest'
    }
  },

  fn: async function (inputs, exits) {
    const ObjectID = require("bson-objectid");
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
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
      // whoCreate: this.req.me.id,
      yourKennel: inputs.yourKennel,
      /**
       * Здесь устанавливаем владельца питомника.
       * В зависимости ответа на вопрос "Это ваш питомник?"
       * становятся видимы разные поля.
       * Если питомник ваш, то видно поле добавления совладельца питомника,
       * если питомник не ваш и вы есть суперадмин или админ, то видно поле
       * добавления владельца (breeder)
       */
      breeder: (inputs.yourKennel) ? this.req.me.id : inputs.breederId ? inputs.breederId : null,
      action: inputs.action,
      rightName: inputs.rightName,
      registerNumber: _.trim(inputs.registerNumber),
      dateCreate: await sails.helpers.dateFix(inputs.dateCreate),
      subtitle: inputs.subtitle,
      manufacturers: inputs.manufacturers,
      site: _.trim(inputs.site),
      address: inputs.address,
      phones: inputs.phones,
      continent: inputs.continentId,
      country: inputs.countryId,
      region: inputs.regionId,
      city: inputs.cityId,
    };

    console.log('Перед обновлением объект:::: ', obj);

    await Kennel.update({id: inputs.id}).set(obj);

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
    if (!kennel) {
      throw 'notFound';
    }
    let ownersId = _.pluck(kennel.owners, 'id');
    inputs.coOwner ? ownersId.push(inputs.coOwner) : '';

    /**
     *  Добавляем связь бридеру с питомником
     */
    console.log('obj.breeder:: ', obj.breeder);
    await User.replaceCollection(obj.breeder.toString(), 'kennelBreed').members(inputs.id);
    // await Kennel.addToCollection(inputs.id, 'breeder').members(obj.breeder.toString());
    // Если есть идентификаторы совладельцев ...
    if (ownersId.length > 0) {
      // ... то обновляет данные о совладельцах питомника
      // await Kennel.addToCollection(inputs.id, 'owners').members(ownersId);
      await Kennel.replaceCollection(inputs.id, 'owners').members(ownersId);

      // ...  то добавляем совладельцев в группы соответствия
      _.each(ownersId, async id => {
        await sails.helpers.addGroup.with({
          groups: ['user', 'owner', 'breeder'],
          userId: id
        });
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

      // console.log('_.flatten(ids).includes(req.me.id)::: ' , _.flatten(ids).includes(req.me.id));

      /**
       * Если пользователь не найден в качестве совладельца в других питомниках,
       * то убираем его из группы breeder
       */
      !_.flatten(ids).includes(req.me.id) ? await sails.helpers.addGroup.with({
        groups: ['user', 'owner'],
        userId: req.me.id
      }) : '';

    }


    return exits.success();

  }


};
