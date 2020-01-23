module.exports = {


  friendlyName: 'View kennels home',


  description: 'Display "Kennels home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/kennels/kennels-home'
    }

  },


  fn: async function (inputs, exits) {

    // Бибилиотека Node.js
    // const url = require('url');

    // Выбираем авторизованного пользователя, который сделал этот запрос
    // и всех его друзей по ассоциативному полю friends
    let kennels = await Kennel.find()
      .populate('dogs')
      .populate('owners')
      .populate('whoCreate')
      .populate('breeder')
      .populate('continent')
      .populate('country')
      .populate('region')
      .populate('city')

    ;

    // Respond with view.
    return exits.success({
      seo: {
        description: 'Питомники, которые занесены в базу собак.',
        title: 'Питомники',
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`,
        header:{ru:'Питомники',en:'Kennels'},
        subTitle:{ru:'Питомник китайских хохлатых. Каталог питомников мира.',en:'Chinese Crested Nursery. Catalog of kennels of the world.'},
        preferredLocale:this.req.me.preferredLocale,
        // Первый H3 на странице
        h3: {ru: 'Каталог питомников мира', en: 'World kennels catalog'},
        // Текст параграфа под заголовко H3 в начале страницы
        textUnderHeading: {
          ru: 'На странице представлены питомники китайских хохлатых, созданные по всему миру. Эта база данных питомников не может претендовать на полноту, как и любая другая база данных в мире. Вопрос только в том, кто его использует. По мере того, как механизм обновления и сбора данных в известных питомниках растет и совершенствуется, эта база данных будет автоматически собирать, поддерживать и обновлять соответствующую информацию, которая появляется в открытом доступе к другим сайтам. Составление полного списка питомников китайских хохлатых в мире.',
          en: 'The page shows Chinese Crested Nurseries created around the world. This nursery database cannot claim to be complete, like any other database in the world. The only question is who uses it. As the mechanism of updating and collecting data in well-known nurseries grows and improves, this database will automatically collect, maintain and update relevant information that appears in the public domain for other sites. Compiling a complete list of Chinese crested nurseries in the world.'
        },
      },
      kennels
    });
  }

};
