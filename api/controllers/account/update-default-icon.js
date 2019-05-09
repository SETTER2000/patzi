module.exports = {


  friendlyName: 'Update default icon',


  description: '',


  inputs: {
    defaultIcon: {
      type: 'string',
      description: 'Какая иконка будет показываться по умолчанию на сайте. Два варианта всего avatar|gravatar',
      isIn: ['avatar', 'gravatar'],
      defaultsTo: 'gravatar'
    },

  },

  exits: {
    success: {
      // Информация о вновь созданной записи
      outputDescription: 'Information about the newly created record.',
    },
    badRequest: {
      description: 'Error.',
      responseType: 'badRequest'
    }
  },

  fn: async function (inputs) {
console.log('inputs{', inputs);
    await User.updateOne({id: this.req.me.id})
      .set({
        defaultIcon: inputs.defaultIcon
      });

  }


};
