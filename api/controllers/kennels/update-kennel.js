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
    file: {
      type: 'ref',
      description: 'Массив с данными о загруженом файле. Логотип в данной коллекции.'
    },
    dateCreate: {
      type: 'string',
      required: true,
      description: 'Дата создания питомника.'
    },

    rightName: {
      type: 'string',
      description: 'Имя собаки с какой стороны от названия питомника пишется.',
      example: 'left'
    },


    yourKennel: {
      type: 'boolean',
      description: 'Это ваш питомник?.',
      allowNull: true
    },

    registerNumber: {
      type: 'string',
      // required: true,
      description: 'Регистрационный номаер.'
    },

    subtitle: {
      type: 'string',
      maxLength: 300,
      description: 'Дополнительная информация. Описание питомника.'
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

    /* phones: {
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


     */
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


    let updateObj = {
      imageUploadFD: inputs.file.fd,
      imageUploadMime: inputs.file.type,
      filename: inputs.file.filename,
      // label: _.startCase(inputs.label.toString().toLowerCase()).replace(/Fci\b/g, '(FCI)'),
      whoCreate: this.req.me.id,
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
    /**
     * yourKennel - не может содержать значение null
     */
    inputs.yourKennel ? updateObj.yourKennel = this.req.me.id : '';
    let update = await Kennel.updateOne({id: inputs.id}).set(updateObj);

    // Если не создан возвращаем ошибку.
    if (!update) {
      throw 'badRequest';
    }

    return exits.success();

  }


};
