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
    const moment = require('moment');
    const url = require('url');
    let fullName = _.startCase(inputs.fullName);
    let dog = await Dog.findOne({'fullName': fullName})
      .populate('parents')
      .populate('children')
      .populate('kennel')
      .populate('owners');
    if (!dog) {
      throw 'notFound';
    }
    // console.log('dog.:::: ', dog);

    let kennel = await Kennel.findOne({id: dog.kennel.id})
      .populate('continent')
      .populate('country')
      .populate('city');
    // console.log('KENNEL:::: ' , kennel);


    let breeder = dog.kennel.breeder ? await User.findOne({id: dog.kennel.breeder}) : '';
    dog.breeder = breeder ?
      {
        continent: kennel.continent.label,
        country: kennel.country.label,
        city: (kennel.city && kennel.city.label) ? kennel.city.label : '',
        fullName: breeder.fullName,
        avatar: breeder.defaultIcon === 'avatar' ? breeder.avatar : breeder.gravatar
      } : {};

    let countryId = _.last(_.pluck(dog.owners, 'country'));

    dog.owners = {
      fullName: _.last(_.pluck(dog.owners, 'fullName')),
      avatar: _.last(_.pluck(dog.owners, 'avatar')),
      gravatar: _.last(_.pluck(dog.owners, 'gravatar')),
      defaultIcon: _.last(_.pluck(dog.owners, 'defaultIcon')),
      country: await Country.findOne({id: countryId})
    };


    let litter = await sails.helpers.srcImagePreparation.with(
      {
        letter: dog.letter,
        year: moment(dog.dateBirth).format('YYYY'),
        preferredLocale: this.req.me.preferredLocale
      });


    // Проверяем наличие помёта
    dog.isPedigree = litter.letter;


    dog.parents = await sails.helpers.cloudFrontUrl.with({
      collection: dog.parents,
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

    // получить все титулы собаки
    let titlesDog = await sails.helpers.getDogTitles.with({id: dog.id});
    // console.log('TITLES DOGGG:: ', titlesDog);
    // console.log('dog.titleDog:::: ', dog.titleDog);
    // соединяем два объекта титула
    _.each(dog.titleDog, tit => {
      tit.title = titlesDog.filter(td => tit.id === td.id)[0];
    });
    // console.log('Собачий собраный титул:: ', dog.titleDog);
    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля.
     * По умолчанию это h800
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    dog.parents = await sails.helpers.cloudFrontUrlMin.with({
      collection: dog.parents,
      collectionName: 'dog',
      field: 'images',
      createField: 'imgI7',
      // Этот объект обязателен, хотя может быть и пустой.
      edits: {
        'resize': {
          'width': 460,
          // "height": 160,
          'fit': 'inside',
          'background': {
            'r': 255,
            'g': 255,
            'b': 255,
            'alpha': 1
          }
        },
        'flatten': {
          'background': {
            'r': 255,
            'g': 255,
            'b': 255,
            'alpha': null
          }
        }
      }
    });
    // console.log('dog.titleDog::: yyy', dog.titleDog);

    // Подготовка объекта фотоссессии
    dog.titleDog = (!_.isEmpty(dog.titleDog)) ? await dog.titleDog.map((photoSet, i) => {
      photoSet.comments = _.isArray(photoSet.comments) ? photoSet.comments : [];
      photoSet.photos.map((image, y) => {
        image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/download/dog/${dog.id}/titleDog/${y}/${i}`) : '';
      });
      return photoSet;
    })
      :
      '';

    /**
     * Генерируем фото скринов для титулов собаки
     */
    dog.titleDog = await sails.helpers.cloudFrontUrlMin.with({
      collection: dog.titleDog,
      collectionName: 'dog',
      // createField: 'imgTit',
      // Этот объект обязателен, хотя может быть и пустой.
      edits: {
        // grayscale: true,
        /*    resize: {
              width: resizeX,
              height: resizeY
            }*/
      }
    });

    dog.titleDog =_.sortBy(dog.titleDog, 'dateReceiving');

    // console.log(' dog.titleDog***********************:::::; ',  dog.titleDog);

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
        'resize': {
          'width': 414,
          // "height": 160,
          'fit': 'inside',
          'background': {
            'r': 255,
            'g': 255,
            'b': 255,
            'alpha': 1
          }
        },
        'flatten': {
          'background': {
            'r': 255,
            'g': 255,
            'b': 255,
            'alpha': null
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
        'resize': {
          'width': 310,
          // "height": 160,
          'fit': 'inside',
          'background': {
            'r': 255,
            'g': 255,
            'b': 255,
            'alpha': 1
          }
        },
        'flatten': {
          'background': {
            'r': 255,
            'g': 255,
            'b': 255,
            'alpha': null
          }
        }
      }
    });
    // Обработка фото титулов собаки
    // dog = await sails.helpers.cloudFrontUrlMin.with({
    //   collection: dog,
    //   collectionName: 'dog',
    //   field: 'fieldList',
    //   // Этот объект обязателен, хотя может быть и пустой.
    //   edits: {}
    // });




    await dog.parents.map(async (dog) => {
      dog.kennelName = dog.kennel.label;
      // dog.fullName = dog.kennel.right ? `${dog.label} ${dog.kennel.label}` : `${dog.kennel.label} ${dog.label}`;
      dog.detail = dog.fullName ? `/chinese-crested/${dog.fullName.split(' ').join('-')}` : '';
      dog.imagesArrUrl = _.pluck(dog.images, 'imageSrc'); // Массив url картинок для просмотра в слайдере
      // dog.cover = dog.imagesArrUrl[0]; // Обложка альбома
      return dog;
    });

    dog.imagesArrUrl = _.pluck(dog.images, 'imageSrc');
    // console.log('DOGG::: ', dog);


    // Respond with view.
    return exits.success({
      seo: {
        description: `${dog.fullName} - ${dog.subtitle}`,
        title: `${dog.fullName} ${dog.gender} ${moment(dog.dateBirth).format('LL')}`,
        canonical: `https://${this.req.headers.host}${this.req.originalUrl}`
      },
      currentSection: 'dog',
      dog
    });
  }
};
