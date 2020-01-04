module.exports = {


  friendlyName: 'View about',


  description: 'Display "About" page.',


  exits: {

    success: {
      currentSection: 'about',
      viewTemplatePath: 'pages/about'
    }

  },


  fn: async function () {

    // Respond with view.
    return {seo: {
        description: `Информация по питомнику Poale Ell.`,
        title: `О нас`,
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`
      },};

  }


};
