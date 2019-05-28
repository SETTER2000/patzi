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
      defaultsTo: true,
      description: 'Активация питомника в системе. Если false, то заблокирован.'
    },


    rightName: {
      type: 'boolean',
      defaultsTo: false
    },


    label: {
      type: 'string',
      description: `Наименование питомника`,
      example: 'Poale Ell',
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
      description: 'Дополнительная информация, описание.'
    },


    dateCreate: {
      type: 'string',
      description: `Дата создания.`
    },


    registerNumber: {
      type: 'string',
      description: `Регистрационный номер.`,
      example: 'www.poaleell.com'
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
      type: 'string',
      maxLength: 150,
      description: `Официльный сайт питомника. Без протокола http | https`,
      example: 'www.poaleell.com'
    },


    city: {
      type: 'string',
      description: `Город где расположен.`,
      example: 'Москва.'
    },


    country: {
      type: 'string',
      description: `Страна где зарегистрирован.`,
      example: 'Россия.'
    },


    address: {
      type: 'string',
      description: `Адрес.`,
      example: 'ул. Остров д.1 к.1'
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    dogs: {
      collection: 'dog',
      via: 'kennels',
      dominant: true,
      description: 'Собаки питомника. Рождённые и приобретённые.'
    },



    users: {
      collection: 'user',
      via: 'kennels',
      description: 'Владельцы питомника. Их может быть несколько, а так же один.'
    }
  },

};

