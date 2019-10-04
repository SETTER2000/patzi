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
    const res = this.res;
    const fs = require('fs');
    const mime = require('mime-types');
    const through2 = require('through2');
    const sharp = require('sharp');
    const split = require('split2');
    const Readable = require('readable-stream').Readable;


    const parseCSV = () => {
      let templateKeys = [];
      let parseHeadline = true;
      return through2.obj((data, enc, cb) => {
        if (parseHeadline) {
          templateKeys = data.toString().split(',');
          parseHeadline = false;
          return cb(null, null);

        }
        const entries = data.toString().split(',');
        const obj = {};
        templateKeys.forEach((el, index) => {
          obj[el] = entries[index];
        });
        return cb(null, obj);

      });
    };
    const skp = require('@setter/skp')(
    // const skp = require('skipper-s3')(
      {
        key: sails.config.uploads.key,
        region: sails.config.uploads.region,
        secret: sails.config.uploads.secret
      }
    );
    var receiving = skp.receive({
      bucket:'paltos',
      Key:'pop',
      Expires: 60,
     // ContentType: options.ContentType,
      ACL: 'public-read',
      region:'us-east-1'
    });

    const roundedCornerResizer =
      sharp()
        .resize(200, 200)
        .composite([{
          input: req.file('file'),
          blend: 'dest-in'
        }])
        .png();

    // readableStream
    //   .pipe(roundedCornerResizer)
    //   .pipe(writableStream);
    const gm = require('gm')
      , resizeX = 1424
      , resizeY = 800
      , gravity = 'Center'// NorthWest, North, NorthEast, West, Center, East, SouthWest, South, SouthEast
      , Q = 45 // Качество изображения (100 - 0) http://www.graphicsmagick.org/GraphicsMagick.html#details-compress
    ;

    let info = '';
    let body = [];
  /*  req.on('data', (chunk) => {
      console.log('CHUNK::: ', chunk);
      body.push(chunk);
    });*/

    /*req.on('end', () => {
      try {
        const data = JSON.parse(body);
        // Write back something interesting to the user:
        res.write(typeof data);
        res.end();
      } catch (er) {
        // uh oh! bad json!
        res.statusCode = 400;
        return res.end(`error: ${er.message}`);
      }
    });*/

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
    /*   inputs.file
         // .pipe(getX)
         .pipe(split())
         .pipe(toJSON())
         .pipe(process.stdout);*/
    // inputs.file
    //   .on('readable', function (data, done) {
    //     console.log("readable", data);
    //     done();
    //   }).on('end', function () {
    //   console.log("THE END");
    // });


    /* sharp(inputs.file)
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
         console.error(err, err.stack);
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


    // info = await sails.upload(inputs.file);
    req.file('file').upload(receiving, function (err, filesUploaded) {
      console.log('filesUploaded::: ' , filesUploaded);
    });
    console.log('INFO UPLOAD::: ', info);


    let fd = _.pluck(info, 'fd')[0];
    console.log('FD:', fd);

    /*

        gm(fd)
        // .flip()
        // .magnify()
        // .rotate('green', 45)
        // .blur(7, 3)
        //   .resizeExact(resizeX,resizeY)

          .autoOrient()
          // .noProfile()
          .bitdepth(16)
          // Например, чтобы увеличить яркость цвета на 10% и уменьшить насыщенность
          // цвета на 10% и оставить без изменений оттенок, используйте: -modulate 110,90
          .modulate(110, 90)
          .resize(resizeX, resizeY)
          // .gravity(gravity) // Какую область оставить в обрезке
          // .crop(resizeX, resizeY)
          // .edge(3)
          // .stroke("#FFFFFF")
          // .drawCircle(10, 10, 20, 10)
          // .font( fs.readFileSync(__dirname+"/../../../assets/fonts/OpenSans-Light.ttf"), 12)
          // .drawText(50, resizeY - 20, "www.poaleell.com")
          .compress('JPEG')
          .quality(Q) // качество сжатия изображения
          // глубина цвета
          // .sampling-factor("2x1")

          .write(fd, function (err) {
            if (err) console.log('Error loading images in upload-files::: ', err);
          });
    */


    // sharp(fd)
    //   .resize(320, 240)
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
