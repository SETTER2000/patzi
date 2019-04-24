module.exports = {


  friendlyName: 'Send password recovery email',


  description: 'Send a password recovery notification to the user with the specified email address.',


  inputs: {

    emailAddress: {
      description: 'The email address of the alleged user who wants to recover their password.',
      example: 'rydahl@example.com',
      type: 'string',
      required: true
    }

  },


  exits: {

    success: {
      description: 'The email address might have matched a user in the database.  (If so, a recovery email was sent.)'
    },

  },


  fn: async function (inputs) {

    // Find the record for this user.
    // (Even if no such user exists, pretend it worked to discourage sniffing.)
    // Найти запись для этого пользователя.
    // (Даже если такого пользователя не существует, сделайте вид, что он сработал, чтобы препятствовать анализу.)
    var userRecord = await User.findOne({emailAddress: inputs.emailAddress});
    if (!userRecord) {
      return;
    }//•

    // Come up with a pseudorandom, probabilistically-unique token for use
    // in our password recovery email.
    // Придумайте псевдослучайный, вероятностно-уникальный токен для использования
    // в нашей электронной почте для восстановления пароля.
    var token = await sails.helpers.strings.random('url-friendly');

    // Store the token on the user record
    // (This allows us to look up the user when the link from the email is clicked.)
    // Сохраняем токен в записи пользователя
    // (Это позволяет нам искать пользователя при нажатии на ссылку из электронного письма.)
    await User.update({id: userRecord.id})
      .set({
        passwordResetToken: token,
        passwordResetTokenExpiresAt: Date.now() + sails.config.custom.passwordResetTokenTTL,
      });

    // Send recovery email
    await sails.helpers.sendTemplateEmail.with({
      to: inputs.emailAddress,
      subject: 'Password reset instructions',
      template: 'email-reset-password',
      templateData: {
        fullName: userRecord.fullName,
        token: token
      }
    });

  }


};
