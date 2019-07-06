module.exports = {


  friendlyName: 'Photo',


  description: 'Photo upload.',


  files: ['file'], // именуем поле, через которое будет передоваться файл при загрузки


  inputs: {
    file: {
      type: 'ref',
      description: 'Uploaded file stream.',
      required: true
    },
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
    const req = this.req;

    // await sails.sockets.join(req, 'litter');

    /**
     * Функция uploadOne возвращает объект UploadedFileMetadata
     * с данными о загрузке.
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

    // console.log("inputs.file::", inputs.file);
    let info = await sails.upload(inputs.file);


    if (!info) {
      throw 'badRequest';
    }


    info = info[0];


    // console.log('FILES/UPLOAD.JS файл картинки загружен в .tmp: ', info);
    // await sails.sockets.broadcast('files', 'list-file', info);
    // All done.
    return exits.success(info);

  }
};
