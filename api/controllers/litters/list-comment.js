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
    let photoSets = [];
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
    let userIds = _.uniq(_.pluck(_.pluck(litter.puppies, 'comments')[0], 'userId'));
    let users = await User.find(userIds);
    if (!users) {
      throw 'badRequest';
    }

    await  _.each(litter.puppies, async (photoset) => {
      await _.each(photoset.comments, async (com) => {
        let user = users.filter(us => us.id === com.userId);
        com.avatarUrl = (user[0].defaultIcon === 'avatar') ? user[0].avatar : user[0].gravatar;
        console.log('com.avatarUrl:: ', com.avatarUrl);
      });
      photoSets.push(photoset);
    });


    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('litter', 'list-comment', photoSets);

    // Respond with view.
    return exits.success();
  }

};
