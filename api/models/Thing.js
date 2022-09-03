module.exports = {
  attributes: {
    label: {
      type: 'string',
      example: 'Mr. Waffle Maker',
      description: 'A user-submitted label describing this thing.'
    },
    title: {
      type: 'string',
      example: 'The girl is wonderful!',
      description: 'Custom label with a brief additional description of this item.'
    },
    subtitle: {
      type: 'string',
      example: 'Beautiful, noble dog, your eternal companion on a journey through the world. Life and light in such a small creature.',
      description: 'Custom label with full description of this product.'
    },
    filename: {
      type: 'string',
      example: 'my-file.jpg',
      description: 'Название файла, который загружается.'
    },
    imageUploadFD: {
      type: 'string',
      description: 'Дескриптор файла Skipper однозначно идентифицирует загруженное изображение, связанное с этой «вещью».',
      required: true
    },
    imageUploadMime: {
      type: 'string',
      description: 'Тип MIME для загруженного изображения.',
      required: true
    },
    expectedReturnAt: {
      type: 'number',
      description: 'Метка времени JS (эпоха мс), представляющая момент ожидаемого возврата этого элемента (или 0, если он в данный момент не выдан).',
      example: 1502844074211
    },
    owner: {model: 'User', required: true, description: 'Пользователь, который загрузил этот элемент.'},
    borrowedBy: {model: 'User', description: 'Пользователь, который попросил одолжить этот товар.'},
  },
};
