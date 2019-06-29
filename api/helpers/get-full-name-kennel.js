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
    noKennelFound: {
      description: 'Could not find a nursery according to your request.'
    }
  },


  fn: async function (inputs, exits) {

    console.log('Входящий ID: ' ,inputs.id);
    // Выбираем весь список объектов данной коллекции.
    let kennel = await Kennel.findOne({id: inputs.id});
    if (!kennel) {
      throw 'noKennelFound';
    }
    let fullNameKennel = kennel.label;
    return exits.success(fullNameKennel);
  }
};

