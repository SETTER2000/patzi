module.exports = {


  friendlyName: 'List comment',

  description: 'Отдаёт массив объектов комментариев для конкретного помёта',


  inputs: {
    id: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      anyData: 'Вы подключились к комнате litter и слушаете событие list-comment'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The litter who makes this request does not have permission to delete this entry.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    },
    badRequest: {
      description: 'Error.',
      responseType: 'badRequest'
    }
  },

  fn: async function (inputs, exits) {
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    // const moment = require('moment');
    //
    // // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    // moment.locale(this.req.me.preferredLocale);
    // // Формат отображаемой даты
    // let format = 'LL HH:mm';

    // Have the socket which made the request join the "litter" room.
    // Подключить сокет, который сделал запрос, к комнате «litter».
    await sails.sockets.join(req, 'litter');


    // Выбираем помёт
    let litter = await Litter.findOne(inputs.id);

    let comments = [];

    let userIds = _.uniq(_.pluck(litter.comments, 'userId'));
    let users = await User.find(userIds);

    _.each(litter.comments, async (comment) => {
      let user = users.filter(us => us.id === comment.userId);

      comment.avatarUrl = (user[0].defaultIcon === 'avatar') ? user[0].avatar : user[0].gravatar;
      console.log('comment: ', comment);
      comments.push(comment);
    });


    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('litter', 'list-comment', comments);

    // Respond with view.
    return exits.success();
  }

};
