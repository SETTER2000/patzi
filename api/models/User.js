/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'mary.sue@example.com'
    },

    emailStatus: {
      type: 'string',
      isIn: ['unconfirmed', 'change-requested', 'confirmed'],
      defaultsTo: 'confirmed',
      description: 'The confirmation status of the user\'s email address.',
      extendedDescription:
        `Пользователи могут быть созданы как «неподтвержденные» (например, обычная регистрация) или как «подтвержденные» (например, жестко запрограммированные)
пользователи админа). Когда функция проверки электронной почты включена, новые пользователи создаются с помощью
в форме регистрации есть \`emailStatus: 'unsfirmed'\`, пока они не нажмут на ссылку в электронном подтверждении.
Точно так же, когда существующий пользователь меняет свой адрес электронной почты, он переключается на «запрос на изменение»
статус электронной почты, пока они не нажмут на ссылку в электронном письме с подтверждением.`
    },

    emailChangeCandidate: {
      type: 'string',
      isEmail: true,
      description: 'A still-unconfirmed email address that this user wants to change to (if relevant).'
    },

    password: {
      type: 'string',
      // required: true,
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    },

    fullName: {
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name.',
      maxLength: 120,
      example: 'Mary Sue van der McHenst'
    },

    isSuperAdmin: {
      type: 'boolean',
      description: 'Является ли этот пользователь «супер-администратором» с дополнительными разрешениями и т. д.',
      extendedDescription:
        `Super admins might have extra permissions, see a different default home page when they log in,
or even have a completely different feature set from normal users.  In this app, the \`isSuperAdmin\`
flag is just here as a simple way to represent two different kinds of users.  Usually, it's a good idea
to keep the data model as simple as possible, only adding attributes when you actually need them for
features being built right now.

For example, a "super admin" user for a small to medium-sized e-commerce website might be able to
change prices, deactivate seasonal categories, add new offerings, and view live orders as they come in.
On the other hand, for an e-commerce website like Walmart.com that has undergone years of development
by a large team, those administrative features might be split across a few different roles.

So, while this \`isSuperAdmin\` demarcation might not be the right approach forever, it's a good place to start.

Супер-администраторы могут иметь дополнительные разрешения, видеть другую домашнюю страницу по умолчанию 
при входе в систему, или даже иметь совершенно другой набор функций от обычных пользователей. 
В этом приложении \`isSuperAdmin\` Флаг здесь как простой способ представления двух разных типов 
пользователей. Обычно это хорошая идея чтобы сделать модель данных максимально простой, добавляя 
атрибуты только тогда, когда они вам действительно нужны функции строятся прямо сейчас.

Например, пользователь «супер-админ» для малого и среднего сайта электронной коммерции мог бы
изменять цены, деактивировать сезонные категории, добавлять новые предложения и просматривать 
текущие заказы по мере их поступления. С другой стороны, для веб-сайта электронной коммерции, 
такого как Walmart.com, который прошел годы разработки в большой команде эти административные 
функции могут быть разделены на несколько разных ролей.

Поэтому, хотя разграничение между isSuperAdmin и может быть неправильным подходом, это хорошее место 
для начала.

`
    },

    passwordResetToken: {
      type: 'string',
      description: 'Уникальный токен, используемый для проверки личности пользователя при восстановлении пароля. ' +
      'Истекает после 1 использования или по истечении установленного количества времени.'
    },

    passwordResetTokenExpiresAt: {
      type: 'number',
      description: 'Метка времени JS (эпоха мс), представляющая момент истечения срока действия этого пароля' +
      ' `passwordResetToken` (или 0, если у пользователя в настоящее время нет такого токена).',
      example: 1502844074211
    },

    emailProofToken: {
      type: 'string',
      description: 'A pseudorandom, probabilistically-unique token for use in our account verification emails.'
    },

    emailProofTokenExpiresAt: {
      type: 'number',
      description: 'A JS timestamp (epoch ms) representing the moment when this user\'s `emailProofToken` will expire (or 0 if the user currently has no such token).',
      example: 1502844074211
    },

    stripeCustomerId: {
      type: 'string',
      protect: true,
      description: 'The id of the customer entry in Stripe associated with this user (or empty string if this user is not linked to a Stripe customer -- e.g. if billing features are not enabled).',
      extendedDescription:
        `Just because this value is set doesn't necessarily mean that this user has a billing card.
It just means they have a customer entry in Stripe, which might or might not have a billing card.`
    },

    hasBillingCard: {
      type: 'boolean',
      description: 'Есть ли у этого пользователя платежная карта по умолчанию, подключенная в качестве способа оплаты.',
      extendedDescription:
        `Более конкретно, это указывает на то, имеет ли связанная запись пользователя в Stripe запись о пользователе
источник платежа по умолчанию (например, кредитная карта). Обратите внимание, что у пользователя есть \`stripeCustomerId\`
без необходимости иметь платежную карту.`
    },

    billingCardBrand: {
      type: 'string',
      example: 'Visa',
      description: 'The brand of this user\'s default billing card (or empty string if no billing card is set up).',
      extendedDescription: 'To ensure PCI compliance, this data comes from Stripe, where it reflects the user\'s default payment source.'
    },

    billingCardLast4: {
      type: 'string',
      example: '4242',
      description: 'The last four digits of the card number for this user\'s default billing card (or empty string if no billing card is set up).',
      extendedDescription: 'To ensure PCI compliance, this data comes from Stripe, where it reflects the user\'s default payment source.'
    },

    billingCardExpMonth: {
      type: 'string',
      example: '08',
      description: 'The two-digit expiration month from this user\'s default billing card, formatted as MM (or empty string if no billing card is set up).',
      extendedDescription: 'To ensure PCI compliance, this data comes from Stripe, where it reflects the user\'s default payment source.'
    },

    billingCardExpYear: {
      type: 'string',
      example: '2023',
      description: 'The four-digit expiration year from this user\'s default billing card, formatted as YYYY (or empty string if no credit card is set up).',
      extendedDescription: 'To ensure PCI compliance, this data comes from Stripe, where it reflects the user\'s default payment source.'
    },

    tosAcceptedByIp: {
      type: 'string',
      description: 'The IP (ipv4) address of the request that accepted the terms of service.',
      extendedDescription: 'Useful for certain types of businesses and regulatory requirements (KYC, etc.)',
      moreInfoUrl: 'https://en.wikipedia.org/wiki/Know_your_customer'
    },

    lastSeenAt: {
      type: 'number',
      description: 'A JS timestamp (epoch ms) representing the moment at which this user most recently interacted with the backend while logged in (or 0 if they have not interacted with the backend at all yet).',
      example: 1502844074211
    },


    defaultIcon: {
      type: 'string',
      description: 'Какая иконка будет показываться по умолчанию на сайте. Два варианта всего avatar|gravatar',
      isIn: ['avatar', 'gravatar'],
      defaultsTo: 'gravatar'
    },

    gravatar: {
      type: 'string',
      description: 'Email адрес зарегистрированый в граватар сервисе',
      example: 'my-email@gmail.com',
      moreInfoUrl: 'https://ru.gravatar.com/'
    },


    avatar: {
      type: 'string',
      description: 'Дескриптор файла Skipper однозначно идентифицирует загруженное изображение.',
      moreInfoUrl: 'https://www.npmjs.com/package/skipper'
    },


    avatarFD: {
      type: 'string',
      description: 'Дескриптор файла Skipper однозначно идентифицирует загруженное изображение.',
      moreInfoUrl: 'https://www.npmjs.com/package/skipper'
    },


    filename: {
      type: 'string',
      description: 'Имя загруженного файла картинки от пользователя.'
    },


    avatarMime: {
      type: 'string',
      description: 'Тип MIME для загруженного изображения.'
    },


    preferredLocale: {
      type: 'string',
      description: `Предпочитаемый язык интерфейса. Пользователь сам устанавливает эту
                    опцию в настройках своего аккаунта после авторизации.`,
      example: 'ru',
      moreInfoUrl: 'https://gist.github.com/mikermcneil/0af155ed546f3ddf164b4885fb67830c; https://sailsjs.com/documentation/reference/request-req/req-set-locale',
      // defaultsTo: 'en',
    },

    phone: {
      type:'string',
      // columnType:'array',
      description: 'Номера телефонов для связи'
    },

    kennel: {
      type: 'string',
      description: `Наименование питомника`,
      example: 'Poale Ell'
    },


    kennelAddress: {
      type: 'string',
      description: `Адрес питомника`,
      example: 'Россия. Москва. ул. Остров д.1 к.1',
      // moreInfoUrl: 'https://gist.github.com/mikermcneil/0af155ed546f3ddf164b4885fb67830c; https://sailsjs.com/documentation/reference/request-req/req-set-locale',
      // defaultsTo: 'en',
    },


    emailConfirmationReminderAlreadySent: {
      type: 'boolean',
      description: 'Отправлено ли напоминание о подтверждение email при регистрации',
      extendedDescription:
        `Письмо-напоминание. Письмо отправляется за 24 часа до истечения срока годности токена 
        на подтверждение адреса электронной почты при регистрации.`
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝


    friends: {collection: 'User'},
    // Входящие запросы на добавление в друзья, это набор пользователей через их исходящие
    // запросы на добавления в друзья
    inboundFriendRequests: {collection: 'User', via: 'outboundFriendRequests'},
    // Исходящие от вас запросы на добавления в друзья, это набор пользователей через их входящие
    // запросы на добавления в друзья
    outboundFriendRequests: {collection: 'User', via: 'inboundFriendRequests'},

    groups: {
      collection: 'Group',
      via: 'users',
      description: `Многие ко Многим (Many-to-Many)
      groups - читаем как: пользователь принадлежит к группе, users - ключ для объединяющей таблицы`
    },

    kennels: {
      collection: 'kennel',
      via: 'users',
      dominant: true
    },
    },
};
