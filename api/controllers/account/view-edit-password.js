module.exports = {


  friendlyName: 'View edit password',


  description: 'Display "Edit password" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/account/edit-password'
    }

  },


  fn: async function () {

    return {seo: {
        description: `Аккаунт`,
        title: `Аккаунт`,
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`
      },};

  }


};
