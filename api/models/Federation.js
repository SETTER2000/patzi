/**
 * Federation.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    abbr: {
      type: 'string',
      description: `Аббревиатура наименования федерации`,
      example: 'FCI',
      required: true,
      minLength: 2,
      maxLength: 15
    },

    label: {
      type: 'string',
      description: `Полное наименование федерации на английском.`,
      example: 'Fédération Cynologique Internationale',
      required: true,
      minLength: 2,
      maxLength: 300
    },

    labelRu: {
      type: 'string',
      description: `Полное наименование федерации на русском.`,
      example: 'Международная кинологическая федерация',
      required: true,
      minLength: 2,
      maxLength: 300
    },

    logo: {
      type: 'string',
      description: `Логотип федерации. Ссылка на картинку.`,
      required: true
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

