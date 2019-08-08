module.exports = {


  friendlyName: 'Destroy session photo',


  description: '',


  inputs: {
    id: {
      type: 'string',
      description: `Идентификатор помёта.`,
      required: true
    },


    sessionName: {
      type: 'string',
      example: 'Два дня от роду',
      description: 'Название фотосессии для щенков.'
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

    // let litter = await Litter.findOne(inputs.id)
    //   .sort('born DESC')
    //   .populate('owner');
    //
    // let burnedBook = await Litter.updateOne(inputs.id)
    //   .set({
    //     sessionName: inputs.sessionName,
    //     descriptionPhotoSession: inputs.descriptionPhotoSession,
    //   });
    // if (burnedBook) {
    //   sails.log('Deleted book with `id: 4`.');
    // } else {
    //   sails.log('The database does not have a book with `id: 4`.');
    // }


    // All done.
    return exits.success();
  }


};
