module.exports = {


  friendlyName: 'View edit avatar',


  description: 'Display "Edit avatar" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/account/edit-avatar'
    }

  },


  fn: async function () {

    // Respond with view.
    return {seo: {
        description: `Аккаунт`,
        title: `Аккаунт`,
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`
      },};

  }


};
