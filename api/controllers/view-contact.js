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
    return { seo: {
        description: 'Питомник Poale Ell занимается разведением собак породы "Китайская Хохлатая Собака". В питомники можно купить щенка. Мы ответственны за продаваемых собак.',
        title: 'Питомник Poale Ell. Китайская Хохлатая Собака',
        canonical:'https://poaleell.com'
      }};

  }


};
