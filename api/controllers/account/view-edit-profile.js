module.exports = {


  friendlyName: 'View edit profile',


  description: 'Display "Edit profile" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/account/edit-profile',
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
