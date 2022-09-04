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
