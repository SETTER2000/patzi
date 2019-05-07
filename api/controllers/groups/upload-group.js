module.exports = {


  friendlyName: 'Upload group',


  description: '',

  // всегда должно быть первым
  files: ['photo'], // именуем поле, через которое будет передоваться файл при загрузки


  inputs: {
    photo: {
      type: 'ref',
      description: 'Фото группы пользователей.'
    },
    label: {
      type: 'string',
      description: 'Наименование группы.',
      example: 'A',
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
      description: 'Error',
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
    let newGroup = await Group.create({
      imageUploadFD: info.fd,
      imageUploadMime: info.type,
      filename: info.filename,
      whoCreate: this.req.me.id,
      label: inputs.label,
      subtitle: inputs.subtitle
    }).fetch();

    return exits.success({
      id: newGroup.id,
      detail: url.resolve(sails.config.custom.baseUrl, `/groups/group/${newGroup.id}`),
      imageSrc: url.resolve(sails.config.custom.baseUrl, `/api/v1/groups/${newGroup.id}`)
    });

  }
};
