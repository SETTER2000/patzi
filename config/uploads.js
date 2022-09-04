/**
 * File Upload Settings
 * (sails.config.uploads)
 *
 * These options tell Sails where (and how) to store uploaded files.
 *
 *  > This file is mainly useful for configuring how file uploads in your
 *  > work during development; for example, when lifting on your laptop.
 *  > For recommended production settings, see `config/env/production.js`
 *
 * For all available options, see:
 * https://sailsjs.com/config/uploads
 */

module.exports.uploads = {

  /***************************************************************************
   *                                                                          *
   * Sails apps upload and download to the local disk filesystem by default,  *
   * using a built-in filesystem adapter called `skipper-disk`. This feature  *
   * is mainly intended for convenience during development since, in          *
   * production, many apps will opt to use a different approach for storing   *
   * uploaded files, such as Amazon S3, Azure, or GridFS.                     *
   *                                                                          *
   * Most of the time, the following options should not be changed.           *
   * (Instead, you might want to have a look at `config/env/production.js`.)  *
   * * Парусные приложения загружаются и загружаются в файловую систему локального
   * диска по умолчанию, *
   * используя встроенный адаптер файловой системы под названием `Skipper-disk`.
   * Эта особенность в основном предназначен для удобства при разработке, так как, в *
   * производство, многие приложения будут использовать другой подход для хранения *
   * загруженные файлы, такие как Amazon S3, Azure или GridFS. *
   * *
   * В большинстве случаев следующие параметры не должны быть изменены. *
   * (Вместо этого вы можете взглянуть на `config / env / production.js`.)                                                                         *
   ***************************************************************************/
  // dirpath: '.tmp/uploads',


  // My
  adapter: require('skipper-s3'),
  bucket: process.env.Bucket,
  key: process.env.key,
  region: process.env.region,
  secret: process.env.secret,
  headers:{
    'x-amz-acl':'public-read'
  },
  urlCloudFront: process.env.CLOUD_FRONT_URL,
};
