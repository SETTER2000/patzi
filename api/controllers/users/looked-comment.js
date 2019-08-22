module.exports = {


  friendlyName: 'Looked comment',


  description: `Счётчик. Подсчёт просмотренных комментариев. Применяется в бейджах при показе 
  новых не просмотренных комментариев. Идея в том, чтобы считать сколько раз пользователь кликнул
  по комменту. Эта сумма кликов вычитается из общего кол-ва комментариев в данной теме. 
  Например: в каждой фотосессии одного помёта есть свой массив объектов комментариев, следовательно когда 
  пользователь кликает на коммент данный счётчик фиксирует +1 и эта сумма вычитается из суммы всех 
  комментариев фотосессии. Остаток показывается как не просмотренные комментарии.`,


  inputs: {
    id: {
      type: 'string',
      description: `Идентификатор помёта.`,
      required: true
    },

    letter: {
      type: 'string',
      description: 'Передаётся буква помёта',
      example: 'A',
      required: true
    },

    indexPhotoSet: {
      type: 'number',
      description: 'Индекс в массиве фотосессий.',
      required: true
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

    let litter = await sails.helpers.srcImagePreparation.with(
      {
        letter: inputs.letter,
        preferredLocale: this.req.me.preferredLocale
      });


    if (!litter) throw 'badRequest';


    litter.puppies[inputs.indexPhotoSet].countNewComments = 0;


    let litterUpdate = await Litter.updateOne(inputs.id).set({puppies: litter.puppies});
    if (!litterUpdate) throw 'badRequest';


    // Рассылаем данные всем подписанным на событие list-* данной комнаты.
    await sails.sockets.broadcast('litter', 'list-comment', litter);


    // Respond with view.
    return exits.success();

  }


};
