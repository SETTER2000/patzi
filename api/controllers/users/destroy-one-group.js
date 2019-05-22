module.exports = {


  friendlyName: 'Destroy one group',


  description: 'Удаление пользователя из группы доступа.',


  inputs: {
    userId: {
      type: 'number',
      description: 'ID пользователя которого удаляем из группы доступа.'
      // whereToGet: {description: 'Credit card info is provided by Stripe after completing the checkout flow.'}
    },
    groupId:{
      type:'ref',
      example: '[99,98]',
      description: 'Массив групп доступа из которых удаляется пользователь.'
    }
  },


  exits: {
    notFound:{
      description: 'There is no such object with such ID.',
      responseType:'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The user who makes this request does not have permission to delete this entry.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    }
  },


  fn: async function (inputs, exits) {
    let group = await Group.find({
      id: inputs.groupId
    });

    let user = await User.findOne({
      id: inputs.userId,
    });

    if (!group) {
      throw 'notFound';
    }
    if (!user) {
      throw 'notFound';
    }


    // Для пользователя 3 удалите домашних животных 99 и 98 из коллекции "домашних животных":
    // await User.removeFromCollection(3, 'pets')
    // .members([99,98]);
    await User.removeFromCollection(inputs.userId, 'groups').members(inputs.groupId);
    return exits.success();
  }



};
