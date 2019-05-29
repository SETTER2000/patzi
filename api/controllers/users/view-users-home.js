module.exports = {


  friendlyName: 'View users home',


  description: 'Display "Users home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/users/users-home'
    }

  },


  fn: async function (inputs, exits) {

    // Бибилиотека Node.js
    const moment = require('moment');
    // Устанавливаем для пользователя его локаль. Для соответствующего отображения даты.
    moment.locale(this.req.me.preferredLocale);
    // Выбираем авторизованного пользователя, который сделал этот запрос
    // и всех его друзей по ассоциативному полю friends
    /*  let me = await User.findOne({
      id: this.req.me.id
    }).populate('friends');*/
    /**
     * me:
     * {
     * id: ...,
     * fullName: ...,
     * friends: [{id: ..., fullName: ...,}],
     * }
     */
    // Функция pluck из встроенного в sails, lodash v3
    // если версия Lodash 4, то эта функция заменена на map (_.map(users, 'firstName'))
    // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве
    // [{id: ..., fullName: ...,},{id: ..., fullName: ...,},{id: ..., fullName: ...,}]
    // let friendIds = _.pluck(me.friends, 'id'); // friendIds: [id,id,id...]
    let format = 'LL HH:mm';
    let users = await User.find();

    let dateFilter = [];

    /**
     * Здесь будем превращать поток байт в нормальное изображение для frontend
     * исключая некоторые данные не нужные для страницы.
     * Есть пару способов сделать это.
     * 1. В цикле
     * 2. С библиотекой Lodash
     */
    _.each(users, (user) => {
      // Столбец: Дата регистрации. Форматировано, согласно языку для представления.
      user.createdAtFormat = moment(user.createdAt).format(format);

      // Столбец: Дата регистрации. Формат фильтра.
      user.createdAtFormatFilter = moment(user.createdAt).format(format);
      // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве

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



    // Собираем и форматируем данные для фильтра столбца Дата...
    dateFilter = users.map(user => {
      let textVal = moment(user.createdAt).format(format);
      // console.log('user.createdAtFormatFilter', user.createdAtFormatFilter);
      return {text: textVal, value: user.createdAtFormatFilter};
    });

    // ...оставляем только уникальные объекты в массиве для фильтра.
    dateFilter = _.uniq(dateFilter, 'value');


    // Respond with view.
    return exits.success({
      dateFilter
    });

  }


};
