/**
 * Default model settings
 * (sails.config.models)
 *
 * Your default, project-wide model settings. Can also be overridden on a
 * per-model basis by setting a top-level properties in the model definition.
 *
 * For details about all available model settings, see:
 * https://sailsjs.com/config/models
 *
 * For more general background on Sails model settings, and how to configure
 * them on a project-wide or per-model basis, see:
 *
 * Настройки модели по умолчанию
 * (sails.config.models)
 *
 * Ваши стандартные настройки модели для всего проекта. Может также быть переопределено на
 * для каждой модели, установив свойства верхнего уровня в определении модели.
 *
 * Подробнее обо всех доступных настройках модели см. В:
 * https://sailsjs.com/config/models
 *
 * Для получения более общей информации о настройках модели парусов и о том, как их настроить
 * их на уровне проекта или модели, см .:
 *
 * https://sailsjs.com/docs/concepts/models-and-orm/model-settings
 */

module.exports.models = {


  /***************************************************************************
   *                                                                          *
   * Whether model methods like `.create()` and `.update()` should ignore     *
   * (and refuse to persist) unrecognized data-- i.e. properties other than   *
   * those explicitly defined by attributes in the model definition.          *
   *                                                                          *
   * To ease future maintenance of your code base, it is usually a good idea  *
   * to set this to `true`.                                                   *
   *                                                                          *
   * > Note that `schema: false` is not supported by every database.          *
   * > For example, if you are using a SQL database, then relevant models     *
   * > are always effectively `schema: true`.  And if no `schema` setting is  *
   * > provided whatsoever, the behavior is left up to the database adapter.  *
   * *  Должны ли игнорироваться такие модельные методы, как `.create ()` и `.update ()` *
   * *  (и отказываются сохранять) нераспознанные данные - то есть свойства, отличные от *
   * *  те, которые явно определены атрибутами в определении модели. *
   * *  *
   * *  Чтобы облегчить дальнейшее обслуживание вашей базы кода, обычно это хорошая идея *
   * *  чтобы установить это в `true`. *
   * *  *
   * * > Обратите внимание, что `schema: false` поддерживается не каждой базой данных. *
   * * > Например, если вы используете базу данных SQL, то соответствующие модели *
   * * > всегда эффективно `schema: true`. И если нет настройки `schema` *
   * * > при условии, что поведение остается за адаптером базы данных.
   * >                                                                        *
   * > For more info, see:
   * > https://sailsjs.com/docs/concepts/orm/model-settings#?schema           *
   *                                                                          *
   ***************************************************************************/

  // schema: true,
  datastore:'mongodb',


  /***************************************************************************
   *                                                                          *
   * How and whether Sails will attempt to automatically rebuild the          *
   * tables/collections/etc. in your schema.                                  *
   *                                                                          *
   * > Note that, when running in a production environment, this will be      *
   * > automatically set to `migrate: 'safe'`, no matter what you configure   *
   * > here.  This is a failsafe to prevent Sails from accidentally running   *
   * > auto-migrations on your production database.
   * *> Обратите внимание, что при работе в производственной среде это будет *
      *> автоматически устанавливается на `migrate: 'safe'`, независимо от того,
   что вы настраиваете
      *> здесь. Это отказоустойчивая защита от случайного запуска Sails *
      *> Автоматическая миграция в вашей производственной базе данных.*
   * >                                                                        *
   * > For more info, see:                                                    *
   * > https://sailsjs.com/docs/concepts/orm/model-settings#?migrate          *
   *                                                                          *
   ***************************************************************************/

  migrate: 'safe',
  // migrate: 'alter',


  /***************************************************************************
   *                                                                          *
   * Base attributes that are included in all of your models by default.      *
   * By convention, this is your primary key attribute (`id`), as well as two *
   * other timestamp attributes for tracking when records were last created   *
   * or updated.
   * * Базовые атрибуты, которые включены во все ваши модели по умолчанию. *
      * По соглашению, это ваш первичный ключевой атрибут (`id`), а также два *
      * другие атрибуты меток времени для отслеживания того, когда записи
   были созданы в последний раз *
      * или обновлено.*
   *                                                                          *
   * > For more info, see:                                                    *
   * > https://sailsjs.com/docs/concepts/orm/model-settings#?attributes       *
   *                                                                          *
   ***************************************************************************/

  attributes: {

    createdAt: {type: 'number', autoCreatedAt: true,},
    updatedAt: {type: 'number', autoUpdatedAt: true,},
    // id: { type: 'number', autoIncrement: true}, // <-- for SQL databases
    id: {type: 'string', columnName: '_id'}, // <-- for MongoDB
    //--------------------------------------------------------------------------
    //  /\   Using MongoDB?
    //  ||   Replace `id` above with this instead:
    //
    // ```


    // ```
    //
    // Plus, don't forget to configure MongoDB as your default datastore:
    // https://sailsjs.com/docs/tutorials/using-mongo-db
    //--------------------------------------------------------------------------
  },


  /******************************************************************************
   *                                                                             *
   * The set of DEKs (data encryption keys) for at-rest encryption.              *
   * i.e. when encrypting/decrypting data for attributes with `encrypt: true`.   *
   *                                                                             *
   * > The `default` DEK is used for all new encryptions, but multiple DEKs      *
   * > can be configured to allow for key rotation.  In production, be sure to   *
   * > manage these keys like you would any other sensitive credential.          *
   * Набор DEK (ключей шифрования данных) для шифрования в состоянии покоя. *
      * т. е. при шифровании / дешифровании данных для атрибутов с помощью `encrypt: true`. *
      * *
      *> DEK по умолчанию используется для всех новых шифрований, но для нескольких DEK *
      *> может быть настроен на поворот ключа. В производстве обязательно *
      *> управляйте этими ключами так же, как и другими конфиденциальными учетными данными.                                                                           *
   * > For more info, see:                                                       *
   * > https://sailsjs.com/docs/concepts/orm/model-settings#?dataEncryptionKeys  *
   *                                                                             *
   ******************************************************************************/

  dataEncryptionKeys: {
    default: 'emTujUpkKRW16sq/6BiyhL8agTuZlUe10b5YGC2UV3U='
  },


  /***************************************************************************
   *                                                                          *
   * Whether or not implicit records for associations should be cleaned up    *
   * automatically using the built-in polyfill.  This is especially useful    *
   * during development with sails-disk.                                      *
   *                                                                          *
   * Depending on which databases you're using, you may want to disable this  *
   * polyfill in your production environment.                                 *
   *                                                                          *
   * (For production configuration, see `config/env/production.js`.)          *
   *                                                                          *
   ***************************************************************************/

  cascadeOnDestroy: true


};
