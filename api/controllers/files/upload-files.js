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
    const sharp = require('sharp');
    const gm = require('gm')
      , resizeX = 1424
      , resizeY = 800
      , gravity = 'Center'// NorthWest, North, NorthEast, West, Center, East, SouthWest, South, SouthEast
      , Q = 45 // Качество изображения (100 - 0) http://www.graphicsmagick.org/GraphicsMagick.html#details-compress
    ;

    let info = '';

    console.log("inputs.file::", inputs.file);
    console.log("req.file('file')::", req.file('file'));
    // console.log("isBuffer::",_.isBuffer(req.file('file')));


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


    info = await sails.upload(inputs.file);
    console.log('INFO UPLOAD::: ', info);


    let fd = _.pluck(info, 'fd')[0];
    console.log('FD:', fd);
// console.log("DIRNAME:::: " , __dirname+'/../../../assets/fonts');
// console.log("DIRNAME2:::: " , fs.readFileSync(__dirname+"/../../../assets/fonts/OpenSans-Light.ttf"));
// console.log("DIRNAME3:::: " , sails.getBaseurl());

    Jimp.read(fd)
      .then(resizePhoto => {
        return resizePhoto
        // .resize(Jimp.AUTO, 256) // resize
          .quality(40) // set JPEG quality
          .cover(resizeX, resizeY)
          .normalize()
          // .greyscale() // set greyscale
          .write(fd); // save
      })
      .catch(err => {
        console.error(err);
      });
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
