module.exports = {


  friendlyName: 'Update group',


  description: 'Обновляем список групп доступа к которым пренадлежит пользователь.',


  inputs: {
    userId: {
      type: 'number',
      description: 'ID пользователя у которого обновляется группа доступа.'
      // whereToGet: {description: 'Credit card info is provided by Stripe after completing the checkout flow.'}
    },
    groupId:{
      type:'ref',
      description: 'ID группы в которую входит пользователь.'
    }
  },



  fn: async function (inputs) {


    // Добавить пользователя inputs.userId в группу inputs.groupId.
    await User.addToCollection(inputs.userId, 'groups', inputs.groupId);


  }


};
