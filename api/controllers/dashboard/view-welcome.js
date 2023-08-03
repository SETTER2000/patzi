module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/welcome',
      description: 'Display the welcome page for authenticated users.',

    },

  },


  fn: async function () {
    // true - включить красный spinner на главной, false - выключить
    return {spinner: true,
      seo: {
        description: 'Питомник Poale Ell занимается разведением собак породы "Китайская Хохлатая Собака". В питомники можно купить щенка. Мы ответственны за продаваемых собак.',
        title: 'Питомник Poale Ell. Китайская Хохлатая Собака',
        canonical:'https://poaleell.com/welcome',
        preferredLocale: this.req.me.preferredLocale,
      }};

  }

};
