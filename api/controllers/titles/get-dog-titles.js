module.exports = {


  friendlyName: 'Get dog titles',


  description: 'Получить все титулы собаки по её идентификатору',


  inputs: {
    id: {
      type: 'string',
      required: true
    }
  },


  exits: {},


  fn: async function (inputs, exits) {
    let req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    // Have the socket which made the request join the "title" room.
    // Подключить сокет, который сделал запрос, к комнате «title».
    await sails.sockets.join(req, 'title');

    let dog = await Dog.findOne(inputs.id);
    let tileIds = _.pluck(dog.titleDog, 'titleId');

    let titles = await Title.find({id: tileIds})
      .sort([
        {createdAt: 'DESC'}
      ]);


    console.log('DOG::; ', tileIds);
    console.log('titles::; ', titles);

    await sails.sockets.broadcast('title', 'list-titlesDog', titles);
    // Respond with view.
    return exits.success();

  }


};
