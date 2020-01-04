module.exports = {


  friendlyName: 'View kennels home',


  description: 'Display "Kennels home" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/kennels/kennels-home'
    }

  },


  fn: async function (inputs, exits) {

    // Бибилиотека Node.js
    // const url = require('url');

    // Выбираем авторизованного пользователя, который сделал этот запрос
    // и всех его друзей по ассоциативному полю friends
    let kennels = await Kennel.find()
      .populate('dogs')
      .populate('owners')
      .populate('whoCreate')
      .populate('breeder')
      .populate('continent')
      .populate('country')
      .populate('region')
      .populate('city')

    ;

    // Respond with view.
    return exits.success({
      seo: {
        description: 'Питомники, которые занесены в базу собак.',
        title: 'Питомники',
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`
      },
      kennels
    });
  }

};
