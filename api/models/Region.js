/**
 * Region.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  migrate: 'safe',
  datastore: 'mysqlDb',
  tableName: '_regions',
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    createdAt: false,
    updatedAt: false,
    id: {
      type: 'number',
      unique: true,
      columnName: 'region_id',
      autoIncrement: true
    },


    value: {type: 'string', columnName: 'title_en'},
    labelRu: {type: 'string', columnName: 'title_ru'},
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
    labelC: {type: 'string', columnName: 'title_cz'},

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    country: {
      model: 'country',
      description: 'Регион может принадлежать только одной стране. One to Many',
      columnName: 'country_id',
    }
  }
};

