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
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`,
        header:{ru:'О Нас',en:'About Us'},
        subTitle:{ru:'Poale Ell питомник Китайская Хохлатая Собака',en:'Poale Ell Chinese Crested Dog Kennel'},
        preferredLocale:this.req.me.preferredLocale,
      },};

  }


};
