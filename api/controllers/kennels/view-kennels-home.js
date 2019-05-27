module.exports = {


  friendlyName: 'View kennels home',


  description: 'Display "Kennels home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/kennels/kennels-home'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
