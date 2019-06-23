module.exports = {


  friendlyName: 'Destroy one kennel',

  description: 'Delete the "kennel"  with the specified ID from the database.',


  inputs: {
    id: {
      type: 'string',
      required: true
    }
  },


  exits: {
    notFound:{
      description: 'Не существует такого объекта с таким ID.',
      responseType:'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The user making this request does\'t have the permissions to delete this kennel.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    }
  },


  fn: async function (inputs, exits) {
    const req = this.req;
    let kennel = await Kennel.findOne({
      id: inputs.id
    });

    if (!kennel) {
      throw 'notFound';
    }

    if (kennel.owner !== this.req.me.id && !this.req.me.isSuperAdmin) {
      console.log('Forbiccccc');
      throw 'forbidden';
    }

    await Kennel.destroy({id: inputs.id});

    // Вызываем помощника сформировать правильно данные для ответа.
    let res = await sails.helpers.formatCollectionKennel(req);


    // Рассылаем данные всем подписанным на событие list данной комнаты.
    await sails.sockets.broadcast('kennel', 'list-kennel',res.collection);

    // Respond with view.
    return exits.success();
  }
};
