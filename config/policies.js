/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * * Политики - это простые функции, которые выполняются ** перед ** вашими действиями.
   *
   * Для получения дополнительной информации о настройке политик, проверьте:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': ['is-logged-in','localize'],

  // Bypass the `is-logged-in` policy for:
  'groups/*':'is-super-admin',
  'users/*':'is-super-admin',
  'users/update-ratio':'is-all-group',
  'kennels/*':'isAdminOrIsSuperAdmin',
  // 'kennels/*':['is-super-admin','is-admin'],
  'users/list-status':true,
  'entrance/*': true,
  'account/logout': true,
  'message/message-mailgun': true,
  //'security/grant-csrf-token': true,
  'view-homepage-or-redirect': true,
  'deliver-contact-form-message': true,

};
