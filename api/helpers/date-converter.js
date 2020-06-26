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
    const moment = require('moment');
    const tz = require('moment-timezone');
    moment.locale('en');
    console.log('Входящие даты: ', inputs.date);
    // let dt = inputs.date;
    let dt = JSON.parse(inputs.date);
    let now = moment(); // создаёт текущую дату, тип объект
    moment(dt, moment.ISO_8601).isValid() ? console.log('INPUTS:  Соответствует формату строки ISO 8601.') : console.log('INPUTS: Ошибка! НЕ соответствует формату строки ISO 8601.');
    moment(now).isValid() ? console.log('NOW:  Соответствует формату строки ISO 8601.') : console.log('NOW: Ошибка! НЕ соответствует формату строки ISO 8601.');
    // console.log("INPUTS type:: ", typeof dt);
    // console.log("INPUTS:: ",  dt);
    // console.log("INPUTS timeZona Europe/Moscow:: ", moment.tz(dt, 'Europe/Moscow').format());
    // console.log("NOW type:: ", typeof now);
    // console.log("NOW:: ",  now); // объект
    // console.log("NOW timeZona Europe/Moscow:: ", moment.tz(now, 'Europe/Moscow').format());
    dt = moment.tz(dt, 'Europe/Moscow').format();
    dt = moment(dt, moment.ISO_8601).format("x");
    // console.log("dt перед выдачей type:: ", typeof +dt);
    // console.log("dt перед выдачей :: ",  +dt);
    return +dt;
  }


};

