/**
 * Production environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for production.  The configuration in this file
 * is only used in your production environment, i.e. when you lift your app using:
 ** То, что вы видите ниже, является кратким описанием необходимых вам встроенных настроек
   * настроить приложение Sails для производства. Конфигурация в этом файле
   * используется только в вашей производственной среде, т.е.
 * когда вы поднимаете свое приложение, используя:
 * ```
 * NODE_ENV=production node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API secrets / db passwords) to this file!
 **> Если вы используете git в качестве решения для управления версиями своего приложения Sails,
   *> этот файл будет добавлен в ваш репозиторий по умолчанию, если вы не добавите
   *> это в ваш файл .gitignore. Если ваш репозиторий будет общедоступным,
   *> не добавляйте личные / конфиденциальные данные (например, секреты API / пароли БД) в этот файл!
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */
const fs = require('fs');

const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const Tracing = require("@sentry/tracing");
// or use es6 import statements
// import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: process.env.PTZ_SENTRY_KEY,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// const transaction = Sentry.startTransaction({
//   op: "test",
//   name: "My First Test Transaction",
// });
//
// setTimeout(() => {
//   try {
//     foo();
//   } catch (e) {
//     Sentry.captureException(e);
//   } finally {
//     transaction.finish();
//   }
// }, 99);


