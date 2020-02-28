module.exports = {


  friendlyName: 'Merger titles and dog titles',


  description: `Слияние объектов титулов и объектов титулов собак.`,


  inputs: {
    dog: {
      type: 'ref',
      description: 'Объект dog'
    },
    titlesDog: {
      type: 'ref',
      description: 'все титулы, которые имеет собаки'
    }
  },


  fn: async function (inputs) {
    if (inputs.dog.titleDog && inputs.titlesDog) {
      let url = require('url');
      let dog = inputs.dog;
      console.log('dog.titleDog.photos-1', dog.titleDog.photos);
      dog.titleDog = _.compact(dog.titleDog);
      console.log('dog.titleDog.photos-2', dog.titleDog.photos);
      /**
       * добавляем объекты титулов в свойства объектов титулов собак
       * т.е. есть сам объект титула и есть свойство dog.titlesDog, которое содержит
       * титулы полученые собакой с дополнительными свойствами, например дата получения титула.
       */
      dog.titleDog = (!_.isEmpty(dog.titleDog)) ?
        _.each(dog.titleDog, tit => {
          tit.title = inputs.titlesDog.filter(td => tit.id === td.id)[0];
        }) : [];



      /**
       * Подготовка массива объектов содержащих ссылки на картинки,
       * которые являются вложенными и лежат на втором уровне главного объекта (photos)
       * {
       *  images:[{fd:...},{fd:...}],
       *  titlesDog:[{
       *    id:..,
       *    photos:[{fd:...},{fd:...}]
       *  }]
       * }
       *
       */
      dog.titleDog = _.isEmpty(dog.titleDog) ? [] : await dog.titleDog.map((photoSet, i) => {
        photoSet.comments = _.isArray(photoSet.comments) ? photoSet.comments : [];
        photoSet.photos.map((image, y) => {
          image.imageSrc = image.fd ? url.resolve(sails.config.custom.baseUrl, `/download/dog/${dog.id}/titleDog/${y}/${i}`) : '';
        });
        console.log('photoSet Merge:: ' , photoSet);
        return photoSet;
      });

      /**
       * Генерируем фото скринов для титулов собаки
       */
      if (dog.titleDog) {
        dog.titleDog = await sails.helpers.cloudFrontUrlMin.with({
          collection: dog.titleDog,
          collectionName: 'dog',
          // Этот объект обязателен, хотя может быть и пустой.
          edits: {
            // grayscale: true,
            /*    resize: {
                  width: resizeX,
                  height: resizeY
                }*/
          }
        });
        // сортируем титулы по дате получения
        dog.titleDog = _.sortBy(dog.titleDog, 'dateReceiving');
        dog.countTitles = _.countBy(_.pluck(dog.titleDog, 'title.label'), n => String(n));
        dog.countTitlesSubtitle = _.uniq(_.pluck(dog.titleDog, 'title.subtitle'));
        dog.countTitlesSubtitleRu = _.uniq(_.pluck(dog.titleDog, 'title.subtitleRu'));
      }

      // console.log(' dog.titleDog=-PLuck::: ', dog);

      return dog;
    }

    return;
  }


};

