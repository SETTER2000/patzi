module.exports = {


  friendlyName: 'Date fix',


  description: '',


  inputs: {
    date: {
      type: 'string'
    }
  },


  fn: async function (inputs) {
    const moment = require('moment');
    const tz = require('moment-timezone');
    moment.locale('en');
    let str = inputs.date;
    let dateNew = (str && str.match(/"/)) ? str.replace(/"([^"]+(?="))"/g, '$1') : str;
    dateNew = !_.isEmpty(dateNew) && dateNew !== '""' && dateNew !== 'Invalid date' && dateNew !== 'null' ? moment.tz(dateNew, 'Europe/Moscow').format() : '';
    return dateNew;
  }
};

