module.exports = {


  friendlyName: 'Date fix',


  description: '',


  inputs: {
    date: {
      type: 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {

    // console.log('HELPER inputs:::' , inputs);
    const moment = require('moment');
    const tz = require('moment-timezone');
    moment.locale('en');


    let dateNew = inputs.date.replace(/"([^"]+(?="))"/g, '$1');
// console.log('dateNew после replace::: ' , dateNew);
    dateNew = !_.isEmpty(dateNew) && dateNew !== '""' && dateNew !== 'Invalid date' && dateNew !== 'null' ? moment.tz(dateNew, 'Europe/Moscow').format() : '';

    return exits.success(dateNew);
  }


};