module.exports = {


  /**************************************************************************
   *                                                                         *
   * Tell Sails what database(s) it should use in production.                *
   *                                                                         *
   * (https://sailsjs.com/config/datastores)                                 *
   *                                                                         *
   **************************************************************************/
  datastores: {
    mysql:{
      adapter:'sails-mysql',
      url:process.env.PTZ_MYSQLURL
    },

    /***************************************************************************
     *                                                                          *
     * Configure your default production database.                              *
     *                                                                          *
     * 1. Choose an adapter:                                                    *
     *    https://sailsjs.com/plugins/databases                                 *
     *                                                                          *
     * 2. Install it as a dependency of your Sails app.                         *
     *    (For example:  npm install sails-mysql --save)                        *
     *                                                                          *
     * 3. Then set it here (`adapter`), along with a connection URL (`url`)     *
     *    and any other, adapter-specific customizations.                       *
     *    (See https://sailsjs.com/config/datastores for help.)                 *
     *                                                                          *
     ***************************************************************************/
    mongodb: {
      adapter: process.env.PTZ_ADDAP,
      host:    process.env.PTZ_HOST,
      port:    process.env.PTZ_PORT,
      user:    process.env.PTZ_LOGIN,
      password:process.env.PTZ_PASS,

      database:process.env.PTZ_DB
    },

    default: {
     // adapter: 'sails-mongo',
      // adapter: 'sails-mysql',
      // url: 'mysql://user:password@host:port/database',
      //--------------------------------------------------------------------------
      //  /\   To avoid checking it in to version control, you might opt to set
      //  ||   sensitive credentials like `url` using an environment variable.
      // Чтобы не включать его в систему контроля версий, вы можете установить
      // || конфиденциальные учетные данные, такие как `url` с использованием переменной окружения.
      //  For example:
      //  ```
      //  sails_datastores__default__url=mysql://admin:myc00lpAssw2D@db.example.com:3306/my_prod_db
      //  ```
      //--------------------------------------------------------------------------

      /****************************************************************************
       *                                                                           *
       * More adapter-specific options                                             *
       *                                                                           *
       * > For example, for some hosted PostgreSQL providers (like Heroku), the    *
       * > extra `ssl: true` option is mandatory and must be provided.             *
       *  Например, для некоторых хостинг-провайдеров PostgreSQL (например, Heroku), *
       *> дополнительная опция `ssl: true` является обязательной и должна быть указана.                                                                         *
       * More info:                                                                *
       * https://sailsjs.com/config/datastores                                     *
       *                                                                           *
       ****************************************************************************/
      // ssl: true,

    },
    // mysql: {
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/../rds-combined-ca-bundle.pem')
    //   },
    // }
  },


  models: {

    /***************************************************************************
     *                                                                          *
     * To help avoid accidents, Sails automatically sets the automigration      *
     * strategy to "safe" when your app lifts in production mode.               *
     * (This is just here as a reminder.)                                       *
     * Чтобы избежать несчастных случаев, Sails автоматически устанавливает автомиграцию *
     * стратегия «безопасности», когда ваше приложение работает в производственном режиме. *
     * (Это просто напоминание.)                                                                         *
     * More info:                                                               *
     * https://sailsjs.com/docs/concepts/models-and-orm/model-settings#?migrate *
     *                                                                          *
     ***************************************************************************/
    migrate: 'safe',

    /***************************************************************************
     *                                                                          *
     * If, in production, this app has access to physical-layer CASCADE         *
     * constraints (e.g. PostgreSQL or MySQL), then set those up in the         *
     * database and uncomment this to disable Waterline's `cascadeOnDestroy`    *
     * polyfill.  (Otherwise, if you are using a databse like Mongo, you might  *
     * choose to keep this enabled.)                                            *
     * Если в работе это приложение имеет доступ к CASCADE * физического уровня *
          * ограничения (например, PostgreSQL или MySQL), затем установите их в *
          * базы данных и раскомментируйте это, чтобы отключить `cascadeOnDestroy` Waterline *
          * полифилл. (В противном случае, если вы используете базу данных, такую как Mongo, вы можете *
          * выберите, чтобы оставить это включенным.)                                                                         *
     ***************************************************************************/
    // cascadeOnDestroy: false,

  },


  /**************************************************************************
   *                                                                         *
   * Always disable "shortcut" blueprint routes.                             *
   *                                                                         *
   * > You'll also want to disable any other blueprint routes if you are not *
   * > actually using them (e.g. "actions" and "rest") -- but you can do     *
   * > that in `config/blueprints.js`, since you'll want to disable them in  *
   * > all environments (not just in production.)                            *
   *                                                                         *
   * > Вы также можете отключить любые другие маршруты blueprint, если вы не *
      *> фактически используя их (например, "actions" и "rest") - но вы можете сделать *
      *> это в `config / blueprints.js`, так как вы хотите отключить их в *
      *> всех средах (не только в производстве.) *
      *
   ***************************************************************************/
  blueprints: {
    shortcuts: false,
  },


  /***************************************************************************
   *                                                                          *
   * Configure your security settings for production.                         *
   *                                                                          *
   * IMPORTANT:                                                               *
   * If web browsers will be communicating with your app, be sure that        *
   * you have CSRF protection enabled.  To do that, set `csrf: true` over     *
   * in the `config/security.js` file (not here), so that CSRF app can be     *
   * tested with CSRF protection turned on in development mode too.           *
   *                                                                          *
   ***************************************************************************/
  security: {

    /***************************************************************************
     *                                                                          *
     * If this app has CORS enabled (see `config/security.js`) with the         *
     * `allowCredentials` setting enabled, then you should uncomment the        *
     * `allowOrigins` whitelist below.  This sets which "origins" are allowed   *
     * to send cross-domain (CORS) requests to your Sails app.                  *
     *                                                                          *
     * > Replace "https://example.com" with the URL of your production server.  *
     * > Be sure to use the right protocol!  ("http://" vs. "https://")         *
     *                                                                          *
     ***************************************************************************/
    cors: {
      // allowOrigins: [
      //   'https://example.com',
      // ]
    },

  },


  /***************************************************************************
   *                                                                          *
   * Configure how your app handles sessions in production.                   *
   *                                                                          *
   * (https://sailsjs.com/config/session)                                     *
   *                                                                          *
   * > If you have disabled the "session" hook, then you can safely remove    *
   * > this section from your `config/env/production.js` file.                *
   *                                                                          *
   ***************************************************************************/
  session: {

    /***************************************************************************
     *                                                                          *
     * Production session store configuration.                                  *
     *                                                                          *
     * Uncomment the following lines to finish setting up a package called      *
     * "@sailshq/connect-redis" that will use Redis to handle session data.     *
     * This makes your app more scalable by allowing you to share sessions      *
     * across a cluster of multiple Sails/Node.js servers and/or processes.     *
     * (See http://bit.ly/redis-session-config for more info.)                  *
     *                                                                          *
     * > While @sailshq/connect-redis is a popular choice for Sails apps, many  *
     * > other compatible packages (like "connect-mongo") are available on NPM. *
     * > (For a full list, see https://sailsjs.com/plugins/sessions)            *
     *                                                                           *
     ********************************* ******************************************/
    adapter: '@sailshq/connect-redis',
    // url: 'redis://user:password@localhost:6379/databasenumber',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking it in to version control, you might opt to
    // ||   set sensitive credentials like this using an environment variable.
    //
    // For example:
    // ```
    // sails_session__url=redis://admin:myc00lpAssw2D@bigsquid.redistogo.com:9562/0
    // ```
    //
    //--------------------------------------------------------------------------


    /***************************************************************************
     *                                                                          *
     * Production configuration for the session ID cookie.                      *
     *                                                                          *
     * Tell browsers (or other user agents) to ensure that session ID cookies   *
     * are always transmitted via HTTPS, and that they expire 24 hours after    *
     * they are set.                                                            *
     *                                                                          *
     * Note that with `secure: true` set, session cookies will _not_ be         *
     * transmitted over unsecured (HTTP) connections. Also, for apps behind     *
     * proxies (like Heroku), the `trustProxy` setting under `http` must be     *
     * configured in order for `secure: true` to work.                          *
     *                                                                          *
     * > While you might want to increase or decrease the `maxAge` or provide   *
     * > other options, you should always set `secure: true` in production      *
     * > if the app is being served over HTTPS.                                 *
     *                                                                          *
     * Read more:                                                               *
     * https://sailsjs.com/config/session#?the-session-id-cookie                *
     *                                                                          *
     ***************************************************************************/
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },
  },


  /**************************************************************************
   *                                                                          *
   * Set up Socket.io for your production environment.                        *
   *                                                                          *
   * (https://sailsjs.com/config/sockets)                                     *
   *                                                                          *
   * > If you have disabled the "sockets" hook, then you can safely remove    *
   * > this section from your `config/env/production.js` file.                *
   *                                                                          *
   ***************************************************************************/
  sockets: {

    /***************************************************************************
     *                                                                          *
     * Uncomment the `onlyAllowOrigins` whitelist below to configure which      *
     * "origins" are allowed to open socket connections to your Sails app.      *
     *                                                                          *
     * > Replace "https://example.com" etc. with the URL(s) of your app.        *
     * > Be sure to use the right protocol!  ("http://" vs. "https://")         *
     *                                                                          *
     ***************************************************************************/
    // onlyAllowOrigins: [
    //   'http://localhost:1337',
    //   'https://staging.example.com',
    // ],
    onlyAllowOrigins: ['https://poaleell.com','https://www.poaleell.com'],

    /***************************************************************************
     *                                                                          *
     * If you are deploying a cluster of multiple servers and/or processes,     *
     * then uncomment the following lines.  This tells Socket.io about a Redis  *
     * server it can use to help it deliver broadcasted socket messages.        *
     *                                                                          *
     * > Be sure a compatible version of @sailshq/socket.io-redis is installed! *
     * > (See https://sailsjs.com/config/sockets for the latest version info)   *
     *                                                                          *
     * (https://sailsjs.com/docs/concepts/deployment/scaling)                   *
     *                                                                          *
     ***************************************************************************/
    // url: 'redis://user:password@bigsquid.redistogo.com:9562/databasenumber',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking it in to version control, you might opt to
    // ||   set sensitive credentials like this using an environment variable.
    //
    // For example:
    // ```
    // sails_sockets__url=redis://admin:myc00lpAssw2D@bigsquid.redistogo.com:9562/0
    // ```
    //--------------------------------------------------------------------------
  },

  /**************************************************************************
   *                                                                         *
   * Set the production log level.                                           *
   *                                                                         *
   * (https://sailsjs.com/config/log)                                        *
   *                                                                         *
   ***************************************************************************/
  log: {
    level: 'warning'
  },

  http: {
    /***************************************************************************
     *                                                                          *
     * The number of milliseconds to cache static assets in production.         *
     * (the "max-age" to include in the "Cache-Control" response header)        *
     *                                                                          *
     ***************************************************************************/
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year

    /***************************************************************************
     *                                                                          *
     * Proxy settings                                                           *
     *                                                                          *
     * If your app will be deployed behind a proxy/load balancer - for example, *
     * on a PaaS like Heroku - then uncomment the `trustProxy` setting below.   *
     * This tells Sails/Express how to interpret X-Forwarded headers.           *
     *                                                                          *
     * This setting is especially important if you are using secure cookies     *
     * (see the `cookies: secure` setting under `session` above) or if your app *
     * relies on knowing the original IP address that a request came from.      *
     *                                                                          *
     * (https://sailsjs.com/config/http)                                        *
     *                                                                          *
     ***************************************************************************/
    trustProxy: true,

  },


  /**************************************************************************
   *                                                                         *
   * Lift the server on port 80.                                             *
   * (if deploying behind a proxy, or to a PaaS like Heroku or Deis, you     *
   * probably don't need to set a port here, because it is oftentimes        *
   * handled for you automatically.  If you are not sure if you need to set  *
   * this, just try deploying without setting it and see if it works.)       *
   *                                                                         *
   ***************************************************************************/
  // port: 80,


  /**************************************************************************
   *                                                                         *
   * Configure an SSL certificate                                            *
   *                                                                         *
   * For the safety of your users' data, you should use SSL in production.   *
   * ...But in many cases, you may not actually want to set it up _here_.    *
   *                                                                         *
   * Normally, this setting is only relevant when running a single-process   *
   * deployment, with no proxy/load balancer in the mix.  But if, on the     *
   * other hand, you are using a PaaS like Heroku, you'll want to set up     *
   * SSL in your load balancer settings (usually somewhere in your hosting   *
   * provider's dashboard-- not here.)                                       *
   *                                                                         *
   * > For more information about configuring SSL in Sails, see:             *
   * > https://sailsjs.com/config/*#?sailsconfigssl                          *
   *                                                                         *
   **************************************************************************/
  // ssl: undefined,

  /**************************************************************************
   *                                                                         *
   * Tell Sails how it should upload files in production.                    *
   *                                                                         *
   * (https://sailsjs.com/config/uploads)                                    *
   *                                                                         *
   **************************************************************************/
  uploads: {

    /***************************************************************************
     *                                                                          *
     * Configure a production filesystem adapter:                               *
     *                                                                          *
     * 1. Choose an adapter:                                                    *
     *    https://sailsjs.com/plugins/uploads                                   *
     *                                                                          *
     * 2. Install it as a dependency of your Sails app.                         *
     *    (For example:  npm install skipper-s3 --save)                         *
     *                                                                          *
     * 3. Then pass it in, with any other config.                               *
     *    (See https://sailsjs.com/config/uploads for help.)                    *
     *                                                                          *
     ***************************************************************************/
    adapter: require('skipper-s3'),
    // bucket: process.env.bucket,
    // key: process.env.key,
    // region: process.env.region,
    // secret: process.env.secret,
    //--------------------------------------------------------------------------
    //  /\   To avoid checking them in to version control, you might opt to set
    //  ||   sensitive credentials like `s3Secret` using an environment variable.
    //   Чтобы не включать их в систему контроля версий, вы можете установить
    //  || конфиденциальные учетные данные, такие как `s3Secret`, с использованием переменной окружения.
    //  For example:
    //  ```
    //  sails_uploads__key=AB2g1939eaGAdeAdamdaio38103onaDs
    //  ```
    //
    //  To additionally allow file uploads to be viewed by the public, add:
    //  ```
    headers:
      {
        'x-amz-acl':
          'public-read'
      },
    //  ```
    //--------------------------------------------------------------------------
  },

  /**************************************************************************
   *                                                                         *
   * Production overrides for any custom settings specific to your app.      *
   * (for example, production credentials for 3rd party APIs like Stripe)    *
   *                                                                         *
   * > See config/custom.js for more info on how to configure these options. *
   *                                                                         *
   ***************************************************************************/
  custom: {
    baseUrl: process.env.PTZ_BASEURL,
    internalEmailAddress:process.env.PTZ_INTERNALEMAIL,

    // mailgunDomain: 'mg.example.com',
    // mailgunSecret: 'key-prod_fake_xx',
    // stripeSecret: 'sk_prod__fake_xx',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking them in to version control, you might opt to
    // ||   set sensitive credentials like these using environment variables.
    //
    // For example:
    // ```
    // sails_custom__mailgunDomain=mg.example.com
    // sails_custom__mailgunSecret=key-prod_fake_xx
    // sails_custom__stripeSecret=sk_prod__fake_xx
    // ```
    //--------------------------------------------------------------------------

  }

};
