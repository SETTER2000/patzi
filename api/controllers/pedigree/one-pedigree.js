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
    if (!req.isSocket) {
      throw 'badRequest';
    }
    await sails.sockets.join(req, 'dog');
    let dog = await Dog.pedigree(inputs.id);
    if (!dog) {
      throw 'notFound';
    }
    await sails.sockets.broadcast('dog', 'list-pedigree', dog);
    return exits.success();
  }
};
