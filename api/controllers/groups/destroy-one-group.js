module.exports = {


  friendlyName: 'Destroy one group',


  description: 'Удаление группы из системы.',


  inputs: {
    id: {
      type: 'number',
      required: true
    }
  },


  exits: {
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The user making this request does\'t have the permissions to delete this thing.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    }
  },


  fn: async function (inputs, exits) {
    let group = await Group.findOne({
      id: inputs.id
    });

    if (!group) {
      throw 'notFound';
    }
    if (group.label === 'user') {
      throw forbidden;
    }
    // if (group.owner !== this.req.me.id) {
    //   throw 'forbidden';
    // }

    await Group.destroy({id: inputs.id});
    return exits.success();
  }


};
