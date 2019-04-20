module.exports = {


  friendlyName: 'View kennel',


  description: 'Показать страницу "Kennel".',


  exits: {

    success: {
      currentSection: 'kennel',
      viewTemplatePath: 'pages/litters/kennel'
    }

  },


  fn: async function (inputs, exits) {

    // Выбираем авторизованного пользователя и всех его
    // друзей по ассоциативному полю friends
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

    let litters = await Litter.find({
      or: [{owner: this.req.me.id}, {owner: {in: friendIds}}]
    }).populate('owner');

    console.log(litters);
    // Respond with view.
    return exits.success({
      litters,
      currentSection: 'kennel'
    });

  }


};
