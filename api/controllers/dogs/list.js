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
    const btoa = require('btoa');
        const resizeX = 1424
          , resizeY = 800
          , gravity = 'Center'// NorthWest, North, NorthEast, West, Center, East, SouthWest, South, SouthEast
          , Q = 45 // Качество изображения (100 - 0) http://www.graphicsmagick.org/GraphicsMagick.html#details-compress
        ;
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
      .populate('kennel')
      .populate('children')
      .populate('parents');


    // Формируем массив с картинками
    let dogId;
    await _.each(dogs, async (dog) => {
      dogId = dog.id;
      dog.images = (!_.isEmpty(dog.images)) ? await dog.images.map((img, i) => {

        if (sails.config.environment === 'production') {
          const imageRequest = JSON.stringify({
            bucket: sails.config.uploads.bucket,
            key: img.name,
            edits: {
              // grayscale: true,
              resize: {
                width: resizeX,
                height: resizeY
              }
            }
          });
           img.imageSrc = `${sails.config.custom.cloudFrontUrl}/${btoa(imageRequest)}`;
          // console.log('cloudFrontUrl::: ', arr[0].cloudFrontUrl);
        } else{
          img.imageSrc = img.fd ? url.resolve(sails.config.custom.baseUrl, `/download/dog/${dogId}/images/${i}`) : '';
        }

        img.detail = dog.fullName ? `/chinese-crested/${dog.fullName.split(" ").join('-')}` : '';
        // img.detail = `/dog/${dog.letter}/photo`;
        delete img.fd;
        return img;
      }) : '';


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
      dog.fullName = dog.kennel.right ? `${dog.label} ${dog.kennel.label}` : `${dog.kennel.label} ${dog.label}`;
      dog.detail =  dog.fullName ? `/chinese-crested/${dog.fullName.split(" ").join('-')}` : '';
      dog.imagesArrUrl= _.pluck( dog.images, 'imageSrc'); // Массив url картинок для просмотра в слайдере
      dog.cover =  dog.imagesArrUrl[0]; // Обложка альбома
      // dog.born = JSON.stringify(moment(dog.born));
      // console.log('DATE born isObject?: ', `${dog.fullName}: ${dog.born} ${_.isObject(dog.born)}`);
      // console.log('DATE dateBirth isObject?: ', `${dog.fullName}: ${dog.dateBirth} ${_.isObject(dog.dateBirth)}`);
      return dog;
    });

    // console.log('ETTT: ' , dogs);
    // /chinese-crested/:dogName
    await sails.sockets.broadcast('dog', 'list-dog', dogs);

    // Respond with view.
    return exits.success();

  }


};
