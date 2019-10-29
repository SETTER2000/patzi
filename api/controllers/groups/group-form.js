module.exports = {

  friendlyName: 'List form',

  description: 'Обрабатывает сокет подключение клиента. Отдаёт краткий список групп системы.',


  inputs: {
    count: {
      type: 'number',
      description: 'Кол-во отдаваемых объектов.'
    },
    query: {
      type: 'ref',
      description: 'Строка, которую пытаемся найти в fullName.'
    },
  },


  exits: {
    success: {
      anyData: 'Вы подключились к комнате group и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The group who makes this request does not have permission to delete this entry.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    },
    badRequest: {
      description: 'Error.',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {
    const req = this.req;
    let data = {};
    let str = inputs.query;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }


    // Бибилиотека Node.js
    const url = require('url');
    const moment = require('moment');
    // Устанавливаем для пользователя его локаль. Для соответствующего отображения даты.
    moment.locale(this.req.me.preferredLocale);

    // Подключить сокет, который сделал запрос, к комнате «group».
    await sails.sockets.join(req, 'group');

    let groups = await Group.find();
    if (!groups) {
      throw 'badRequest';
    }


    _.each(groups, (group) => {
      // Удаляем не нужные свойства
      delete group.imageUploadFD;
      delete group.imageUploadMime;
      delete group.createdAt;
      delete group.subtitle;
      delete group.filename;
      delete group.whoCreate;
      delete group.updatedAt;
    });


    console.log('DATA groups:::: ' , groups);
    await sails.sockets.broadcast('group', 'group-form', groups);
    // Respond with view.
    return exits.success();
  }
};
