module.exports = {


  friendlyName: 'View login',


  description: 'Display "Login" page.',


  exits: {

    success: {
      currentSection: 'login',
      viewTemplatePath: 'pages/entrance/login',
    },

    redirect: {
      description: 'The requesting user is already logged in.',
      responseType: 'redirect'
    }

  },


  fn: async function () {
    if (this.req.me) {
      throw {redirect: '/'};
    }

    return {currentSection: 'login',
      seo: {
        description: 'Вход для зарегистрированных пользователей сайта. Введите свой email и пароль для входа.',
        title: 'Вход. Авторизация.',
        canonical:'https://poaleell.com/login'
      }};

  }


};
