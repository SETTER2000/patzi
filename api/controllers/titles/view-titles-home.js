module.exports = {


  friendlyName: 'View titles home',


  description: `Главная страница раздела титулов собак. 
                Добавление, редактирование титулов для всей системы.`,


  exits: {

    success: {
      viewTemplatePath: 'pages/titles/titles-home'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.

    return exits.success({
      seo: {
        description: `Титулы собак. Редактировавани, добавления титулов собак для всего сайта.`,
        title: `Титулы`,
        canonical: `https://${this.req.headers.host}${this.req.originalUrl}`,
        header: {ru: 'Титулы', en: 'Dog Titles'},
        subTitle: {ru: 'Титулы собак. Редактировавани, добавления титулов собак для всего сайта.', en: 'Dog titles. Editing, adding dog titles for the entire site.'},
        preferredLocale: this.req.me.preferredLocale,
        // Первый H3 на странице
        h3: {ru: 'Титулы собак', en: 'Dog titles'},
        // Текст параграфа под заголовко H3 в начале страницы
        textUnderHeading: {
          ru: 'В данном разделе содержится вся информация о титулах собак. Создав здесь титул один раз, вы тем самым можете его установить для любой собаки в системе. Титулы не могут дублироваться. Титул есть уникальная единица оценки для любой собаки в системе. Например: RUSCH, RUSJCH.',
          en: 'This section contains all information about dog titles. By creating a title here once, you can set it for any dog in the system. Titles cannot be duplicated. A title is a unique rating unit for any dog in the system. For example: RUSCH, RUSJCH.'
        },
      },
      currentSection: 'topics',
      // topics
    });

  }


};
