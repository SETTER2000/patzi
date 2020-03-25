/**
 * Post.js
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
      description: `Название поста. Например для блога или статей.`,
      example: 'Exhibitions',
      required: true,
      minLength: 2,
      maxLength: 200
    },
    labelRu: {
      type: 'string',
      description: `Название поста на русском языке. Например для блога или статей.`,
      example: 'Выставки',
      required: true,
      minLength: 2,
      maxLength: 200
    },
    see: {
      type: 'boolean',
      defaultsTo: true,
      description: `Флаг видимости поста. Видна или нет. По умолчанию видна.`
    },

    firstTopic: {
      type: 'boolean',
      defaultsTo: false,
      description: `True - тема, которая должна выводиться первой в списке.`
    },

    images: {
      type: 'ref',
      defaultsTo: [],
      example: ['5d1f1b04fbe834262cbb8c53', '5d1f1b04fbe834262cbb8c54'],
      description: `FD загруженных фотографий родителей`
    },

    topicBackground: {
      type: 'ref',
      example: {},
      description: `Объект файла данных о загруженном файле. Фон поста.`
    },

    subtitle: {
      type: 'string',
      description: 'Дополнительная информация. Описание поста на английском языке.',
      maxLength: 700
    },

    backgroundPosition: {
      type: 'string',
      description: 'Дополнительная информация. Описание поста на английском языке.',
      maxLength: 30
    },

    subtitleRu: {
      type: 'string',
      description: 'Дополнительная информация. Описание поста на русском языке.',
      maxLength: 700
    },

    cover: {
      type: 'number',
      defaultsTo: 0,
      example: 5,
      description: `Номер ключа в массиве фотографий, который определяет главную фотографию альбома.
                    Обложка альбома.`
    },

    dateEvent: {
      type: 'string',
      required: true,
      description: 'Дата события.'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    topic: {
      model: 'topic',
      description: 'Комментарий может принадлежать только одному пользователю. One to Many'
    },

  },

};

