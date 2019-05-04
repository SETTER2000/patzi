/**
 * accessGroup hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineAccessGroupHook(sails) {

  return {

    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async function (cb) {
      sails.on('hook:orm:loaded', () => cb());
    },
    abc: 123,

    // This function will be public
    sayHi: function (name) {
      console.log(greet(name));
    },
    isAdmin: async function (userId) {
      let group = await Group.find({label: 'admin'}).populate('belongsToGroup', {where: {id: userId}});
      /*  console.log('"https://d3a1wbnh2r1l7y ', group[0].belongsToGroup);
      console.log('OBJ-keys', Object.keys(group[0].belongsToGroup).length > 0);*/

        this.access = Object.keys(group[0].belongsToGroup).length > 0;
        return this.access;

        sails.console.error("Ошибка при создании группы доступа. Проверить загрузочный файл bootstrap.js.", e);

    }
  };

  // This function will be private
  function greet(name) {
    return 'Hi, ' + name + '!';
  }
};
