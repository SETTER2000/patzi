module.exports = {


  friendlyName: 'View litter',


  description: 'Display "Litter" page.',


  exits: {

    success: {
      currentSection: 'litter',
      viewTemplatePath: 'pages/litters/litter'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
