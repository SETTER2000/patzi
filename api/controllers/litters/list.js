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
      .limit(1000)
      .sort('born DESC')
      // .populate('dogs', {limit: 2, sort: 'gender DESC'})
      .populate('owner')
      .populate('images');

    // let litterIds = _.pluck(litters, 'id');
    // console.log('litterIds:: ' , litterIds);


    // let dogs = await Dog.find({litters:{in:litterIds}});
    // console.log('dogs: ', dogs);
    // let newLitter = litters.map((litter)={
    //   litter.dogs
    // });

    // Функция pluck из встроенного в sails, lodash v3
    // если версия Lodash 4, то эта функция заменена на map (_.map(users, 'firstName'))
    // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве
    // [{id: ..., fullName: ...,},{id: ..., fullName: ...,},{id: ..., fullName: ...,}]
    // let litterIds = _.pluck(litters, 'id'); // friendIds: [id,id,id...]
    const dateFormat = 'LL';
    let nameKennelDam = '';
    let nameDog = '';
    await _.each(litters, async (litter) => {
      const {images, dogs} = litter;
      const {img} = !_.isEmpty(images[0]) ? images[0] : '';
      // litter.nameKennelDam = await sails.helpers.fullNameKennel(_.result(_.indexBy(litter.dogs, 'gender'), 'dam').kennel);
      // nameDog = _.result(_.indexBy(litter.dogs, 'gender'), 'dam').label;

      // await dogs.map(async dog=>{
      //    dog.kennelName = await Kennel.findOne({id:dog.kennel});
      //  });
      // litter.sire = dogs.find(dog => dog.gender === 'sire').label;
      // litter.dam = dogs.find(dog => dog.gender === 'dam').label;
      // console.log('r: ', `${nameKennelDam} ${nameDog}`);
      // litter.dam = `${litter.nameKennelDam } ${litter.dam}`;
      // litter.sireKennelId = dogs.find(dog => dog.gender === 'sire').kennel;
      // litter.damKennelId = dogs.find(dog => dog.gender === 'dam').kennel;


      // if(litter.dam){
      //   litter.damKennelId = dogs.find(dog =>dog.kennel).id;
      // }else{
      //   litter.sireKennelId = dogs.find(dog =>dog.kennel).id;
      // }
      // litter.kennelId = dogs.find(_.pluck(dog, 'kennel'));

      // litter.born = moment.utc(litter.born);
      litter.bornNt = moment(litter.born).format(dateFormat);
      // litter.nameKennel = await sails.helpers.getFullNameKennel(litter.kennelId);
      litter.images = img;
      litter.ownerFullName = litter.owner.fullName;
      delete litter.createdAt;
      delete litter.updatedAt;
      delete litter.owner;
      // litter.sireKennelName = await sails.helpers.getFullNameKennel(litter);
      // console.log('NAME KENNEL::', await sails.helpers.getFullNameKennel(litter));
      // Столбец: Дата регистрации. Формат фильтра.
      //litter.createdAtFormatFilter = moment(litter.createdAt).format(format);
      // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве
      // [{id: ..., fullName: ...,},{id: ..., fullName: ...,},{id: ..., fullName: ...,}]
      // litter.groups = _.pluck(litter.groups, 'id'); // friendIds: [id,id,id...]

    });

    // await _.each(litters, async (litter) => {
    //   let kennel = await Kennel.findOne({id: litter.damKennelId});
    //   console.log('kennel.label:: ', kennel.label);
    //
    //   litter.nameKennel = kennel.label;
    //
    // });
    // litters.map(async litter=>{
    //    litter.sireKennelName = await sails.helpers.getFullNameKennel(litter.sireKennelId);
    //    litter.damKennelName = await sails.helpers.getFullNameKennel(litter.damKennelId);
    //   litter.sireName  = `${litter.sireKennelName} ${litter.sire}`;
    //   litter.damName  = `${litter.damKennelName} ${litter.dam}`;
    //
    //
    //  });


    // litter.damKennelName = dogs.find(dog =>dog.gender === 'dam').kennel;
    // Формируем массив с картинками
    let litterId;
    await _.each(litters, async (litter) => {
      litterId = litter.id;
      litter.images = (!_.isEmpty(litter.images)) ? await litter.images.map((img, i) => {
        img.imageSrc = img.fd ? url.resolve(sails.config.custom.baseUrl, `/api/v1/files/download/litter/${litterId}/${i}`) : '';
        img.detail = `/litters/litter/${litterId}`;
        return img;
      }) : '';

      // litter.dogs = (!_.isEmpty(litter.dogs)) ? await litter.dogs.map(async (dog, y) => {
      //   dog.kennelName = dog.kennel ? await sails.helpers.fullNameKennel(dog.kennel) : '';
      //   console.log(y);
      //   return dog;
      // }) : '';


      // litter.images.push({imageSrc:'https://via.placeholder.com/150.png'});
    });


    await litters.map(async (litter) => {
      litter.kennelName = litter.damKennelId ? await sails.helpers.fullNameKennel(litter.damKennelId) : '';
      return litter;
    });

    if (!litters) {
      throw 'badRequest';
    }


    await sails.sockets.broadcast('litter', 'list-litter', litters);

    // Respond with view.
    return exits.success();

  }

};
