/**
 * City.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  migrate: 'safe',
  datastore: 'mysqlDb',
  tableName: '_cities',
  dontUseObjectIds: true,
  attributes: {
    createdAt: false,
    updatedAt: false,
    id: {
      type: 'number',
      unique: true,
      columnName: 'city_id',
      autoIncrement: true
    },


    value: {
      type: 'string',
      example: 'Moscow',
      columnName: 'title_en',
      description: 'Наименование города на английском.'
      // required: true
    },


    labelRu: {
      type: 'string',
      example: 'Москва',
      description: 'Наименование города на русском.',
      columnName: 'title_ru',
      moreInfoUrl: 'https://ru.wikipedia.org/wiki/Россия'
    },



    // regionId: {type: 'string', columnName: 'region_id'},

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
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝


    // whoCreate: {
    //   model: 'User',
    //   required: true,
    //   description: 'Кто создал запись в БД.'
    // },


    // Add a reference to User
    region: {
      model: 'region',
      description: 'Город может принадлежать только одному региону. One to Many',
      columnName: 'region_id',
    }
  },

};

