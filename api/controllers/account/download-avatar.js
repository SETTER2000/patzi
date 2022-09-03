module.exports = {


  friendlyName: 'Download avatar',


  description: 'Download avatar file (returning a stream).',


  inputs: {
    id: {
      description: 'Идентификатор объекта, чье фото мы скачиваем.',
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      outputDescription: 'The streaming bytes of the specified thing\'s photo.',
      outputType: 'ref'
    },
    forbidden: {
      responseType: 'forbidden'
    },
    notFound: {
      responseType: 'notFound'
    }
  },


  fn: async function (inputs) {

    let user = await User.findOne({id: inputs.id});

    if (!user) {
      throw 'notFound';
    }

    // let user = await User.findOne({id: this.req.me.id}).populate('friends');
    /**
     * Если друзья имеют идентификатор (ID) владельца этой вещи,
     * то вам позволено это видеть, потому что один из ваших друзей
     * является владельцем этой вещи.
     * Если вы являетесь владельцем этой вещи или ей владеет кто-то из
     * ваших друзей,
     * то вы позволяете её видеть.
     *
     */
    /**
     * ПЕРЕВЕРНУЛИ: === -> !== , || -> &&,  _.any -> !_.any
     * Так что теперь мы говорим:
     * Если вы не являетесь владельцем фото и не один из ваших друзей тоже,
     * то это означает, что вам запрещено видеть эту вещь.
     */
    // if (this.req.me.id !== group.owner && !_.any(user.friends, {id: group.owner})) {
    //   throw 'forbidden';
    // }

    //************************************//
    // **** ФОРМИРУЕМ ЗАГРУЗКУ ФАЙЛА **** //
    //************************************//
    // Set the mime type for the response
    // Это устанавливает mime тип ответа
    this.res.type(user.avatarMime);

    /**
     * startDownload - функция от модуля sails-hook-uploads
     * мы будем использовать этот метод для загрузки файла
     * Этот метод стартует загрузку в поток байтов файла, после
     * полной загрузки сервер отдасть success
     *
     * Ответ о благополучном завершении отдачи файла
     */
    let downloading = await sails.startDownload(user.avatarFD);
    return downloading;

  }


};
