module.exports = {


  friendlyName: 'Confirm email',


  description: `Подтвердите адрес`,




  exits: {

    success: {
      viewTemplatePath: 'pages/entrance/confirmed-email',
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
