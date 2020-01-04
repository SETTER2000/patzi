module.exports = {


  friendlyName: 'View forgot password',


  description: 'Display "Forgot password" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/entrance/forgot-password',
    },

    redirect: {
      description: 'The requesting user is already logged in.',
      extendedDescription: 'Logged-in users should change their password in "Account settings."',
      responseType: 'redirect',
    }

  },


  fn: async function () {

    if (this.req.me) {
      throw {redirect: '/'};
    }

    return {
      seo: {
        description: 'Подтвердить пароль.',
        title: 'Подтвердить пароль',
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`
      },
    };

  }


};
