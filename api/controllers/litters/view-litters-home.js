module.exports = {


  friendlyName: 'View litter home',


  description: 'Показать страницу "Помёта".',


  exits: {


    success: {
      viewTemplatePath: 'pages/litters/litters-home'
    }
  },


  fn: async function (inputs, exits) {
    // Бибилиотека Node.js
    const url = require('url');
    // предотвратить преобразование UTC
    const moment = require('moment');
    // Устанавливаем для пользователя его локаль. Для соответствующего отображения даты.
    moment.locale(this.req.me.preferredLocale);


    // Выбираем авторизованного пользователя и всех его
    // Выбираем пользователя с массивом друзей по ассоциативному полю friends.
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



    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля.
     * Все картинки по умолчанию примут высоту 800px
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    litters = await sails.helpers.cloudFrontUrl.with({
      collection: litters,
      collectionName: 'litter',
      // Этот объект обязателен, хотя может быть и пустой.
      edits: {
        // grayscale: true,
        /*    resize: {
              width: resizeX,
              height: resizeY
            }*/
      }
    });

    _.each(litters, (litter) => {
      // litter.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/litters/${litter.letter}`);
      // ... затем мы удаляем наш файловый дескриптор
      // delete litter.imageUploadFD;
      // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию
      // delete litter.imageUploadMime;


      // litter.born = moment(litter.born,"dd.MM.YYYY").format('LL');
      // Устанавливаем url к странице просмотра помёта
      // Первый аргумент, базовый url

      litter.detail =  `/litters/litter/${litter.id}`;
      // litter.born =  moment(litter.born).format('L');
    });


    // Respond with view.
    return exits.success({
      seo: {
        description: 'Все помёты собак питомника.',
        title: 'Помёты',
        canonical:'https://poaleell.com/litters',
        header:{ru:'Помёты',en:'Litters'},
        subTitle:{ru:'Все помёты питомника',en:'All litter kennel'},
        preferredLocale:this.req.me.preferredLocale,
        h2: {ru: 'Проверьте Нашу Работу', en: 'Check Our Work'},
        h3: {ru: 'Рождённые в Poale Ell', en: 'Born In Poale Ell'},
      },
      litters,
      currentSection: 'litters-home'
    });
  }
};
