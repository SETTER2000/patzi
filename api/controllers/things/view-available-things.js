module.exports = {


  friendlyName: 'View available things',


  description: 'Показать страницу "Portfolio".',


  exits: {
    success: {
      viewTemplatePath: 'pages/things/available-things'
    }
  },


  fn: async function (inputs, exits) {

    // Бибилиотека Node.js
    const url = require('url');

    // Выбираем авторизованного пользователя, который сделал этот запрос
    // и всех его друзей по ассоциативному полю friends
    let me = await User.findOne({
      id: this.req.me.id
    }).populate('friends');
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
    let friendIds = _.pluck(me.friends, 'id'); // friendIds: [id,id,id...]

    let things = await Thing.find({
      or: [{owner: this.req.me.id}, {owner: {in: friendIds}}]
    }).populate('owner');

    /**
     * Здесь будем превращать поток байт в нормальное изображение для frontend
     * исключая некоторые данные не нужные для страницы.
     * Есть пару способов сделать это.
     * 1. В цикле
     * 2. С библиотекой Lodash
     */

    _.each(things, (thing) => {
      // Устанавливаем свойство источника изображения
      // Первый аргумент, базовый url
      thing.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/things/${thing.id}`);
      // ... затем мы удаляем наш файловый дескриптор
      delete thing.imageUploadFD;
      // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию
      delete thing.imageUploadMime;
    });

    // Respond with view.
    return exits.success({
      currentSection: 'portfolio',
      things
    });

  }


};
