module.exports = {


  friendlyName: 'Download photo',


  description: 'Скачать файл фотографии (возвращая поток).',


  inputs: {
    id: {
      description: 'Идентификатор вещи, чье фото мы скачиваем.',
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      outputDescription: 'The streaming bytes of the specified litter\'s photo.',
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

    let litter = await Litter.findOne({id: inputs.id});

    if (!litter) {
      throw 'notFound';
    }

    let user = await User.findOne({id: this.req.me.id}).populate('friends');
    /**
     * Если друзья имеют идентификатор (ID) владельца этой вещи,
     * то вам позволено это видеть, потому что один из ваших друзей
     * является владельцем этой вещи.
     * Так что если вы являетесь владельцем этой вещи или ей владеет кто-то из ваших друзей,
     * то вы позволяете её видеть.
     *
     */
    /**
     * ПЕРЕВЕРНУЛИ: === -> !== , || -> &&,  _.any -> !_.any
     * Так что теперь мы говорим:
     * "Если вы не являетесь владельцем фото и не один из ваших друзей тоже,
     * то это означает, что вам запрещено видеть эту вещь.
     */
    if (this.req.me.id !== litter.owner && !_.any(user.friends, {id: litter.owner})) {
      throw 'forbidden';
    }

    //************************************//
    // **** ФОРМИРУЕМ ЗАГРУЗКУ ФАЙЛА **** //
    //************************************//
    // Set the mime type for the response
    // Это устанавливает mime тип ответа
    // this.res.type(litter.imageUploadMime);

    /**
     * startDownload - функция от модуля sails-hook-uploads
     * мы будем использовать этот метод для загрузки файла
     * Этот метод стартует загрузку в поток байтов файла, после
     * полной загрузки сервер отдасть success
     *
     * Ответ о благополучном завершении отдачи файла
     */
    let downloading = await sails.startDownload(litter.imageUploadFD);
    return downloading;
  }

};
