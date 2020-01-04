module.exports = {


  friendlyName: 'View contact',


  description: 'Display "Contact" page.',


  exits: {

    success: {
      currentSection: 'contact',
      viewTemplatePath: 'pages/contact'
    }

  },


  fn: async function () {

    // Respond with view.
    return { seo: {
        description: 'Контакты нашего питомника',
        title: 'Контакты',
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`
      }};

  }


};
