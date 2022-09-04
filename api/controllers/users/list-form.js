module.exports = {
  friendlyName: 'List form',
  description: 'Обрабатывает сокет подключение клиента. Отдаёт краткий список пользователей системы.',
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
    let str = inputs.query;
    if (!req.isSocket) {
      throw 'badRequest';
    }
    const url = require('url');
    const moment = require('moment');
    // Устанавливаем для пользователя его локаль. Для соответствующего отображения даты.
    moment.locale(this.req.me.preferredLocale);
    // Подключить сокет, который сделал запрос, к комнате «user».
    await sails.sockets.join(req, 'user');
    // Проверка кол-ва объектов запрошенных с frontend
    inputs.count = inputs.count < 1 ? 5 : inputs.count;
    inputs.query = (_.isString(inputs.query) && (-1 < inputs.query.indexOf(','))) ? inputs.query.split(',') : inputs.query;
    // Поиск записей в которых встречается подстрока inputs.query
    inputs.query = _.isArray(inputs.query) ? {'fullName': {in: inputs.query}, emailStatus:'confirmed'} :
      _.get(inputs, 'query') ? {'fullName': {contains: inputs.query}, emailStatus:'confirmed'} : {emailStatus:'confirmed'};
    let format = 'LL HH:mm';
    let users = await User.find(inputs.query).limit(inputs.count).populate('groups');
    /**
     * Здесь будем превращать поток байт в нормальное изображение для frontend
     * исключая некоторые данные не нужные для страницы.
     * Есть пару способов сделать это.
     * 1. В цикле
     * 2. С библиотекой Lodash
     */
    _.each(users, (user) => {
      user.imageSrc = user.avatarFD ? url.resolve(sails.config.custom.baseUrl, `/api/v1/users/${user.id}`) : '';
      user.value = user.fullName;
      delete user.imageUploadFD;
      delete user.imageUploadMime;
      delete user.password;
      delete user.passwordResetToken;
      delete user.passwordResetTokenExpiresAt;
      delete user.hasBillingCard;
      delete user.billingCardBrand;
      delete user.billingCardExpMonth;
      delete user.billingCardExpYear;
      delete user.billingCardLast4;
      delete user.avatarMime;
      delete user.avatarFD;
      delete user.createdAt;
      delete user.defaultIcon;
      delete user.createdAtFormat;
      delete user.createdAtFormatFilter;
      delete user.emailChangeCandidate;
      delete user.emailConfirmationReminderAlreadySent;
      delete user.emailProofToken;
      delete user.emailProofTokenExpiresAt;
      delete user.emailStatus;
      delete user.isSuperAdmin;
      delete user.isAdmin;
      delete user.ratio;
      delete user.filename;
      delete user.groups;
      delete user.phone;
      delete user.stripeCustomerId;
      delete user.tosAcceptedByIp;
      delete user.updatedAt;
      delete user.allGroups;
    });
    data.users = users;
    data.count = inputs.count;
    await sails.sockets.broadcast('user', 'list-form', data);
    return exits.success();
  }
};
