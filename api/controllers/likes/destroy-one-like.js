module.exports = {


  friendlyName: 'Destroy one like',


  description: 'Удаляем like.',

  /*
     like
     super
     haha
     wow
     sorry
     outrageously
     нравится
     супер
     ха-ха
     ух-ты
     сочувствую
     возмутительно*/
  inputs: {
    id: {
      type: 'string',
      description: 'Идентификатор лайка',
      example: '5d68f6d1fc6c361030eb48cc',
      required: true
    },
    // like: {
    //   type: 'string',
    //   example: 'like, super, haha, wow, sorry, scandal',
    //   isIn: ['like', 'super', 'haha', 'wow', 'sorry', 'scandal'],
    //   required: true,
    //   description: 'Наименование лайка. Один из 6 возможных лайков.'
    // },
    //
    //
    // nameModule: {
    //   type: 'string',
    //   example: 'Litter',
    //   required: true,
    //   description: `Наименование модуля. Например модуль Litter.`
    // },
    //
    //
    // indexPhotoSet: {
    //   type: 'string',
    //   example: '2911bfggfhahdd',
    //   required: true,
    //   description: `Хэш-код объекта массива.`
    // },
    //
    //
    // userName: {
    //   type: 'string',
    //   example: 'Alex Fox',
    //   required: true,
    //   description: `Полное имя пользователя.`
    // },
    //
    //
    // instanceModuleId: {
    //   type: 'string',
    //   example: '5d5fc8aac1717d2778adbfae',
    //   required: true,
    //   description: `Идентификатор экземпляра модуля в котором оставлен комментарий. Например в модуле Litter
    //   (помёты) их может быть несколько, следовательно кажый помёт имеет свой ID, он и записывается здесь.`
    // },
    //
    //
    // field: {
    //   type: 'string',
    //   example: 'puppies',
    //   required: true,
    //   description: `Наименование поля в объекте экземпляра модуля в котором содержится контент к
    //   которому относится комментарий.`
    // },
    //
    //
    // letter: {
    //   type: 'string',
    //   description: 'Передаётся буква помёта',
    //   example: 'A',
    //   // required: true
    // },

  },


  exits: {
    success: {
      outputDescription: 'Information about the newly created record.',
      // Устанавливаем выходной тип данных. Хорошая практика для документирования кода.
      outputType: {
        id: 'number',
        imageSrc: 'string'
      },
    },
    badRequest: {
      description: 'No image upload was provided.',
      responseType: 'badRequest'
    },
  },


  fn: async function (inputs, exits) {
    // Бибилиотека Node.js
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }


    // Have the socket which made the request join the "like" room.
    // Подключить сокет, который сделал запрос, к комнате «like».
    await sails.sockets.join(req, 'like');



    let findLike = await Like.findOne(inputs.id).fetch();
    if(!findLike){
      throw 'notFound';
    }

    if (findLike.owner !== this.req.me.id) {
      throw 'forbidden';
    }

    await Like.destroy({id: inputs.id});

    // let litters = await Litter.find();
    await sails.sockets.broadcast('litter', 'destroy-like');

    return exits.success();

  }

};
