module.exports = {


  friendlyName: 'Get kennel user',


  description: '',


  inputs: {
    id: {
      type: 'string',
      description: `Идентификатор пользователя, по которому будет получено название питомника.`
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Kennel user',
    },

    noKennelFound: {
      description: 'Could not find  kennel.'
    }
  },


  fn: async function (inputs) {
    let kennel = {};
// Get kennel user.
    let kennelUser = await User.findOne(inputs.id).populate('kennels');
    if (!kennelUser || kennelUser.kennels.length < 1) return kennel;


    // console.log('kennelUser:: ', kennelUser);
    kennel.name = kennelUser.kennels[0].label;

    // _.each(kennelUser.kennels, async kennel => {
    //   kennel.country = await sails.helpers.getCountryName.with({id: kennel.country})
    // });
    let countryName = await sails.helpers.getCountryName.with({id: kennelUser.kennels[0].country});
    kennel.countryName = countryName ? countryName.label : '';
    // await  _.each(kennelUser.kennels, async kennel => {
    //   kennel.countryName = await sails.helpers.getCountryName.with({id: kennel.country});
    //
    //   // console.log('kennel:: ', kennel.countryName.label);
    //   kennels.push(kennel)
    // });


    // console.log('kennelUser.kennels:: ', kennelUser.kennels[0]);

    // Send back the result through the success exit.
    return kennel;

  }


};

