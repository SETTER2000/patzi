module.exports = {


  friendlyName: 'Destroy one topic',


  description: `Удалить одну тему. `,


  inputs: {
    id: {
      type: 'string',
      required: true
    }
  },


  exits: {
    notFound: {
      description: 'Не существует такого объекта с таким ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    }
  },


  fn: async function (inputs, exits) {
    const req = this.req;

    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    // Have the socket which made the request join the "topic" room.
    // Подключить сокет, который сделал запрос, к комнате «topic».
    await sails.sockets.join(req, 'topic');

    let topic = await Topic.findOne({
      id: inputs.id
    });
    //
    if (!topic) {
      throw 'notFound';
    }

    await Topic.destroy({id: inputs.id});

    // Remove photos
    let removeImage = (_.isArray(topic.images) && topic.images.length > 0 ) ? topic.images : [];

    await sails.helpers.removeImgS3(removeImage);

    // Respond with view.
    return exits.success();
  }
};
