module.exports = {


  friendlyName: 'Update avatar',


  description: 'Действие отвечающее за смену автвра пользователя.',


  // всегда должно быть первым
  files: ['photo'], // именуем поле, через которое будет передоваться файл при загрузки


  inputs: {
    photo: {
      type: 'ref',
      description: 'Обновлённое фото группы пользователей.',
      // required: true
    }

  },


  exits: {
    success: {
      // Информация о вновь созданной записи
      outputDescription: 'Information about the newly created record.',
      // Устанавливаем выходной тип данных. Хорошая практика для документирования кода.
      outputType: {
        id: 'number',
        detail: 'string',
        imageSrc: 'string'
      }
    },
    badRequest: {
      description: 'Error.',
      responseType: 'badRequest'
    }
  },

  fn: async function (inputs, exits) {
    // Бибилиотека Node.js


    const url = require('url');
    let info = await sails.uploadOne(inputs.photo);
    console.log('info::' , info);
    let fd, type, filename, avatar='';

    if (info) {
      // throw 'badRequest';
      fd = info.fd;
      type = info.type;
      filename = info.filename;
      avatar = url.resolve(sails.config.custom.baseUrl, `/api/v1/account/${this.req.me.id}`);
    }
    // Update the record for the logged-in user.
    await User.updateOne({id: this.req.me.id})
      .set({
        avatarFD: fd,
        avatarMime: type,
        filename: filename,
        avatar: avatar
      });
    
    return exits.success();

  }
};
