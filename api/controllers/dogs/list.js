module.exports = {


  friendlyName: 'List',


  description: 'Обрабатывает сокет подключение клиента и отдаёт весь список объектов коллекции.',



  exits: {
    success: {
      anyData: 'Вы подключились к комнате dog и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The dog who makes this request does not have permission to delete this entry.',
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

    // Have the socket which made the request join the "dog" room.
    // Подключить сокет, который сделал запрос, к комнате «dog».
    await sails.sockets.join(req, 'dog');


    // Выбираем весь список объектов данной коллекции.
    let dogs = await Dog.find()
      .sort('createdAt DESC')
      .populate('kennel');


    // Формируем массив с картинками
    let dogId;
    await _.each(dogs, async (dog) => {
      dogId = dog.id;
      dog.images = (!_.isEmpty(dog.images)) ? await dog.images.map((img, i) => {
        img.imageSrc = img.fd ? url.resolve(sails.config.custom.baseUrl, `/api/v1/files/download/dog/${dogId}/images/${i}`) : '';
        img.detail = `/dog/${dog.letter}/${dog.year}/photo`;
        // img.detail = `/dog/${dog.letter}/photo`;
        delete img.fd;
        return img;
      }) : '';

      dog.imagesArrUrl= _.pluck( dog.images, 'imageSrc');
      dog.cover =  dog.imagesArrUrl[0];
      // _.each(dogs, (dog) => {
    //   // Устанавливаем свойство источника изображения
    //   // Первый аргумент, базовый url
    //   //  dog.imageSrc = dog.imageUploadFD ? url.resolve(sails.config.custom.baseUrl, `/api/v1/dogs/${dog.id}`) : '';
    //
    //   // Столбец: Дата регистрации. Форматировано, согласно языку для представления.
    //   dog.createdAtFormat = moment(dog.createdAt).format(format);
    //
    //   // Столбец: Дата регистрации. Формат фильтра.
    //   dog.createdAtFormatFilter = moment(dog.createdAt).format(format);
    //   // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве
    //   // [{id: ..., fullName: ...,},{id: ..., fullName: ...,},{id: ..., fullName: ...,}]
    //   dog.groups = _.pluck(dog.groups, 'id'); // friendIds: [id,id,id...]

    });
    await dogs.map(async (dog) => {
      // console.log('dog.kennel:: ' , dog.kennel);
      // dog.kennelName = dog.kennel ? await sails.helpers.fullNameKennel(dog.kennel.id) : '';
      dog.kennelName = dog.kennel.label;
      return dog;
    });
    await sails.sockets.broadcast('dog', 'list-dog', dogs);

    // Respond with view.
    return exits.success();

  }


};
