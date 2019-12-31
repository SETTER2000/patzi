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
    let dogs = await Dog.find({sale: true, letter:inputs.letter}).limit(1);
    console.log('FOOO::: ' , {forSale:(dogs.length>0), letter:inputs.letter, year:inputs.year });
    return {forSale:(dogs.length>0), letter:inputs.letter, year:inputs.year };
  }

};

