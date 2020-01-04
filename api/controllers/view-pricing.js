module.exports = {


  friendlyName: 'View pricing',


  description: 'Display "Pricing" page.',


  exits: {

    success: {
      currentSection: 'pricing',
      viewTemplatePath: 'pages/pricing'
    }

  },


  fn: async function () {

    // Respond with view.
    return { seo: {
        description: 'Услуги и примерные цены нашего питомника. Цены не окончательны и могут быть изменены.',
        title: 'Цены и услуги',
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`
      }};

  }


};
