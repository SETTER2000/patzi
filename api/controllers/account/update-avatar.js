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
    },
    id: {
      description: 'Идентификатор группы.',
      type: 'number',
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

    let info = await sails.uploadOne(inputs.photo);

    if (!info) {
      throw 'badRequest';
    }

    console.log('info: ', info);


    return exits.success({});
  }


};
