module.exports = {


  friendlyName: 'Send email proof reminders',


  description: 'Отправить напоминание всем недавним пользователям, которые еще не подтвердили свой адрес электронной почты.',

  inputs: {
    template: {
      description: 'Имя другого шаблона электронной почты для использования в качестве необязательного переопределения.',
      type: 'string',
      defaultsTo: 'reminder-to-confirm-email'
    }
  },


  fn: async function () {

    await User.stream({
      emailStatus: 'unconfirmed',
      emailConfirmationReminderAlreadySent: false,
      // это оставшееся время до того как пользователь должен подтвердить email указанный при регистрации
      // мы определим здесь 6 часов.
      // Если дата регистрации в свойстве createdAt будет
      // меньше текущей даты минус 12 часов, то отправляем уведомление-напоминание
      createdAt: {'>': Date.now() - 1000 * 60 * 60 * 6}
    }).eachRecord(async (user, proceed) => {
      console.log('V user: ', user);
      await sails.helpers.sendTemplateEmail.with({
        to: user.emailAddress,
        subject: `Your email confirmation time expires!`,
        template: 'email-reminder-to-confirm',
        templateData: {
          user: user,
          baseUrl: sails.config.custom.baseUrl
        }
      });
      // return proceed();
    });//∞
  }
};

