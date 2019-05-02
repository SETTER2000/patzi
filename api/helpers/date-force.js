module.exports = {


  friendlyName: 'Date force',


  description: 'Date something.',


  inputs: {

    numbersLine: {
      type: 'number',
      description: 'TIMESTAMP - Временная метка '
      // required: true
    }

  },

  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {
    const moment = require('moment');
    moment.locale(this.req.me.preferredLocale);

    return exits.success(moment(inputs.numbersLine).format('LLL'));
  }


};

