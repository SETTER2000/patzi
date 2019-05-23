module.exports = {


  friendlyName: 'Update group',


  description: 'Обновляем список групп доступа к которым пренадлежит пользователь.',


  inputs: {
    id: {
      type: 'number',
      description: 'ID пользователя у которого обновляется группа доступа.'
      // whereToGet: {description: 'Credit card info is provided by Stripe after completing the checkout flow.'}
    },
    groupId:{
      type:'ref',
      description: 'Массив ID групп в которую входит пользователь.'
    }
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

    // Добавить пользователя inputs.userId в группу inputs.groupId.
    await User.addToCollection(inputs.id, 'groups', inputs.groupId);
    // await User.addToCollection(inputs.id, 'groups').members(inputs.groupId);

    await sails.sockets.broadcast('user', 'list');
  }


};
