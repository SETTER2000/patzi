module.exports = {


  friendlyName: 'Login',


  description: 'Войдите, используя предоставленную комбинацию электронной почты и пароля.',


  extendedDescription:
`This action attempts to look up the user record in the database with the
specified email address.  Then, if such a user exists, it uses
bcrypt to compare the hashed password from the database with the provided
password attempt.
Это действие пытается найти запись пользователя в базе данных с
указанный адрес электронной почты. Затем, если такой пользователь существует, он использует
bcrypt сравнить хешированный пароль из базы данных с предоставленным
попытка пароля.`,


  inputs: {

    emailAddress: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: 'string',
      required: true
    },

    password: {
      description: 'The unencrypted password to try in this attempt, e.g. "password".',
      type: 'string',
      required: true
    },

    rememberMe: {
      description: 'Следует ли продлить время жизни сеанса пользователя.',
      extendedDescription:
`Обратите внимание, что это НЕ ПОДДЕРЖИВАЕТСЯ при использовании виртуальных запросов (например, отправка
запросы через WebSockets вместо HTTP).`,
      type: 'boolean'
    }

  },


  exits: {

    success: {
      description: 'The requesting user agent has been successfully logged in.',
      extendedDescription:
        `Under the covers, this stores the id of the logged-in user in the session
as the userId key.  The next time this user agent sends a request, assuming
it includes a cookie (like a web browser), Sails will automatically make this
user id available as req.session.userId in the corresponding action.  (Also note
that, thanks to the included "custom" hook, when a relevant request is received
from a logged-in user, that user's entire record from the database will be fetched
and exposed as req.me.)`
    },

    badCombo: {
      description: `The provided email and password combination does not
      match any user in the database.`,
      responseType: 'unauthorized | ошибка автризации'
      // ^This uses the custom `unauthorized` response located in `api/responses/unauthorized.js`.
      // To customize the generic "unauthorized" response across this entire app, change that file
      // (see api/responses/unauthorized).
      //
      // To customize the response for _only this_ action, replace `responseType` with
      // something else.  For example, you might set `statusCode: 498` and change the
      // implementation below accordingly (see http://sailsjs.com/docs/concepts/controllers).
    }

  },


  fn: async function (inputs) {
    // Look up by the email address.
    // (note that we lowercase it to ensure the lookup is always case-insensitive,
    // regardless of which database we're using)
    // Поиск по адресу электронной почты.
    // (обратите внимание, что это всегда без учета регистра,
    // независимо от того, какую базу данных мы используем)
    var userRecord = await User.findOne({
      emailAddress: inputs.emailAddress.toLowerCase(),
    });

    // If there was no matching user, respond thru the "badCombo" exit.
    // Если подходящего пользователя не было, ответьте через выход «badCombo».
    if(!userRecord) {
      throw 'badCombo';
    }

    // If the password doesn't match, then also exit thru "badCombo".
    // Если пароль не совпадает, то также завершаем работу через "badCombo".
    await sails.helpers.passwords.checkPassword(inputs.password, userRecord.password)
    .intercept('incorrect', 'badCombo');

    // If "Remember Me" was enabled, then keep the session alive for
    // a longer amount of time.  (This causes an updated "Set Cookie"
    // response header to be sent as the result of this request -- thus
    // we must be dealing with a traditional HTTP request in order for
    // this to work.)
    // Если «Remember Me» было включено, то сохранить сеанс на
    // большее количество времени. (Это вызывает обновленный «Set Cookie»
    // заголовок ответа, который будет отправлен в результате этого запроса - таким образом
    // мы должны иметь дело с традиционным HTTP-запросом, чтобы
    // это для работы.)
    if (inputs.rememberMe) {
      if (this.req.isSocket) {
        sails.log.warn(
          'Received `RememberMe: true` из виртуального запроса, но оно было проигнорировано \ n' +
          'потому что сессионный cookie браузера не может быть сброшен через сокеты. \ n' +
           'Пожалуйста, используйте вместо этого традиционный HTTP-запрос.'
        );
      } else {
        this.req.session.cookie.maxAge = sails.config.custom.rememberMeCookieMaxAge;
      }
    }//ﬁ

    // Modify the active session instance.
    // (This will be persisted when the response is sent.)
    // Изменить экземпляр активного сеанса.
    // (Это будет сохраняться при отправке ответа.)
    this.req.session.userId = userRecord.id;
    await sails.helpers.onlineUser.with({userId:this.req.session.userId, online:true});
  }

};
