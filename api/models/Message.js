/**
 * Message.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastores: 'mongoDbConnect',
  attributes: {
    id: {type: 'string', columnName: '_id', required:true},

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    filename: {
      type: 'string',
      example: 'my-file.jpg',
      description: 'Название файла, который загружается.'
    },

    imageUploadFD:{
      type:'string',
      description:'Дескриптор файла Skipper однозначно идентифицирует загруженное изображение, связанное с этой «вещью».',
      // required:true
    },

    imageUploadMime:{
      type:'string',
      description:'Тип MIME для загруженного изображения.',
      // required:true
    },

    sender:{
      type:'string',
      description:'Отправитель сообщения.',
      required:true
    },

    recipient:{
      type:'string',
      description:'Получатель сообщения.',
      required:true
    },

    subject:{
      type:'string',
      description:'Тема сообщения.',
      required:true
    },

    bodyPlain:{
      type:'string',
      description:'Тело сообщения.',
      required:true
    },

    bodyWithoutQuotes:{
      type:'string',
      description:'?...сообщения.',
      // required:true
    }
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

