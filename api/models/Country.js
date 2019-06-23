/**
 * Country.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,
  migrate: 'safe',
  datastore: 'mysqlDb',
  tableName: '_countries',
  dontUseObjectIds: true,
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    createdAt: false,
    updatedAt: false,


    id: {
      type: 'number',
      unique: true,
      columnName: 'country_id',
      autoIncrement: true
    },


    label: {
      type: 'string',
      example: 'Russia',
      columnName: 'title_en',
      description: 'Наименование страны на английском.',
      // required: true,
      // unique: true,
      moreInfoUrl: 'https://en.wikipedia.org/wiki/Russia'
    },


    labelRu: {
      type: 'string',
      example: 'Россия',
      columnName: 'title_ru',
      description: 'Наименование страны на русском.',
      moreInfoUrl: 'https://ru.wikipedia.org/wiki/Россия'
    },


    labelUa: {type: 'string', columnName: 'title_ua'},
    labelBe: {type: 'string', columnName: 'title_be'},
    labelEs: {type: 'string', columnName: 'title_es'},
    labelPt: {type: 'string', columnName: 'title_pt'},
    labelDe: {type: 'string', columnName: 'title_de'},
    labelFr: {type: 'string', columnName: 'title_fr'},
    labelIt: {type: 'string', columnName: 'title_it'},
    labelPl: {type: 'string', columnName: 'title_pl'},
    labelJa: {type: 'string', columnName: 'title_ja'},
    labelLt: {type: 'string', columnName: 'title_lt'},
    labelLv: {type: 'string', columnName: 'title_lv'},
    labelCz: {type: 'string', columnName: 'title_cz'},
    // description: {
    //   type: 'string',
    //   example: 'Росси́я, официально также Росси́йская Федера́ция[e] (РФ[f]) — государство в Восточной Европе и Северной Азии. Территория России в рамках её конституционного устройства[c] составляет 17 125 191[6] км²; население страны (в пределах её заявленной территории[c]) составляет 146 781 095[7] чел. (2019). Занимает первое место в мире по территории, шестое — по объёму ВВП по ППС и девятое — по численности населения.',
    //   description: 'Описание страны.',
    //   // moreInfoUrl:'https://ru.wikipedia.org/wiki/Континент#Евразия'
    // },
    //
    //
    // imageUploadFD: {
    //   type: 'string',
    //   description: 'Дескриптор файла Skipper однозначно идентифицирует загруженное изображение.',
    //   //required:true
    // },
    //
    //
    // imageUploadMime: {
    //   type: 'string',
    //   description: 'Тип MIME для загруженного изображения.',
    //   // required:true
    // },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝



    kennels: {
      collection: 'kennel',
      via: 'country',
      description: `У страны, может быть много питомников. One to Many.`
    },

    continent: {
      model: 'continent',
      description: 'Страна может принадлежать только одному континенту. One to Many',
      columnName: 'id'
    },

    regions: {
      collection: 'region',
      via: 'country',
      description: 'У страны, может быть много регионов. One to Many'
    }
  },

};

