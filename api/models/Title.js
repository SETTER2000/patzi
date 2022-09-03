module.exports = {
  attributes: {
    label: {
      type: 'string',
      description: `Название титула. Например для блога или статей.`,
      example: 'Exhibitions',
      required: true,
      minLength: 2,
      maxLength: 200
    },
    labelRu: {
      type: 'string',
      description: `Название титула на русском языке. Например для блога или статей.`,
      example: 'ЮЧРОС',
      minLength: 2,
      maxLength: 200
    },
    flag: {
      type: 'string',
      description: `ССылка на флаг страны. Из Википедии можно взять. SVG`
    },
    see: {
      type: 'boolean',
      defaultsTo: true,
      description: `Флаг видимости титула. Видна или нет. По умолчанию видна.`
    },
    images: {
      type: 'ref',
      defaultsTo: [],
      example: ['5d1f1b04fbe834262cbb8c53', '5d1f1b04fbe834262cbb8c54'],
      description: `FD загруженных фотографий родителей`
    },
    titleBackground: {
      type: 'ref',
      example: {},
      description: `Объект файла данных о загруженном файле. Фон титула.`
    },
    subtitle: {
      type: 'string',
      description: 'Дополнительная информация. Описание титула на английском языке.',
      maxLength: 700
    },
    subtitleRu: {
      type: 'string',
      description: 'Дополнительная информация. Описание титула на русском языке.',
      maxLength: 700
    },
    cover: {
      type: 'number',
      defaultsTo: 0,
      example: 5,
      description: `Номер ключа в массиве фотографий, который определяет главную фотографию альбома.
                    Обложка альбома.`
    },
  },
};
