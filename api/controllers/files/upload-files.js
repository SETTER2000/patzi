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
      // Устанавливаем выходной тип данных. Хорошая практика для документирования кода.
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
    const req = this.req;
    const fs = require('fs');
    const Jimp = require('jimp');
    const mime = require('mime-types');
    const through2 = require('through2');
    const sharp = require('sharp');
    const zlib = require('zlib');
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
      , Q = 45 // Качество изображения (100 - 0) http://www.graphicsmagick.org/GraphicsMagick.html#details-compress
    ;

    let info = '';
    // let data = req.file('file');
    // console.log("inputs.file::", inputs.file);
    // console.log("req.file('file')::", data);
    // console.log("isBuffer::",_.isBuffer(req.file('file')));
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
    // inputs.file
    //   // .pipe(getX)
    //   .pipe(toJSON())
    //   .pipe(process.stdout);
    // inputs.file
    //   .on('readable', function (data, done) {
    //     console.log("readable", data);
    //     done();
    //   }).on('end', function () {
    //   console.log("THE END");
    // });
// console.log('req.file:::::: ', req.file('file'));

   /*  sharp(req.file)
       .resize(resizeX, resizeY, {
         fit: sharp.fit.inside,
         withoutEnlargement: true
       })
       .toFormat('jpeg')
       .toBuffer()
       .then(function (outputBuffer) {
         let uploadPromise = skp.send({
           Expires: 60,
           ContentType: 'image/jpeg',
           ACL: 'public-read',
           Bucket: sails.config.uploads.bucket,
           Key: 'KeyNmm',
           Body: outputBuffer
         }, (err, data)=>{
           if (err) {
             console.error('s3 send error:', err);
           } else {
             console.log('s3 send success!', data);
           }
         });
       }).catch(
       function (err) {
         console.error("ERRSSS::::", err);
       });*/


 /*   sharp(inputs.file('file'))
      .resize(200, 200, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFormat('jpeg')
      .toBuffer()
      .then(function(outputBuffer) {
        // outputBuffer contains JPEG image data
        // no wider and no higher than 200 pixels
        // and no larger than the input image
      });*/
    // const roundedCornerResizer =
    //   sharp()
    //     .resize(200, 200)
    //     .composite([{
    //       input: req.files('file'),
    //       blend: 'dest-in'
    //     }])
    //     .png();
    //
    // req.file('file')
    //   .pipe(roundedCornerResizer)
    //   .pipe(inputs.file);

/*
    sharp(inputs.file('file'))
      .resize(200, 200, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFormat('jpeg')
      .toBuffer()
      .then(function(outputBuffer) {
        info =  sails.upload(outputBuffer);
        console.log('INFO UPLOAD::: ', info);
      });*/


    info = await sails.upload(inputs.file);
    // console.log('INFO UPLOAD::: ', info);


    let fd = _.pluck(info, 'fd')[0];
    // fd = (sails.config.environment === 'production') ? `${sails.config.custom.pathPhotoS3}/${fd}` : fd;
    // console.log('FD:', fd);
  /*  Jimp.read(fd)
      .then(resizePhoto => {
        return resizePhoto
          .resize(Jimp.AUTO, resizeY) // resize
          .quality(60) // set JPEG quality
          // .cover(resizeX, resizeY)
          .normalize()
          // .greyscale() // set greyscale
          .write(fd); // save
      })
      .catch(err => {
        console.error(err);
      });*/


    //
    // sharp(fd)
    //   .resize(resizeX, resizeY)
    //   .toFile(fd, (err, info) => {
    //     if(err) console.log('ERROSSS:: ' , err);
    //     console.log('INFOO::' , info);
    //   });

    if (!info) {
      throw 'badRequest';
    }
    // console.log('FILES/UPLOAD.JS файл картинки загружен в .tmp: ', info);
    // await sails.sockets.broadcast('files', 'list-file', info);
    // All done.
    return exits.success(info[0]);

  }
};