module.exports = {


  friendlyName: 'List comment',

  description: 'Отдаёт массив объектов комментариев для конкретного модуля',


  inputs: {
    instanceModuleId: {
      type: 'string',
      example: '5d5fc8aac1717d2778adbfae',
      required: true,
      description: `Идентификатор экземпляра модуля в котором оставлен комментарий. Например в модуле Litter
      (помёты) их может быть несколько, следовательно кажый помёт имеет свой ID, он и 
      записывается здесь (Litter.id).`
    },


    field: {
      type: 'string',
      example: 'puppies',
      required: true,
      description: `Наименование поля в объекте экземпляра модуля в котором содержится контент к 
      которому относится комментарий.`
    },
  },


  exits: {
    success: {
      anyData: 'Вы подключились к комнате comment и слушаете событие list-comment'
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
    // Подключить сокет, который сделал запрос, к комнате «comment».
    await sails.sockets.join(req, 'comment');
    let module = await sails.helpers.listComments.with({
      instanceModuleId: inputs.instanceModuleId,
      field: inputs.field
    });


    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('litter', 'list-comment', module);

    // Respond with view.
    return exits.success();
  }


};
