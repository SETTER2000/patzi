/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /**************************************************************************
   *                                                                         *
   * The base URL to use during development.                                 *
   *                                                                         *
   * • No trailing slash at the end                                          *
   * • `http://` or `https://` at the beginning.                             *
   *                                                                         *
   * > This is for use in custom logic that builds URLs.                     *
   * > It is particularly handy for building dynamic links in emails,        *
   * > but it can also be used for user-uploaded images, webhooks, etc.      *
   *                                                                         *
   **************************************************************************/
  baseUrl: 'http://localhost:1337',

  /**************************************************************************
   *                                                                         *
   * The TTL (time-to-live) for various sorts of tokens before they expire.  *
   *                                                                         *
   **************************************************************************/
  passwordResetTokenTTL: 24*60*60*1000,// 24 hours
  emailProofTokenTTL:    24*60*60*1000,// 24 hours

  /**************************************************************************
   *                                                                         *
   * The extended length that browsers should retain the session cookie      *
   * if "Remember Me" was checked while logging in.                          *
   *                                                                         *
   **************************************************************************/
  rememberMeCookieMaxAge: 30*24*60*60*1000, // 30 days

  /**************************************************************************
   *                                                                         *
   * Automated email configuration                                           *
   *                                                                         *
   * Sandbox Mailgun credentials for use during development, as well as any  *
   * other default settings related to "how" and "where" automated emails    *
   * are sent.
   *
   * Автоматическая настройка электронной почты *
      * *
      * Учетные данные песочницы Mailgun для использования во время разработки, а также любые *
      * другие настройки по умолчанию, относящиеся к «как» и «где» автоматическим письмам *
      * посланы.
   *                                                                         *
   * (https://app.mailgun.com/app/domains)                                   *
   *                                                                         *
   **************************************************************************/
  mailgunDomain: 'sandbox8de4a5908f2e4d85a8ea06f4b585b69c.mailgun.org',
  mailgunSecret: 'key-4bb01d6f085b327149c0dc8226f8763c',
  //--------------------------------------------------------------------------
  // /\  Configure these to enable support for automated emails.
  // ||  (Important for password recovery, verification, contact form, etc.)
  //--------------------------------------------------------------------------

  // The sender that all outgoing emails will appear to come from.
  // Отправитель, от которого будут исходить все исходящие письма.
  fromEmailAddress: 'lphp@mail.ru',
  fromName: 'The Poale Ell Team',

  // Email address for receiving support messages & other correspondences.
  // Адрес электронной почты для получения сообщений поддержки и другой корреспонденции.
  internalEmailAddress: 'ins09@mail.ru',

  // Whether to require proof of email address ownership any time a new user
  // signs up, or when an existing user attempts to change their email address.
  // Требовать ли подтверждения владения адресом электронной почты в любое время, когда новый пользователь
  // регистрируется, или когда существующий пользователь пытается изменить свой адрес электронной почты.
  verifyEmailAddresses: true,

  /**************************************************************************
   *                                                                         *
   * Billing & payments configuration
   * * Настройка биллинга и платежей
   *                                                                         *
   * (https://dashboard.stripe.com/account/apikeys)                          *
   *                                                                         *
   **************************************************************************/
  stripePublishableKey: 'pk_test_8KuhQJFhYBuRlXga9rXeUpiW00tQzsodOT',
  stripeSecret: 'sk_test_AFRysKkBtj3HTE8n7VimMo0b00UE2pJBmk',
  //--------------------------------------------------------------------------
  // /\  Configure these to enable support for billing features.
  // ||  (Or if you don't need billing, feel free to remove them.)
  //--------------------------------------------------------------------------

  /***************************************************************************
   *                                                                          *
   * Any other custom config this Sails app should use during development.    *
   *                                                                          *
   ***************************************************************************/
  // …
  googleMapKey: 'AIzaSyCi1WzkP0B6eptXv8PRt4UrmocL7cieOiI',
};
