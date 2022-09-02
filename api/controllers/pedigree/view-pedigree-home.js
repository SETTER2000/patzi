module.exports = {


  friendlyName: 'View pedigree home',


  description: 'Display "Pedigree home" page.',

  inputs: {

    id: {
      type: 'string',
      description: `Идентификатор собаки. Если требуется страница собаки.`
    },
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/pedigree/pedigree-home'
    },
    forbidden: {
      responseType: 'forbidden'
    },
    notFound: {
      responseType: 'notFound'
    }

  },


  fn: async function (inputs, exits) {

    let dogs = await Dog.pedigree(inputs.id);

    // if (!dogs) {
    //   throw 'notFound';
    // }

    return exits.success({
      seo: {
        description: `Китайская Хохлатая Собака. Поиск родословной для собаки.`,
        title: `Родословная`,
        canonical: `https://${this.req.headers.host}${this.req.originalUrl}`,
        header: {ru: 'Китайская Хохлатая Собака', en: 'Chinese Crested Dog'},
        subTitle: {ru: 'Каталог собак', en: 'Dog catalog'},
        preferredLocale: this.req.me.preferredLocale,
        // Первый H3 на странице
        h3: {ru: 'Каталог собак мира', en: 'World Dog Directory'},
        // Текст параграфа под заголовко H3 в начале страницы
        textUnderHeading: {
          ru: 'На странице представлены собаки породы Китайская Хохлатая Собака. Это база собак данной породы не может претендовать на полноту информации, как и любая другая база данных в мире. Вопрос лишь того, кто ей пользуется. По мере роста и совершенствования механизма обновления и сбора данных по известным собакам, данная база будет собирать, поддерживать и обновлять актуальную информацию, появляющуюся в открытом доступе на других сайтах в автоматическом режиме, генерируя полный список собак мира в породе Китайская Хохлатая Собака.',
          en: 'The page contains dogs of the breed Chinese Crested Dog. This database of dogs of this breed cannot claim to be complete information, like any other database in the world. The only question is who uses it. As the mechanism for updating and collecting data on known dogs grows and improves, this database will collect, maintain and update relevant information that appears in the public domain on other sites in automatic mode. Generating a complete list of the world\'s dogs in the breed Chinese Crested Dog.'
        },
      },
      currentSection: 'dog',
      dogs
    });

  }


};
