module.exports = {


  friendlyName: 'Full name kennel',

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


  fn: async function (inputs) {
    // Выбираем весь список объектов данной коллекции.
    let kennel = await Kennel.findOne({id: inputs.id});
    if (!kennel) {
      throw 'noKennelFound';
    }
    return  kennel.label;

  }
};

