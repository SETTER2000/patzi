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
      example: 'A2',
      description: 'Предварительное имя щенка после рождения.'
    },
    subtitle: {
      type: 'string',
      example: 'Прекрасный, здоровый щенок.',
      description: 'Описание щенка. Какая то интересная информация.'
    },
    filename: {
      type: 'string',
      example: 'my-file.jpg',
      description: 'Название файла, который загружается.'
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
    gender:{
      type:'string',
      description:'Половая пренадлежность щенка.',
      example:'dam, sire'
      // required:true
    },
    type:{
      type:'string',
      description:'Тип собаки',
      example: 'hairless, powderpuff'
      // required:true
    },
    ourPreliminaryPrice:{
      type:'number',
      description:'Наша предварительная цена на щенка.'
    },
    preliminaryPrice:{
      type:'number',
      description:'Покупатель предложил цену за щенка.'
    },
    currency:{
      type:'string',
      description:'Валюта продажи.'
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

