module.exports = {


  friendlyName: 'Update group',


  description: '',

  // всегда должно быть первым
  files: ['photo'], // именуем поле, через которое будет передоваться файл при загрузки


  inputs: {
    photo: {
      type: 'ref',
      description: 'Обновлённое фото группы пользователей.',
      // required: true
    },
    id: {
      description: 'Идентификатор группы.',
      type: 'string',
      required: true
    },
    subtitle: {
      type: 'string',
      example: 'Описание группы. Для каких целей создана.',
      description: 'Описание щенка. Какая то интересная информация.'
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
    let fd, type, name;

    let info = await sails.uploadOne(inputs.photo);
    if (info) {
      // throw 'badRequest';
      fd = info.fd;
      type = info.type;
      name = info.name;
    }
    await Group.updateOne({id: inputs.id})
      .set({
        imageUploadFD: fd,
        imageUploadMime: type,
        filename: name,
        subtitle: inputs.subtitle
      });

    return exits.success({});

  }


};
