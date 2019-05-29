module.exports = {


  friendlyName: 'Update filter date',


  description: '',


  inputs: {
    count: {
      type: 'number',
      description: 'Кол-во отдаваемых объектов.'
    },
    query: {
      type: 'ref',
      description: 'Дата по которой следует отыскать всех пользователей.'
    }
  },


  exits: {
    success: {
      anyData: 'Вы подключились к комнате user и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The user who makes this request does not have permission to delete this entry.',
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

    let format = 'LL HH:mm';

    let data = {};

    // Бибилиотека Node.js
    const url = require('url');
    const moment = require('moment');
    // Устанавливаем для пользователя его локаль. Для соответствующего отображения даты.
    moment.locale(this.req.me.preferredLocale);

    // console.log('inputs.query: ', inputs.query);
    // Have the socket which made the request join the "user" room.
    // Подключить сокет, который сделал запрос, к комнате «user».
    await sails.sockets.join(req, 'user');

    // Проверка кол-ва объектов запрошеных с frontend
    inputs.count = inputs.count < 1 ? 5 : inputs.count;

    // ТОлько уникальные значения оставляем
    inputs.query = (_.isArray(inputs.query)) ?  _.uniq(inputs.query) : inputs.query;
    // Преобразуем строку даты в unix timestamp
    // inputs.query = inputs.query.map(dt => {
    //   return {
    //     'createdAt': {'>=': moment(dt, format).valueOf(), '<=': moment(dt, format).add(1, 'h').valueOf(),},
    //   }
    // });

    console.log('inputs.query - UNIQ: ', inputs.query);
    // Поиск записей в которых встречается подстрока inputs.query
    inputs.query = (_.isArray(inputs.query) && inputs.query.length < 1) ? {} :
      (_.isArray(inputs.query)) ? {or: inputs.query} :
        _.get(inputs, 'query') ? {'createdAt': {contains: inputs.query}} : {};



    inputs.query = {
     createdAt: {'>=': 1559134560000}
    };


    let users = await User.find();





    await sails.sockets.broadcast('user', 'list', users);

  }


};
