module.exports = {


  friendlyName: 'View pedigree home',


  description: 'Display "Pedigree home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/pedigree/pedigree-home'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
