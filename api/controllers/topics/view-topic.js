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
    let topic = await Topic.findOne({'id': inputs.id});
    if (!topic) {
      throw 'notFound';
    }
    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    topic = await sails.helpers.cloudFrontUrl.with({
      collection: topic,
      collectionName: 'topic',
      field:'topicBackground',
      edits: {
        resize: {}
      }
    });

    topic = await sails.helpers.cloudFrontUrlMin.with({
      collection: topic,
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



    topic.imagesArrUrl = _.pluck(topic.imagesMin, 'imageSrc');

    console.log('topic::::', topic);
    // Respond with view.
    return exits.success({
      seo: {
        description: `${topic.labelRu}`,
        title: `${topic.labelRu}`,
        canonical: `https://${this.req.headers.host}${this.req.originalUrl}`,
        header: {ru: 'Тема', en: 'Topic'},
        subTitle: {
          ru: 'Тема статьи, блога и т.д. где можно использовать данную тему.',
          en: 'The topic of an article, blog, or other similar module associated with text in which you can use this topic.'
        },
        preferredLocale: this.req.me.preferredLocale,
        // Первый H3 на странице
        h3: {ru: topic.labelRu, en: topic.label},
        // Текст параграфа под заголовко H3 в начале страницы
        textUnderHeading: {
          ru: topic.subtitleRu,
          en: topic.subtitle
        },
        topicBackground: topic.topicBackground,
        // topicBackground:topic.topicBackground ? topic.topicBackground : [],
      },
      currentSection: 'topic',
      topic
    });

  }


};
