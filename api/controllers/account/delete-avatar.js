module.exports = {


  friendlyName: 'Destroy avatar',


  description: '',


  inputs: {
    id:{
      type:'number',

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
    if(this.req.me.id !== inputs.id) return;
    let user = await User.findOne({
      id: this.req.me.id
    });

    if (!user) {
      throw 'notFound';
    }

    // if (group.owner !== this.req.me.id) {
    //   throw 'forbidden';
    // }

    await User.updateOne({id: this.req.me.id})
      .set({
        avatarFD:'',
        avatarMime: '',
        filename: '',
        avatar: ''
      });

    return exits.success();
  }


};
