module.exports = {


  friendlyName: 'View portfolio',


  description: 'Display "Portfolio" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/things/portfolio'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
