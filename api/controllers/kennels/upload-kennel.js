module.exports = {


  friendlyName: 'Upload kennel',


  description: 'Создаём, добавляем новый питомник.',

  // files: ['photo'], // именуем поле, через которое будет передоваться файл при загрузки


  inputs: {
    // photo: {
    //   type: 'ref',
    //   description: 'Uploaded file stream.',
    //   //required: true
    // },
    label: {
      type: 'string',
      required: true,
      description: 'Официальное наименование питомника.'

    },


    subtitle: {
      type: 'string',
      description: 'Дополнительная информация. Описание питомника.'
    },

    yourKennel: {
      type: 'boolean',
      description: 'Дополнительная информация. Описание питомника.',
      defaultsTo:false
    },

    registerNumber: {
      type: 'string',
      description: 'Дополнительная информация. Описание питомника.'
    },

    site: {
      type: 'string',
      description: 'Дополнительная информация. Описание питомника.'
    },

    country: {
      type: 'string',
      description: 'Дополнительная информация. Описание питомника.'
    },

    continent: {
      type: 'string',
      description: 'Дополнительная информация. Описание питомника.'
    },

    dateCreate: {
      type: 'string',
      description: 'Дополнительная информация. Описание питомника.'
    },

    rightName: {
      type: 'string',
      description: 'Дополнительная информация. Описание питомника.'
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

    console.log(inputs);
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


    /**
     * Добавляет более простой интерфейс для работы с выгрузками и загрузками файлов в
     * приложении Node.js / Sails. Поддерживает async/await (асинхронное/ожидание).
     * Поддерживает только Node 8 и выше. (https://www.npmjs.com/package/sails-hook-uploads)
     *
     * uploadOne - не будет работать без пакета sails-hook-uploads
     * npm i --save sails-hook-uploads
     * .uploadOne (upstreamOrReadable) (принимает любой доступный для чтения поток
     * или входящую загрузку файла Sails из файла 0 или 1; возвращает либо undefined словарь,
     * либо информацию о загруженных данных файла.)
     */
    // let info = await sails.uploadOne(inputs.photo);
    // if (!info) {
    //   throw 'badRequest';
    //}
    let newKennel = await Kennel.create({
      // imageUploadFD: info.fd,
      // imageUploadMime: info.type,
      // filename: info.filename,
      whoCreate: this.req.me.id,
      label: inputs.label,
      rightName: inputs.rightName,
      registerNumber: inputs.registerNumber,
      dateCreate: JSON.parse(inputs.dateCreate),
      subtitle: inputs.subtitle,
      site: inputs.site,
      city: inputs.city,
      yourKennel: inputs.yourKennel,
      address: inputs.address
    }).fetch();


    return exits.success({
      id: newKennel.id,
      // imageSrc: url.resolve(sails.config.custom.baseUrl, `/api/v1/kennels/${newKennel.id}`)
    });
  }

};
