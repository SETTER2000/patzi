module.exports = {

  friendlyName: 'Avatar url',

  description: 'Возвращает URL аватара или граватара',


  inputs: {
    id: {
      type: 'string',
      description: 'Идентификатор пользователя.',
      required: true
    }
  },


  exits: {
    success: {
      outputFriendlyName: 'Full URL avatar',
    },
    noUrlFound: {
      description: 'No results were found for your request.'
    }
  },


  fn: async function (inputs, exits) {
  //   // Выбираем весь список объектов данной коллекции.
  //   let kennel = await Kennel.findOne({id: inputs.id});
  //   (user[0].defaultIcon === 'avatar') ? user[0].avatar : user[0].gravatar;
  //   if (!kennel) {
  //     throw 'noUrlFound';
  //   }
  //   let fullNameKennel = kennel.label;
  //   return exits.success(fullNameKennel);
 }

};

