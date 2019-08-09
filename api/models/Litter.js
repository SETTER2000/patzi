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
      maxLength: 100,
      example: 'Ожидается звёздный помёт. Прекрасные родословные, чистокровные производители.',
      description: 'Краткое Описание помёта. Какая то интересная информация.'
    },


    description: {
      type: 'string',
      maxLength: 500,
      example: 'Ожидается звёздный помёт. Прекрасные родословные, чистокровные производители.',
      description: 'Описание помёта. Какая то интересная информация.'
    },

    //
    // descriptionPhotoSession: {
    //   type: 'string',
    //   maxLength: 300,
    //   example: 'Прекрасным тёплым утром. Крошечные комочки после завтрака.',
    //   description: 'Описание фотосессии. Рассказ про то как и где снимали.'
    // },

    //
    // sessionName: {
    //   type: 'string',
    //   example: 'Два дня от роду',
    //   description: 'Название фотосессии для щенков.'
    // },


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
      example: ['5d1f1b04fbe834262cb22c53', 'Poale Ell Adam']
    },


    dam: {
      type: 'ref',
      description: 'Сука учавствующий в помёте, т.е. мать.',
      defaultsTo: [],
      example: ['5d1f1b04fbe834262cbb8c53', 'Sasquehanna Ella']
    },


    images: {
      type: 'ref',
      defaultsTo: [],
      example: ['5d1f1b04fbe834262cbb8c53', '5d1f1b04fbe834262cbb8c54'],
      description: `FD загруженных фотографий родителей`
    },


    puppies: {
      type: 'ref',
      defaultsTo: [],
      example: [
        {
          sessionName:'30 дней.',
          descriptionPhotoSession:'Мои забавные щенки после еды.',
          photos:[{
            fd:
              'D:\\__PROJECTS\\Sails\\patzi\\.tmp\\uploads\\d8820acf-1521-465c-908e-68659adab4e0.JPG',
            size: 56357,
            type: 'image/jpeg',
            name: 'IMG_5763.JPG'
          }]
        },
      ],
      description: `FD загруженных фотографий щенков`
    },


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

