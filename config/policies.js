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

  // '*': true,
  '*': ['is-logged-in','localize'],

  // Bypass the `is-logged-in` policy for:
  'groups/*':'is-super-admin',
  'users/*':'is-admin-or-is-super-admin',
  'topics/*':'is-admin-or-is-super-admin',
  'titles/*':'is-admin-or-is-super-admin',
  // 'users/*':'is-super-admin',
  'users/list-form/*':'is-all-group',
  'users/update-ratio':'is-all-group',
  'users/list-status':true,
  'users/list-expert':'is-all-group',
  'comments/add-comment':'is-all-group',
  'kennels/*':'is-all-group',
  'topics/list':'is-all-group',
  'posts/post-count':true,
  'files/*':'is-homepage',
  // 'posts/*':true,


  // 'kennels/*':['is-super-admin','is-admin'],

  'groups/is-breeder':true,
  'groups/is-owner':true,
  'entrance/*': true,
  'account/logout': true,
  'message/message-mailgun': true,
  //'security/grant-csrf-token': true,
  'view-homepage-or-redirect': true,
  'deliver-contact-form-message': true,

};
