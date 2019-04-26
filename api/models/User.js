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
      description: 'Whether this user is a "super admin" with extra permissions, etc.',
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

So, while this \`isSuperAdmin\` demarcation might not be the right approach forever, it's a good place to start.`
    },

    passwordResetToken: {
      type: 'string',
      description: 'A unique token used to verify the user\'s identity when recovering a password.  Expires after 1 use, or after a set amount of time has elapsed.'
    },

    passwordResetTokenExpiresAt: {
      type: 'number',
      description: 'A JS timestamp (epoch ms) representing the moment when this user\'s `passwordResetToken` will expire (or 0 if the user currently has no such token).',
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
      description: 'Whether this user has a default billing card hooked up as their payment method.',
      extendedDescription:
        `More specifically, this indcates whether this user record's linked customer entry in Stripe has
a default payment source (i.e. credit card).  Note that a user have a \`stripeCustomerId\`
without necessarily having a billing card.`
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
    gravr: {
      type: 'string',
      description: 'Email адрес зарегистрированый в граватар сервисе',
      example: 'my-email@gmail.com',
      moreInfoUrl: 'https://ru.gravatar.com/'
    },
    preferredLocale: {
      type: 'string',
      description: 'Предпочтительный язык',
      example: 'ru',
      moreInfoUrl: 'https://gist.github.com/mikermcneil/0af155ed546f3ddf164b4885fb67830c; https://sailsjs.com/documentation/reference/request-req/req-set-locale',
      defaultsTo: 'ru',

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
    outboundFriendRequests: {collection: 'User', via: 'inboundFriendRequests'}
  },


};
