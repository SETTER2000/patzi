/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * * Ваши маршруты сообщают Sails, что делать каждый раз, когда он получает запрос.
   *
   * Для получения дополнительной информации о настройке пользовательских маршрутов, проверьте:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /': {action: 'view-homepage-or-redirect'},
  'GET /welcome/:unused?': {action: 'dashboard/view-welcome'},
  // Not authorized
  'GET /faq': {view: 'pages/faq', locals: {currentSection: 'faq'}},
  'GET /legal/terms': {view: 'pages/legal/terms'},
  'GET /legal/privacy': {view: 'pages/legal/privacy'},

  'GET /signup': {action: 'entrance/view-signup'},
  'GET /email/confirm': {action: 'entrance/confirm-email'},
  'GET /email/confirmed': {view: 'pages/entrance/confirmed-email'},

  'GET /login': {action: 'entrance/view-login'},
  'GET /password/forgot': {action: 'entrance/view-forgot-password'},
  'GET /password/new': {action: 'entrance/view-new-password'},

  'GET /account': {action: 'account/view-account-overview'},
  'GET /account/password': {action: 'account/view-edit-password'},
  'GET /account/profile': {action: 'account/view-edit-profile'},
  'GET /account/language': {action: 'account/view-edit-language'},
  'GET /account/avatar': {action: 'account/view-edit-avatar'},
  'GET /portfolio/:virtualPageSlug?': {action: 'things/view-available-things'},

  'GET /blog/:virtualPageSlug?': {action: 'blog/view-blog-home'},


  'GET /litters/litter/:id': {action: 'litters/view-litter'},
  'GET /litters/:virtualPageSlug?': {action: 'litters/view-kennel'},

  'GET /contact': {action: 'view-contact', locals: {currentSection: 'contact'}},
  'GET /about': {action: 'view-about', locals: {currentSection: 'about'}},
  'GET /pricing': {action: 'view-pricing', locals: {currentSection: 'pricing'}},

  'GET /groups/:virtualPageSlug?': {action: 'groups/view-group-home', locals: {currentSection: 'groups'}},
  'GET /message/message-home': {action: 'message/view-message-home', locals: {currentSection: 'message'}},
  'GET /users/:virtualPageSlug?': {action: 'users/view-users-home', locals: {currentSection: 'users'}},
  'GET /dogs/:virtualPageSlug?': {action: 'dogs/view-dogs-home', locals: {currentSection: 'dogs'}},

  'GET /kennels/:virtualPageSlug?': {action: 'kennels/view-kennels-home', locals: {currentSection: 'kennels'}},


  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  '/terms': '/legal/terms',
  '/help': '/contact',
  '/logout': '/api/v1/account/logout',

  /*  '/groups': [
    { policy: 'is-super-admin' },
    { view: 'pages/group/group-home' }
  ],*/


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  // Обратите внимание, что в этом приложении к этим конечным точкам API можно получить доступ с
  // помощью методов `Cloud. * ()`
  // из библиотеки Parasails или используя имена этих методов в качестве `action` в <ajax-form>.
  '/api/v1/account/logout': {action: 'account/logout'},
  'PUT     /api/v1/account/update-password': {action: 'account/update-password'},
  'PUT     /api/v1/account/update-language': {action: 'account/update-language'},
  'PUT     /api/v1/account/update-profile': {action: 'account/update-profile'},
  'PUT     /api/v1/account/update-billing-card': {action: 'account/update-billing-card'},
  'PUT     /api/v1/account/update-avatar': {action: 'account/update-avatar'},
  'GET     /api/v1/account/:id': {action: 'account/download-avatar'},
  'PUT     /api/v1/account/update-default-icon': {action: 'account/update-default-icon'},
  'POST    /api/v1/account/delete-avatar': {action: 'account/delete-avatar'},


  'PUT     /api/v1/entrance/login': {action: 'entrance/login'},
  'POST    /api/v1/entrance/signup': {action: 'entrance/signup'},
  'POST    /api/v1/entrance/send-password-recovery-email': {action: 'entrance/send-password-recovery-email'},
  'POST    /api/v1/entrance/update-password-and-login': {action: 'entrance/update-password-and-login'},
  'POST    /api/v1/deliver-contact-form-message': {action: 'deliver-contact-form-message'},
  'DELETE  /api/v1/litters/destroy-one-litter': {action: 'litters/destroy-one-litter'},
  'POST    /api/v1/litters/upload-litter': {action: 'litters/upload-litter'},
  'GET     /api/v1/litters/:id': {action: 'litters/download-photo'},
  'PUT     /api/v1/litters/:id/puppy': {action: 'litters/reserve-puppy'},
  'POST    /litters/files': {action: 'litters/upload-files', csrf: false},

  'POST    /api/v1/things/upload-thing': {action: 'things/upload-thing'},
  'GET     /api/v1/things/:id': {action: 'things/download-photo'},
  'DELETE  /api/v1/things/destroy-one-thing': {action: 'things/destroy-one-thing'},

  'POST    /api/v1/friends/add-friends': {action: 'friends/add-friends'},
  'POST    /api/v1/friends/approve-friend': {action: 'friends/approve-friend'},
  // Здесь только внутренний доступ откроется на получения токена.
  // Если надо открыть извне доступ получению, нужно править sails.config.policies
  //'GET     /sous': {action: 'security/grant-csrf-token'},
  'POST   /api/v1/message/message-mailgun': {action: 'message/message-mailgun', csrf: false},

  'POST   /api/v1/groups/upload-group': {action: 'groups/upload-group'},
  'GET    /api/v1/groups/:id': {action: 'groups/download-group'},
  'DELETE /api/v1/groups/destroy-one-group': {action: 'groups/destroy-one-group'},
  'PUT    /api/v1/groups/update-group': {action: 'groups/update-group'},

  'PUT    /sockets/user/update-user-group': {action: 'users/update-user-group', csrf: false},
  'GET    /sockets/user/list/:count?/:query?': {action: 'users/list'},
  'PUT    /api/v1/users/update-search': {action: 'users/update-search', csrf: false},
  'PUT    /api/v1/users/update-filter-date': {action: 'users/update-filter-date', csrf: false},
  'GET    /sockets/user/count-all': {action: 'users/count-all'},
  'DELETE /sockets/user/destroy-one-user': {action: 'users/destroy-one-user', csrf: false},
  'GET    /api/v1/users/:id': {action: 'users/download-photo'},
  'DELETE /users/destroy-user-group': {action: 'users/destroy-user-group', csrf: false},

  'GET    /api/v1/continents/list': {action: 'continents/list'},
  'GET    /api/v1/continents/:id': {action: 'continents/download-photo'},
  'POST   /api/v1/continents/create-continent': {action: 'continents/create-continent'},

  'GET    /api/v1/kennels/list': { action: 'kennels/list' },
  'POST   /api/v1/kennels/create-kennel': {action: 'kennels/create-kennel', csrf: false},

  'POST   /api/v1/upload/photo': { action: 'upload/photo' , csrf: false},
};
