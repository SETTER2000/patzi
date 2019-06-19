/**
 * Kennel.js
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


    label: {
      type: 'string',
      description: `Наименование питомника`,
      example: 'Poale Ell',
      unique: true,
      required: true,
      minLength: 3,
      maxLength: 80
    },


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


    filename: {
      type: 'string',
      example: 'my-file.jpg',
      description: 'Название файла, который загружается.'
    },


    imageUploadFD:{
      type:'string',
      description:'Дескриптор файла Skipper однозначно идентифицирует загруженное изображение, связанное с этой «вещью».'
    },


    imageUploadMime:{
      type:'string',
      description:'Тип MIME для загруженного изображения.'
    },


    rightName: {
      type: 'boolean',
      defaultsTo: false,
      description:'true - имя питомника пишется справа от имени собаки.'
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
      required: true,
      description: `Дата создания.`
    },


    registerNumber: {
      type: 'string',
      description: `Регистрационный номер.`,
      required: true,
      example: '123964-54'
    },


    location: {
      type: 'string',
      defaultsTo: ''
    },


    site: {
      type: 'string',
      maxLength: 150,
      description: `Официльный сайт питомника. Без протокола http | https`,
      example: 'www.poaleell.com'
    },


    phones:{
      type:'ref',
      description:'Список телефонов'
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


    whoCreate:{
      model:'User',
      required:true,
      description:'Кто создал запись в БД.'
    },


    yourKennel: {
      model:'User',
      description: `Это ваш питомник?`
    },



    region: {
      model: 'continent',
      required: true,
      description: 'Питомник может принадлежать только одному континенту. One to Many'
    },

    country: {
      model: 'country',
      required: true,
      description: 'Питомник может принадлежать только одной стране. One to Many'
    },

    city: {
      model: 'city',
      description: `Питомник может принадлежать только одноу городу. One to Many.`
    },
  },

};

