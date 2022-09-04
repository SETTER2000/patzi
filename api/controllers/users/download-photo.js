module.exports = {
  friendlyName: 'Download photo',
  description: 'Скачать файл фотографии (возвращая поток).',
  inputs: {
    id: {
      description: 'Идентификатор, чье фото мы скачиваем.',
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      outputDescription: 'The streaming bytes of the specified user\'s photo.',
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
    console.log('FOOOF USER:::: ', user)
    if (!user) {
      throw 'notFound';
    }

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
    let downloading = user.avatarFD ? await sails.startDownload(user.avatarFD) : '';
    return downloading;
  }
};
