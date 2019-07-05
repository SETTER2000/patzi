module.exports = {


  friendlyName: 'View dog',


  description: 'Display "Dog" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dogs/dog'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
