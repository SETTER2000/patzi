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
// https://github.com/balderdashy/sails/issues/4604
    var fs = require('fs');
// let r =  req.allParams();
// console.log('REQQ: ', r.file);
    var gm = require('gm').subClass({imageMagick: true});
    // await sails.sockets.join(req, 'litter');

    /**
     * Функция uploadOne возвращает объект UploadedFileMetadata
     * с данными о загрузке.
     * UploadedFileMetadata {
          fd:  // fd - дескриптор файла
           'D:\\__PROJECTS\\Sails\\patzi\\.tmp\\uploads\\46ca9ce1-f7d5-44c9-8f8a-85dd7f3bcc89.JPG',
          size: 2951221, // size  - в байтах
          type: 'image/jpeg',
          filename: 'IMG_6984.JPG',
          status: 'finished',
          field: 'photo',
          extra: undefined,
          name: 'IMG_6984.JPG'
          }
     * Добавляет более простой интерфейс для работы с выгрузками и загрузками файлов в
     * приложении Node.js / Sails. Поддерживает async/await (асинхронное/ожидание).
     * Поддерживает только Node 8 и выше. (https://www.npmjs.com/package/sails-hook-uploads)
     *
     * uploadOne - не будет работать без пакета sails-hook-uploads
     * npm i --save sails-hook-uploads
     * .uploadOne (upstreamOrReadable) (принимает любой доступный для чтения поток
     * или входящую загрузку файла Sails из файла 0 или 1; возвращает либо undefined словарь,
     * либо информацию о загруженных данных файла.)
     */
  /*  const {Transform} = require('stream');
    // var stream = require('stream');
    const SkipperDiskAdapter = require('skipper-disk');
    const receiver = SkipperDiskAdapter().receive({/!* opts *!/});
    const upstream = req.file('file');*/
    // var intermediateStream = new stream.PassThrough();
    // var intermediateStream = new stream.PassThrough();
    /**
     * В upstream.pipe README написано:
     * Также имейте в виду, что вы должны сначала перехватить апстрим и прикрепить свойство
     * fd (дескриптор файла) к каждому входящему потоку файлов. В настоящее время я пытаюсь
     * выяснить, как на самом деле сделать это, так как я не могу найти примеры для этого :(
     *
     */
    // upstream.setEncoding('utf8');
  /*  upstream.on('data', (chunk) => {
      // console.log(chunk);
      if (!chunk) {
        console.log('Данные закончились!');//сообщаем, что данные закончились
        // this.push(null);

      } else {
        // this.push(chunk);
        console.log('Данные chunk: ', chunk);
        console.log(`-------------------------------------------------------------------------------`);
        console.log('Данные chunk._readableState: ', chunk._readableState);
        console.log(`*******************************************************************************`);
      }
      /!**
       * С помощью chunk._readableState.buffer - можно получить все данные буфера
       *!/
      console.log('objectMode: ', chunk._readableState.objectMode);
      console.log('highWaterMark: ', chunk._readableState.highWaterMark);
      console.log('buffer: ', chunk._readableState.buffer);//[] - пустой массив
      console.log('length: ', chunk._readableState.length);//0 - кол-во буфер объектов
      console.log('flowing: ', chunk._readableState.flowing);//null
      console.log('encoding: ', chunk._readableState.encoding);//null
    });
    const myTransform = new Transform({
      transform(chunk, encoding, callback) {

        return console.log('DDS: ', chunk);
        //
        // gm(chunk).resize('500','500').stream().pipe(chunk);
        // console.log(chunk);

        // callback();
      }
    });
    upstream.pipe(myTransform).pipe(receiver);*/




    // gm('/path/to/my/img.jpg')
    //   .resize('200', '200')
    //   .stream(function (err, stdout, stderr) {
    //     var writeStream = fs.createWriteStream('/path/to/my/resized.jpg');
    //     stdout.pipe(writeStream);
    //   });
    // ... build an intermediate transform stream to do what you need, e.g. `MyIntermediateStream`...

    // var readStream = req.file('file');
    // gm(readStream, '2.jpg')
    //   .write('.tmp/reformat.png', function (err) {
    //     if (!err) console.log('done');
    //   });
    //
    // // console.log("inputs.file::", inputs.file);
    let info = await sails.upload(inputs.file);
    // req.file('file').upload(inputs.file, (err, files)=>{
    //   if(err) {console.log(err);}
    //   console.log('File is now resized to 100px width and uploaded to ./storedImage.png');
    //    info = files;
    // });
    // console.log('info: ', info);
    // console.log('inputs.file: ' , inputs.file);

    // let fd = _.pluck(info, 'fd')[0];
    // // console.log('FD:', fd);
    // gm(fd)
    //   .resize(353, 257)
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
    info = info[0];

    if (!info) {
      throw 'badRequest';
    }
    // console.log('FILES/UPLOAD.JS файл картинки загружен в .tmp: ', info);
    // await sails.sockets.broadcast('files', 'list-file', info);
    // All done.
    return exits.success(info);

  }
};
