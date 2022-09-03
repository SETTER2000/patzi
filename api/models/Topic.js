module.exports = {
  attributes: {
    label: {
      type: 'string',
      description: `Название темы. Например для блога или статей.`,
      example: 'Exhibitions',
      required: true,
      minLength: 2,
      maxLength: 200
    },
    labelRu: {
      type: 'string',
      description: `Название темы на русском языке. Например для блога или статей.`,
      example: 'Выставки',
      required: true,
      minLength: 2,
      maxLength: 200
    },
    see: {
      type: 'boolean',
      defaultsTo: true,
      description: `Флаг видимости темы. Видна или нет. По умолчанию видна.`
    },
    firstTopic: {
      type: 'boolean',
      defaultsTo: false,
      description: `True - тема, которая должна выводиться первой в списке.`
    },
    images: {
      type: 'ref',
      defaultsTo: [],
      example: ['5d1f1b04fbe834262cbb8c53', '5d1f1b04fbe834262cbb8c54'],
      description: `FD загруженных фотографий родителей`
    },
    topicBackground: {
      type: 'ref',
      example: {},
      description: `Объект файла данных о загруженном файле. Фон темы.`
    },
    subtitle: {
      type: 'string',
      description: 'Дополнительная информация. Описание темы на английском языке.',
      maxLength: 700
    },
    backgroundPosition: {
      type: 'string',
      description: 'Дополнительная информация. Описание темы на английском языке.',
      maxLength: 30
    },
    subtitleRu: {
      type: 'string',
      description: 'Дополнительная информация. Описание темы на русском языке.',
      maxLength: 700
    },
    cover: {
      type: 'number',
      defaultsTo: 0,
      example: 5,
      description: `Номер ключа в массиве фотографий, который определяет главную фотографию альбома.
                    Обложка альбома.`
    },
    posts: {
      collection: 'post',
      via: 'topic',
      description: 'У темы, может быть много постов. One to Many'
    },
  },
}
