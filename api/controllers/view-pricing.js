module.exports = {


  friendlyName: 'View pricing',


  description: 'Display "Pricing" page.',


  exits: {

    success: {
      currentSection: 'pricing',
      viewTemplatePath: 'pages/pricing'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
