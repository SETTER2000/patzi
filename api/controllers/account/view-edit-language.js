module.exports = {


  friendlyName: 'View edit language',


  description: 'Display "Edit language" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/account/edit-language'
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
