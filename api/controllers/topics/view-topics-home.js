module.exports = {


  friendlyName: 'View topics home',


  description: 'Display "Topics home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/topics/topics-home'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success({
      seo: {
        description: `Темы статей.`,
        title: `Темы`,
        canonical: `https://${this.req.headers.host}${this.req.originalUrl}`,
        header: {ru: 'Темы', en: 'Topics'},
        subTitle: {ru: 'Все темы системы', en: 'All system topics'},
        preferredLocale: this.req.me.preferredLocale,
        // Первый H3 на странице
        h3: {ru: 'Темы статей', en: 'Article Topics'},
        // Текст параграфа под заголовко H3 в начале страницы
        textUnderHeading: {
          ru: 'В данном разделе содержится вся информация о темах статей, блога и других подобных модулей. Создавая здесь тему вы тем самым можете её выбрать при написании статьи в разделе статей или при добавлении поста в блоге. Это обобщающая информация под которой пишутся статьи. Например: Выставки, Грумминг, Аптека и т.д.',
          en: 'This section contains all the information about the topics of articles, blog and other similar modules. By creating a topic here you can choose it when writing an article in the article section or when adding a blog post. This is general information under which articles are written. For example: Exhibitions, Grooming, Pharmacy, etc.'
        },
      },
      currentSection: 'topics',
      // topics
    });

  }


};
