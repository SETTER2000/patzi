module.exports = {


  friendlyName: 'List comments',


  description: '',



  inputs: {
    instanceModuleId: {
      type: 'string',
      example: '5d5fc8aac1717d2778adbfae',
      required: true,
      description: `Идентификатор экземпляра модуля в котором оставлен комментарий. Например в модуле Litter
      (помёты) их может быть несколько, следовательно кажый помёт имеет свой ID, он и 
      записывается здесь (Litter.id).`
    },


    field: {
      type: 'string',
      example: 'puppies',
      required: true,
      description: `Наименование поля в объекте экземпляра модуля в котором содержится контент к 
      которому относится комментарий.`
    },
  },

  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // Выбрать все комменты относящиеся к конкретному экземпляру модуля и имеющие запрашиваемый field
    let module = await Commentary.find({
      instanceModuleId: inputs.instanceModuleId,
      field: inputs.field
    })
      .populate('owner');
    console.log('FFF:: ', `${inputs.instanceModuleId}/${inputs.field}`);
    console.log('module:: ',module);
    // let userIds = _.uniq(_.pluck(module[inputs.field], 'comments')[0], 'userId');
    // let users = await User.find(userIds);
    // if (!users) {
    //   throw 'badRequest';
    // }

    // let litter = await Litter.findOne({id: inputs.instanceModuleId});
    await  _.each(module, async (comment) => {
      comment.avatarUrl = (comment.owner.defaultIcon === 'avatar') ? comment.owner.avatar : comment.owner.gravatar;
      delete comment.owner;
      // console.log('com.avatarUrl:: ', comment.avatarUrl);
    });

    console.log('helper listComments - MODULE::', module);
    return module;
  }


};

