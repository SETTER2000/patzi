module.exports = {


  friendlyName: 'Create dog',


  description: 'Создаём, добавляем новую собаку.',


  inputs: {

    label: {
      type: 'string',
      required: true,
      description: `Официальное имя собаки. Поле обязательно для заполнения.
      В рамках всей коллекции это поле не может быть сделано уникальным, только проверка имени вместе 
      с названием питомника может однозначно установить уникальность собаки в базе.`
    },


    fileList: {
      type: 'ref',
      description: 'Массив с файлами данных о загруженных файлах.'
    },


    subtitle: {
      type: 'string',
      description: 'Дополнительная информация. Описание питомника.'
    },


    kennel: {
      type: 'string',
      description: 'Идентификатор питомника'
    },


    gender: {
      type: 'string',
      required: true,
      example:'sire, dam',
      description: 'Пол собак. В смысле не пол собаки, а конец есть или нет.'
    },


    dateBirth: {
      type: 'string',
      required: true,
      description: 'Дата рождения.'
    },


    nickname: {
      type: 'string',
      description: 'Кличка, ласковое имя.'
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
    },

    dogAlreadyInUse: {
      statusCode: 409,
      description: 'The specified dog name is already in use.',
    },

    dogAlreadyInUseRU: {
      statusCode: 409,
      description: 'Указанное имя собаки уже используется.',
    },
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


    let list = [];
    list = _.pluck(inputs.fileList, 'response');


    // Удаляем название питомника из имени собаки
    let kennel = await Kennel.findOne({id: inputs.kennel});
    inputs.label = inputs.label.replace(kennel.label, '');


    // Проверка существования такой же собаки.
    let conflictingDog = await Dog.findOne({
      kennel: inputs.kennel,
      label: inputs.label
    });
    if (conflictingDog) {
      throw (req.me.preferredLocale === 'ru') ? 'dogAlreadyInUseRU' : 'dogAlreadyInUse';
    }

    // Создаём собаку
    let newDog = await Dog.create({
      label:  _.startCase(inputs.label.toString().toLowerCase()).replace(/Fci\b/g, '(FCI)'),
      kennel: inputs.kennel,
      gender: inputs.gender,
      dateBirth: inputs.dateBirth,
      nickname: inputs.nickname,
      subtitle: inputs.subtitle,
    }).fetch();


    // Записываем фото на собаку
    let image = await Image.create({
      img: list,
      dog: newDog.id
    }).fetch();


    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('dog', 'list-dog');

    return exits.success();
  }

};
