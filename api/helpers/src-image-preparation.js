module.exports = {


  friendlyName: 'Src image preparation',


  description: '',


  inputs: {
    year: {
      description: 'Год помёта.',
      type: 'string',
      maxLength: 4,
      required: true
    },

    letter: {
      type: 'string',
      description: 'Передаётся буква помёта',
      example: 'A',
      required: true
    },
    preferredLocale: {
      type: 'string',
      description: 'Какой язык выбран у пользователя',
      example: 'ru',
      required: true
    },
  },


  exits: {


    success: {
      outputFriendlyName: 'Email delivery report',
      outputDescription: 'A dictionary of information about what went down.',
      outputType: {
        loggedInsteadOfSending: 'boolean'
      }
    },
    // forbidden: {
    //   responseType: 'forbidden'
    // },
    // notFound: {
    //   responseType: 'notFound'
    // }

  },


  fn: async function (inputs) {
    // Бибилиотека Node.js
    const url = require('url');
    const moment = require('moment');
    // Формат отображаемой даты
    let format = 'LL';
    // Устанавливаем соответствующую локаль для даты, установленую пользователем.
    moment.locale(inputs.preferredLocale);

    // Получаем объект конкретного помёта
    let litter = await Litter.findOne({letter: inputs.letter, year: inputs.year}).populate('owner');

    if (!litter) {
      let err = `Ошибка! Объект litter не создан. Помёт "${inputs.letter}" в базе данных не найден.`;
      return {error: err, letter: false};
    }


  /**
   * Генерирует ссылки с параметрами изображения,
   * которое должен вернуть S3 для данного модуля
   * Картинки в свойстве images примут размеры по умолчанию как в хелпере, т.е. h800
   * Свойство images, будет содержать ссылки на картинки для слайдера родителей.
   * https://sharp.pixelplumbing.com/en/stable/api-resize/
   */
  litter = await sails.helpers.cloudFrontUrl.with({
  collection: litter,
  collectionName: 'litter',
  // Этот объект обязателен, хотя может быть и пустой.
  edits: {
    // grayscale: true,
    /*    resize: {
          width: resizeX,
          height: resizeY
        }*/
  }
});


/*  litter.images = (!_.isEmpty(litter.images)) ? await litter.images.map((image, i) => {
    // image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/download/litter/${litter.id}/images/${i}`) : '';
    delete image.fd;
    return image;
  }) : '';*/

litter = await
sails.helpers.cloudFrontUrlMin.with({
  collection: litter,
  collectionName: 'litter',
  field: 'images',
  // Этот объект обязателен, хотя может быть и пустой.
  edits: {
    "resize": {
      "width": 590,
      "fit": "inside",
    },
    /*  "flatten": {
        "background": {
          "r": 255,
          "g": 255,
          "b": 255,
          "alpha": null
        }
      }*/
  }
});

// Подготовка объекта фотоссессии
litter.puppies = (!_.isEmpty(litter.puppies)) ? await litter.puppies.map((photoSet, i) => {
  photoSet.comments = _.isArray(photoSet.comments) ? photoSet.comments : [];
  photoSet.photos.map((image, y) => {
    image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/download/litter/${litter.id}/puppies/${y}/${i}`) : '';
  });
  return photoSet;
})
:
'';


/**
 * Создаём новое свойство imagesMin в объекте Litter.
 * Поле imagesMin создаётся по умолчанию , если не указано другое название в параметре createField.
 * Новое свойство imagesMin будет содержать картинки из поля установленного в параметре field,
 * но уже с изменениями предложенными в свойстве edits.
 * Это нужно для разного представления картинок в разных местах дизайна страниц,
 * тем самым используя одну оригинальную картинку в S3, страница имея сгенерированный url,
 * запрашивает уже нужную по размеру дизайна картинку для представления.
 * Генерирует ссылки с параметрами изображения.
 * https://sharp.pixelplumbing.com/en/stable/api-resize/
 */
_.each(litter.puppies, async (photosession, i) => {
  //Фото для картинок превью одной фотосессии для desktop
  photosession = await sails.helpers.cloudFrontUrlMin.with({
    collection: photosession,
    collectionName: 'litter',
    field: 'photos',
    photoSet: i,
    collectionId: litter.id,
    subfolder: 'puppies',
    // Этот объект обязателен, хотя может быть и пустой.
    edits:
      {
        resize: {
          fit: 'inside',
          // width: 148,
          height: 118
        }
      }
  });
});

// указываем новое свойство imagesSlider, которое будет содержать ссылки
// на картинки для слайдера щенков
_.each(litter.puppies, async (photosession, i) => {
  // Изменяет фото для просмотра в слайдере (imagesSlider)
  await sails.helpers.cloudFrontUrlMin.with({
    collection: photosession,
    collectionName: 'litter',
    field: 'photos',
    createField: 'imagesSlider',
    photoSet: i,
    collectionId: litter.id,
    subfolder: 'puppies',
    // Этот объект обязателен, хотя может быть и пустой.
    edits:
      {
        resize: {
          // fit: 'inside',
          //width: 520
          height: 800
        }
      }
  });
});
_.each(litter.puppies, async (photosession, i) => {
  // Изменяет фото для просмотра в мобильных устройствах (imagesMobile)
  await sails.helpers.cloudFrontUrlMin.with({
    collection: photosession,
    collectionName: 'litter',
    field: 'photos',
    createField: 'imagesMobile',
    photoSet: i,
    collectionId: litter.id,
    subfolder: 'puppies',
    // Этот объект обязателен, хотя может быть и пустой.
    edits:
      {
        resize: {
          // fit: 'inside',
          width: 520
          // height:800
        }
      }
  });
});


litter.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/litters/${litter.id}`);
litter.bornNt = moment.parseZone(litter.born).format(format);
return litter;


}
}
;

