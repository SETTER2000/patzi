module.exports = {
  friendlyName: 'Update avatar',
  description: 'Действие отвечающее за смену автвра пользователя.',
  // всегда должно быть первым
  files: ['photo'], // именуем поле, через которое будет передоваться файл при загрузки
  inputs: {
    photo: {
      type: 'ref',
      description: 'Обновлённое фото группы пользователей.',
    }
  },
  exits: {
    success: {
      // Информация о вновь созданной записи
      outputDescription: 'Information about the newly created record.',
    },
    badRequest: {
      description: 'Error.',
      responseType: 'badRequest'
    }
  },

  fn: async function (inputs) {
    const url = require('url');
    let info = await sails.uploadOne(inputs.photo);
    let fd; let type; let filename; let avatar='';
    if (info) {
      fd = info.fd;
      type = info.type;
      filename = info.filename;
      avatar = url.resolve(sails.config.custom.baseUrl, `/api/v1/account/${this.req.me.id}`);
    }
    await User.updateOne({id: this.req.me.id})
      .set({
        avatarFD: fd,
        avatarMime: type,
        filename: filename,
        avatar: avatar
      });
  }
};
