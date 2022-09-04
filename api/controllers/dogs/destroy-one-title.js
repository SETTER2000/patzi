module.exports = {
  friendlyName: 'Destroy one title',
  description: 'Удалить один титул у данной собаки.',
  inputs: {
    id: {
      type: 'string',
      description: `Идентификатор титула.`,
      required: true
    },
    dogId: {
      type: 'string',
      description: `Идентификатор собаки.`,
      required: true
    },
    dateReceiving: {
      type: 'string',
      description: `Дата получения титула.`,
      required: true
    }
  },
  exits: {
    success: {
      anyData: 'Вы подключились к комнате dog и слушаете событие list'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The dog who makes this request does not have permission to delete this entry.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    },
    badRequest: {
      description: 'Error.',
      responseType: 'badRequest'
    }
  },

  fn: async function (inputs, exits) {
    let req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    //
    // Подключить сокет, который сделал запрос, к комнате «title».
    await sails.sockets.join(req, 'title');
    if (_.isEmpty(inputs.dogId) || _.isEmpty(inputs.id) || _.isEmpty(inputs.dateReceiving)) {
      throw 'badRequest';
    }
    let dog = await Dog.findOne(inputs.dogId);
    if (!dog) {
      console.error('Ошибка. Не смог выбрать обект dog!');
      throw 'badRequest';
    }
    dog.titleDog = dog.titleDog.filter(td => !_.isNull(td));
    let evens = _.remove(dog.titleDog, (title) => {
      return ((inputs.dateReceiving === title.dateReceiving) && (inputs.id === title.id));
    });
    let update = await Dog.updateOne({id: inputs.dogId})
      .set({titleDog: dog.titleDog});
    return exits.success();
  }
};
