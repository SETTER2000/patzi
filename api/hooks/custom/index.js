/**
 * custom hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * Определение крючка. Расширяет паруса, добавляя теневые маршруты, неявные действия и / или
 * логику инициализации.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineCustomHook(sails) {

  return {

    /**
     * Runs when a Sails app loads/lifts.
     * Запускается, когда приложение Sails загружается / поднимается.
     */
    initialize: async function () {

      sails.log.info('Initializing hook... (`api/hooks/custom`)');

      // Check Stripe/Mailgun configuration (for billing and emails).
      // Проверьте настройки Stripe / Mailgun (для выставления счетов и электронной почты).
      var IMPORTANT_STRIPE_CONFIG = ['stripeSecret', 'stripePublishableKey'];
      var IMPORTANT_MAILGUN_CONFIG = ['mailgunSecret', 'mailgunDomain', 'internalEmailAddress'];
      var isMissingStripeConfig = _.difference(IMPORTANT_STRIPE_CONFIG, Object.keys(sails.config.custom)).length > 0;
      var isMissingMailgunConfig = _.difference(IMPORTANT_MAILGUN_CONFIG, Object.keys(sails.config.custom)).length > 0;

      if (isMissingStripeConfig || isMissingMailgunConfig) {

        let missingFeatureText = isMissingStripeConfig && isMissingMailgunConfig ? 'billing and email' : isMissingStripeConfig ? 'billing' : 'email';
        let suffix = '';
        if (_.contains(['silly'], sails.config.log.level)) {
          suffix =
`
> Совет: Чтобы исключить конфиденциальные учетные данные из системы контроля версий, используйте:
> • config/local.js (for local development)
> • environment variables (for production)
>
> Если вы хотите проверить их в системе контроля версий, используйте:
> • config/custom.js  (for development)
> • config/env/staging.js  (for staging)
> • config/env/production.js  (for production)
>
> (See https://sailsjs.com/docs/concepts/configuration for help configuring Sails.)
`;
        }

        let problems = [];
        if (sails.config.custom.stripeSecret === undefined) {
          problems.push('No `sails.config.custom.stripeSecret` was configured.');
        }
        if (sails.config.custom.stripePublishableKey === undefined) {
          problems.push('No `sails.config.custom.stripePublishableKey` was configured.');
        }
        if (sails.config.custom.mailgunSecret === undefined) {
          problems.push('No `sails.config.custom.mailgunSecret` was configured.');
        }
        if (sails.config.custom.mailgunDomain === undefined) {
          problems.push('No `sails.config.custom.mailgunDomain` was configured.');
        }
        if (sails.config.custom.internalEmailAddress === undefined) {
          problems.push('No `sails.config.custom.internalEmailAddress` was configured.');
        }

        sails.log.verbose(
`Some optional settings have not been configured yet:
---------------------------------------------------------------------
${problems.join('\n')}

Until this is addressed, this app's ${missingFeatureText} features
will be disabled and/or hidden in the UI.

 [?] If you're unsure or need advice, come by https://sailsjs.com/support
---------------------------------------------------------------------${suffix}`);
      }//ﬁ

      // Set an additional config keys based on whether Stripe config is available.
      // This will determine whether or not to enable various billing features.
      // Установить дополнительные ключи конфигурации в зависимости от того, доступен ли Stripe config.
      // Это определит, включать или нет различные функции выставления счетов.
      sails.config.custom.enableBillingFeatures = !isMissingStripeConfig;

      // After "sails-hook-organics" finishes initializing, configure Stripe
      // and Mailgun packs with any available credentials.
      // После завершения инициализации "sails-hook-organics" настроить Stripe
      // и пакеты Mailgun с любыми доступными учетными данными.
      sails.after('hook:organics:loaded', ()=>{

        sails.helpers.stripe.configure({
          secret: sails.config.custom.stripeSecret
        });

        sails.helpers.mailgun.configure({
          secret: sails.config.custom.mailgunSecret,
          domain: sails.config.custom.mailgunDomain,
          from: sails.config.custom.fromEmailAddress,
          fromName: sails.config.custom.fromName,
        });

      });//_∏_

      // ... Any other app-specific setup code that needs to run on lift,
      // even in production, goes here ...
      // ... Любой другой специфичный для приложения код установки, который нужно запустить на лифте,
      // даже в производстве, идет сюда ...
    },


    routes: {

      /**
       * Runs before every matching route.
       * Запускается перед каждым соответствующим маршрутом.
       * @param {Ref} req
       * @param {Ref} res
       * @param {Function} next
       */
      before: {
        '/*': {
          skipAssets: true,
          fn: async function(req, res, next){

            var url = require('url');

            // First, if this is a GET request (and thus potentially a view),
            // attach a couple of guaranteed locals.
            // Во-первых, если это запрос GET (и, следовательно, возможно, представление),
            // прикрепить пару гарантированных местных жителей.
            if (req.method === 'GET') {

              // The  `_environment` local lets us do a little workaround to make Vue.js
              // run in "production mode" without unnecessarily involving complexities
              // with webpack et al.)
              // `_environment` local позволяет нам сделать небольшой обходной путь для создания Vue.js
              // запустить в «производственном режиме» без лишних сложностей
              // с веб-пакетом и др.)
              if (res.locals._environment !== undefined) {
                throw new Error('Cannot attach Sails environment as the view local `_environment`, because this view local already exists!  (Is it being attached somewhere else?)');
              }
              res.locals._environment = sails.config.environment;

              // The `me` local is set explicitly to `undefined` here just to avoid having to
              // do `typeof me !== 'undefined'` checks in our views/layouts/partials.
              // > Note that, depending on the request, this may or may not be set to the
              // > logged-in user record further below.
              // Локальный `me` явно установлен на` undefined`, чтобы избежать необходимости
              // делаем `typeof me! == 'undefined'` для проверки наших представлений
              // / раскладок / частичных операций.
              //> Обратите внимание, что в зависимости от запроса это может быть или не быть установлено в
              //> залогиненная запись пользователя ниже.
              if (res.locals.me !== undefined) {
                throw new Error('Cannot attach view local `me`, because this view local already exists!  (Is it being attached somewhere else?)');
              }
              res.locals.me = undefined;
            }//ﬁ

            // Next, if we're running in our actual "production" or "staging" Sails
            // environment, check if this is a GET request via some other host,
            // for example a subdomain like `webhooks.` or `click.`.  If so, we'll
            // automatically go ahead and redirect to the corresponding path under
            // our base URL, which is environment-specific.
            // > Note that we DO NOT redirect virtual socket requests and we DO NOT
            // > redirect non-GET requests (because it can confuse some 3rd party
            // > platforms that send webhook requests.)  We also DO NOT redirect
            // > requests in other environments to allow for flexibility during
            // > development (e.g. so you can preview an app running locally on
            // > your laptop using a local IP address or a tool like ngrok, in
            // > case you want to run it on a real, physical mobile/IoT device)
            // Далее, если мы работаем в наших реальных "производственных" или "постановочных" парусах
            // окружение, проверить, является ли это запросом GET через какой-либо другой хост,
            // например, субдомен типа `webhooks` или` click`. Если так, мы будем
            // автоматически идти вперед и перенаправить на соответствующий путь в
            // наш базовый URL, который зависит от среды.
            //> Обратите внимание, что мы НЕ перенаправляем запросы виртуальных сокетов и НЕ
            //> перенаправить не-GET запросы (потому что это может запутать какую-то третью сторону
            //> платформы, которые отправляют запросы webhook.) Мы также НЕ перенаправляем
            //> запросы в других средах для обеспечения гибкости во время
            //> разработка (например, чтобы вы могли просмотреть приложение, запущенное локально на
            //> ваш ноутбук, используя локальный IP-адрес или такой инструмент, как ngrok, в
            //> если вы хотите запустить его на реальном физическом мобильном устройстве / IoT)
            var configuredBaseHostname;
            try {
              configuredBaseHostname = url.parse(sails.config.custom.baseUrl).host;
            } catch (unusedErr) { /*…*/}
            if ((sails.config.environment === 'staging' || sails.config.environment === 'production') && !req.isSocket && req.method === 'GET' && req.hostname !== configuredBaseHostname) {
              sails.log.info('Redirecting GET request from `'+req.hostname+'` to configured expected host (`'+configuredBaseHostname+'`)...');
              return res.redirect(sails.config.custom.baseUrl+req.url);
            }//•

            // No session? Proceed as usual.
            // (e.g. request for a static asset)
            // Нет сессии? Действуйте как обычно.
            // (например, запрос на статический актив)
            if (!req.session) { return next(); }

            // Not logged in? Proceed as usual.
            // Не вошли? Действуйте как обычно.
            if (!req.session.userId) { return next(); }

            // Otherwise, look up the logged-in user.
            // В противном случае ищите вошедшего в систему пользователя.
            var loggedInUser = await User.findOne({
              id: req.session.userId
            });
console.log('loggedInUser: ', req.me);
            // If the logged-in user has gone missing, log a warning,
            // wipe the user id from the requesting user agent's session,
            // and then send the "unauthorized" response.
            // Если зарегистрированный пользователь пропал без вести, записать предупреждение,
            // стираем идентификатор пользователя из сеанса запрашивающего агента пользователя,
            // а затем отправить «неавторизованный» ответ.
            if (!loggedInUser) {
              sails.log.warn('Каким-то образом учётная запись для вошедшего в систему пользователя (`'+req.session.userId+'`) без вести пропала....');
              delete req.session.userId;
              return res.unauthorized();
            }

            // Add additional information for convenience when building top-level navigation.
            // (i.e. whether to display "Dashboard", "My Account", etc.)
            // Добавляем дополнительную информацию для удобства при построении навигации верхнего уровня.
            // (т. е. отображать ли «Панель инструментов», «Моя учетная запись» и т. д.)
            if (!loggedInUser.password || loggedInUser.emailStatus === 'unconfirmed') {
              loggedInUser.dontDisplayAccountLinkInNav = true;
            }

            // Expose the user record as an extra property on the request object (`req.me`).
            // > Note that we make sure `req.me` doesn't already exist first.
            // Предоставляем запись пользователя как дополнительное свойство объекта запроса (`req.me`).
            //> Обратите внимание, что мы уверены, что `req.me` сначала не существует.
            if (req.me !== undefined) {
              throw new Error('Невозможно присоединить зарегистрированного пользователя к req.me, ' +
                'поскольку это свойство уже существует! (Это прикреплено где-то еще?)');
            }
            req.me = loggedInUser;

            // If our "lastSeenAt" attribute for this user is at least a few seconds old, then set it
            // to the current timestamp.
            //
            // (Note: As an optimization, this is run behind the scenes to avoid adding needless latency.)
            // Если наш атрибут «lastSeenAt» для этого пользователя имеет возраст не менее нескольких секунд,
            // установите его к текущей отметке времени.
            //
            // (Примечание: как оптимизация, она запускается за кулисами, чтобы избежать добавления ненужных задержек.)
            var MS_TO_BUFFER = 60*1000;
            var now = Date.now();
            if (loggedInUser.lastSeenAt < now - MS_TO_BUFFER) {
              User.updateOne({id: loggedInUser.id})
              .set({ lastSeenAt: now })
              .exec((err)=>{
                if (err) {
                  sails.log.error('Background task failed: Could not update user (`'+loggedInUser.id+'`) with a new `lastSeenAt` timestamp.  Error details: '+err.stack);
                  return;
                }//•
                sails.log.verbose('Updated the `lastSeenAt` timestamp for user `'+loggedInUser.id+'`.');
                // Nothing else to do here.
              });//_∏_  (Meanwhile...)
            }//ﬁ


            // If this is a GET request, then also expose an extra view local (`<%= me %>`).
            // > Note that we make sure a local named `me` doesn't already exist first.
            // > Also note that we strip off any properties that correspond with protected attributes.
            // Если это запрос GET, то также предоставляем дополнительный локальный вид (`<% = me%>`).
            //> Обратите внимание, что мы уверены, что локальный файл с именем `me` не существует первым.
            //> Также обратите внимание, что мы удаляем любые свойства, которые соответствуют защищенным атрибутам.
            if (req.method === 'GET') {
              if (res.locals.me !== undefined) {
                throw new Error('Невозможно присоединить зарегистрированного пользователя как локальное ' +
                  'представление `me`, потому что локальное представление уже существует! ' +
                  '(Это прикреплено где-то еще?)');
              }

              // Exclude any fields corresponding with attributes that have `protect: true`.
              // Исключаем любые поля, соответствующие атрибутам, которые имеют `protect: true`.
              var sanitizedUser = _.extend({}, loggedInUser);
              for (let attrName in User.attributes) {
                if (User.attributes[attrName].protect) {
                  delete sanitizedUser[attrName];
                }
              }//∞

              // If there is still a "password" in sanitized user data, then delete it just to be safe.
              // (But also log a warning so this isn't hopelessly confusing.)
              // Если в очищенных пользовательских данных все еще есть «пароль»,
              // то удалите его просто для безопасности.
              // (но также регистрируйте предупреждение, чтобы это не сбивало с толку.)
              if (sanitizedUser.password) {
                sails.log.warn('Зарегистрированная пользовательская запись имеет свойство `пароль`, ' +
                  'но оно все еще было там после удаления всех свойств, которые соответствуют атрибутам' +
                  '` protect: true` в модели User. Так что, чтобы быть в безопасности, все равно удалите свойство ' +
                  '`password` ...');
                delete sanitizedUser.password;
              }//ﬁ

              res.locals.me = sanitizedUser;

              // Include information on the locals as to whether billing features
              // are enabled for this app, and whether email verification is required.
              // Включаем информацию о местных жителей относительно того, есть ли функции выставления счетов
              // включены для этого приложения, и требуется ли подтверждение электронной почты.
              res.locals.isBillingEnabled = sails.config.custom.enableBillingFeatures;
              res.locals.isEmailVerificationRequired = sails.config.custom.verifyEmailAddresses;

            }//ﬁ

            // Prevent the browser from caching logged-in users' pages.
            // (including w/ the Chrome back button)
            // > • https://mixmax.com/blog/chrome-back-button-cache-no-store
            // > • https://madhatted.com/2013/6/16/you-do-not-understand-browser-history
            // Запрещаем браузеру кэшировать страницы зарегистрированных пользователей.
            // (включая кнопку возврата Chrome)
            //> • https://mixmax.com/blog/chrome-back-button-cache-no-store
            //> • https://madhatted.com/2013/6/16/you-do-not-understand-browser-history
            res.setHeader('Cache-Control', 'no-cache, no-store');
            console.log('loggedInUser 2: ', req.me);
            return next();
          }
        }
      }
    }


  };

};
