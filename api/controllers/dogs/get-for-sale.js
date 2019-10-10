module.exports = {


  friendlyName: 'Get for sale',


  description: 'Узнаем есть ли в продаже собаки',

  inputs: {
    letter: {
      type: 'string',
      required: true
    },
    year:{
      type:'string',
      description:`Год рождения собаки.`,
      require:true
    }
  },


  exits: {
    success: {
      anyData: 'Вы подключились к комнате dog и слушаете событие list'
    },
    notFound: {
      description: 'No dogs on sale from this litter.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The dog who makes this request does not have permission to delete this entry.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
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
// Подключить сокет, который сделал запрос, к комнате «dog».
    await sails.sockets.join(req, 'dog');

   let resp = await sails.helpers.forSaleDog.with({letter:inputs.letter, year:inputs.year});

    console.log('resp:::', resp);
    await sails.sockets.broadcast('dog', 'forSale-dog', resp);

    return exits.success();

  }


};
