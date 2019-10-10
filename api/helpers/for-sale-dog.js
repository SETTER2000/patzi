module.exports = {


  friendlyName: 'For sale dog',


  description: '',


  inputs: {
    letter: {
      type: 'string',
      description: `Буква помёта`,
      require:true
    },
    year:{
      type:'string',
      description:`Год рождения собаки.`,
      require:true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    let dogs = await Dog.findOne({sale: true, letter:inputs.letter});
    console.log('DOGS::: ', dogs);

console.log('inputs.year:::', inputs.year);
    return {forSale:dogs ? dogs.sale : false, letter:inputs.letter, year:inputs.year };
  }


};

