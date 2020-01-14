module.exports = {


  friendlyName: 'View chart home',


  description: 'Display "Chart home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/charts/chart-home'
    }

  },


  fn: async function () {

    // Respond with view.
    return {
      seo: {
        description: `Графическое представление данных.`,
        title: `Графики`,
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`
      },
      currentSection: 'charts',
    };

  }


};
