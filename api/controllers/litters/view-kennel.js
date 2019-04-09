module.exports = {


  friendlyName: 'View kennel',


  description: 'Display "Kennel" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/litters/kennel'
    }

  },


  fn: async function (inputs, exits) {

    let litters = await Litter.find({
      //owner:this.req.me.id
    });

    // Respond with view.
    return exits.success({litters});
  }


};
