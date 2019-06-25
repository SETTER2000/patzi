/**
 * Continent.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  migrate: 'safe',
  datastore: 'mysql',
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
      autoIncrement: true,
      columnName:'id'
    },


    label: {
      type: 'string',
      example: 'Europe',
      description: 'Наименование континента.',
      columnName:'label',
      unique: true,
      moreInfoUrl: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BD%D1%82%D0%B8%D0%BD%D0%B5%D0%BD%D1%82#%D0%95%D0%B2%D1%80%D0%B0%D0%B7%D0%B8%D1%8F'
    },

    labelRu: {
      type: 'string',
      example: 'Европа',
      columnName:'labelRu',
      description: 'Наименование континента.',
      moreInfoUrl: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BD%D1%82%D0%B8%D0%BD%D0%B5%D0%BD%D1%82#%D0%95%D0%B2%D1%80%D0%B0%D0%B7%D0%B8%D1%8F'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝


    countrys: {
      collection: 'country',
      via: 'continent',
      description: 'У континента, может быть много стран. One to Many'
    },

    kennels: {
      collection: 'kennel',
      via: 'continent',
      description: `У континента, может быть много питомников. One to Many.
      Собаки питомника. Рождённые и приобретённые.`
    },
  },

};

