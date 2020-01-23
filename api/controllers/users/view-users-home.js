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
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`,
        header:{ru:'Пользователи',en:'Users'},
        subTitle:{ru:'Все пользователи системы',en:'All users of the system'},
        preferredLocale:this.req.me.preferredLocale,
        // Первый H3 на странице
        h3: {ru: 'Пользователи системы', en: 'System users'},
        // Текст параграфа под заголовко H3 в начале страницы
        textUnderHeading: {
          ru: 'В данном разделе содержится вся информация о пользователях системы. Тех кто зарегистрировался и подтвердил свой email и тех кто ещё не подтвердил. Информация актуальна на данную секунду, так как обновление данных происходит мгновенно в реальном времени и не нуждается в перезагрузке страницы.',
          en: 'This section contains all the information about system users. Those who have registered and confirmed their email and those who have not yet confirmed. The information is current for this second, as the data is updated instantly in real time and does not need to reload the page.'
        },
      },
      dateFilter
    });

  }


};
