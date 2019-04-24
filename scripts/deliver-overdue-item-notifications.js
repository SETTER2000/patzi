module.exports = {


  friendlyName: 'Deliver overdue item notifications',


  description: '',


  fn: async function () {
    const moment = require('moment');
    const overdueThings = await Thing.find({
      // Найдём все просроченные вещи.
      // Для этого надо определить действительно кто-то заимствовал эту вещь
      borrowedBy: {'!=': null},
      // это оставшееся время до того как вы должны вернуть вещь
      // мы определим здесь 12 часов
      // т.е. если дата возврата в свойстве expectedReturnAt обозначена
      // меньше или равна (текущей дате минус 12 часов), то отправляем уведомление
      expectedReturnAt: {'<=': Date.now() - 1000 * 60 * 60 * 12}
    }).populate('owner')
      .populate('borrowedBy');

    for (let overdueThing of overdueThings) {
      // Format our text for the notification email.
      // Отформатируйте наш текст для уведомления по электронной почте.
      // Для вещи которой пользователь не дал название, устанавливается
      // 'your borrowed item' (ваш заемный предмет)
      let itemLabel = overdueThing.label || 'your borrowed item';
      // С помощью модуля moment форматируется дата, для более удобного чтения в письме
      let formattedExpectedReturnAt = moment(overdueThing.expectedReturnAt).format('dddd, MMMM Do');


      // Send the owner a notification email.
      // Отправить владельцу уведомление по электронной почте.
      await sails.helpers.sendTemplateEmail.with({
        to: overdueThing.borrowedBy.emailAddress, // адрес заёмщика, куда отправляем письмо
        // Тема письма
        subject: `It's time to return ${overdueThing.owner.fullName}'s ${overdueThing.label || 'item'}!`,
        // Шаблон пиьсма views/emails/email-overdue-notice.ejs
        template: 'email-overdue-notice',
        // Данные для вставки в шаблон письма
        templateData: {
          ownerName: overdueThing.owner.fullName,
          ownerEmail: overdueThing.owner.emailAddress,
          itemLabel: itemLabel,
          fullName: overdueThing.borrowedBy.fullName,
          expectedReturnAt: formattedExpectedReturnAt,
          baseUrl: sails.config.custom.baseUrl
        }
      });
    }
  }
};

