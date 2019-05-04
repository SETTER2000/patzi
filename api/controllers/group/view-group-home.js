module.exports = {


  friendlyName: 'View group home',


  description: 'Display "Group home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/group/group-home'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
