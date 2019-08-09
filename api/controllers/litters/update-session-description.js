module.exports = {


  friendlyName: 'Update session description',


  description: 'Обновляем описание фотосессии',
  /*
  * id: this.litter.id,
          indexPhotoSet:this.indexPhotoSet,
          sessionName: this.ruleForm.sessionName,
          descriptionPhotoSession: this.ruleForm.descriptionPhotoSession
  * */

  inputs: {
    id: {
      type: 'string',
      description: `Идентификатор помёта.`,
      required: true
    },


    indexPhotoSet: {
      type: 'number',
      description: `Индекс объекта данной фотосессии в массиве фотосессий.`,
      required: true
    },

    //
    // sessionName: {
    //   type: 'string',
    //   example: 'Два дня от роду',
    //   description: 'Название фотосессии для щенков.'
    // },


    descriptionPhotoSession: {
      type: 'string',
      example: 'Прекрасным тёплым утром. Крошечные комочки после завтрака.',
      description: 'Описание фотосессии. Рассказ про то как и где снимали.'
    },
  },


  exits: {
    success: {
      // Информация о вновь созданной записи
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
    }
  },


  fn: async function (inputs, exits) {


    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }


    let litter = await Litter.findOne({id: inputs.id});
    if (!litter) {
      throw 'badRequest';
    }

    await _.each(litter.puppies, async (pup, i) => {
      pup.descriptionPhotoSession = (i === inputs.indexPhotoSet) ? inputs.descriptionPhotoSession : pup.descriptionPhotoSession;
    });

   let u= await Litter.updateOne({id: inputs.id})
      .set({
        puppies: litter.puppies
      });

// console.log('бновили: ', u);
    // await sails.sockets.broadcast(inputs.collection, `list-${inputs.collection}`);

    // All done.
    return exits.success();
  }


};
