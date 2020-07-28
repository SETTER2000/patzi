module.exports = {


  friendlyName: 'pedigree home',


  description: 'Получить массив предков.',

  inputs: {

    id: {
      type: 'string',
      description: `Идентификатор собаки. Если требуется страница собаки.`
    },
  },

  exits: {

    forbidden: {
      responseType: 'forbidden'
    },
    notFound: {
      responseType: 'notFound'
    }

  },


  fn: async function (inputs, exits) {
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }


    // hAVE THE SOCKET WHICH MADE THE REQUEST JOIN THE "KENNEL" ROOM.
    // пОДКЛЮЧИТЬ СОКЕТ, КОТОРЫЙ СДЕЛАЛ ЗАПРОС, К КОМНАТЕ «KENNEL».
    await sails.sockets.join(req, 'dog');
                     console.log('INPUTSSS::; ', inputs);
   /* let dog = await Dog.findOne({id:inputs.id}).populate('parents');
    console.log('DOGGG  find:: ', dog);
    console.log('DOGGG parents find:: ', dog.parents);
    if(!dog){
      throw 'notFound';
    }
    let dogParents = _.pluck(dog.parents,'id');
    console.log('dogParents::', dogParents);
    dog = await Dog.pedigree(dogParents[0]);   */
    let  dog = await Dog.pedigree(inputs.id);

    if (!dog) {
      throw 'notFound';
    }


    console.log('Перед отдачей::: ' , dog);
    // Respond with view.
    await sails.sockets.broadcast('dog', 'list-pedigree', dog);
    return exits.success();

  }


};
