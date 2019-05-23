module.exports = {


  friendlyName: 'Upload files',


  description: '',

  files: ['photo'], // именуем поле, через которое будет передоваться файл при загрузки
  inputs: {
    photo: {
      type: 'ref',
      description: 'Фото помёта. Загружаемый поток.',
      required: true
    },
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
    // console.log('REQ:', this.req);
    console.log('IIIIINPUDSS: ', inputs);

    // uploadOne - не будет работать без пакета sails-hook-uploads
    // npm i --save sails-hook-uploads
    let info = await sails.upload(inputs.photo);
    if (!info) {
      throw 'badRequest';
    }


    // All done.
    return exits.success();

  }


};
