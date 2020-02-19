module.exports = {


  friendlyName: 'Get dog titles',


  description: 'Получить все титулы собаки по её идентификатору',


  inputs: {
    id: {
      type: 'string',
      required: true
    }
  },


  fn: async function (inputs) {

    let dog = await Dog.findOne(inputs.id);
    let tileIds = _.pluck(dog.titleDog, 'id');

    let titles = await Title.find({id: tileIds})
      .sort([
        {createdAt: 'DESC'}
      ]);

    /**
     * Генерирует ссылки с параметрами изображения,
     * которое должен вернуть S3 для данного модуля
     * https://sharp.pixelplumbing.com/en/stable/api-resize/
     */
    titles = await sails.helpers.cloudFrontUrl.with({
      collection: titles,
      collectionName: 'title',
      edits: {
        resize: {}
      }
    });

    console.log('DOG::; ', tileIds);
    console.log('titles::; ', titles);

    // Respond with view.
    return titles;

  }


};
