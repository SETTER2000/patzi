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
    return {};

  }


};
