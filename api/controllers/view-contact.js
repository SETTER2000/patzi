module.exports = {


  friendlyName: 'View contact',


  description: 'Display "Contact" page.',


  exits: {

    success: {
      currentSection: 'contact',
      viewTemplatePath: 'pages/contact'
    }

  },


  fn: async function () {

    // Respond with view.
    return {
      seo: {
        description: 'Контакты нашего питомника',
        title: 'Контакты',
        canonical: `https://${this.req.headers.host}${this.req.originalUrl}`,
        header: {ru: 'Связаться с нами', en: 'Contact Us'},
        subTitle: {
          ru: 'Всегда на связи, будем рады если сможем быть вам полезны',
          en: 'Always in touch, we will be happy if we can be useful to you'
        },
        preferredLocale: this.req.me.preferredLocale,
        h2: {ru: 'Сообщение', en: 'Get In Touch'},
        h3: {ru: 'У Вас Есть Вопрос Для Нас?', en: 'Have A Question For Us?'},
      }
    };

  }


};
