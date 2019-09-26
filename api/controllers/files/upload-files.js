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
    // const gm = require('gm').subClass({imageMagick: true});
    const gm = require('gm')
      , resizeX = 1424
      , resizeY = 800
      , gravity = 'Center'// NorthWest, North, NorthEast, West, Center, East, SouthWest, South, SouthEast
      , Q = 45 // Качество изображения (100 - 0) http://www.graphicsmagick.org/GraphicsMagick.html#details-compress
    ;

    let info = '';

    // console.log("inputs.file::", inputs.file);
    info = await sails.upload(inputs.file);
    // console.log('INFO UPLOAD::: ' , info);


    let fd = _.pluck(info, 'fd')[0];
    // console.log('FD:', fd);
// console.log("DIRNAME:::: " , __dirname+'/../../../assets/fonts');
// console.log("DIRNAME2:::: " , fs.readFileSync(__dirname+"/../../../assets/fonts/OpenSans-Light.ttf"));
// console.log("DIRNAME3:::: " , sails.getBaseurl());
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
      .modulate(110,90)
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
    //
    // gm(fd)
    //   .resize(1424, 800)
    //   .autoOrient()
    //   .noProfile()
    //   .write(fd, function (err) {
    //     if (err) console.log('ERROP::: ' ,err);
    //   });

    // gm(fd)
    //   .size({bufferStream: true}, function(err, size) {
    //     this.resize(size.width / 2, size.height / 2);
    //     this.write(p+fd.name, function (err) {
    //       if (err) console.log('ERRO::: ', err);
    //     });
    //   });
    // let readStream = fs.createReadStream(files);
    // var writeStream = fs.createWriteStream(fd);
    // gm(p+fd.name)
    //   .resize('200', '200')
    //   .stream()
    //   .pipe(writeStream);

    // var readStream = fs.createReadStream(fd);
    // gm(readStream, fd.filename)
    //   .resize(240, 240)
    //   .noProfile()
    //   .write(readStream, function (err) {
    //     if(err) console.log(err);
    //     if (!err) console.log('done');
    //   });
    // gm(fd)
    //   .resize(1424, 800)
    //   .autoOrient()
    //   .write(fd, function (err) {
    //     if (!err) console.log(' Error resizing file! ');
    //   });

    // fs.readFile(fd, function(err, data){
    //   if(err){
    //     console.error(err);
    //   }else{
    //     console.log(data);
    //     gm(data)
    //       .resize(353, 257)
    //       .autoOrient()
    //       .write(data, function (err) {
    //         if (!err) console.log(' hooray! ');
    //       });
    //     if (!info) {
    //       throw 'badRequest';
    //     }
    //   }
    // });


    if (!info) {
      throw 'badRequest';
    }
    // console.log('FILES/UPLOAD.JS файл картинки загружен в .tmp: ', info);
    // await sails.sockets.broadcast('files', 'list-file', info);
    // All done.
    return exits.success(info[0]);

  }
};
