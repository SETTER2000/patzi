module.exports = {
  friendlyName: 'Destroy one dog',
  description: `Удалить одну собаку. При удалении собаки все объекты связанные с ней,
  кроме родительского т.е Kennel, не должны быть затронуты ошибкой рассинхронизации данных. Так как
  они имеют тип документов и содержат данные о собаки, а не ссылки на данный объект.`,
  inputs: {
    id: {
      type: 'string',
      required: true
    }
  },
  exits: {
    notFound: {
      description: 'Не существует такого объекта с таким ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    }
  },

  fn: async function (inputs, exits) {
    const req = this.req;
    let dog = await Dog.findOne({
      id: inputs.id
    });
    if (!dog) {
      throw 'notFound';
    }
    await Dog.destroy({id: inputs.id});
    let removeImage = (_.isArray(dog.images) && dog.images.length > 0 ) ? dog.images : [];
    await sails.helpers.removeImgS3(removeImage);
    return exits.success();
  }
};
