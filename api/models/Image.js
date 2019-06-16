/**
 * Image.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    // filename: {
    //   type: 'string',
    //   example: 'my-file.jpg',
    //   description: 'Название файла, который загружается.'
    // },
    //
    //
    // imageUploadFD:{
    //   type:'string',
    //   description:'Дескриптор файла Skipper однозначно идентифицирует загруженное изображение, связанное с этой «вещью».',
    //   required:true
    // },
    //
    //
    // imageUploadMime:{
    //   type:'string',
    //   description:'Тип MIME для загруженного изображения.',
    //   required:true
    // },

    img:{
      type:'ref',
      description:'Массив файлов img'
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    dog: {
      model: 'dog',
      description: 'Фотография может принадлежать только одному владельцу. One to Many'
    },


    litter: {
      model: 'litter',
      description: 'Фотография или массив фото может принадлежать только одному владельцу. One to Many'
    },
  },

};

