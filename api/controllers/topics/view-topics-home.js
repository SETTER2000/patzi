module.exports = {


  friendlyName: 'View topics home',


  description: 'Display "Topics home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/topics/topics-home'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success({
      seo: {
        description: `Темы статей.`,
        title: `Темы для статей`,
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`
      },
      currentSection: 'topics',
      // topics
    });

  }


};
