module.exports = {


  friendlyName: 'View title',


  description: 'Display "Title" page.',


  inputs: {
    id: {
      description: 'Полное имя емы на английском',
      type: 'string',
      required: true
    }

  },

  exits: {

    success: {
      viewTemplatePath: 'pages/titles/title'
    },
    forbidden: {
      responseType: 'forbidden'
    },
    notFound: {
      responseType: 'Not found object'
    }

  },


  fn: async function (inputs, exits) {
    let data = await Title.findOne({'id': inputs.id});
    if (!data) {
      throw 'notFound';
    }
    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    data = await sails.helpers.cloudFrontUrl.with({
      collection: data,
      collectionName: 'title',
      field:'titleBackground',
      edits: {
        resize: {}
      }
    });

    data = await sails.helpers.cloudFrontUrlMin.with({
      collection: data,
      collectionName: 'title',
      // Этот объект обязателен, хотя может быть и пустой.
      edits: {
        // grayscale: true,
        /*    resize: {
              width: resizeX,
              height: resizeY
            }*/
      }
    });



    data.imagesArrUrl = _.pluck(data.imagesMin, 'imageSrc');

    console.log('title::::', data);
    // Respond with view.
    return exits.success({
      seo: {
        description: `${data.labelRu}`,
        title: `${data.labelRu}`,
        canonical: `https://${this.req.headers.host}${this.req.originalUrl}`,
        header: {ru: 'Титул', en: 'Title'},
        subTitle: {
          ru: 'Титул статьи, блога и т.д. где можно использовать данную тему.',
          en: 'The title of an article, blog, or other similar module associated with text in which you can use this title.'
        },
        preferredLocale: this.req.me.preferredLocale,
        // Первый H3 на странице
        h3: {ru: data.labelRu, en: data.label},
        // Текст параграфа под заголовко H3 в начале страницы
        textUnderHeading: {
          ru: data.subtitleRu,
          en: data.subtitle
        },
        titleBackground: data.titleBackground,
        // titleBackground:title.titleBackground ? title.titleBackground : [],
      },
      currentSection: 'title',
      data
    });

  }


};
