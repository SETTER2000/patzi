module.exports = {


  friendlyName: 'Percent of number',


  description: 'Какой процент от числа составляет данное число? Helper отвечает на этот вопрос.',


  inputs: {
    num: {
      type: 'number',
      example: 5,
      description: `Это число, процент которого нужно вычислить от общего количества. Какой процент
    от 100 занимает число 5.`,
      require: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {

    let users = await User.find();
    if (Object.keys(users).length < 1) return;
    let result = inputs.num/users.length * 100;
    return exits.success(result);
  }


};

