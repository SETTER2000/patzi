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
    // если версия Lodash 4, то эта функция заменена на map (_.map(groups, 'firstName'))
    // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве
    // [{id: ..., fullName: ...,},{id: ..., fullName: ...,},{id: ..., fullName: ...,}]
    // let friendIds = _.pluck(me.friends, 'id'); // friendIds: [id,id,id...]
    //


    let groups = await Group.find().populate('users');


    // let percent = await sails.helpers.percentOfNumber.with({num: groups.length});


    _.each(groups, (group) => {
      // group.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/groups/${group.id}`);
      group.imageSrc = group.imageUploadFD ? url.resolve(sails.config.custom.baseUrl, `/api/v1/groups/${group.id}`) : '';
      // ... затем мы удаляем наш файловый дескриптор
      delete group.imageUploadFD;
      // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию
      delete group.imageUploadMime;
    });


    // Respond with view.
    return exits.success({
      groups,
      seo: {
        description: 'Группы пользователей сайта.',
        title: 'Группы',
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`,
        header:{ru:'Группы',en:'Groups'},
        subTitle:{ru:'Установите к какой группе доступа пренадлежит пользователь приложения',en:'Set which access group the application user belongs to.'},
        preferredLocale:this.req.me.preferredLocale,
        // Первый H3 на странице
        h3: {ru: 'Группы доступа. Роли пользователей.', en: 'Access groups. User roles'},
        // Текст параграфа под заголовко H3 в начале страницы
        textUnderHeading: {
          ru: 'Принадлежность пользователя к той или иной группе обуславливает его права доступа к документам, папкам и другим объектам системы сайта Poale Ell и функциональные возможности при работе с ними. Каждый пользователь Системы может принадлежать к нескольким группам доступа. Все группы доступа, существующие в Системе, можно просмотреть на данной страницы. Здесь так же можно создать новую группу и редактировать уже созданные.',
          en: 'The user\'s membership in a particular group determines their access rights to documents, folders and other objects of the Poale Ell site system and their functionality when working with them. Each user of the System can belong to several access groups. All access groups existing in the System can be viewed on this page. Here you can also create a new group and edit already created ones.'
        },
      },
    });

  }


};
