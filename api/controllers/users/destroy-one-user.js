module.exports = {


  friendlyName: 'Destroy one user',


  description: 'Удаление пользователя',


  inputs: {
    id: {
      type: 'number',
      description: 'Идентификатор пользователя, которого удаляем.'
    }
  },


  exits: {
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    badRequest: {
      description: 'The user who makes this request does not have permission to delete this entry.',
      responseType: 'badRequest' // как раньше res.forbidden(), сейчас это встроеная функция sails
    }
  },


  fn: async function (inputs, exits) {

    let req = this.req;

    // Make sure this is a socket request (not traditional HTTP)
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    /*if (!req.isSocket) {
      throw 'badRequest';
    }*/

    let user = await User.findOne({
      id: this.req.me.id,
      isSuperAdmin: true
    });

    if (!user) {
      throw 'badRequest';
    }

    let delUser = await User.destroyOne({id: inputs.id});

    if (delUser) {
      sails.log(`Deleted User with id: ${inputs.id}.`);
      let users = await User.find();
      console.log('V users:', users);
      await sails.sockets.broadcast('user', 'hello', users);
    } else {
      sails.log(`There is no user with this ID in the database:  ${inputs.id}.`);
    }
    return exits.success();
  }


};
