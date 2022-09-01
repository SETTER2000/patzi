module.exports = {


  friendlyName: 'Photo',


  description: 'Photo upload.',


  files: ['file'], // именуем поле, через которое будет передоваться файл при загрузки


  inputs: {
    file: {
      type: 'ref',
      description: 'Uploaded file stream.',
      required: true
    },
  },


  exits: {
    success: {
      outputDescription: 'Information about the newly created record.',
      outputType: {
        id: 'number',
        imageSrc: 'string'
      },
    },
    badRequest: {
      description: 'No image upload was provided.',
      responseType: 'badRequest'
    }
  },

  fn: async function (inputs, exits) {
    const through2 = require('through2');
    const skp = require('@setter/skp')(
      {
        key: sails.config.uploads.key,
        region: sails.config.uploads.region,
        secret: sails.config.uploads.secret
      }
    );
    const resizeX = 1424
      , resizeY = 800
      , gravity = 'Center'// NorthWest, North, NorthEast, West, Center, East, SouthWest, South, SouthEast
      , Q = 45
    ;

    let info = '';
    const toJSON = () => {
      let objs = [];
      return through2.obj(function (data, enc, cb) {
        objs.push(data);
        /* 1 */
        cb(null, null);
      }, function (cb) {                               /* 2 */
        this.push(JSON.stringify(objs));
        cb();
      });
    };
    const getX = through2.obj((data, enc, cb) => { /* 4 */
      cb(null, `${data.toString()}\n`);
    });



    info = await sails.upload(inputs.file);


    let fd = _.pluck(info, 'fd')[0];

    if (!info) {
      throw 'badRequest';
    }

    return exits.success(info[0]);

  }
};
