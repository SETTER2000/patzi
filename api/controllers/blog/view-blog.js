module.exports = {

  friendlyName: 'View blog',

  description: 'Display "Blog" page.',


  inputs: {
    postId: {
      description: 'Идентификатор поста',
      type: 'string',
      required: true
    }
  },

  exits: {
    success: {
      viewTemplatePath: 'pages/blog/blog'
    },
    forbidden: {
      responseType: 'forbidden'
    },
    redirect: {
      responseType: 'redirect',
      description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    },
    notFound: {
      responseType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {
    console.log('POST ID:: ', inputs.postId);

    let post = await Post.findOne(inputs.postId)
      .populate('topic');

    if (!post) {
      throw {redirect: '/blog'};
    }

    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля.
     * По умолчанию это h800
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    post = await sails.helpers.cloudFrontUrl.with({
      collection: post,
      collectionName: 'post',
      // Этот объект обязателен, хотя может быть и пустой.
      edits: {
        // grayscale: true,
        /*    resize: {
              width: resizeX,
              height: resizeY
            }*/
      }
    });
    // Respond with view.
    return exits.success({
      seo: {
        description: this.req.me.preferredLocale === 'ru' ? post.subtitleRu : post.subtitle,
        title: this.req.me.preferredLocale === 'ru' ? post.labelRu : post.label,
        canonical: `https://${this.req.headers.host}${this.req.originalUrl}`,
        header: {ru: 'Китайская Хохлатая Собака', en: 'Chinese Crested Dog'},
        // subTitle: {ru: 'Каталог собак', en: 'Post catalog'},
        preferredLocale: this.req.me.preferredLocale,
        // h2: {ru: 'ФАКТЫ, ЗАМЕТКИ, ПОБЕДЫ, НАСТРОЕНИЕ', en: 'FACTS, NOTES, VICTORIES, MOOD'},
        // h3: {ru: 'Наш Блог', en: 'Our Blog'}
      },
      currentSection: 'post',
      post
    });


  }


};
