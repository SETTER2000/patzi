/**
 * Continent.js
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
      example: 'Europe',
      description: 'Наименование континента.',
      required: true,
      unique: true,
      moreInfoUrl:'https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BD%D1%82%D0%B8%D0%BD%D0%B5%D0%BD%D1%82#%D0%95%D0%B2%D1%80%D0%B0%D0%B7%D0%B8%D1%8F'
    },

    description: {
      type: 'string',
      example: 'Евра́зия — самый большой материк на Земле, и единственный, омываемый четырьмя океанами: на юге — Индийским, на севере — Северным Ледовитым, на западе — Атлантическим, на востоке — Тихим. Континент расположен в Северном полушарии между 9° з. д. и 169° з. д., при этом часть островов Евразии находится в Южном полушарии.',
      description: 'Описание континента.',
      moreInfoUrl:'https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BD%D1%82%D0%B8%D0%BD%D0%B5%D0%BD%D1%82#%D0%95%D0%B2%D1%80%D0%B0%D0%B7%D0%B8%D1%8F'
    },


    imageUploadFD:{
      type:'string',
      description:'Дескриптор файла Skipper однозначно идентифицирует загруженное изображение.',
      //required:true
    },


    imageUploadMime:{
      type:'string',
      description:'Тип MIME для загруженного изображения.',
     // required:true
    },


    filename: {
      type: 'string',
      example: 'my-file.jpg',
      description: 'Название файла, который загружается.'
    },


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


    countrys: {
      collection: 'country',
      via: 'region',
      description: 'У континента, может быть много стран. One to Many'
    },

    kennels: {
      collection: 'kennel',
      via: 'region',
      description: `У континента, может быть много питомников. One to Many. 
      Собаки питомника. Рождённые и приобретённые.`
    },
  },

};

