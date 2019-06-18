/**
 * City.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    value:{
      type:'string',
      example: 'Moscow',
      description:'Наименование города на английском.',
      required: true
    },
    labelRu: {
      type: 'string',
      example: 'Москва',
      description: 'Наименование города на русском.',
      moreInfoUrl:'https://ru.wikipedia.org/wiki/Россия'
    },
    link:{
      type:'string',
      description:'Линк'
    },

    description:{
      type:'string',
      description:'Описание города'
    },

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝


    whoCreate:{
      model:'User',
      required:true,
      description:'Кто создал запись в БД.'
    },


    // Add a reference to User
    region: {
      model: 'country',
      description: 'Город может принадлежать только одной стране. One to Many'
    }
  },

};

