module.exports = {


  friendlyName: 'Destroy one post',


  description: 'Удалить один пост',


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
    // Have the socket which made the request join the "post" room.
    // Подключить сокет, который сделал запрос, к комнате «post».
    await sails.sockets.join(req, 'post');

    let post = await Post.findOne({
      id: inputs.id
    });
    //
    if (!post) {
      throw 'notFound';
    }

    await Post.destroy({id: inputs.id});

    // Remove photos
    let removeImage = (_.isArray(post.images) && post.images.length > 0 ) ? post.images : [];

    await sails.helpers.removeImgS3(removeImage);

    // Respond with view.
    return exits.success();
  }
};
