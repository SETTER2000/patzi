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

  },


  fn: async function (inputs) {
    let kennels = [];
// Get kennel user.
    let kennelUser = await User.findOne(inputs.id).populate('kennels');
    // console.log('kennelUser:: ', kennelUser);
    // _.each(kennelUser.kennels, async kennel => {
    //   kennel.country = await sails.helpers.getCountryName.with({id: kennel.country})
    // });
   kennelUser.kennels.length > 0 ?   kennelUser.kennels[0]['countryName'] =  await sails.helpers.getCountryName.with({id:  kennelUser.kennels[0].country}) : '';
    // await  _.each(kennelUser.kennels, async kennel => {
    //   kennel.countryName = await sails.helpers.getCountryName.with({id: kennel.country});
    //
    //   // console.log('kennel:: ', kennel.countryName.label);
    //   kennels.push(kennel)
    // });


    // console.log('kennelUser.kennels:: ', kennelUser.kennels[0]);

    // Send back the result through the success exit.
    return  kennelUser.kennels[0];

  }


};

