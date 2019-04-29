/**
 * Litter.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    label: {
      type: 'string',
      example: 'A',
      description: 'Буква помёта. Должна быть уникальна.',
      // required: true,
      // unique: true
    },
    born: {
      type: 'number',
      example: 1502844074211,
      // type: 'string',
      // columnType: 'date',
      // example: '10.04.2016',
      description: 'Дата появления на свет помёта.'
    },
    title: {
      type: 'string',
      example: 'The girl is wonderful!',
      description: 'Custom label with a brief additional description of this item.'
    },
    subtitle: {
      type: 'string',
      example: 'Beautiful, noble dog, your eternal companion on a journey through the world. Life and light in such a small creature.',
      description: 'Custom label with full description of this product.'
    },

    imageUploadFD:{
      type:'string',
      description:'Дескриптор файла Skipper однозначно идентифицирует загруженное изображение, связанное с этой «вещью».',
      required:true
    },
    imageUploadMime:{
      type:'string',
      description:'Тип MIME для загруженного изображения.',
      required:true
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    owner:{
      model:'User',
      required:true
    },
    borrowedBy: { model: 'User', description: 'Пользователь, который попросил одолжить этот товар.' },
  },

};

