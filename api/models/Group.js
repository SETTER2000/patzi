/**
 * Group.js
 *
 * @description :: Группы доступа.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    label: {
      type: 'string',
      example: 'admin',
      description: 'Название группы.',
      required: true,
      unique: true
    },
    subtitle: {
      type: 'string',
      example: 'Прекрасный, здоровый щенок.',
      description: 'Описание щенка. Какая то интересная информация.'
    },
    filename: {
      type: 'string',
      example: 'my-file.jpg',
      description: 'Название файла, который загружается.'
    },
    imageUploadFD:{
      type:'string',
      description:'Дескриптор файла Skipper однозначно идентифицирует загруженное изображение.',
      // required:true
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
    whoCreate:{
      model:'User',
      required:true
    },
    // Многие ко Многим (Many-to-Many)
    // Читаем как: В группу входит пользователь, users - ключ для объеденяющей таблице
    users: {collection: 'User', via: 'groups'}
  },

};

