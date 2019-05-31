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
      defaultsTo: false,
      description:'true - имя питомника пишется справа от имени собаки.'
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
    yourKennel: {
      type: 'boolean',
      description: `Это ваш питомник?`,
      required: true
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
      example: '123964-54'
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


    site: {
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
      via: 'kennel',
      description: `У питомника, может быть много собак. One to Many. 
      Собаки питомника. Рождённые и приобретённые.`
    },


    users: {
      collection: 'user',
      via: 'kennels',
      description: 'Владельцы питомника. Их может быть несколько, а так же один.'
    },


    region: {
      model: 'continent',
      description: 'Питомник может принадлежать только одному континенту. One to Many'
    },

    whoCreate:{
      model:'User',
      required:true,
      description:'Кто создал запись в БД.'
    },

    country: {
      model: 'country',
      description: 'Питомник может принадлежать только одной стране. One to Many'
    }
  },

};

