module.exports = {


  friendlyName: 'Update position img',


  description: 'Положение главной картинки поста.',


  inputs: {
    id: {
      type: 'string',
      required: true,
      description: 'Идентификатор поста'
    },
    valueX: {
      type: 'number',
      example: 20,
      required: true,
      description: 'Позиции по оси X для главной картинки поста.',
    },
    valueY: {
      type: 'number',
      example: 50,
      required: true,
      description: 'Позиции по оси Y для главной картинки поста.',
    },
    position: {
      type: 'string',
      example: '20% 50%',
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
    // console.log('REQQ:: ', inputs.video);
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }

    // Подключить сокет, который сделал запрос, к комнате «post».
    await sails.sockets.join(req, 'post');
    let updated = await Post.updateOne({id: inputs.id}).set({
      position: inputs.position,
      valueX: inputs.valueX,
      valueY: inputs.valueY,
    });
    if (_.isUndefined(updated)) {
      throw 'badRequest';
    }
    await sails.sockets.broadcast('post', 'post-position', updated);
    // Respond with view.
    return exits.success();
  }


};
