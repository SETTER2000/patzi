module.exports = {


  friendlyName: 'View faq',


  description: 'Page faq.',


  exits: {

    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      currentSection: 'faq',
     viewTemplatePath: 'pages/faq'
    }

  },


  fn: async function () {
    return {
      seo: {
        description: 'Вопросы и ответы, которые могут возникнуть в результате пользования приложением.',
        title: 'FAQ. Ответы на часто задаваемые вопросы.',
        canonical:'https://poaleell.com/faq'
      }
    };

  }


};
