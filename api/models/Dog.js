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
      description: `Флаг продажи собаки. Проадётся или нет. По умолчанию не продаётся.`
    },

    currency: {
      type: 'string',
      description: `Валюта продажи. Валюта за катоую можно купить собаку.
      Знак рубля:  &#8381;`,
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


    dateBirth: {
      type: 'string',
      required: true,
      description: 'Дата рождения.'
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
      defaultsTo:'ножнецеобразный'
    },


    dogTests: {
      type: 'string',
      description: 'Тесты собаки.'
    },


    dateDeath: {
      type: 'string',
      description: 'Дата смерти.'
    },

    nickname: {
      type: 'string',
      description: 'Кличка, ласковое имя.'
    },

    cover: {
      type: 'number',
      defaultsTo: 0,
      example: 5,
      description: `Номер ключа в массиве фотографий, который определяет главную фотографию альбома.
                    Обложка альбома.`
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

};

