module.exports = {


  friendlyName: 'Upload thing',


  description: '',

  files: ['photo'], // именуем поле, через которое будет передоваться файл при загрузки
  inputs: {
    photo: {
      type: 'ref',
      description: 'Uploaded file stream.',
      required: true
    },
    label: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    subtitle: {
      type: 'string'
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
    let newThing = await Thing.create({
      imageUploadFD: info.fd,
      imageUploadMime: info.type,
      owner: this.req.me.id,
      label: inputs.label,
      title: inputs.title,
      subtitle: inputs.subtitle,
    }).fetch();
    
    return exits.success({
      id: newThing.id,
      imageSrc: url.resolve(sails.config.custom.baseUrl, `/api/v1/things/${newThing.id}`)
    });
  }
};
