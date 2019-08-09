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
      type: 'number',
      description: `Индекс объекта данной фотосессии в массиве фотосессий.`,
      required: true
    },

  },


  exits: {
    notFound:{
      description: 'Не существует такой вещи с таким ID.',
      responseType:'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'Пользователь делающий данный запрос не имеет право на удаление этого помёта.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    }
  },



  fn: async function (inputs, exits) {


    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }


    let litter = await Litter.findOne(inputs.id);
    if (!litter) {
      throw 'badRequest';
    }
    litter.puppies.splice(inputs.indexPhotoSet, 1);


    let u= await Litter.updateOne(inputs.id)
      .set({
        puppies: litter.puppies
      });


    // All done.
    return exits.success();
  }


};
