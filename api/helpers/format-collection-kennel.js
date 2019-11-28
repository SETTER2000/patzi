module.exports = {

  friendlyName: 'Format welcome message',


  description: 'Возвращает отформатированный набор данных коллекции.',


  inputs: {

    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true
    }
    //
    // collectionName: {
    //   type: 'string',
    //   example: 'Kennel',
    //   description: 'Наименование коллекции.',
    //   required: true
    // }

  },


  fn: async function (inputs) {

    const url = require('url');
    const moment = require('moment');
    let data = {collection: []};
    // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    moment.locale(inputs.req.me.preferredLocale);

    // Формат отображаемой даты
    let format = 'LL HH:mm';


    // Выбираем весь список объектов данной коллекции.
    let kennels = await Kennel.find()
      .populate('dogs')
      .populate('owners')
      .populate('whoCreate')
      .populate('breeder')
      .populate('continent')
      .populate('country')
      .populate('region')
      .populate('city')
      .sort('label');

    await _.each(kennels, (kennel) => {
      // Устанавливаем свойство источника изображения
      // Первый аргумент, базовый url
      kennel.imageSrc = kennel.imageUploadFD ? url.resolve(sails.config.custom.baseUrl, `/api/v1/kennels/${kennel.id}`) : '';
      kennel.yourKennel = kennel.breeder ? (kennel.breeder.id === inputs.req.me.id) : false;
      // Столбец: Дата регистрации. Форматировано, согласно языку для представления.
      kennel.createdAtFormat = moment(kennel.createdAt).format(format);
      // kennel.breeder = kennel.breeder ? kennel.breeder : {fullName:''};
      // Столбец: Дата регистрации. Формат фильтра.
      kennel.createdAtFormatFilter = moment(kennel.createdAt).format(format);
      // Выбирает поле id и возвращает массив айдишников, из каждого объекта в массиве
      // [{id: ..., fullName: ...,},{id: ..., fullName: ...,},{id: ..., fullName: ...,}]
      kennel.groups = _.pluck(kennel.groups, 'id'); // friendIds: [id,id,id...]
      kennel.detail = kennel.label ? `/kennel/${kennel.label.split(" ").join('-')}` : '';
      // Удаляем файловый дескриптор
      delete kennel.imageUploadFD;
      // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию и т.д....
      delete kennel.imageUploadMime;
    });


    data.collection = kennels;
    return data;
  }


};

