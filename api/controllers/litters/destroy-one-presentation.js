module.exports = {
  friendlyName: 'Destroy one presentation',
  description: '',
  inputs: {
    id: {
      type: 'string',
      required: true
    },
    obj:{
      type:'ref'
    },
    index:{
      type:'string'
    }
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
    let litter = await Litter.findOne({
      id: inputs.id
    });
    if (!litter) {
      throw 'notFound';
    }
    await  litter.presentation.splice(inputs.index,1);
    await Litter.updateOne({id: inputs.id})
      .set({presentation:  litter.presentation});
    return exits.success();
  }
};
