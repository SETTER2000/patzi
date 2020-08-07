module.exports = {


  friendlyName: 'View kennel',


  description: 'Display "Kennel" page.',

  inputs: {
    label: {
      description: 'Полное имя питомника',
      type: 'string',
      required: true
    }

  },

  exits: {
    success: {
      viewTemplatePath: 'pages/kennels/kennel'
    },
    forbidden: {
      responseType: 'forbidden'
    },
    temporarilyNotAvailable: {
      statusCode: 410,
      description: 'Content is temporarily unavailable.'
    },
    notFound: {
      responseType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    const url = require('url');

    let label = _.startCase(inputs.label);
    let kennel = await Kennel.findOne({'label': label})
      .populate('dogs')
      .populate('owners')
      .populate('breeder')
      .populate('whoCreate')
      .populate('continent')
      .populate('country')
      .populate('region')
      .populate('city')
    ;
    if (!kennel) {
      throw 'notFound';
    }
    if (!kennel.action) {
      throw 'temporarilyNotAvailable';
    }

    // Создаём ссылку на логотип
    kennel.imageSrc = kennel.imageUploadFD ? url.resolve(sails.config.custom.baseUrl, `/api/v1/kennels/${kennel.id}`) : '';
    delete kennel.imageUploadFD;

    let colDogsJpg = kennel.dogs;

    kennel.dogs = await sails.helpers.cloudFrontUrlMin.with({
      collection: colDogsJpg,
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

    let dogsId = _.pluck(kennel.dogs, 'id');
    // console.log('dogsId::: ', dogsId);
    // Получаем всех собак питомника и их родителей
    let dogs = await Dog.find({id:dogsId}).populate('parents');

    if(dogs){
      dogs= await sails.helpers.cloudFrontUrlMin.with({
        collection: dogs,
        collectionName: 'dog',
        field: 'images',
        createField:'imgI7',
        subfolder:'parents',
        collectionToCollection:true,
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
    }

    // console.log('PARENT:: ', dogs);

    await kennel.dogs.map(dog => {
      dog.kennelName = kennel.label;
      dog.parents = dogs ? _.find(dogs,{id:dog.id}).parents : 'No children';
      dog.fullName = kennel.rightName ? `${dog.kennelName} ${dog.label}` : `${dog.label} ${dog.kennelName}`;
      dog.detail = dog.fullName ? `/chinese-crested/${dog.fullName.split(" ").join('-')}` : '';
      dog.imagesArrUrl = _.pluck(dog.images, 'imageSrc'); // Массив url картинок для просмотра в слайдере
      // dog.cover = dog.imagesArrUrl[0]; // Обложка альбома
      return dog;
    });


    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля.
     * По умолчанию это h800
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    kennel = await sails.helpers.cloudFrontUrl.with({
      collection: kennel,
      collectionName: 'kennel',
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
    kennel = await sails.helpers.cloudFrontUrlMin.with({
      collection: kennel,
      collectionName: 'kennel',
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

    kennel = await sails.helpers.cloudFrontUrlMin.with({
      collection: kennel,
      collectionName: 'kennel',
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


    // console.log('DOGG::: ', kennel);
    // Рассылаем данные всем подписанным на событие list-* данной комнаты.

    // Respond with view.
    return exits.success({
      seo: {
        description: `${kennel.label} - ${kennel.subtitle}`,
        title: `${kennel.label} Kennel`,
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`
      },
      currentSection: 'kennel',
      kennel
    });

  }

};
