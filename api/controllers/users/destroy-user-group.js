module.exports = {


  friendlyName: 'Destroy user group',


  description: 'Удаляет пользователя из группы.',


  inputs: {
    id: {
      type: 'string',
      description: 'ID пользователя которого исключают из группы.'
      // whereToGet: {description: 'Credit card info is provided by Stripe after completing the checkout flow.'}
    },
    groupId:{
      type:'ref',
      description: 'Массив ID групп в которую входит пользователь.'
    }
  },

  exits: {

  },


  fn: async function (inputs) {
    let req = this.req;

    // Make sure this is a socket request (not traditional HTTP)
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }

    let admin = await User.findOne({
      id: req.me.id,
      isSuperAdmin: true
    });

    if (!admin) {
      throw 'badRequest';
    }

    // Удалить пользователя inputs.userId в группу inputs.groupId.
    await User.removeFromCollection(inputs.id, 'groups', inputs.groupId);
    // await User.addToCollection(inputs.id, 'groups').members(inputs.groupId);

    await sails.sockets.broadcast('user', 'list');
  }

};
