/**
 * accessGroup hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineAccessGroupHook(sails) {
  // This var will be private
  // var foo = 'bar';
  // let access = false;
  return {

    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async function (cb) {
      sails.on('hook:orm:loaded',()=> {

        // This var will be public

        // Finish initializing custom hook
        // Then call cb()
        return cb();
      });

    },
    abc: 123,

    // This function will be public
    sayHi: function (name) {
      console.log(greet(name));
    },
    /* isAdmin: async function (userId) {
      let group = await Group.find({label: 'admin'}).populate('belongsToGroup', {where: {id: userId}});
      console.log('GROUP: ', group[0].belongsToGroup);
      console.log('OBJ-keys', Object.keys(group[0].belongsToGroup).length > 0);
      this.access = Object.keys(group[0].belongsToGroup).length > 0;
      return this.access;
    }*/
  };

  // This function will be private
  function greet(name) {
    return 'Hi, ' + name + '!';
  }
};
