/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {"confirmEmail":{"verb":"GET","url":"/email/confirm","args":["token"]},"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password","args":["password"]},"updateLanguage":{"verb":"PUT","url":"/api/v1/account/update-language","args":["language"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName","emailAddress"]},"updateBillingCard":{"verb":"PUT","url":"/api/v1/account/update-billing-card","args":["stripeToken","billingCardLast4","billingCardBrand","billingCardExpMonth","billingCardExpYear"]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","rememberMe"]},"signup":{"verb":"POST","url":"/api/v1/entrance/signup","args":["emailAddress","password","fullName"]},"sendPasswordRecoveryEmail":{"verb":"POST","url":"/api/v1/entrance/send-password-recovery-email","args":["emailAddress"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"deliverContactFormMessage":{"verb":"POST","url":"/api/v1/deliver-contact-form-message","args":["emailAddress","topic","fullName","message"]},"destroyOneLitter":{"verb":"DELETE","url":"/api/v1/litters/destroy-one-litter","args":["id"]},"uploadLitter":{"verb":"POST","url":"/api/v1/litters/upload-litter","args":["photo","label","title","subtitle","born","gender","type","ourPreliminaryPrice","preliminaryPrice","currency"]},"downloadPhoto":{"verb":"GET","url":"/api/v1/things/:id","args":["id"]},"reservePuppy":{"verb":"PUT","url":"/api/v1/litters/:id/puppy","args":["id","expectedReturnAt","preliminaryPrice"]},"uploadThing":{"verb":"POST","url":"/api/v1/things/upload-thing","args":["photo","label","title","subtitle"]},"destroyOneThing":{"verb":"DELETE","url":"/api/v1/things/destroy-one-thing","args":["id"]},"addFriends":{"verb":"POST","url":"/api/v1/friends/add-friends","args":["friends"]},"approveFriend":{"verb":"POST","url":"/api/v1/friends/approve-friend","args":[]},"messageMailgun":{"verb":"POST","url":"/api/v1/message/message-mailgun","args":["attach","sender","recipient","subject","bodyPlain","bodyWithoutQuotes","filename"]},"uploadGroup":{"verb":"POST","url":"/api/v1/group/upload-group","args":["photo","label","subtitle"]},"downloadGroup":{"verb":"GET","url":"/api/v1/group/:id","args":["id"]}}
  /* eslint-enable */

});
