/**
 * Comment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    comment: {
      type: 'string',
      example: 'Hello, world!',
      required: true,
      description: 'Текст комментария.'
    },


    nameModule: {
      type: 'string',
      example: 'Litter',
      required: true,
      description: `Наименование модуля.`
    },


    instanceModuleId: {
      type: 'string',
      example: '5d5fc8aac1717d2778adbfae',
      required: true,
      description: `Идентификатор экземпляра модуля в котором оставлен комментарий. Например в модуле Litter
      (помёты) их может быть несколько, следовательно каждый помёт имеет свой ID, он и записывается здесь.`
    },


    userName: {
      type: 'string',
      example: 'Alex Fox',
      required: true,
      description: `Полное имя пользователя.`
    },


    field: {
      type: 'string',
      example: 'puppies',
      required: true,
      description: `Наименование поля в объекте экземпляра модуля в котором содержится контент к 
      которому относится комментарий.`
    },


    indexPhotoSet: {
      type: 'string',
      example: '2911bfggfhahdd',
      required: true,
      description: `Хэш-код объекта массива.`
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    owner: {
      model: 'user',
      description: 'Комментарий может принадлежать только одному пользователю. One to Many'
    },


    likes: {
      collection: 'like',
      via: 'comment',
      description: 'У комментария, может быть много лайков. One to Many'
    },

    parent: {
      model: 'commentary'
    },

    child: {
      collection: 'commentary',
      via: 'parent',
      description: 'Комментарий может принадлежать только одному родительскому комментарию. One to Many'
    },
    // Добавить новый комментарий newComment.id в группу 'admin'
    // await Commentary.addToCollection(newComment.id, 'child', parent.id);

    // Добавить пользователя alexFox.id в группу 'admin'
    // await User.addToCollection(alexFox.id, 'groups', group.id);
  },

};

