module.exports = {
  friendlyName: 'Update group',
  description: 'Обновляем список групп доступа к которым пренадлежит пользователь.',
  inputs: {
    id: {
      type: 'string',
      description: 'ID пользователя у которого обновляется группа доступа.'
    },
    groupId: {
      type: 'ref',
      description: 'Массив ID групп в которую входит пользователь.'
    }
  },

  fn: async function (inputs) {
    let req = this.req;
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
    // Добавить пользователя inputs.id в группу inputs.groupId.
    await User.replaceCollection(inputs.id, 'groups', inputs.groupId);
    await User.replaceCollection(inputs.id, 'posts').members(inputs.groupId);
    let user = await User.findOne({where: {id: inputs.id}, select: ['fullName']})
      .populate('groups');
    let isAdmin = false;
    await _.each(user.groups, group => {isAdmin = (group.label === 'admin');});
    await User.update({id: inputs.id},{isAdmin:isAdmin});
    await sails.sockets.broadcast('user', 'list');
  }
};
