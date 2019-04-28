module.exports = {


  friendlyName: 'View blog home',


  description: 'Display "Blog home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/blog/blog-home'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
