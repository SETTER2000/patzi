module.exports = {


  friendlyName: 'Add like',


  description: 'Добавляем новый like.',

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
    like: {
      type: 'string',
      example: 'like, super, haha, wow, sorry, scandal',
      isIn: ['like', 'super', 'haha', 'wow', 'sorry', 'scandal'],
      required: true,
      description: 'Наименование лайка. Один из 6 возможных лайков.'
    },


    nameModule: {
      type: 'string',
      example: 'Litter',
      required: true,
      description: `Наименование модуля. Например модуль Litter.`
    },


    indexPhotoSet: {
      type: 'string',
      example: '2911bfggfhahdd',
      required: true,
      description: `Хэш-код объекта массива.`
    },


    userName: {
      type: 'string',
      example: 'Alex Fox',
      required: true,
      description: `Полное имя пользователя.`
    },


    instanceModuleId: {
      type: 'string',
      example: '5d5fc8aac1717d2778adbfae',
      required: true,
      description: `Идентификатор экземпляра модуля в котором оставлен комментарий. Например в модуле Litter
      (помёты) их может быть несколько, следовательно кажый помёт имеет свой ID, он и записывается здесь.`
    },


    field: {
      type: 'string',
      example: 'puppies',
      required: true,
      description: `Наименование поля в объекте экземпляра модуля в котором содержится контент к 
      которому относится комментарий.`
    },


    letter: {
      type: 'string',
      description: 'Передаётся буква помёта',
      example: 'A',
      // required: true
    },

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




      // Записываем комментарий
      let newLike = await Like.create({
        like: inputs.like,
        nameModule: inputs.nameModule,
        instanceModuleId: inputs.instanceModuleId,
        field: inputs.field,
        userName: inputs.userName,
        letter: inputs.letter,
        indexPhotoSet: inputs.indexPhotoSet,
        // avatarUrl: (user.defaultIcon === 'avatar') ? user.avatar : user.gravatar,
        owner: req.me.id
      }).fetch();



    if (!newLike) {
      throw 'badRequest';
    }

    // console.log('newLike::: ', newLike);
    let module;

    // console.log(`MODULE ::: ${inputs.nameModule}`, inputs.nameModule);
    switch (inputs.nameModule) {
      case 'Litter':
        module = await Litter.findOne({id: inputs.instanceModuleId});
        _.each(module[inputs.field], ob => {
          ob.indexPhotoSet === inputs.indexPhotoSet ? ob.countLike++ : '';
        });
        await Litter.updateOne({id: inputs.instanceModuleId}).set(module);
        break;
    }


    let count = module[inputs.field].filter(ob => ob.indexPhotoSet === inputs.indexPhotoSet);
    count = _.last(_.pluck(count, 'countLike'));
    // console.log('NEW MOD:: ', module[inputs.field]);
    // console.log(`count ::::`, count);

    /**
     * Добавляет аватар к лайкам и возвращает собранный массив объектов лайков согласно
     * идентификатору экземпляра модуля и его полю к которому относятся лайки
     */
    let like = await sails.helpers.oneLike(newLike.id);

    // console.log('Return COMMENT: ', like);
    // Рассылаем данные всем подписанным на событие add-* данной комнаты.
    await sails.sockets.broadcast('litter', 'add-like', {likes: like, countLike: count});

    return exits.success();


  }


};
