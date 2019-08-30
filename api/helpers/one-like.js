module.exports = {


  friendlyName: 'One like',


  description: 'Добавляет аватар к лайку',


  inputs: {
    // instanceModuleId: {
    //   type: 'string',
    //   example: '5d5fc8aac1717d2778adbfae',
    //   required: true,
    //   description: `Идентификатор экземпляра модуля в котором оставлен комментарий. Например в модуле Litter
    //   (помёты) их может быть несколько, следовательно кажый помёт имеет свой ID, он и
    //   записывается здесь (Litter.id).`
    // },

    id: {
      type: 'string',
      example: '5d5fc8aac1717d2778adbfae',
      required: true,
      description: `Идентификатор лайка.`
    },


    // field: {
    //   type: 'string',
    //   example: 'puppies',
    //   required: true,
    //   description: `Наименование поля в объекте экземпляра модуля в котором содержится контент к
    //   которому относится комментарий.`
    // },
  },

  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // Выбрать все лайки относящиеся к конкретному экземпляру модуля и имеющие запрашиваемый field
    let like = await Like.findOne(inputs.id)
      .populate('owner');

    // Выбираем что показывать граватар или аватар, в зависимости от установок пользвателя
    like.avatarUrl = (like.owner.defaultIcon === 'avatar') ? like.owner.avatar : like.owner.gravatar;
    // like.kennelObj = await sails.helpers.getKennelUser.with({id:like.owner.id});
    like.kennels = await sails.helpers.getKennelUser(like.owner.id);
    delete like.owner;
    // console.log('com.avatarUrl:: ', like.avatarUrl);


    // console.log('like на выходе::', like);
    return like;
  }


};

