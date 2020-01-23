module.exports = {


  friendlyName: 'View blog home',


  description: 'Display "Blog home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/blog/blog-home'
    }

  },


  fn: async function () {

    // Respond with view.
    return {seo: {
        description: `Блог - посвящён собакам питомника, как они живут, гуляют, развиваются и становятся победителями выставок.`,
        title: `Блог "Мир Собак"`,
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`,
        h2: {ru: 'ФАКТЫ, ЗАМЕТКИ, ПОБЕДЫ, НАСТРОЕНИЕ', en: 'FACTS, NOTES, VICTORIES, MOOD'},
        h3: {ru: 'Наш Блог', en: 'Our Blog'},
      },};

  }


};
