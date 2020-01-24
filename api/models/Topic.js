/**
 * Topic.js
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
      description: `Название темы. Например для блога или статей.`,
      example: 'Exhibitions',
      required: true,
      minLength: 2,
      maxLength: 200
    },
    labelRu: {
      type: 'string',
      description: `Название темы на русском языке. Например для блога или статей.`,
      example: 'Выставки',
      required: true,
      minLength: 2,
      maxLength: 200
    },
    see: {
      type: 'boolean',
      defaultsTo: true,
      description: `Флаг видимости темы. Видна или нет. По умолчанию видна.`
    },

    images: {
      type: 'ref',
      defaultsTo: [],
      example: ['5d1f1b04fbe834262cbb8c53', '5d1f1b04fbe834262cbb8c54'],
      description: `FD загруженных фотографий родителей`
    },

    subtitle: {
      type: 'string',
      description: 'Дополнительная информация. Описание темы на английском языке.',
      maxLength: 700
    },

    subtitleRu: {
      type: 'string',
      description: 'Дополнительная информация. Описание темы на русском языке.',
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

