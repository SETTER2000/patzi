module.exports = {


  friendlyName: 'View experts home',


  description: 'Display "Experts home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/experts/experts-home'
    },
    forbidden: {
      responseType: 'forbidden'
    },
    notFound: {
      responseType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    const moment = require('moment');

    let data = await User.find();

    if (!data) {
      throw 'notFound';
    }
    // Respond with view.
    return exits.success({
      seo: {
        description: `Модуль добавления|редактирования экспертов породы.`,
        title: `Каталог экспертов`,
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`,
        header:{ru:'Каталог экспертов',en:'Expert Directory'},
        subTitle:{ru:'Эксперт в области экстерьера собак',en:'Dog exterior expert'},
        preferredLocale:this.req.me.preferredLocale,
        // Первый H3 на странице
        h3: {ru: 'Каталог экспертов', en: 'Expert Directory'},
        // Текст параграфа под заголовко H3 в начале страницы
        textUnderHeading: {
          ru: 'На странице представлены эксперты в области оценки экстерьера собак на выставках в породе Китайская Хохлатая Собака. Это база экспертов не может претендовать на полноту информации, как и любая другая база данных в мире. Вопрос лишь того, кто ей пользуется.',
          en: 'The page presents experts in the field of evaluating the appearance of dogs at exhibitions in the Chinese Crested Dog breed. This expert database cannot claim to be complete, like any other database in the world. The only question is who uses it.'
        },
      },
      currentSection: 'experts',
      data
    });

  }


};
