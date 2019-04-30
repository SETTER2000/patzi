module.exports = {


  friendlyName: 'Destroy one thing',


  description: 'Delete the "thing"  with the specified ID from the database.',


  inputs: {
    id: {
      type: 'number',
      required: true
    }
  },


  exits: {
    notFound:{
      description: 'Не существует такой вещи с таким ID.',
      responseType:'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The user making this request does\'t have the permissions to delete this thing.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    }
  },


  fn: async function (inputs, exits) {
    let thing = await Thing.findOne({
      id: inputs.id
    });

    if (!thing) {
      throw 'notFound';
    }

    if (thing.owner !== this.req.me.id) {
      throw 'forbidden';
    }

    await Thing.destroy({id: inputs.id});
    return exits.success();
  }
};
