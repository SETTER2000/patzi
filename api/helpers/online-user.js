module.exports = {


  friendlyName: 'Online user',


  description: '',


  inputs: {
    userId: {
      type: 'string',
      required: true,
      description: 'Идентификатор пользователя.'
    },
    online: {
      type: 'boolean',
      description: 'Флаг. Онлайн ли пользователь.'
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    let moment = require('moment');

    let obj = {
      online: inputs.online
    };

    inputs.online ? obj.onlineDateIn = moment().format() : obj.onlineDateOut = moment().format();

    await User.updateOne({id: inputs.userId}).set(obj);


    let data = await sails.helpers.listUser.with({
      count: inputs.count,
      query: inputs.query
    });


    await sails.sockets.broadcast('user', 'list', data);

  }


};

