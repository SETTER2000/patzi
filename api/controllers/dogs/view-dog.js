module.exports = {


  friendlyName: 'View dog',


  description: 'Display "Dog" page.',

  inputs: {
    fullName: {
      description: 'Полное имя собаки',
      type: 'string',
      required: true
    }

  },

  exits: {
    success: {
      viewTemplatePath: 'pages/dogs/dog'
    },
    forbidden: {
      responseType: 'forbidden'
    },
    notFound: {
      responseType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    const url = require('url');

    let fullName = _.startCase(inputs.fullName);
    console.log('dogName::: ', fullName);
    let dog = await Dog.findOne({'fullName': fullName})
      .populate('parents')
      .populate('children')
      .populate('kennel')
    ;
    if (!dog) {
      throw 'notFound';
    }


    let breeder = dog.kennel.yourKennel ? await User.findOne({id: dog.kennel.yourKennel}) : '';
    dog.breeder = breeder.fullName;
    // console.log('breeder::: ', breeder);
    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля.
     * По умолчанию это h800
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    dog = await sails.helpers.cloudFrontUrl.with({
      collection: dog,
      collectionName: 'dog',
      // Этот объект обязателен, хотя может быть и пустой.
      edits: {
        // grayscale: true,
        /*    resize: {
              width: resizeX,
              height: resizeY
            }*/
      }
    });


    /**
     * Создаём поле imagesMin.
     * Поле imagesMin создаётся по умолчанию , если не указано другое название в параметре createField.
     * Новое свойство imagesMin будет содержать картинки из поля установленного в параметре field,
     * но уже с изменениями предложенными в свойстве edits.
     * Генерирует ссылки с параметрами изображения.
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    dog = await sails.helpers.cloudFrontUrlMin.with({
      collection: dog,
      collectionName: 'dog',
      field: 'images',
      createField: 'imgI7',
      // Этот объект обязателен, хотя может быть и пустой.
      edits: {
        "resize": {
          "width": 414,
          // "height": 160,
          "fit": "inside",
          "background": {
            "r": 255,
            "g": 255,
            "b": 255,
            "alpha": 1
          }
        },
        "flatten": {
          "background": {
            "r": 255,
            "g": 255,
            "b": 255,
            "alpha": null
          }
        }
      }
    });

    dog = await sails.helpers.cloudFrontUrlMin.with({
      collection: dog,
      collectionName: 'dog',
      field: 'images',
      // Этот объект обязателен, хотя может быть и пустой.
      edits: {
        "resize": {
          "width": 310,
          // "height": 160,
          "fit": "inside",
          "background": {
            "r": 255,
            "g": 255,
            "b": 255,
            "alpha": 1
          }
        },
        "flatten": {
          "background": {
            "r": 255,
            "g": 255,
            "b": 255,
            "alpha": null
          }
        }
      }
    });


    // console.log('DOGG::: ', dog);
    // Рассылаем данные всем подписанным на событие list-* данной комнаты.

    // Respond with view.
    return exits.success({
      currentSection: 'dog',
      dog
    });

  }

};
