/**
 * Datastores
 * (sails.config.datastores)
 *
 * A set of datastore configurations which tell Sails where to fetch or save
 * data when you execute built-in model methods like `.find()` and `.create()`.
 *
 *  > This file is mainly useful for configuring your development database,
 *  > as well as any additional one-off databases used by individual models.
 *  > Ready to go live?  Head towards `config/env/production.js`.
 *
 * For more information on configuring datastores, check out:
 * https://sailsjs.com/config/datastores
 */

module.exports.datastores = {


  /***************************************************************************
   *                                                                          *
   * Your app's default datastore.                                            *
   *                                                                          *
   * Sails apps read and write to local disk by default, using a built-in     *
   * database adapter called `sails-disk`.  This feature is purely for        *
   * convenience during development; since `sails-disk` is not designed for   *
   * use in a production environment.                                         *
   *                                                                          *
   * To use a different db _in development_, follow the directions below.     *
   * Otherwise, just leave the default datastore as-is, with no `adapter`.    *
   *                                                                          *
   * (For production configuration, see `config/env/production.js`.)          *
   *                                                                          *
   ***************************************************************************/

  mysqlDb: {
    adapter: 'sails-mysql',
    host:'localhost',
    user:'root',
    password:'4211817',
    database:'geodata'
    // database:'flk'


  },

  mongodb: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    user: 'fox', //optional
    password: '4211817',
    database: 'patzi', //optional
    //url: 'mongodb://fox:4211817@localhost:27017/patzi',

  },
  // default: {
  //
  //   /***************************************************************************
  //   *                                                                          *
  //   * Want to use a different database during development?                     *
  //   *                                                                          *
  //   * 1. Choose an adapter:                                                    *
  //   *    https://sailsjs.com/plugins/databases                                 *
  //   *                                                                          *
  //   * 2. Install it as a dependency of your Sails app.                         *
  //   *    (For example:  npm install sails-mysql --save)                        *
  //   *                                                                          *
  //   * 3. Then pass it in, along with a connection URL.                         *
  //   *    (See https://sailsjs.com/config/datastores for help.)                 *
  //   *                                                                          *
  //   ***************************************************************************/
  //   // adapter: 'sails-mysql',
  //   // url: 'mysql://user:password@host:port/database',
  //   // url: 'mysql://adam-at-461068669279:qNcpc6q9kC9CpfslhQegM9+Ucm3U6JSsQySkqoHArGA=@patzi.cpiteotrtqu9.us-east-1.rds.amazonaws.com:3306/city',
  //
  //   //
  //   // host: 'localhost',
  //   // port: 27017,
  //   // user: 'fox', //optional
  //   // password:'4211817',
  //   // database: 'patzi', //optional
  //   // connectTimeoutMS: 300000,
  //   // keepAlive: 300000,
  //   // adapter: require('sails-mongo'),
  //   // url: 'mongodb://fox:4211817@localhost:27017/patzi',
  //
  //   //password:process.env.MONGO_PASS ,
  //   // set MONGO_PASS=4211817 && sails lift
  //   // set MONGO_PASS=4211817 && sails console --redis
  //   // adapter: 'sails-mongo',
  //   // url: 'mongodb://fox@localhost/patzi'
  //   // url:''







  // },
};
