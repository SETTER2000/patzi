module.exports = {


  friendlyName: 'View message home',


  description: 'Display "Message home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/message/message-home'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
