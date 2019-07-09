/**
 * sails-hook-resizePhoto hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineSailsHookResizePhotoHook(sails) {
  let hook;
  return {

    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async function (cb) {

      sails.log.info('Initializing custom hook (`sails-hook-resizePhoto`)');
      // Assign this hook object to the `hook` var.
      // This allows us to add/modify values that users of the hook can retrieve.
      hook = this;
      // Initialize a couple of values on the hook.
      hook.numRequestsSeen = 0;
      hook.numUnhandledRequestsSeen = 0;
      console.log('hook.numRequestsSeen: ', hook.numRequestsSeen);
      // Signal that initialization of this hook is complete
      // by calling the callback.
      return cb();
    },
    routes: {
      before: {
        'POST   /api/v1/files/rrr': function (req, res, next) {
          // var fs = require('fs')
          //   , gm = require('gm').subClass({imageMagick: true});
          // const Writable = require('stream').Writable;

          // The output stream to pipe to
          // const output = require('fs').createWriteStream('.tmp/uploads/storedImage.jpg');

          // Let's create a custom receiver
          // console.log(req.file('file'));
          // var readStream = req.file('file');
          // gm(req, '2.jpg')
          //   .resize('200', '200')
          //   .stream(function (err, stdout, stderr) {
          //     var writeStream = fs.createWriteStream('.tmp/resized.jpg');
          //     stdout.pipe(writeStream);
          //   });
          // receiver._write = function(file, enc, cb) {

          //   console.log('GGGG:', file);
          //   gm(file).resize(200, 200).stream().pipe(output);
          //
          //   // cb();
          // };
          // receiver._write();
          // var readStream = req.file('file').upload(function (err, uploadedFiles){
          //   if (err) return res.send(500, err);
          //   return res.send(200, uploadedFiles);
          // });
          // console.log('XXXXX: ',req.file('file')._write());
          // req.file('file').upload(res, (err, files) => {
          //   if (err) {
          //     console.log(err);
          //   }
          //   console.log('files: ', files[0].fd);
          //   gm(files[0].fd)
          //     .resize(200, 200)
          //     .write(`${files[0].fd}`, function (err) {
          //       if (err) {
          //         return console.log("Erroriki:", err);
          //       }
          //       console.log(this.outname + ' created  ::  ');
          //     }
          //     );
          //   // .stream().pipe(receiver);
          //   console.log('File is now resized to 100px width and uploaded to ./storedImage.png');
          // });
          // const fs = require('fs');
          // const gm = require('gm');
          // const Writable = require('stream').Writable;
          // const blobAdapter = require('skipper-disk')();
          // const receiving = blobAdapter.receive();
          // The output stream to pipe to
          // const output = req.file('file');
          // console.log('req.file: ', req.file('file'));
          //
          // const receiver = req.file('file');
          // // const receiver = new Writable({objectMode: true});
          // receiver._write = function(file, enc) {
          //   console.log('file::',file);
          //   gm(file).resize(200, 200).stream().pipe(receiver);
          //
          //
          // };

          // The output stream to pipe to

          // let output = req.file('file');
          // let output = require('fs').createWriteStream('storedImage.png');
          // let to = function (err, data,cb){
          //   console.log('data::', data);
          //   cb();
          // };


          // req.file('file').upload(receiving, (err, filesUploaded) => {
          //   // console.log('filesUploaded::', filesUploaded[0].fd);
          //   // console.log('FDD:', filesUploaded[0].fd);
          //   gm(filesUploaded[0].fd).resize('200', '200').stream().pipe(receiving);
          //  /* gm(filesUploaded[0].fd)
          //     .resize(1024,800) // переопределить пропорции изображения
          //     .quality(30)
          //     .write(filesUploaded[0].fd, function (err) {
          //       if (err) {return console.log('ERRRR: ', err);}
          //       console.log(this.outname + ' created  ::  ' );
          //     });*/
          //   // gm(filesUploaded[0].fd).resize('200', '200').stream().pipe(receiving);
          // });
          // req.file('file').upload( (err, uploadedFiles) =>{
          //
          //   console.log('uploadedFiles:: ', uploadedFiles);
          //   gm(uploadedFiles[0].fd).resize('200', '200').stream().pipe(next);
          // });
          // Let's create a custom receiver
          // var receiver = new Writable({objectMode: true});
          // let receiver = req.file('file').pipe(Writable);
          // req.file('file')._write((file, enc, cb) => {
          //   console.log('file::', file);
          //   gm(file).resize('200', '200').stream().pipe(cb);
          //
          // });


          return next();
        }
      },
      // after: {
      //   'GET /*': function (req, res, next) {
      //     hook.numUnhandledRequestsSeen++;
      //     return next();
      //   }
      // }
    }

  };

};
