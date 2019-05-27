/**
 * Kennel.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    section: {
      type: 'string',
      defaultsTo: 'Питомник'
    },
    sections: {
      type: 'string',
      defaultsTo: 'Питомники'
    },
    action: {
      type: 'boolean',
      defaultsTo: true
    },
    rightName: {
      type: 'boolean',
      defaultsTo: false
    },
    label: {
      type: 'string',
      unique: true,
      required: true,
      minLength: 2,
      maxLength: 150
    },
    type: {
      type: 'string',
      defaultsTo: ''
    },
    subtitle: {
      type: 'string',
      defaultsTo: '',
      description:'Дополнительная информация. Описание питомника.'
    },
    dateCreate: {
      type: 'string'
    },
    registerNumber: {
      type: 'string'
    },

    location: {
      type: 'string',
      defaultsTo: ''
    },

    children: {
      type: 'ref'
    },

    parent: {
      type: 'string'

    },

    childrenObj: {
      type: 'ref'
    },

    ancestors: {
      type: 'ref'
    },

    suite: {
      type:'string',
      maxLength: 150
    },

    city: {type: 'string'},

    country: {type: 'string'},

    address: {type: 'string'},


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    dogs: {
      collection: 'dog',
      via: 'kennels',
      dominant: true
    },


    // Добавить ссылку на пользователя
    users: {
      collection: 'user',
      via: 'kennels'
    }
  },

};

