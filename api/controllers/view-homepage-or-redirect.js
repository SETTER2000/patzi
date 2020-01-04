module.exports = {


  friendlyName: 'View homepage or redirect',


  description: 'Display or redirect to the appropriate homepage, depending on login status.',


  exits: {

    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      viewTemplatePath: 'pages/homepage'
    },

    redirect: {
      responseType: 'redirect',
      description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    },

  },


  fn: async function () {

    if (this.req.me) {
      throw {redirect: '/welcome'};
    }

    return {
      seo: {
        description: 'Питомник Poale Ell занимается разведением собак породы "Китайская Хохлатая Собака". В питомники можно купить щенка. Мы ответственны за продаваемых собак.',
        title: 'Питомник Poale Ell. Китайская Хохлатая Собака',
        canonical:'https://poaleell.com'
      }
    };

  }


};
