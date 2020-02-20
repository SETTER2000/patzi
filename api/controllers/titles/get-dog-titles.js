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
    let tileIds = _.pluck(dog.titleDog, 'id');

    let titles = await Title.find({id: tileIds})
      .sort([
        {createdAt: 'DESC'}
      ]);

    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    titles = await sails.helpers.cloudFrontUrl.with({
      collection: titles,
      collectionName: 'title',
      edits: {
        resize: {}
      }
    });

    // получить все титулы собаки
    let titlesDog = await sails.helpers.getDogTitles.with({id: dog.id});
    // объеденить титулы с объектами титулов собаки
    dog = await sails.helpers.mergerTitlesAndDogTitles.with({dog: dog, titlesDog: titlesDog});

    // console.log('DOG::; ', tileIds);
    // console.log('titles::; ', titles);

    await sails.sockets.broadcast('title', 'list-titlesDog', dog);
    // Respond with view.
    return exits.success();

  }


};
