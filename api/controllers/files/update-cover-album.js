module.exports = {
  friendlyName: 'Update cover album',
  description: 'Обновляет обложку альбома.',
  inputs: {
    collectionName: {
      type: 'string',
      description: `Имя коллекции.`,
      required: true
    },
    field: {
      type: 'string',
      description: `Поле где находится массив объектов фотографий.`,
      required: true
    },
    cover: {
      type: 'string',
      description: `Ключ картинки в массиве фоторгафий привязанных к объекту коллекции.
      Согласно которому это фото будет обложкой.`,
      required: true
    },
    id: {
      type: 'string',
      description: `Идентификатор помёта.`,
      required: true
    }
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
    await sails.sockets.join(req, 'files');
    let updateObject =  await sails.helpers.imgCover.with({
      id: inputs.id,
      cover: inputs.cover,
      field: 'images',
      collectionName: inputs.collectionName
    });
    await sails.sockets.broadcast('files', 'update-cover');
    return exits.success();
  }
};
