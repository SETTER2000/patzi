module.exports = {
  friendlyName: 'Destroy one litter',
  description: 'Удалите «помёт» с указанным идентификатором из базы данных.',
  inputs: {
    id: {
      type: 'string',
      required: true
    }
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
    let litter = await Litter.findOne({
      id: inputs.id
    });
    if (!litter) {
      throw 'notFound';
    }
    if (litter.owner !== this.req.me.id) {
      throw 'forbidden';
    }
    await Litter.destroy({id: inputs.id});
    let puppies = (_.isArray(litter.puppies[0].photos) && !_.isEmpty(litter.puppies[0].photos)) ? litter.puppies[0].photos : [];
    let removeImage = [...litter.images, ...puppies];
    await sails.helpers.removeImgS3(removeImage);
    return exits.success();
  }
};
