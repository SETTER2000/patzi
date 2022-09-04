module.exports = {
  friendlyName: 'Remove img s 3',
  description: '',
  inputs: {
    removeImage: {
      type: 'ref',
      description: `Коллекция картинок, которые следует удалить из S3`,
      example: `
      [ { fd: '38155c8d-cd57-4877-964b-a2de849258f7.jpg',
          size: 34964,
          type: 'image/jpeg',
          name: '2_2.jpg',
          id: '38155c8d-cd57-4877-964b-a2de849258f7',
          description: '',
          dateTaken: '' } ]
      `
    },
    bucket: {
      type: 'string',
      description: `Наименование корзины в сервисе S3 из которой удалить картинки.`
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },


  fn: async function (inputs) {
    if (sails.config.environment === 'production' && inputs.removeImage) {
      // const skipper = require('skipper-s3')(
      const skp = require('@setter/skp')(
        {
          key: sails.config.uploads.AWS_KEY,
          bucket: sails.config.uploads.bucket || process.env.S3_BUCKET || inputs.bucket,
          region: sails.config.uploads.region,
          secret: sails.config.uploads.secret
        }
      );
      _.each(inputs.removeImage, img => {
        skp.rm(img.fd, (err, res) => {
          if (err) console.log(`Ошибка при удаление файла ${img.fd}::`, err);
          // console.log('Response::: ', res);
        });
      });
    }
  }
};

