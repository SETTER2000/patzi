module.exports = {


  friendlyName: 'View signup',


  description: 'Display "Signup" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/entrance/signup',
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

    return { currentSection: 'signup',
      seo: {
        description: 'Регистрация пользователей сайта. Используйте свой email и придумайте пароль для регистрации на сайте.',
        title: 'Регистрация.',
        canonical:'https://poaleell.com/faq'
      }
    };

  }


};
