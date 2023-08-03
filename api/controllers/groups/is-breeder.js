module.exports = {


  friendlyName: 'Is breeder',


  description: 'Проверяет на соответствие к группе breeder',

  inputs: {},

  exits: {
    success: {
      anyData: 'Вы подключились к комнате group и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },

    badRequest: {
      description: 'Error.',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {
    const req = this.req;

    if (!req.isSocket) {
      throw 'badRequest';
    }

    console.log("REQ.ME::: ",req.me)
    console.log("REQ.ME2::: ",this.req.me)

   if(!await sails.helpers.groupBy.with({group:'breeder', me:req.me})){
     throw 'notFound';
   }

    return exits.success();
  }


};
