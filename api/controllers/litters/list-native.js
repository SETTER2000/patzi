module.exports = {


  friendlyName: 'List native',


  description: '',


  inputs: {},


  exits: {},


  fn: async function (inputs, exits) {
    /*const mongoose = require('mongoose');
    mongoose.connect('mongodb://alex:4211817@localhost/test', {useNewUrlParser: true});
    const dbm = mongoose.connection;
    dbm.on('error', console.error.bind(console, 'connection error:'));
    dbm.once('open', function() {
      let kittySchema = new mongoose.Schema({
        name: String
      });

      let Kitten = mongoose.model('Kitten', kittySchema);
    });
*/
    const test = require('assert');
    const db = sails.getDatastore('mongodb').manager;

    const collection = db.collection('litter');


    /*    collection.find({letter: 'A'})*/


    /*collection.aggregate([{
      $match: {}
    },
      {$group:{_id:{id:"$dogs.id"},children:{$push:{text:"$label", id:"$_id"}}}},
      {
        $unwind: { path: "$dogs", includeArrayIndex: "arrayIndex" }
      }

    ])*/
    collection.aggregate([{
      $lookup:
        {
          from: "dog_litters__litter_dogs",
          localField: "_id",
          foreignField: "litter_dogs",
          as: "inventory_docs"
        }
    }])
      .toArray((err, results) => {
        if (err) {
          throw 'badRequest';
        }
        // return res.ok(results);
        return exits.success(results);
      });

    // var i = 0;
    // var b = 0;
    //
    // let litters = Litter.stream()
    // // .sort('label ASC')
    //   .populate('dogs')
    //   .eachRecord(async (litter, next) => {
    //
    //     console.log(' • Помёты #' + b);
    //
    //     // console.log('_.takeWhile:: ',_.takeWhile(litter.dogs, 'kennel'));
    //     // console.log('Litter _.filter:',_.filter(litter.dogs, (n)=>_.isString(n.gender)));
    //     // console.log('_.pluck:: ',_.pluck(litter, 'dogs'));
    //     //         console.log('litter.dogs:: ', litter.dogs);
    //
    //     // console.log('XXX: ',_.result(_.find(litter.dogs, {'gender':'dam'}), 'kennel'));
    //
    //     // console.log('XXX: ', _.result(_.indexBy(litter.dogs, 'gender'), 'dam').kennel);
    //     // console.log('XXX: ', _.result(_.indexBy(litter.dogs, 'gender'), 'dam').label);
    //     // let nameKennel = await sails.helpers.fullNameKennel(_.result(_.indexBy(litter.dogs, 'gender'), 'dam').kennel);
    //     // _.each(litter.dogs,  (dog) => {
    //     //   console.log(`· record #${i} :: ${ sails.helpers.getFullNameKennel(dog.kennel)} ${dog.label}`);
    //     //   i++;
    //     // });
    //     let nameKennel = await sails.helpers.fullNameKennel(_.result(_.indexBy(litter.dogs, 'gender'), 'dam').kennel);
    //     let nameDog = _.result(_.indexBy(litter.dogs, 'gender'), 'dam').label;
    //     console.log('r: ', `${nameKennel} ${nameDog}`);
    //
    //     b++;
    //     return next();
    //   })
    //   .exec(function (err) {
    //     if (err){ return next(err); }
    //   });
    // await sails.sockets.broadcast('litter', 'list-litter', litters);


  }
};
