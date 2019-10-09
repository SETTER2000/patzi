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

    let del = await Litter.destroy({id: inputs.id});

    console.log('Delll: ', del);
    let puppies = (_.isArray(litter.puppies) && !_.isEmpty(litter.puppies)) ? litter.puppies : [];
    let removeImage = [...litter.images, ...puppies];
    console.log('Для удаления::: ', removeImage);
    await sails.helpers.removeImgS3(removeImage);
    // let litters = await Litter.find();
    // await sails.sockets.broadcast('litter', 'destroy-litter', litters);

    return exits.success();
  }

};
