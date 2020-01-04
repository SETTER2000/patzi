module.exports = {


  friendlyName: 'View blog',


  description: 'Display "Blog" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/blog/blog'
    }

  },


  fn: async function () {

    // Respond with view.
    return {seo: {
        description: `Описание поста`,
        title: `Название поста"`,
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`
      },};

  }


};
