/**
 * Security.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastores: 'mongoDbConnect',
  attributes: {
    id: {type: 'string', columnName: '_id', required:true},

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    label: {
      type: 'string',
      example: '_csrf',
      description: 'Имя токена'
    },
    token: {
      type: 'string',
      example: 'U3pimTX1-5CEatBeqXwFJadTgU3MrHVHfpNg',
      description: '_csrf токен, который отдаётся пользователю для доступа к API приложения',
      required: true,
      unique: true
    },
    owner: {
      type: 'string',
      example: 'mailgun',
      description: 'Имя клиента для кого сгенерирован токен.'
    },
    hostname: {
      type: 'string',
      example: 'www.example.com',
      description: 'Имя хоста, указанное в заголовке HTTP хоста.' +
      ' Этот заголовок может быть установлен клиентом или прокси.'
    },
    path:{
      type: 'string',
      example: '/donor/37?name=foo#foobar',
      description: 'Путь URL-адреса из строки текущего запроса. Всё после hostname.'
    }
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

