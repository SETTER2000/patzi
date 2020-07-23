module.exports = {


  friendlyName: 'Search dog',


  description: 'Обрабатывает сокет подключение клиента и отдаёт весь список объектов коллекции dog.',


  inputs: {
    queryString: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      anyData: 'Вы подключились к комнате dog и слушаете событие search-dog'
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
    let result = [];
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    const moment = require('moment');


    // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    moment.locale(this.req.me.preferredLocale);
    // Формат отображаемой даты
    let format = 'LL HH:mm';


    // Have the socket which made the request join the "dog" room.
    // Подключить сокет, который сделал запрос, к комнате «dog».
    await sails.sockets.join(req, 'dog');


    // Выбираем всех собак согласно гендорному признаку
    let dogs = await Dog.find({gender: ['dam', 'sire']})
      .populate('kennel')
      .populate('parents');

    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    dogs = await sails.helpers.cloudFrontUrl.with({
      collection: dogs,
      collectionName: 'dog',
      edits: {
        resize: {}
      }
    });

    // Определяем расположение названия питомника относительно имя собаки
    // и формируем динамически новое свойство value для элемента select
    await _.each(dogs, (dog) => {
      dog.detail = dog.fullName ? `/chinese-crested/${dog.fullName.split(" ").join('-')}` : '';
      dog.imagesArrUrl = _.pluck(dog.images, 'imageSrc'); // Массив url картинок для просмотра в слайдере
      dog.value = (dog.kennel.rightName) ? `${dog.kennel.label} ${dog.label}` : `${dog.label} ${dog.kennel.label}`;
    });

    // result =  dogs.filter(dog=>{
    //   return dog.value.match(`/${inputs.queryString}/isu`)
    // });

    result = dogs.filter(dog => {
      // console.log('inputs.queryString:', inputs.queryString);
      dog.value = !_.isString(inputs.queryString) ? dog.value :
        dog.value.toLowerCase().indexOf(inputs.queryString.toLowerCase()) !== -1 ? dog.value : '';
      return dog.value;
      // console.log('dam.value: ', dog.value);
    });

    // Подрезаем результат до 20 записей
    result = (result.length > 20) ? result.slice(0, 20) : result;


    let resultNew = await Dog.pedigree(result);
    console.log('result::: ', resultNew);
    // Распространяем ответ на все подключенные сокеты к комнате dog слушающие событие search-dog
    await sails.sockets.broadcast('dog', 'search-dog', result);


    // Respond with view.
    // return exits.success();
  }
};
