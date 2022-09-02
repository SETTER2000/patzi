module.exports = {


  friendlyName: 'View federations home',


  description: 'Display "Federations home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/federations/federations-home'
    },
    forbidden: {
      responseType: 'forbidden'
    },
    notFound: {
      responseType: 'notFound'
    }

  },


  fn: async function (inputs, exits) {
    // const moment = require('moment');

    let data = await Federation.find();

    if (!data) {
      throw 'notFound';
    }
    // Respond with view.
    return exits.success({
      seo: {
        description: `Модуль добавления|редактирования федераций собак.`,
        title: `Федерации собак`,
        canonical: `https://${this.req.headers.host}${this.req.originalUrl}`,
        header: {ru: 'Федерации собак', en: 'Federation of dogs'},
        subTitle: {ru: 'Модуль добавления|редактирования федераций собак', en: 'Add | edit dog federations module'},
        preferredLocale: this.req.me.preferredLocale,
        // Первый H3 на странице
        h3: {ru: 'Федерации мира', en: 'World Federation'},
        // Текст параграфа под заголовко H3 в начале страницы
        textUnderHeading: {
          ru: 'На странице представлены федерации собак мира породы Китайская Хохлатая Собака. Это база федераций не может претендовать на полноту информации, как и любая другая база данных в мире. Вопрос лишь того, кто ей пользуется.',
          en: 'The page presents the dog federations of the world of the Chinese Crested Dog breed. This federation database cannot claim to be complete, like any other database in the world. The only question is who uses it.'
        },
      },
      currentSection: 'federations',
      data
    });

  }


};
