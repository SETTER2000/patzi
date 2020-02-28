module.exports = {


  friendlyName: 'Remove picture from s3',


  description: `Действие удаляет из S3 хранилища файл или файлы картинок`,


  inputs: {
    pictures: {
      type: 'ref',
      description: `Массив объектами фала картинок, которые должны быть удалены.`,
      example: `
      [ { fd: '38155c8d-cd57-4877-964b-a2de849258f7.jpg', 
          size: 34964, 
          type: 'image/jpeg', 
          name: '2_2.jpg', 
          id: '38155c8d-cd57-4877-964b-a2de849258f7', 
          description: '', 
          dateTaken: '' } ]
      `
    }
  },


  exits: {
    success: {
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
    },
  },


  fn: async function (inputs, exits) {

    await sails.helpers.removeImgS3(inputs.pictures);

    return exits.success();

  }


};
