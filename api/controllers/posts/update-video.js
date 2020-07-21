module.exports = {


  friendlyName: 'Destroy video',


  description: 'Удаление выделенных видео из поста',


  inputs: {
    id: {
      type: 'string',
      required: true,
      description: 'Идентификатор поста'
    },
    video: {
      type: 'ref',
      required: true,
      description: `Массив объектов видео для удаления.`
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
    console.log('REQQ:: ', inputs.video);
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    // Have the socket which made the request join the "post" room.
    // Подключить сокет, который сделал запрос, к комнате «post».
    await sails.sockets.join(req, 'post');

    await inputs.video.map(async (v) => {
      v.videoUrl = v.videoUrl.replace(/https:\/\/youtu.be\//gi, '');
      return v;
    });

    let updated=  await Post.updateOne({id: inputs.id}).set({
      video: inputs.video
    });
    if(_.isUndefined(updated)){ throw 'badRequest';}
    await sails.sockets.broadcast('post', 'post-video', updated);
    // Respond with view.
    return exits.success();

  }


};
