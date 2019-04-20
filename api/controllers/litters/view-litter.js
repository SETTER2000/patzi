module.exports = {


  friendlyName: 'View litter',


  description: 'Display "Litter" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/litters/litter'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
