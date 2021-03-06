module.exports = {


  friendlyName: 'List user',


  description: 'Отдаёт коллекцию пользователей для страницы users',


  inputs: {
    count: {
      type: 'number',
      description: 'Кол-во отдаваемых объектов.'
    },
    query: {
      type: 'ref',
      description: 'Строка, которую пытаемся найти в fullName.'
    },
    groups: {
      type: 'ref',
      example:`['expert']`,
      description: 'Массив групп, которые следует вернуть'
    },
    preferredLocale: {
      type: 'string',
      defaultsTo: 'ru',
      description: 'Объект запроса.'
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {

    // Бибилиотека Node.js
    let data = {};
    const url = require('url');
    const moment = require('moment');

    // await sails.helpers.onlineUser.with({userId:inputs.req.session.userId, online:true});
    //
    // Устанавливаем для пользователя его локаль. Для соответствующего отображения даты.
    // moment.locale(inputs.req.me.preferredLocale);
    moment.locale(inputs.preferredLocale);
    // Проверка кол-ва объектов запрошеных с frontend
    inputs.count = inputs.count < 1 ? {} : inputs.count;


    inputs.query = (_.isString(inputs.query) && (-1 < inputs.query.indexOf(','))) ? inputs.query.split(',') : inputs.query;


    // Поиск записей в которых встречается подстрока inputs.query
    inputs.query = _.isArray(inputs.query) ? {'fullName': {in: inputs.query}} :
      _.get(inputs, 'query') ? {'fullName': {contains: inputs.query}} : {};

    // Формат отображаемой даты
    let format = 'LL HH:mm';
    let users = await User.find(inputs.query)
      .populate('groups')
      .populate('city')
      .populate('continent')
      .populate('country')
      .populate('region')
      .populate('kennels')   // все совладельцы питомника
      .populate('kennelBreed')   // все владельцы питомника
      .limit(inputs.count)
    ;


    // Получить список групп, которые существуют в системе. Для вывода в select
    let allGroups = await Group.find();


    _.each(allGroups, group => {
      delete group.createdAt;
      delete group.updatedAt;
      delete group.filename;
      delete group.imageUploadFD;
      delete group.imageUploadMime;
      delete group.whoCreate;
      group.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/groups/${group.id}`);
    });


    /**
     * Здесь будем превращать поток байт в нормальное изображение для frontend
     * исключая некоторые данные не нужные для страницы.
     * Есть пару способов сделать это.
     * 1. В цикле
     * 2. С библиотекой Lodash
     */
    _.each(users, async (user) => {
      // Устанавливаем свойство источника изображения
      // Первый аргумент, базовый url
      user.imageSrc = user.avatarFD ? url.resolve(sails.config.custom.baseUrl, `/api/v1/users/${user.id}`) : '';

      // Добавляем массив групп для каждого пользователя
      user.allGroups = allGroups;
      user.kennelName = await sails.helpers.getKennelUser.with({id: '5e258b20f38cd205ec54a5af'});
      // Столбец: Дата регистрации. Форматировано, согласно языку для представления.
      user.createdAtFormat = moment(user.createdAt).format(format);

      // Столбец: Дата регистрации. Формат фильтра.
      user.createdAtFormatFilter = moment(user.createdAt).format(format);
      // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве
      // [{id: ..., fullName: ...,},{id: ..., fullName: ...,},{id: ..., fullName: ...,}]
      user.groups = _.pluck(user.groups, 'id'); // friendIds: [id,id,id...]

      // Удаляем файловый дескриптор
      delete user.imageUploadFD;
      // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию и т.д....
      delete user.imageUploadMime;
      delete user.password;
      delete user.passwordResetToken;
      delete user.passwordResetTokenExpiresAt;
      delete user.hasBillingCard;
      delete user.billingCardBrand;
      delete user.billingCardExpMonth;
      delete user.billingCardExpYear;
      delete user.billingCardLast4;

    });

    data.users = _.sortByOrder(users, ['createdAt'], ['desc']);
    data.count = inputs.count;
    // console.log('ВСЕГО ПОЛЬЗОВАТЕЛЕЙ : ', data.users.length);

    if (_.isArray(inputs.groups) && inputs.groups.length > 0) {
      data.users = _.filter(data.users, user => {
       // console.log('USER : ', user.fullName);
        return _.find(user.groups, group => {
          // console.log('Группы юзера::: ', group.label);
          // console.log('Нашлась у юзера группа?::: ',inputs.groups.indexOf(group.label) > -1);
          // console.log('inputs.groups:: ', inputs.groups);
        return  inputs.groups.indexOf(group.label) > -1;
        });
      });
    }


    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    data.users = await sails.helpers.cloudFrontUrl.with({
      collection: data.users,
      collectionName:'user',
      edits: {
        resize: {}
      }
    });

    await data.users.map(async (user) => {
      user.imagesArrUrl = _.pluck(user.images, 'imageSrc'); // Массив url картинок для просмотра в слайдере
      user.cover = user.imagesArrUrl[0]; // Обложка альбома
      return user;
    });

    return data;
  }


};

