/**
 * Country.js
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
      example: 'Russia',
      description: 'Наименование страны.',
      required: true,
      unique: true,
      moreInfoUrl:'https://en.wikipedia.org/wiki/Russia'
    },

    description: {
      type: 'string',
      example: 'Росси́я, официально также Росси́йская Федера́ция[e] (РФ[f]) — государство в Восточной Европе и Северной Азии. Территория России в рамках её конституционного устройства[c] составляет 17 125 191[6] км²; население страны (в пределах её заявленной территории[c]) составляет 146 781 095[7] чел. (2019). Занимает первое место в мире по территории, шестое — по объёму ВВП по ППС и девятое — по численности населения.',
      description: 'Описание страны.',
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

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    region: {
      model: 'continent',
      description: 'Страна может принадлежать только одному континенту. One to Many'
    },

    kennels: {
      collection: 'kennel',
      via: 'country',
      description: `У страны, может быть много питомников. One to Many.`
    },

    citys: {
      collection: 'city',
      via: 'region',
      description: 'У страны, может быть много городов. One to Many'
    }
  },

};

