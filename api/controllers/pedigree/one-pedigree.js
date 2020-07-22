module.exports = {


  friendlyName: 'pedigree home',


  description: 'Получить массив предков.',

  inputs: {

    id: {
      type: 'string',
      description: `Идентификатор собаки. Если требуется страница собаки.`
    },
  },

  exits: {

    forbidden: {
      responseType: 'forbidden'
    },
    notFound: {
      responseType: 'notFound'
    }

  },


  fn: async function (inputs, exits) {
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }


    // hAVE THE SOCKET WHICH MADE THE REQUEST JOIN THE "KENNEL" ROOM.
    // пОДКЛЮЧИТЬ СОКЕТ, КОТОРЫЙ СДЕЛАЛ ЗАПРОС, К КОМНАТЕ «KENNEL».
    await sails.sockets.join(req, 'dog');

    let pedigree = await Dog.pedigree(inputs.id);
          console.log('ПЕРЕДЖ ' , pedigree);
    if (!pedigree) {
      throw 'notFound';
    }

    // Respond with view.
    await sails.sockets.broadcast('dog', 'list-pedigree', pedigree);
    return exits.success();

  }


};
