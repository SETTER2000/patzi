module.exports = {


  friendlyName: 'Img arr slider',


  description: `Формирует масисив картинок для показа в слайдере
      причём в зависимости от индекса cover, поднимает фото обложки на первую позициию
      в массиве, чтоб просмотр начинался с этой картинки`,


  inputs: {
    collectionObj: {
      type: 'ref',
      description: `Объект коллекции. Например объект собака или помёт и т.д.`,
      required: true
    },
    collectionName: {
      type: 'string',
      description: `Имя коллекции.`,
      required: true
    },

    field: {
      type: 'string',
      description: `Поле где находится массив объектов фотографий.`,
      required: true
    },
    prop: {
      type: 'string',
      description: `Свойство объекта в которм хранится url картинки.`,
      defaultsTo:'imageSrc'
    }
  },




  fn: async function (inputs) {
    // let newObject;
    // найти целевой индекс (используя lodash)
    console.log('dog.cover: ', inputs.collectionObj.cover);
    // console.log('Должен быть наверху: ', inputs.collectionObj[inputs.field][inputs.collectionObj.cover]);
   let itemIndex = _.findIndex(inputs.collectionObj[inputs.field], inputs.collectionObj[inputs.field][inputs.collectionObj.cover]);
    console.log('itemIndex:::: ', itemIndex);
    // новый индекс, без удаления, отсоединить элемент и вернуть его
    inputs.collectionObj[inputs.field].splice(0, 0, inputs.collectionObj[inputs.field].splice(itemIndex, 1)[0]);
    // console.log('dog.images::: ', inputs.collectionObj[inputs.field]);
    inputs.collectionObj.imagesArrUrl = _.pluck(inputs.collectionObj[inputs.field], inputs.prop); // Массив url картинок для просмотра в слайдере
    inputs.collectionObj.cover = 0;

    // let updateObject =  await sails.helpers.imgCover.with({
    //   id: inputs.collectionObj.id,
    //   cover: inputs.collectionObj.cover,
    //   collectionName: inputs.collectionName
    // });
    return inputs.collectionObj;


  }


};

