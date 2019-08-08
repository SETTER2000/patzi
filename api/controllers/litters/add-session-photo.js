module.exports = {


  friendlyName: 'Add session photo',


  description: '',


  inputs: {

    id: {
      type: 'string',
      description: `Идентификатор помёта.`,
      required: true
    },


    sessionName: {
      type: 'string',
      example: 'Два дня от роду',
      description: 'Название фотосессии для щенков.'
    },


    fileList: {
      type: 'ref',
      description: 'Массив с fd ссылками на фото родителей.'
    },


    descriptionPhotoSession: {
      type: 'string',
      maxLength: 300,
      example: 'Ожидается звёздный помёт. Прекрасные родословные, чистокровные производители.',
      description: 'Описание фотосессии. Какая то интересная информация.'
    },


    letter: {
      type: 'string',
      description: 'Буква помёта.',
      example: 'A'
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
      description: 'The object was not created.',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {

    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
// console.log('inputs.id:: ', inputs.id);

    let litter = await Litter.findOne(inputs.id);
    if (!litter) throw 'badRequest';


    // Update the record for the logged-in user.
    await Litter.updateOne({id: inputs.id})
      .set({
        sessionName: inputs.sessionName,
        descriptionPhotoSession: inputs.descriptionPhotoSession,
      });


    // await sails.sockets.broadcast(inputs.collection, `list-${inputs.collection}`);

    // All done.
    return exits.success();


  }


};
