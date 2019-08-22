module.exports = {


  friendlyName: 'Add session photo',


  description: '',


  inputs: {

    id: {
      type: 'string',
      description: `Идентификатор помёта.`,
      required: true
    },


    // indexPhotoSet: {
    //   type: 'number',
    //   description: `Индекс объекта данной фотосессии в массиве фотосессий.`,
    //   required: true
    // },


    sessionName: {
      type: 'string',
      example: 'Два дня от роду',
      description: 'Название фотосессии для щенков.'
    },


    puppies: {
      type: 'ref',
      description: 'Массив с fd ссылками на фото щенков.'
    },


    descriptionPhotoSession: {
      type: 'string',
      maxLength: 300,
      example: 'Ожидается звёздный помёт. Прекрасные родословные, чистокровные производители.',
      description: 'Описание фотосессии. Какая то интересная информация.'
    },


    dateShooting: {
      type: 'string',
      description: 'Дата съёмки. День когда производилась данная фотосессия или видео.'
    },


    showShootingDate: {
      type: 'boolean',
      description: 'Показывать ли в открытом доступе дату съёмки?.'
    },

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
    const moment = require('moment');
    const tz = require('moment-timezone');
    moment.locale('en');
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }

    let puppies = [];

    let litter = await Litter.findOne(inputs.id);
    if (!litter) {
      throw 'badRequest';
    }


    if (inputs.puppies) {
      puppies = inputs.puppies.filter(o => !_.isNull(o));
      _.each(puppies, img => {
        delete img.filename;
        delete img.status;
        delete img.field;
      });
    }

    // _.each(newPuppies, np => np.photos = puppies);
    litter.puppies.push({
      sessionName: inputs.sessionName.slice(0, 60),
      // countNewComments:0,
      dateShooting: inputs.dateShooting,
      showShootingDate: inputs.showShootingDate,
      descriptionPhotoSession: inputs.descriptionPhotoSession ? inputs.descriptionPhotoSession : '',
      createdAt: moment().format(),
      photos: puppies
    });


    // Update the record for the logged-in user.
    await Litter.updateOne(inputs.id)
      .set({
        puppies: litter.puppies,
      });


    // Добавляется болванка-объект для отслеживания просмотренных комментариев
    var updatedRecords = await User.update({})
      .set({
        comments: {module: 'litter', id: inputs.id, images: [{look: 0}], puppies: [{look: 0}]},
      }).fetch();

    console.log('var updatedRecords = ', updatedRecords);

// https://sailsjs.com/documentation/reference/waterline-orm/datastores
    let collection =  User.getDatastore();

    if (!collection) {
      throw 'badRequest';
    }
console.log('COLLLL::; ', collection);

    let result = await collection.find({}, {
      preferredLocale: 'en'
    }).toArray((err, results) => err ? 'badRequest' : results);

    console.log('result', result);

    // await sails.sockets.broadcast(inputs.collection, `list-${inputs.collection}`);

    // All done.
    return exits.success();


  }


};
