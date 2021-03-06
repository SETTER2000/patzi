module.exports = {


  friendlyName: 'One comment',


  description: 'Добавляет аватар к коментарию',


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
      description: `Идентификатор комментария.`
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
    // Выбрать все комменты относящиеся к конкретному экземпляру модуля и имеющие запрашиваемый field
    let comment = await Commentary.findOne(inputs.id)
      .populate('owner');
    // console.log('FFF:: ', `${inputs.instanceModuleId}/${inputs.field}`);
    // console.log('module-1:: ',module);
    // let userIds = _.uniq(_.pluck(module[inputs.field], 'comments')[0], 'userId');
    // let users = await User.find(userIds);
    // if (!users) {
    //   throw 'badRequest';
    // }

    // console.log('comment на входе::', comment);

    comment.avatarUrl = (comment.owner.defaultIcon === 'avatar') ? comment.owner.avatar : comment.owner.gravatar;
    // comment.kennelObj = await sails.helpers.getKennelUser.with({id:comment.owner.id});
    comment.kennels = await sails.helpers.getKennelUser(comment.owner.id);
    comment.ownerId = comment.owner.id;
    delete comment.owner;
    // console.log('com.avatarUrl:: ', comment.avatarUrl);


    // console.log('comment на выходе::', comment);
    return comment;
  }


};

