module.exports = {


  friendlyName: 'List native',


  description: '',


  inputs: {},


  exits: {},


  fn: async function (inputs) {
    const test = require('assert');
    const db = sails.getDatastore('mongodb').manager;

    const collection = db.collection('litter');


    collection.find({"dogs.gender": {"$regex": /dam/}}).toArray(console.log);
    // All done.
    return;

  }


};
