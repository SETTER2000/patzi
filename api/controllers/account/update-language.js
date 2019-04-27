module.exports = {


  friendlyName: 'Update language',


  description: 'Изменить язык интерфеса для пользователя. Индивидуальные настройки.',


  inputs: {
    language: {
      description: 'Новый язык',
      example: 'ru',
      type: 'string'
      // required: true
    }
  },


  // exits: {},


  fn: async function (inputs) {
console.log(this.req.i18n.locales);
    // Hash the new password.
    // let hashed = await sails.helpers.passwords.hashPassword(inputs.language);

    // Update the record for the logged-in user.
    await User.updateOne({id: this.req.me.id})
      .set({
        preferredLocale: inputs.language
      });

  }


};
