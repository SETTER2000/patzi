module.exports = {


  friendlyName: 'Add session photo',


  description: '',


  inputs: {

    id: {
      type: 'string',
      description: `Идентификатор помёта.`,
      required: true
    },


    // indexPhotoSet: {
    //   type: 'number',
    //   description: `Индекс объекта данной фотосессии в массиве фотосессий.`,
    //   required: true
    // },


    sessionName: {
      type: 'string',
      example: 'Два дня от роду',
      description: 'Название фотосессии для щенков.'
    },


    puppies: {
      type: 'ref',
      description: 'Массив с fd ссылками на фото щенков.'
    },


    descriptionPhotoSession: {
      type: 'string',
      maxLength: 300,
      example: 'Ожидается звёздный помёт. Прекрасные родословные, чистокровные производители.',
      description: 'Описание фотосессии. Какая то интересная информация.'
    },


    dateShooting: {
      type: 'string',
      description: 'Дата съёмки. День когда производилась данная фотосессия или видео.'
    },


    showShootingDate: {
      type: 'boolean',
      description: 'Показывать ли в открытом доступе дату съёмки?.'
    },

  },


  exits: {
    success: {
      // Информация о вновь созданной записи
      outputDescription: 'Information about the newly created record.',
      // Устанавливаем выходной тип данных. Хорошая практика для документирования кода.
      outputType: {
        id: 'number',
        imageSrc: 'string'
      },
    },
    badRequest: {
      description: 'The object was not created.',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {
    const TokenGenerator = require( 'token-generator' )({
      salt: 'and feet in his mouth so that he wouldn’t do anything',
      timestampMap: 'abcdefghij', // 10 chars array for obfuscation proposes
    });
    let token = TokenGenerator.generate();
    const ObjectId = require('mongodb').ObjectId;
    const moment = require('moment');
    const tz = require('moment-timezone');
    moment.locale('en');
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    let db = User.getDatastore().manager;
    if (!db) {
      throw 'badRequest';
    }
    let rawLitter = db.collection('litter');
    let rawUser = db.collection('user');
    let puppies = [];

    let litter = await Litter.findOne(inputs.id);
    if (!litter) {
      throw 'badRequest';
    }


    if (inputs.puppies) {
      puppies = inputs.puppies.filter(o => !_.isNull(o));
      _.each(puppies, img => {
        delete img.filename;
        delete img.status;
        delete img.field;
      });
    }

    // _.each(newPuppies, np => np.photos = puppies);
    litter.puppies.push({
      sessionName: inputs.sessionName.slice(0, 60),
      // countNewComments:0,
      indexPhotoSet:token,
      dateShooting: inputs.dateShooting,
      showShootingDate: inputs.showShootingDate,
      descriptionPhotoSession: inputs.descriptionPhotoSession ? inputs.descriptionPhotoSession : '',
      createdAt: moment().format(),
      photos: puppies
    });


    // Update the record for the logged-in user.
    await Litter.updateOne(inputs.id)
      .set({
        puppies: litter.puppies,
      });

    // await User.find().populate('group');

    // Добавляется болванка-объект для отслеживания просмотренных комментариев
    let updatedRecords = await rawUser.updateMany(
      {emailStatus: "confirmed"},
      // {"_id": ObjectId(req.me.id)},
      {
        $addToSet: {
          comments: {
            $each: [
              {
                module: 'litter',
                id: inputs.id,
                images: [{look: 0}],
                puppies: [{look: 1}]
              },
              {
                module: 'litter',
                id: inputs.id,
                images: [{look: 0}],
                puppies: [{look: 0}]
              }
            ]
          }
        }
      },
      // {upsert: true}
    );


    if (!updatedRecords) {
      console.log('Ошибка обновления');
      throw 'badRequest';
    }

    // console.log('var updatedRecords = ', updatedRecords);

    // https://sailsjs.com/documentation/reference/waterline-orm/datastores

    let u = await  rawLitter.aggregate([{$group: {_id: "$letter", num_tutorial: {$sum: 1}}}]).toArray();
    // let u = await  rawLitter.find({'_id' : ObjectId(inputs.id)}).toArray();
    // console.log('DDDDDD:' , u);
    // db.collection('litter').find({}).then((data) => {console.log('RESULT: ',  data.toArray());});
    // async function getResults() {
    //   return db.collection('litter').find({});
    // }
    //
    // var results = await getResults();
    // results = results.then((data) => {
    //   // Here you can do something with your data
    //
    //   console.log('RESULT: ',  data.toArray());
    // });

    // console.log('COLLLL::; ',db.litter.find({}));

    // var inventory = await sails.getDatastore()
    //   .leaseConnection(async (db)=> {
    //     var location = await Litter.findOne({ id: inputs.id })
    //       .usingConnection(db);
    //     if (!location) {
    //       let err = new Error('Cannot find location with that id (`'+inputs.id+'`)');
    //       err.code = 'E_NO_SUCH_LOCATION';
    //       throw err;
    //     }

    // Get all products at the location
    // var productOfferings = await ProductOffering.find({ location: inputs.id })
    //   .populate('productType')
    //   .usingConnection(db);
    //
    // return productOfferings;
    //   return location;
    // })
    // .intercept('E_NO_SUCH_LOCATION', 'notFound');

    // let result = await collection.find({}, {
    //   preferredLocale: 'en'
    // }).toArray((err, results) => err ? 'badRequest' : results);
    //
    // console.log('result', result);

    // await sails.sockets.broadcast(inputs.collection, `list-${inputs.collection}`);

    // All done.
    return exits.success();


  }


};
