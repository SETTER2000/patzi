module.exports = {


  friendlyName: 'privacy',


  description: `privacy`,



  exits: {

    success: {
      viewTemplatePath: 'pages/entrance/privacy',
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
