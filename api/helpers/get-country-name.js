module.exports = {


  friendlyName: 'Get country name',


  description: '',


  inputs: {
    id: {
      type: 'string',
      description: `Идентификатор страны, по которому будет получено название страны.`
    }
  },



  fn: async function (inputs) {

    // Get country name.
    let countryName = await Country.findOne(inputs.id);


    // TODO
// console.log('countryName::: ' , countryName);
    // Send back the result through the success exit.
    return countryName;

  }


};

