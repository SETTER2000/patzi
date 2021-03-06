module.exports = {


  friendlyName: 'View topic',


  description: 'Display "Topic" page.',

  inputs: {
    id: {
      description: 'Полное имя емы на английском',
      type: 'string',
      required: true
    }

  },

  exits: {

    success: {
      viewTemplatePath: 'pages/topics/topic'
    },
    forbidden: {
      responseType: 'forbidden'
    },
    notFound: {
      responseType: 'Not found object'
    }

  },


  fn: async function (inputs, exits) {
    let data = await Topic.findOne({'id': inputs.id});
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
      collectionName: 'topic',
      field:'topicBackground',
      edits: {
        resize: {}
      }
    });

    data = await sails.helpers.cloudFrontUrlMin.with({
      collection: data,
      collectionName: 'topic',
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

    console.log('topic::::', data);
    // Respond with view.
    return exits.success({
      seo: {
        description: `${data.labelRu}`,
        title: `${data.labelRu}`,
        canonical: `https://${this.req.headers.host}${this.req.originalUrl}`,
        header: {ru: 'Тема', en: 'Topic'},
        subTitle: {
          ru: 'Тема статьи, блога и т.д. где можно использовать данную тему.',
          en: 'The topic of an article, blog, or other similar module associated with text in which you can use this topic.'
        },
        preferredLocale: this.req.me.preferredLocale,
        // Первый H3 на странице
        h3: {ru: data.labelRu, en: data.label},
        // Текст параграфа под заголовко H3 в начале страницы
        textUnderHeading: {
          ru: data.subtitleRu,
          en: data.subtitle
        },
        topicBackground: data.topicBackground,
        // topicBackground:topic.topicBackground ? topic.topicBackground : [],
      },
      currentSection: 'topic',
      data
    });

  }


};
