module.exports = {


  friendlyName: 'Add comment',


  description: 'Добавить комментарий',


  inputs: {

    id: {
      type: 'string',
      description: `Идентификатор помёта.`,
      required: true
    },


    comment: {
      type: 'string',
      maxLength: 1000,
      description: 'Комментарий пользователя.'
    },

    userName: {
      type: 'string',
      maxLength: 50,
      description: 'Имя пользователя.'
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

    litter.comments = _.isArray(litter.comments) ? litter.comments : [];
    litter.comments.push({
      comment: inputs.comment,
      dateCreate: moment().unix(),
      // born: moment.tz(born, 'Europe/Moscow').format(),
      userName: inputs.userName,
      userId: req.me.id,
    });

    let litterUpdate = await Litter.updateOne(inputs.id).set({comments: litter.comments});

    if (!litterUpdate) throw 'badRequest';

    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('litter', 'list-comment', litter.comments);

    // Respond with view.
    return exits.success();

  }


};
