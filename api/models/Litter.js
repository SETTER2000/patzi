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


    born: {
      type: 'string',
      example: '2019-06-10T09:00:00.000Z',
      required: true,
      description: 'Дата помёта.'
    },


    letter: {
      type: 'string',
      required: true,
      example: 'A',
      description: 'Буква помёта. Должна быть уникальна.',
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


    cover: {
      type: 'number',
      defaultsTo: 0,
      example: 5,
      description: `Номер ключа в массиве фотографий, который определяет главную фотографию альбома.
                    Обложка альбома.`
    },

    sire: {
      type: 'ref',
      description: 'Кобель учавствующий в помёте, т.е. отец.',
      defaultsTo: [],
      example: ['5d1f1b04fbe834262cb22c53','Poale Ell Adam']
    },

    dam: {
      type: 'ref',
      description: 'Сука учавствующий в помёте, т.е. мать.',
      defaultsTo: [],
      example: ['5d1f1b04fbe834262cbb8c53','Sasquehanna Ella']
    },

    images: {
      type: 'ref',
      defaultsTo: [],
      example: ['5d1f1b04fbe834262cbb8c53','5d1f1b04fbe834262cbb8c54'],
      description: `FD загруженных фотографий`
    },
    // dogs: {
    //   type: 'ref',
    //   description: 'Собаки учавствующие в помёте, т.е. родители.',
    //   defaultsTo: [],
    //   example: [{id:'5d1f1b04fbe834262cbb8c53',label:'Poale Ell Adam'},{id:'5d1f1b04fbe834262cb22c53',label:'Sasquehanna Ella'}]
    // },
    // filename: {
    //   type: 'string',
    //   example: 'my-file.jpg',
    //   description: 'Название файла, который загружается.'
    // },
    // imageUploadFD:{
    //   type:'string',
    //   description:'Дескриптор файла Skipper однозначно идентифицирует загруженное изображение.',
    //   required:true
    // },
    // imageUploadMime:{
    //   type:'string',
    //   description:'Тип MIME для загруженного изображения.',
    //   required:true
    // },
    // gender:{
    //   type:'string',
    //   description:'Половая пренадлежность щенка.',
    //   example:'dam, sire'
    //   // required:true
    // },

    ourPreliminaryPrice: {
      type: 'number',
      description: 'Наша предварительная цена на щенка.'
    },


    preliminaryPrice: {
      type: 'number',
      description: 'Покупатель предложил цену за щенка.'
    },


    currency: {
      type: 'string',
      description: 'Валюта продажи.'
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝


    // Добавить ссылку на Dog
    /*  dogs: {
        collection: 'dog',
        via: 'litters',
        description: 'Помёт может принадлежать нескольким собакам. Many to Many (Многие-ко-многим)'
      },*/


    // images: {
    //   collection: 'image',
    //   via: 'litter',
    //   description: `У помёта, может быть много фотографий. One to Many.`
    // },


    owner: {
      model: 'User',
      required: true
    },


    kennel: {
      model: 'kennel',
      description: 'Помёт может принадлежать только одному питомнику. One to Many'
    },


  },
};

