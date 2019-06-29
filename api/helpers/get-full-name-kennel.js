module.exports = {


  friendlyName: 'Get full name kennel',


  description: 'Возвращает наименование питомника по ID',


  inputs: {

    id: {
      type: 'string',
      description: 'Идентификатор питомника.',
      required: true
    }
  },


  exits: {
    success: {
      outputFriendlyName: 'Full name kennel',
    },
  },


  fn: async function (inputs, exits) {
    // Выбираем весь список объектов данной коллекции.
    let kennel = await Kennel.findOne({id: inputs.id});
    let fullNameKennel = kennel.label;
    return exits.success(fullNameKennel);
  }
};

