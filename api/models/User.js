module.exports = {
  schema: true,
  attributes: {
    see: {
      type: 'boolean',
      defaultsTo: false,
      description: `Флаг видимости пользователя. Виден или нет. По умолчанию не виден.`
    },
    online: {
      type: 'boolean',
      defaultsTo: false,
      description: `Флаг. Показывает онлайн ли пользователь.`
    },
    onlineDate: {
      type: 'ref',
      description: ``
    },
    onlineDateIn: {
      type: 'ref',
      description: `Время входа пользователя на сайт.`
    },
    onlineDateOut: {
      type: 'ref',
      description: `Время выхода пользователя с сайта.`
    },
    fullName: {
      type: 'string',
      required: true,
      description: 'Полное представление имени пользователя.',
      maxLength: 120,
      example: 'Mary Sue van der McHenst'
    },
    fullNameEn: {
      type: 'string',
      description: 'Полное представление имени пользователя в транслите. Генерируется автоматически в контроллере',
      maxLength: 120,
      example: 'Mary Sue van der McHenst'
    },
    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'mary.sue@example.com'
    },
    description: {
      type: 'string',
      maxLength: 1700,
      description: 'Описание пользователя',
      example: 'Отличный заводчик и владелец.',
      // moreInfoUrl: 'https://ru.gravatar.com/'
    },
    emailStatus: {
      type: 'string',
      isIn: ['unconfirmed', 'change-requested', 'confirmed'],
      defaultsTo: 'confirmed',
      description: 'Статус подтверждения адреса электронной почты пользователя.',
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
      description: 'Неподтвержденный адрес электронной почты, на который этот пользователь хочет изменить (при необходимости).'
    },
    password: {
      type: 'string',
      description: 'Надежно хешируется представление пароля пользователя для входа.',
      protect: true,
      example: '$2a$10$AmUxHrObSpUhf7oefkPn0X7XCIZK2x.mFb2ISG'
    },
    isAdmin: {
      type: 'boolean',
      description: 'Является ли этот пользователь «администратором»',
      defaultsTo: false
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
для начала.`
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
      description: `Псевдослучайный, вероятностно-уникальный токен для использования в
       электронных письмах с подтверждением аккаунта.`
    },
    emailProofTokenExpiresAt: {
      type: 'number',
      description: `Метка времени JS (эпоха мс), представляющая момент истечения срока действия
      \`emailProofToken\` этого пользователя (или 0, если у пользователя в настоящее время нет
      такого токена).`,
      example: 1502844074211
    },
    stripeCustomerId: {
      type: 'string',
      protect: true,
      description: 'Идентификатор записи клиента в Stripe, связанной с этим пользователем (или пустая строка, если этот пользователь не связан с клиентом Stripe - например, если функции биллинга не включены).',
      extendedDescription:
        `То, что это значение установлено, не обязательно означает, что у этого пользователя есть платежная карта.
Это просто означает, что у них есть запись клиента в Stripe, которая может иметь или не иметь платежную карту.`
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
      defaultsTo: 'avatar'
    },
    dateBirth: {
      type: 'string',
      description: 'Дата рождения.'
    },
    dateDeath: {
      type: 'string',
      description: 'Дата смерти.'
    },
    gravatar: {
      type: 'string',
      description: 'Email адрес зарегистрированый в граватар сервисе',
      example: 'my-email@gmail.com',
      moreInfoUrl: 'https://ru.gravatar.com/'
    },
    cover: {
      type: 'number',
      defaultsTo: 0,
      example: 5,
      description: `Номер ключа в массиве фотографий, который определяет главную фотографию альбома.
                    Обложка альбома.`
    },
    avatar: {
      type: 'string',
      description: 'Дескриптор файла Skipper однозначно идентифицирует загруженное изображение.',
      moreInfoUrl: 'https://www.npmjs.com/package/skipper',
      defaultsTo: 'https://d1lyb0stb8az10.cloudfront.net/ava.png'
    },
    images: {
      type: 'ref',
      defaultsTo: [],
      example: [{},{}],
      description: `Коллекция объектов загруженных фотографий с FD `
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
      defaultsTo:'ru',
      example: 'ru',
      moreInfoUrl: 'https://gist.github.com/mikermcneil/0af155ed546f3ddf164b4885fb67830c; https://sailsjs.com/documentation/reference/request-req/req-set-locale',
    },
    phone: {
      type: 'ref',
      description: 'Номера телефонов для связи'
    },
    ratio: {
      type: 'ref',
      defaultsTo: [{litter: 0, letter: 'A'}],
      // example:[{litter:0, letter:'A'}],
      description: 'Массив голосований'
    },
   /* comments: {
      type: 'ref',
      defaultsTo: [],
      example:[{module:'litter', id :'5d5d10e7b48a2107b8f2ce71', images:[{look:2}], puppies:[{look:12},{look:8}]}],
      description: `Массив просмотренных комментариев в разных модулях системы.
      В примере показан пример с использованием модуля litter (модель Litter). В данном случаи в этом
      модули используется две коллекции для сбора комментариев, это images (Массив содержит объекты фотографий
      для пары собак чей помёт представлен. В данный момент этот массив не используется для сбора отзывов.) и
      puppies.
      Puppies - содержит коллекцию фотосессией щенков данного помёта.
      В каждой фотосессии есть коллекция comments, которая содержит объекты комментариев пользователей.
      Именно сумма комментов в этой коллекции и является определяющим фактором показа бейджа с числом
      новых, не просмотренных комментариев (отзывов) за вычетом значения look в конкретной фотосессии
      для конкретного пользователя.
      Пример: puppies[indexPhotoSet].comments.length - puppies[indexPhotoSet].look
      Как это работает:
      При создании фотосессии - в конкретном модуле, например litter, ко всем подтвердившим
      свой email пользователям, а следовательно получившим статус user, добавляется в свойство comments
      модели User, новый объект типа того что в примере. Только все луки (look) обнулены.
      При обновление - т.е. при клики пользователя на один из комментариев, соответствующий look увеличивается на
      один (+1)
      При удалении фотосессии - из коллекции, например puppies, удаляется объект с
      соответствующим индексом (indexPhotoSet)
      При добавлении комментария - данное свойство неизменно!`
    },*/
    emailConfirmationReminderAlreadySent: {
      type: 'boolean',
      description: 'Отправлено ли напоминание о подтверждение email при регистрации',
      extendedDescription:
        `Письмо-напоминание. Письмо отправляется за 24 часа до истечения срока годности токена
        на подтверждение адреса электронной почты при регистрации.`
    },
    friends: {
      collection: 'User'
    },
    inboundFriendRequests: {
      collection: 'User',
      via: 'outboundFriendRequests',
      description: `Входящие запросы на добавление в друзья, это набор пользователей
      через их исходящие запросы на добавления в друзья.`
    },
    outboundFriendRequests: {
      collection: 'User',
      via: 'inboundFriendRequests',
      description: `Исходящие от вас запросы на добавления в друзья, это набор пользователей
      через их входящие запросы на добавления в друзья.`
    },
    groups: {
      collection: 'Group',
      via: 'users',
      description: `Многие ко Многим (Many-to-Many)
      groups - читаем как: пользователь принадлежит к группе доступа, users - ключ для
      объединяющей таблицы.`
    },
    kennels: {
      collection: 'kennel',
      via: 'owners',
      // dominant: true,
      description: `Многие ко Многим (Many-to-Many). В каких питомниках пользователь является совладельцем.`
    },
    kennelBreed: {
      collection: 'kennel',
      via: 'breeder',
      description: `Один ко Многим (One-to-Many). В каком питомнике пользователь является заводчиком.`
    },
    dogs:{
      collection: 'dog',
      via: 'owners',
      description: `Многие ко Многим (Many-to-Many)`
    },
    posts: {
      collection: 'post',
      via: 'experts'
    },
    comments: {
      collection: 'commentary',
      via: 'owner',
      description: 'У пользователя, может быть много комментраиев. One to Many'
    },
    likes: {
      collection: 'like',
      via: 'owner',
      description: 'У пользователя, может быть много лайков. One to Many'
    },
    continent: {
      model: 'continent',
      description: 'Пользователь может принадлежать только одному континенту. One to Many'
    },
    country: {
      model: 'country',
      description: 'Пользователь может принадлежать только одной стране. One to Many'
    },
    region: {
      model: 'region',
      description: 'Питомник может принадлежать только однму региону. One to Many'
    },
    city: {
      model: 'city',
      description: `Питомник может принадлежать только одноу городу. One to Many.`
    }
  },
};
