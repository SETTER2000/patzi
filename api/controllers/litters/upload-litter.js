module.exports = {

  friendlyName: 'Upload litter',


  description: 'Помёты питомника. Добавляет новые помёты в DB',

  files: ['photo'], // именуем поле, через которое будет передоваться файл при загрузки
  inputs: {
    photo: {
      type: 'ref',
      description: 'Фото помёта. Загружаемый поток.',
      required: true
    },
    label: {
      type: 'string',
      required: true,
      description: 'Буква помёта.',
      example: 'A'
    },
    title: {
      type: 'string',
      example: 'A2',
      description: 'Предварительное имя щенка после рождения.'
    },
    dam: {
      type: 'string',
      example: 'Sasquehanna (FCI) Ella',
      description: 'Сука.'
    },
    sire: {
      type: 'string',
      example: 'Poale Ell Adam',
      description: 'Кобель.'
    },
    subtitle: {
      type: 'string',
      example: 'Прекрасный, здоровый щенок.',
      description: 'Описание щенка. Какая то интересная информация.'
    },
    born: {
      type: 'number',
      example: 1502844074211,
      description: 'Дата появления на свет помёта.',
      required: true
    },
    gender: {
      type: 'string',
      description: 'Половая пренадлежность щенка.',
      example: 'dam, sire'
      // required:true
    },
    type: {
      type: 'string',
      description: 'Тип собаки',
      example: 'hairless, powderpuff'
      // required:true
    },
    ourPreliminaryPrice: {
      type: 'number',
      description: 'Наша предварительная цена на щенка.'
    },
    preliminaryPrice: {
      type: 'number',
      description: 'Покупатель предложил цену за щенка.'
    },
    currency: {
      type: 'string',
      description: 'Валюта продажи.'
    }
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

    let newLitter = await Litter.create({
      imageUploadFD: info.fd,
      imageUploadMime: info.type,
      filename: info.filename,
      owner: this.req.me.id,
      label: inputs.label,
      title: inputs.title,
      dam: inputs.dam,
      sire: inputs.sire,
      subtitle: inputs.subtitle,
      born: inputs.born,
      gender: inputs.gender,
      type: inputs.type,
      preliminaryPrice: inputs.preliminaryPrice,
      ourPreliminaryPrice: inputs.ourPreliminaryPrice,
      currency: inputs.currency
    }).fetch();

    return exits.success({
      id: newLitter.id,
      detail: url.resolve(sails.config.custom.baseUrl, `/litters/litter/${newLitter.id}`),
      imageSrc: url.resolve(sails.config.custom.baseUrl, `/api/v1/litters/${newLitter.id}`)
    });
  }
};
