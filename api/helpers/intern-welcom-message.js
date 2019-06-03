module.exports = {


  friendlyName: 'Intern welcom message',


  description: 'await sails.helpers.internWelcomMessage(this.me.fullName)',


  name: {
    type: 'string',
    example: 'Alex Fox',
    description: 'The name of the person to greet.',
    required: true
  },



  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    let result = `Hello, ${inputs.name}!`;
    return exits.success(result);
  }


};

