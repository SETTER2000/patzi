module.exports = {


  friendlyName: 'Update search',


  description: '',


  inputs: {
    count: {
      type: 'number',
      description: 'Кол-во отдаваемых объектов.'
    },
    query: {
      type: 'ref',
      description: 'Массив слов для поиска по полю коллекции.'
    },
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
    let data = {};

    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }


    // Бибилиотека Node.js
    const url = require('url');
    const moment = require('moment');
    // Устанавливаем для пользователя его локаль. Для соответствующего отображения даты.
    moment.locale(this.req.me.preferredLocale);

    console.log('inputs.query: ', inputs.query);
    // Have the socket which made the request join the "user" room.
    // Подключить сокет, который сделал запрос, к комнате «user».
    await sails.sockets.join(req, 'user');

    // Проверка кол-ва объектов запрошеных с frontend
    inputs.count = inputs.count < 1 ? 5 : inputs.count;


    // Поиск записей в которых встречается подстрока inputs.query
    inputs.query = (_.isArray(inputs.query) && inputs.query.length < 1) ? {} :
      (_.isArray(inputs.query)) ? {'fullName': {in: inputs.query}} :
        _.get(inputs, 'query') ? {'fullName': {contains: inputs.query}} : {};


    let format = 'LL HH:mm';
    let users = await User.find(inputs.query).limit(inputs.count).populate('groups');


    // Получить список групп, которые существуют в системе. Для вывода в select
    let allGroups = await Group.find();


    _.each(allGroups, group => {
      delete group.createdAt;
      delete group.updatedAt;
      delete group.filename;
      delete group.imageUploadFD;
      delete group.imageUploadMime;
      delete group.whoCreate;
      group.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/groups/${group.id}`);
    });


    /**
     * Здесь будем превращать поток байт в нормальное изображение для frontend
     * исключая некоторые данные не нужные для страницы.
     * Есть пару способов сделать это.
     * 1. В цикле
     * 2. С библиотекой Lodash
     */
    _.each(users, (user) => {
      // Устанавливаем свойство источника изображения
      // Первый аргумент, базовый url
      user.imageSrc = user.avatarFD ? url.resolve(sails.config.custom.baseUrl, `/api/v1/users/${user.id}`) : '';

      // Добавляем массив групп для каждого пользователя
      user.allGroups = allGroups;

      // Столбец: Дата регистрации. Форматировано, согласно языку для представления.
      user.createdAtFormat = moment(user.createdAt).format(format);

      // Столбец: Дата регистрации. Формат фильтра.
      user.createdAtFormatFilter = moment(user.createdAt).format('L');
      // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве
      // [{id: ..., fullName: ...,},{id: ..., fullName: ...,},{id: ..., fullName: ...,}]
      user.groups = _.pluck(user.groups, 'id'); // friendIds: [id,id,id...]

      // Удаляем файловый дескриптор
      delete user.imageUploadFD;
      // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию и т.д....
      delete user.imageUploadMime;
      delete user.password;
      delete user.passwordResetToken;
      delete user.passwordResetTokenExpiresAt;
      delete user.hasBillingCard;
      delete user.billingCardBrand;
      delete user.billingCardExpMonth;
      delete user.billingCardExpYear;
      delete user.billingCardLast4;

    });
    data.users = users;
    data.count = inputs.count;
    await sails.sockets.broadcast('user', 'list', data);
    // Respond with view.
    return exits.success();
  }


};
