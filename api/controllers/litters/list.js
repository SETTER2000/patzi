module.exports = {


  friendlyName: 'List',

  description: 'Обрабатывает сокет подключение клиента и отдаёт весь список объектов коллекции.',


  exits: {
    success: {
      anyData: 'Вы подключились к комнате litter и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The litter who makes this request does not have permission to delete this entry.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    },
    badRequest: {
      description: 'Error.',
      responseType: 'badRequest'
    }
  },

  fn: async function (inputs, exits) {
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }

    // Бибилиотека Node.js
    const url = require('url');
    const moment = require('moment');

    // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    moment.locale(this.req.me.preferredLocale);

    // Формат отображаемой даты
    let format = 'LL HH:mm';

    // Have the socket which made the request join the "litter" room.
    // Подключить сокет, который сделал запрос, к комнате «litter».
    await sails.sockets.join(req, 'litter');


    // Выбираем весь список объектов данной коллекции.
    let litters = await Litter.find()
      .populate('dogs')
      .populate('owner')
      .populate('images');


    // let newLitter = litters.map((litter)={
    //   litter.dogs
    // });

    // Функция pluck из встроенного в sails, lodash v3
    // если версия Lodash 4, то эта функция заменена на map (_.map(users, 'firstName'))
    // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве
    // [{id: ..., fullName: ...,},{id: ..., fullName: ...,},{id: ..., fullName: ...,}]
    // let litterIds = _.pluck(litters, 'id'); // friendIds: [id,id,id...]
    const dateFormat = 'LL';

    await _.each(litters, async (litter) => {
      const {images, dogs} = litter;
      const {img} = !_.isEmpty(images[0]) ? images[0] : '';

     // await dogs.map(async dog=>{
     //    dog.kennelName = await Kennel.findOne({id:dog.kennel});
     //  });
      litter.sire = dogs.find(dog =>dog.gender === 'sire').label;
      litter.dam = dogs.find(dog =>dog.gender === 'dam').label;


      if(litter.dam){
        litter.damKennelId = dogs.find(dog =>dog.kennel).id;
      }else{
        litter.sireKennelId = dogs.find(dog =>dog.kennel).id;
      }
      // litter.kennelId = dogs.find(_.pluck(dog, 'kennel'));

      // litter.born = moment.utc(litter.born);
      litter.bornNt =  moment(litter.born).format(dateFormat);
      // litter.nameKennel = await sails.helpers.getFullNameKennel(litter.kennelId);
      litter.images = img;
      litter.ownerFullName = litter.owner.fullName;
      delete litter.createdAt;
      delete litter.updatedAt;
      delete litter.owner;

      // Столбец: Дата регистрации. Формат фильтра.
      //litter.createdAtFormatFilter = moment(litter.createdAt).format(format);
      // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве
      // [{id: ..., fullName: ...,},{id: ..., fullName: ...,},{id: ..., fullName: ...,}]
      // litter.groups = _.pluck(litter.groups, 'id'); // friendIds: [id,id,id...]

    });


    // Формируем массив с картинками
    let litterId;
    await _.each(litters, async (litter) => {
      litterId = litter.id;
      litter.images = (!_.isEmpty(litter.images)) ? await litter.images.map((img, i) => {
        img.imageSrc = img.fd ? url.resolve(sails.config.custom.baseUrl, `/api/v1/files/download/litter/${litterId}/${i}`) : '';
        img.detail = `/litters/litter/${litterId}`;
        return img;
      }) : '';
      // litter.images.push({imageSrc:'https://via.placeholder.com/150.png'});
    });
    // console.log('litters:::: ', litters);
    console.log('litters:::: ', litters);

    await sails.sockets.broadcast('litter', 'list-litter', litters);

    // Respond with view.
    return exits.success();

  }

};
