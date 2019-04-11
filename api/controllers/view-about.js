module.exports = {


  friendlyName: 'View about',


  description: 'Display "About" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/about'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
