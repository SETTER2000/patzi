module.exports = {


  friendlyName: 'Add group',


  description: 'Добавить пользователя в группы',


  inputs: {
    groups: {
      type: 'ref',
      required: true,
      description: `Массив с именами групп в которые следует добавить пользователя`
    },
    userId: {
      type: 'string',
      required: true,
      description: `Идентификатор пользователя.`
    }
  },



  fn: async function (inputs) {

    let groups = await Group.find({label: {in: inputs.groups}});
    groups = _.pluck(groups, 'id');
    return await User.replaceCollection(inputs.userId, 'groups').members(groups);
  }
};

