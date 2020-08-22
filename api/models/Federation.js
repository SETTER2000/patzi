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
  /*  abbr: {
      type: 'string',
      description: `Аббревиатура наименования федерации`,
      example: 'FCI',
      required: true,
      minLength: 2,
      maxLength: 15
    },
*/
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

    flag: {
      type: 'string',
      description: `ССылка на флаг страны. Из Википедии можно взять. SVG`
    },
    site: {
      type: 'string',
      description: `Сайт Федерации`,
      maxLength:170
    },
    see: {
      type: 'boolean',
      defaultsTo: true,
      description: `Флаг видимости титула. Видна или нет. По умолчанию видна.`
    },
    dateBirth: {
      type: 'number',
      required: true,
      description: 'Дата образования.'
    },
    images: {
      type: 'ref',
      defaultsTo: [],
      example: ['5d1f1b04fbe834262cbb8c53', '5d1f1b04fbe834262cbb8c54'],
      description: `FD загруженных фотографий родителей`
    },

    titleBackground: {
      type: 'ref',
      example: {},
      description: `Объект файла данных о загруженном файле. Фон титула.`
    },

    subtitle: {
      type: 'string',
      description: 'Дополнительная информация. Описание титула на английском языке.',
      maxLength: 700
    },

    subtitleRu: {
      type: 'string',
      description: 'Дополнительная информация. Описание титула на русском языке.',
      maxLength: 700
    },

    cover: {
      type: 'number',
      defaultsTo: 0,
      example: 5,
      description: `Номер ключа в массиве фотографий, который определяет главную фотографию альбома.
                    Обложка альбома.`
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

