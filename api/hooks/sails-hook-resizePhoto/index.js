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
        'POST   /api/v1/files/upload': function (req, res, next) {
          const fs = require('fs')
            , gm = require('gm')
            , Writable = require('stream').Writable;
          // console.log('req.file: ', req.file('file'));


          // The output stream to pipe to

          let output = req.file('file');
          // let output = require('fs').createWriteStream('storedImage.png');

          // Let's create a custom receiver
          // var receiver = new Writable({objectMode: true});
          // let receiver = req.file('file').pipe(Writable);
          // receiver._write = function(file, enc, cb) {
          //   gm(file).resize('200', '200').stream().pipe(cb);
          //
          // };



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
