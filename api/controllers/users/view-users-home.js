module.exports = {


  friendlyName: 'View users home',


  description: 'Display "Users home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/users/users-home'
    }

  },


  fn: async function (inputs, exits) {
    const moment = require('moment');
    moment.locale(this.req.me.preferredLocale);

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
      seo: {
        description: 'Пользователи сайта.',
        title: 'Пользователи',
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`
      },
      dateFilter
    });

  }


};
