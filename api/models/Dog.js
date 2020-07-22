/**
 * Dog.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    label: {
      type: 'string',
      description: `Имя собаки. Название питомника не пишется в имени.
      Автоматически будет подставляться.`,
      example: 'Adam',
      required: true,
      minLength: 2,
      maxLength: 50
    },

    fullName: {
      type: 'string',
      description: `Полное имя собаки.`,
      example: 'Poale Ell Adam',
      required: true,
      unique: true,
      minLength: 2,
      maxLength: 50
    },

    gender: {
      type: 'string',
      description: `Пол собак. В смысле не пол собаки, а конец есть или нет.`,
      example: 'sire',
      isIn: ['sire', 'dam'],
      required: true,
      minLength: 3,
      maxLength: 4
    },


    sale: {
      type: 'boolean',
      defaultsTo: false,
      description: `Флаг продажи собаки. Продаётся или нет. По умолчанию не продаётся.`
    },

    showTeeth: {
      type: 'boolean',
      defaultsTo: false,
      description: `Флаг видимости блока зубов собаки. Виднен или нет блок на сайте. По умолчанию не виден.`
    },

    see: {
      type: 'boolean',
      defaultsTo: true,
      description: `Флаг видимости собаки. Видна или нет. По умолчанию не видна.`
    },

    currency: {
      type: 'string',
      description: `Валюта продажи. Валюта за катоую можно купить собаку.
      Знак рубля:  &#8381;
      Знак euro:  &#8364; или &#x20ac;`,
      example: 'dollar',
      isIn: ['dollar', 'рубль', 'euro'],
      // required: true,
      minLength: 4,
      maxLength: 6
    },


    price: {
      type: 'number',
      // required: true,
      description: 'Цена продажи собаки.'
    },


    saleDescription: {
      type: 'string',
      description: `Рекомендации к продаже. Сопроводительный текст, который будет виден на странице
       продаж для данной собаки.`,
      maxLength: 700
    },


    letter: {
      type: 'string',
      description: `Буква помёта к которому пренадлежит собака.
      Информация нужна для фиксации кнопки о продаже на странице помёта.
      В случаи когда дата рождения щенков одного помёта разная.
      (например в 23:00 первый родился и через 2 часа второй. Помёт один, а дата рождения разная.).
      Если буква не указана, то автоматически берётся первая буква имени собаки.`,
      required: true,
    },

    winner: {
      type: 'boolean',
      defaultsTo: false,
      description: `Флаг устанавливается, если собака стала Чемпионом Мира.`
    },

    canine: {
      type: 'number',
      description: 'Количество клыков.',
      example: '4'
    },


    teethCountTop: {
      type: 'number',
      description: 'Количество зубов сверху.',
      example: '6'
    },


    teethCountBottom: {
      type: 'number',
      description: 'Количество зубов снизу.',
      example: '6'
    },


    teethCount: {
      type: 'string',
      description: 'Зубы. Общее кол-во зубов.',
      example: 'верхние х нижние х клыки, 6x6x4, 6x6x4, 6x6x4 и т.д. '
    },


    bite: {
      type: 'string',
      description: 'Прикус.',
      example: 'ножнецеобразный',
      isIn: ['перекус', 'недокус', 'ножнецеобразный'],
      defaultsTo: 'ножнецеобразный'
    },


    dogTests: {
      type: 'string',
      description: 'Тесты собаки.'
    },


    dateDeath: {
      type: 'string',
      description: 'Дата смерти.'
    },

    dateBirth: {
      type: 'number',
      required: true,
      description: 'Дата рождения.'
    },
    nickname: {
      type: 'string',
      description: 'Кличка, ласковое имя.'
    },

    headerVideoShow: {
      type: 'boolean',
      description: `Флаг. Виден видео-хедер или нет`
    },


    headerVideo: {
      type: 'string',
      example: 'https://youtu.be/RPp6p73ria4',
      description: 'Код видео из ютуба для показа в хедере собаки'
    },


    cover: {
      type: 'number',
      defaultsTo: 0,
      example: 5,
      description: `Номер ключа в массиве фотографий, который определяет главную фотографию альбома.
                    Обложка альбома.`
    },

    birthWeight: {
      type: 'number',
      description: 'Вес. В граммах при рождении.',
      example: 170
    },


    weight: {
      type: 'number',
      description: 'Вес. В граммах.',
      example: 4500
    },


    growth: {
      type: 'number',
      description: 'Рост. В сантиметрах.',
      example: 30
    },


    type: {
      type: 'string',
      description: 'Тип. Возможны два варианта.',
      example: 'hairless, powderpuff',
      isIn: ['hairless', 'powderpuff'],
    },

    color: {
      type: 'string',
      description: 'Цвет.',
      // example:'hairless, powderpuff',
    },

    stamp: {
      type: 'string',
      description: 'Клеймо. Номер собаки в реестре.',
      // example:'hairless, powderpuff',
    },

    images: {
      type: 'ref',
      defaultsTo: [],
      example: ['5d1f1b04fbe834262cbb8c53', '5d1f1b04fbe834262cbb8c54'],
      description: `FD загруженных фотографий родителей`
    },

    titleDog: {
      type: 'ref',
      defaultsTo: [],
      example: [{}, {}],
      description: `FD загруженных фотографий родителей`
    },

    // weight: this.ruleForm.weight,
    // growth: this.ruleForm.growth,
    // type: this.ruleForm.type,
    // color: this.ruleForm.color,
    // stamp: this.ruleForm.stamp,


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    kennel: {
      model: 'kennel',
      description: 'Собака может принадлежать только одному питомнику. One to Many'
    },
// Добавьте одну сторону множественной рефлексивной ассоциации
    // Владельцы
    owners: {
      collection: 'user',
      via: 'dogs',
      description: `  Добавить питомца в коллекцию пользователя: "User.dogs" ,
                      где у пользователя есть идентификатор 10 и питомец имеет идентификатор 300.
                      await User.addToCollection(10, 'dogs', 300);

                      parents и children атрибуты могут быть изменены с помощью
                      .addToCollection(), .removeFromCollection()и .replaceCollection()
                    `
    },


    // sire: {
    //   model: 'dog',
    //   description: ` У собаки может быть только один отец. `
    // },
    //
    // dam:{
    //   model: 'dog',
    //   description: `  Однако также возможно иметь связь между двумя атрибутами в одной и той же модели.
    //   Это называется рефлексивной ассоциацией .
    //   Добавить пользователя № 12 в качестве родителя пользователя № 23
    //   await User.addToCollection(23, 'parents', 12);
    //   Найти пользователя № 12 и заполнить его детей
    //   var userTwelve = await User.findOne(12).populate('children');
    //   `
    // },


    // Добавить единственную рефлексивную ассоциацию
    // bestFriend: {
    //   model: 'dog',
    // },
    // Добавьте еще одну множественную рефлексивную ассоциацию, эту сквозную
    // bookmarkedUsers: {
    //   collection: 'dog'
    // }
    // Добавьте одну сторону множественной рефлексивной ассоциации
    parents: {
      collection: 'dog',
      via: 'children',
      description: `  Однако также возможно иметь связь между двумя атрибутами в одной и той же модели.
                      Это называется рефлексивной ассоциацией.

                      Добавить пользователя № 12 в качестве родителя пользователя № 23
                      await User.addToCollection(23, 'parents', 12);
                      Найти пользователя № 12 и заполнить его детей
                      var userTwelve = await User.findOne(12).populate('children');
                      parents и children атрибуты могут быть изменены с помощью
                      .addToCollection(), .removeFromCollection()и .replaceCollection()
                    `
    },

    // Добавьте другую сторону множественной рефлексивной ассоциации
    children: {
      collection: 'dog',
      via: 'parents'
    },


  },

  // получить предков для pedigree
  pedigree: async function (id) {
    const db = sails.getDatastore('mongodb').manager;
    const collection = db.collection(Dog.tableName);
    const ObjectID = require("bson-objectid");

    return collection.aggregate([
      {$match: {_id:  ObjectID(id)}},
      {
        $graphLookup: {
          from: "dog_children__dog_parents",
          startWith: "$_id",
          connectFromField: "dog_children",
          connectToField: "dog_parents",
          maxDepth: 3,
          depthField: "numConnections",
          as: "destinations"
        }
      }
    ]).toArray();



    // console.log('RRR : ', dogsNew);
    // dogsNew;
  },

  // получить всех братьев и сестёр
  siblings: async function (dog) {
    console.log('Входящий объект Dog для sibling: ', dog);
    const moment = require('moment');
    const db = sails.getDatastore('mongodb').manager;
    console.log('IS NUMBER?: ', _.isNumber(dog.dateBirth));
    let siblingsArr = [];
    let birth = dog.dateBirth;  // дата должна быть представлена как: '1593334800000'
    // let birth = _.isNumber(dog.dateBirth) ? dog.dateBirth : await sails.helpers.dateFix(dog.dateBirth);
    let beginDay = moment(birth).startOf('day');
    let endDay = moment(birth).endOf('day');
    let kennel = '';
    if (!dog.kennel) {
      let ob = await Dog.findOne(dog.id).populate('kennel');
      kennel = ob.kennel.label;
    } else {
      kennel = dog.kennel.label;
    }

    // Теперь мы можем делать все, что можем, с экземпляром Mongodb в данном примере
    // вернётся коллекция Dog.
    // Тип данных Cursor (mongodb):
    const collection = db.collection(Dog.tableName);
    /*
    * Поиск однопомётников.
    * Входящий объект собака.
    * Взять дату начала того дня, когда родилась собака, например др у неё записан 2019-07-12T12:00
    * или в UNIX timestamp, сбросить время на 00:00 этого дня.
    * И найти всех собак рождённых в период с 2019-07-12T00:00 до 2019-07-12T23:59 и
    *
    * */
    let regexp = new RegExp(kennel, 'i');
    let arr = await collection.find().toArray();
    siblingsArr = arr.map((dog) => {
      if (moment(dog.dateBirth).isBetween(beginDay, endDay) && !_.isNull(dog.fullName.match(regexp))) {
        dog.detail = `/chinese-crested/${dog.fullName.split(' ').join('-')}`;
        return dog;
      }
    });

    siblingsArr = _.compact(siblingsArr);

    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    siblingsArr = await sails.helpers.cloudFrontUrl.with({
      collection: siblingsArr,
      collectionName: 'dog',
      edits: {
        resize: {}
      }
    });

    await siblingsArr.map(async (dog) => {
      dog.imagesArrUrl = _.pluck(dog.images, 'imageSrc'); // Массив url картинок для просмотра в слайдере
    });

    siblingsArr = _.sortBy(siblingsArr, 'dateBirth');

    return _.compact(siblingsArr);
  }
};


