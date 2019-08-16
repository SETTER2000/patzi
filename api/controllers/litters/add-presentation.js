module.exports = {


  friendlyName: 'Add presentation',


  description: 'Добавляет PDF файл презентации к помёту.',

  inputs: {

    id: {
      type: 'string',
      description: `Идентификатор помёта.`,
      required: true
    },


    presentationUrl: {
      // type: 'ref',
      type: 'string',
      maxLength: 280,
      description: `URL-ссылка на файл презентации. 
      Файл может находится например на https://drive.google.com 
      или любом другом месте в сети.`
    },


    presentationName: {
      type: 'string',
      maxLength: 60,
      example: 'Два дня от роду',
      description: 'Название презентации к помёту.'
    },


    descriptionPresentation: {
      type: 'string',
      maxLength: 300,
      example: 'Ожидается звёздный помёт. Прекрасные родословные, чистокровные производители.',
      description: 'Описание фотосессии. Какая то интересная информация.'
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

    let litter = await Litter.findOne(inputs.id);
    if (!litter) throw 'badRequest';

    litter.presentation = _.isArray(litter.presentation) ? litter.presentation : [];
    litter.presentation.push({
      presentationUrl: inputs.presentationUrl,
      presentationName: inputs.presentationName,
      // born: moment.tz(born, 'Europe/Moscow').format(),
      descriptionPresentation: inputs.descriptionPresentation,
      // descriptionPhotoSession: _.isEmpty(inputs.descriptionPhotoSession) ? '' : inputs.descriptionPhotoSession
    });

    let litterUpdate = await Litter.updateOne(inputs.id).set({presentation: litter.presentation});

    if (!litterUpdate) throw 'badRequest';


    // All done.
    return exits.success();

  }


};
