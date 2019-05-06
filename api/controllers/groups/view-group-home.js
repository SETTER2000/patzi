module.exports = {


  friendlyName: 'View group home',


  description: 'Display "Group home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/group/group-home'
    }

  },



  fn: async function (inputs, exits) {
    // Бибилиотека Node.js
    const url = require('url');
    // const moment = require('moment');
    // Устанавливаем для пользователя его локаль. Для соответствующего отображения даты.
    // moment.locale(this.req.me.preferredLocale);


    // Выбираем авторизованного пользователя и всех его
    // Выбираем пользователя с массивом друзей по ассоциативному полю friends.
    // let me = await User.findOne({
    //   id: this.req.me.id
    // }).populate('friends');
    /**
     * me:
     * {
     * id: ...,
     * fullName: ...,
     * friends: [{id: ..., fullName: ...,}],
     * }
     */
    // Функция pluck из встроенного в sails, lodash v3
    // если версия Lodash 4, то эта функция заменена на map (_.map(users, 'firstName'))
    // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве
    // [{id: ..., fullName: ...,},{id: ..., fullName: ...,},{id: ..., fullName: ...,}]
    // let friendIds = _.pluck(me.friends, 'id'); // friendIds: [id,id,id...]
    //
    // let groups = await Group.find({
    //   or: [{owner: this.req.me.id}, {owner: {in: friendIds}}]
    // }).populate('owner');

    let groups = await Group.find({}).populate('belongsToGroup');
    console.log('groups: ', groups);
let percent = await sails.helpers.percentOfNumber.with({num:groups.length});
console.log('GROUP: ',percent);
    _.each(groups, (group) => {
      group.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/groups/${group.id}`);
      // ... затем мы удаляем наш файловый дескриптор
      delete group.imageUploadFD;
      // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию
      delete group.imageUploadMime;
      // Устанавливаем url к странице просмотра помёта
      // Первый аргумент, базовый url
      // group.detail =  `/groups/group/${group.id}`;
      // group.born =  moment(group.born).format('L');
    });



    // Respond with view.
    return exits.success({
      groups
    });

  }


};
