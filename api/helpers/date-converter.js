module.exports = {


  friendlyName: 'Date converter',


  description: 'Преобразует дату из string в number',


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


  fn: async function (inputs) {
    const moment = require('moment-timezone');
    moment.locale('en');
    // console.log('Входящие даты: ', inputs.date);
    // console.log('IS NUMBER?: ', _.isNumber(inputs.date));
    let dt = JSON.parse(inputs.date);
    moment(dt, moment.ISO_8601).isValid() ? console.log('INPUTS:  Соответствует формату строки ISO 8601.') : console.log('INPUTS: Ошибка! НЕ соответствует формату строки ISO 8601.');
    dt = moment.tz(dt, 'Europe/Moscow').format();
    dt = moment(dt, moment.ISO_8601).format("x");

    return +dt;
  }


};

