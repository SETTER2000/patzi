module.exports = function myHomeHook(sails) {
  // sails.hooks.poale.sayHi('Петя');
  // This var will be private
  var foo = 'bar';

  return {

    // This var will be public
    abc: 123,

    // This function will be public
    sayHi: function (name) {
      console.log(greet(name));
    }

  };

  // This function will be private
  function greet (name) {
    return 'Hi, ' + name + '!';
  }
};
