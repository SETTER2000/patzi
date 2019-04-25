module.exports = {


  friendlyName: 'Add friends',


  description: '',

  // Входящие данные
  inputs: {
    friends: {
      description: 'Массив новых людей для отправки приглашения на добавления в друзья',
      // Тип массив словарей
      type: [{
        emailAddress: 'string',
        fullName: 'string'
      }],
      // type: ['string'],
      // Пример данных, которые ожидаются на входе в экшен
      example: [
        {
          emailAddress: 'foo@example.com',
          fullName: 'Foo McFoo'
        }
      ],
      required: true

    }
  },


  exits: {},


  fn: async function (inputs) {
    let desiredFriendEmails = _.pluck(inputs.friends, 'emailAddress');
    let friends = await User.find({
      emailAddress: {in: _.pluck(inputs.friends, 'emailAddress')}
    });
    // TODO: не дописано
    // Соберём в массив все идентификаторы друзей
    let existingUserFriendIds = _.pluck(friends, 'id');
    let existingUserEmails = _.pluck(friends, 'emailAddress');

    // Вычисляет разницу между двух массивов
    // вычисляем разницу: требуемые друзья и существующие пользователи с почтой
    let newUserEmails = _.difference(desiredFriendEmails, existingUserEmails);

    for (let email of newUserEmails) {

      // Придумайте псевдослучайный, вероятностно-уникальный токен
      let token = await sails.helpers.strings.random('url-friendly');

      await User.create({
        emailAddress: email,
        fullName: (_.find(inputs.friends, {emailAddress: email})).fullName,
        emailProofToken: token,
        emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
        emailStatus: 'confirmed'
      });

      // TODO: отправляет электронные письма вновь приглашённым
    }

    await User.addToCollection(this.req.me.id, 'outboundFriendRequests', existingUserFriendIds);


    // All done.
    return exists.success();

  }


};
