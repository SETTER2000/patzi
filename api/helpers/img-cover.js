module.exports = {


  friendlyName: 'Img cover',


  description: `Формирует масисив картинок для показа в слайдере
  причём в зависимости от индекса cover, поднимает фото обложки на первую позициию
  в массиве, чтоб просмотр начинался с этой картинки`,


  inputs: {
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

    cover: {
      type: 'number',
      description: `Ключ картинки в массиве фоторгафий привязанных к объекту коллекции. 
      Согласно которому это фото будет обложкой.`,
      required: true
    },

    id: {
      type: 'string',
      description: `Идентификатор объекта коллекции.`,
      required: true
    },

    prop: {
      type: 'string',
      description: `Свойство объекта в которм хранится url картинки.`,
      defaultsTo: 'imageSrc'
    },
  },


  fn: async function (inputs) {
    let data
      , obj;

    const f = async () => {
      console.log('dog.cover: ', obj.cover);
      // console.log('Должен быть наверху: ', obj[inputs.field][obj.cover]);
      let itemIndex = _.findIndex(obj[inputs.field], obj[inputs.field][inputs.cover]);
      console.log('itemIndex:::: ', itemIndex);
      // новый индекс, без удаления, отсоединить элемент и вернуть его
      obj[inputs.field].splice(0, 0, obj[inputs.field].splice(itemIndex, 1)[0]);
      // console.log('dog.images::: ', obj[inputs.field]);
      obj.imagesArrUrl = _.pluck(obj[inputs.field], inputs.prop); // Массив url картинок для просмотра в слайдере
      obj.cover = 0;
      return obj;
    };

    switch (inputs.collectionName) {
      case 'Litter':
        obj = await Litter.findOne(inputs.id);
        if (!obj) return false;
        data = await Litter.updateOne(inputs.id).set(await f());
        break;
      case 'Dog':
        obj = await Dog.findOne(inputs.id);
        console.log('OBJ::: ', obj);
        if (!obj) return false;
        data = await Dog.updateOne(inputs.id).set(await f());
        break;
      case 'Topic':
        obj = await Topic.findOne(inputs.id);
        console.log('OBJ::: ', obj);
        if (!obj) return false;
        data = await Topic.updateOne(inputs.id).set(await f());
        break;
    }
    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    data = await sails.helpers.cloudFrontUrl.with({
      collection: data,
      collectionName:'dog',
      edits: {
        resize: {}
      }
    });

    return data;
  }


};

