module.exports = {


  friendlyName: 'View pricing',


  description: 'Display "Pricing" page.',


  exits: {

    success: {
      currentSection: 'pricing',
      viewTemplatePath: 'pages/pricing'
    }

  },


  fn: async function () {

    // Respond with view.
    return {
      seo: {
        description: 'Услуги и примерные цены нашего питомника. Цены не окончательны и могут быть изменены.',
        title: 'Цены и услуги',
        canonical: `https://${this.req.headers.host}${this.req.originalUrl}`,
        header: {ru: 'Расценки', en: 'Pricing Plan'},
        subTitle: {
          ru: 'Небольшой спектр услуг от питомника и ценовые приоритеты на продажу щенков',
          en: 'A small range of services from the nursery and price priorities for the sale of puppies'
        },
        preferredLocale: this.req.me.preferredLocale,
        h2: {ru: 'Наши Услуги', en: 'What We Offer'},
        h3: {ru: 'Мы Предлагаем', en: 'Our Services'},
      }
    };

  }


};
