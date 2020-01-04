module.exports = {


  friendlyName: 'terms',


  description: 'terms',




  exits: {

    success: {
      viewTemplatePath: 'pages/entrance/terms',
    },

    redirect: {
      description: 'The requesting user is already logged in.',
      responseType: 'redirect'
    }

  },


  fn: async function () {
    if (this.req.me) {
      throw {redirect: '/'};
    }
    return {currentSection: '',
      seo: {
        description: '',
        title: '',
        canonical:''
      }};
  }


};
