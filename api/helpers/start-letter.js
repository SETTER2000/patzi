module.exports = {


  friendlyName: 'Start letter',


  description: 'Делает все первые буквы строки заглавными.',


  inputs: {
    str: {
      type: 'string',
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {

    return inputs.str.trim().split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' ')

  }

};

