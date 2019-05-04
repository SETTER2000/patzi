/**
 * Security Settings
 * (sails.config.security)
 *
 * These settings affect aspects of your app's security, such
 * as how it deals with cross-origin requests (CORS) and which
 * routes require a CSRF token to be included with the request.
 *
 * For an overview of how Sails handles security, see:
 * https://sailsjs.com/documentation/concepts/security
 *
 * For additional options and more information, see:
 * https://sailsjs.com/config/security
 *
   Эти настройки влияют на аспекты безопасности вашего приложения, такие как
   * как он обрабатывает запросы между источниками (CORS) и какие
   * маршруты требуют, чтобы токен CSRF был включен в запрос.
   *
   * Обзор того, как Sails управляет безопасностью, смотрите:
   * https://sailsjs.com/documentation/concepts/security
   *
   * Дополнительные параметры и дополнительную информацию см .:
   * https://sailsjs.com/config/security
 */

module.exports.security = {

  /***************************************************************************
  *                                                                          *
  * CORS is like a more modern version of JSONP-- it allows your application *
  * to circumvent browsers' same-origin policy, so that the responses from   *
  * your Sails app hosted on one domain (e.g. example.com) can be received   *
  * in the client-side JavaScript code from a page you trust hosted on _some *
  * other_ domain (e.g. trustedsite.net).                                    *
  *                                                                          *
  * For additional options and more information, see:                        *
  * https://sailsjs.com/docs/concepts/security/cors                          *
  * CORS похож на более современную версию JSONP - она позволяет вашему приложению *
      * обойти политику браузеров с тем же происхождением, чтобы ответы от *
      * Ваше приложение Sails, размещенное на одном домене (например, example.com), можно получить *
      * в клиентском коде JavaScript со страницы, которой вы доверяете, размещенной на _some *
      * другой_ домен (например, доверенный сайт.net). *
      *
      * Дополнительные параметры и дополнительную информацию см .:
      * https://sailsjs.com/docs/concepts/security/cors*
  ***************************************************************************/

  // cors: {
  //   allRoutes: false,
  //   allowOrigins: '*',
  //   allowCredentials: false,
  // },



  /****************************************************************************
  *                                                                           *
  * CSRF protection should be enabled for this application.                   *
  *                                                                           *
  * For more information, see:
   * Защита CSRF должна быть включена для этого приложения. *
      * *
      * Для получения дополнительной информации см .:*
  * https://sailsjs.com/docs/concepts/security/csrf                           *
  *                                                                           *
  ****************************************************************************/

  csrf: true

};
