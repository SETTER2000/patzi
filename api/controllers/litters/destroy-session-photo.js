module.exports = {
  friendlyName: 'Destroy session photo',
  description: '',
  inputs: {
    id: {
      type: 'string',
      description: `Идентификатор помёта.`,
      required: true
    },
    indexPhotoSet: {
      type: 'string',
      description: `Индекс объекта данной фотосессии в массиве фотосессий.`,
      required: true
    },
  },
  exits: {
    notFound: {
      description: 'Не существует такой вещи с таким ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'Пользователь делающий данный запрос не имеет право на удаление этого помёта.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    }
  },

  fn: async function (inputs, exits) {
    const req = this.req;
    if (!req.isSocket) {
      throw 'badRequest';
    }
    let litter = await Litter.findOne(inputs.id);
    if (!litter) {
      throw 'badRequest';
    }
    litter.puppies = litter.puppies.filter(puppy => puppy.indexPhotoSet !== inputs.indexPhotoSet);
    let u = await Litter.updateOne(inputs.id)
      .set({
        puppies: litter.puppies
      });
    if (!u) {
      throw 'badRequest';
    }
    // Удаляем всё комментарии относящиеся к данной фотосессии
    let delCommentarys = await Commentary.destroy({indexPhotoSet: inputs.indexPhotoSet});
    // Удаляем всё комментарии относящиеся к данной фотосессии
    let delLikes = await Like.destroy({indexPhotoSet: inputs.indexPhotoSet});
    // Отправляем идентификатор фотосессии, для очитстки локального хранилища
    // await sails.sockets.broadcast('litter', 'delete-comment', {'indexPhotoSet': inputs.indexPhotoSet});
    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('litter', 'delete-PhotoSet', inputs.indexPhotoSet);
    return exits.success();
  }
};
