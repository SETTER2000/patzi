module.exports = {

  friendlyName: 'Upload litter',


  description: '',

  files: ['photo'], // именуем поле, через которое будет передоваться файл при загрузки
  inputs: {
    photo: {
      type: 'ref',
      description: 'Uploaded file stream.',
      required: true
    },
    label: {
      type: 'string',
      required: true
    },
    title: {
      type: 'string'
    },
    subtitle: {
      type: 'string'
    },
    born: {
      type: 'number',
      example: 1502844074211,
      description: 'Дата появления на свет помёта.',
      required: true
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
    }
  },


  fn: async function (inputs, exits) {

    // console.log('inputs:::', inputs);
    // Бибилиотека Node.js
    const url = require('url');

    /**
     * Принимает мета данные загружаемого файла
     * UploadedFileMetadata {
          fd:  // fd - дескриптор файла
           'D:\\__PROJECTS\\Sails\\patzi\\.tmp\\uploads\\46ca9ce1-f7d5-44c9-8f8a-85dd7f3bcc89.JPG',
          size: 2951221, // size  - в байтах
          type: 'image/jpeg',
          filename: 'IMG_6984.JPG',
          status: 'finished',
          field: 'photo',
          extra: undefined,
          name: 'IMG_6984.JPG'
          }
     */
      // uploadOne - не будет работать без пакета sails-hook-uploads
      // npm i --save sails-hook-uploads
    let info = await sails.uploadOne(inputs.photo);
    if (!info) {
      throw 'badRequest';
    }

    // console.log("inputs:: ", inputs);

    let newLitter = await Litter.create({
      imageUploadFD: info.fd,
      imageUploadMime: info.type,
      owner: this.req.me.id,
      label: inputs.label,
      title: inputs.title,
      subtitle: inputs.subtitle,
      born: inputs.born,
    }).fetch();


    return exits.success({
      id: newLitter.id,
      imageSrc: url.resolve(sails.config.custom.baseUrl, `/api/v1/litters/${newLitter.id}`)
    });
  }
};
