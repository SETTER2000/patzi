module.exports = {


  friendlyName: 'Destroy one thing',


  description: 'Delete the "thing"  with the specified ID from the database.',


  inputs: {
    id: {
      type: 'number',
      required: true
    }
  },


  exits: {},


  fn: async function (inputs) {

    await Thing.destroy({id: inputs.id});
    return;

  }


};
