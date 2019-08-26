module.exports = {


  friendlyName: 'Get token',


  description: '',


  inputs: {},


  exits: {

    success: {
      outputFriendlyName: 'Token',
    },

  },


  fn: async function (inputs) {
    const TokenGenerator = require('token-generator')({
      salt: 'and feet in his mouth so that he wouldn’t do anything',
      timestampMap: 'abcdefghij', // 10 chars array for obfuscation proposes
    });
    // Get token.
    // Send back the result through the success exit.
    return TokenGenerator.generate();

  }


};

