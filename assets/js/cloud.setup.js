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
  methods: {"confirmEmail":{"verb":"GET","url":"/email/confirm","args":["token"]},"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password","args":["password"]},"updateLanguage":{"verb":"PUT","url":"/api/v1/account/update-language","args":["language"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName","emailAddress"]},"updateBillingCard":{"verb":"PUT","url":"/api/v1/account/update-billing-card","args":["stripeToken","billingCardLast4","billingCardBrand","billingCardExpMonth","billingCardExpYear"]},"updateAvatar":{"verb":"PUT","url":"/api/v1/account/update-avatar","args":["photo"]},"downloadAvatar":{"verb":"GET","url":"/api/v1/account/:id","args":["id"]},"updateDefaultIcon":{"verb":"PUT","url":"/api/v1/account/update-default-icon","args":["defaultIcon"]},"deleteAvatar":{"verb":"POST","url":"/api/v1/account/delete-avatar","args":["id"]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","rememberMe"]},"signup":{"verb":"POST","url":"/api/v1/entrance/signup","args":["emailAddress","password","fullName"]},"sendPasswordRecoveryEmail":{"verb":"POST","url":"/api/v1/entrance/send-password-recovery-email","args":["emailAddress"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"deliverContactFormMessage":{"verb":"POST","url":"/api/v1/deliver-contact-form-message","args":["emailAddress","topic","fullName","message"]},"destroyOneLitter":{"verb":"DELETE","url":"/api/v1/litters/destroy-one-litter","args":["id"]},"uploadLitter":{"verb":"POST","url":"/api/v1/litters/upload-litter","args":["photo","label","title","dam","sire","subtitle","born","gender","type","ourPreliminaryPrice","preliminaryPrice","currency"]},"downloadPhoto":{"verb":"GET","url":"/api/v1/kennels/:id","args":["id"]},"reservePuppy":{"verb":"PUT","url":"/api/v1/litters/:id/puppy","args":["id","expectedReturnAt","preliminaryPrice"]},"uploadFiles":{"verb":"POST","url":"/api/v1/files/upload","args":["file"]},"createLitter":{"verb":"POST","url":"/api/v1/litters/create-litter","args":["fileList","puppies","letter","born","description","sessionName","dam","sire"]},"list":{"verb":"GET","url":"/api/v1/colors/list","args":[]},"updateCoverAlbum":{"verb":"PUT","url":"/api/v1/litters/update-cover-album","args":["cover","id"]},"listLetter":{"verb":"GET","url":"/api/v1/litters/list-letter","args":[]},"updateSessionName":{"verb":"POST","url":"/api/v1/litters/update-session-name","args":["id","sessionName"]},"uploadThing":{"verb":"POST","url":"/api/v1/things/upload-thing","args":["photo","label","title","subtitle"]},"destroyOneThing":{"verb":"DELETE","url":"/api/v1/things/destroy-one-thing","args":["id"]},"addFriends":{"verb":"POST","url":"/api/v1/friends/add-friends","args":["friends"]},"approveFriend":{"verb":"POST","url":"/api/v1/friends/approve-friend","args":[]},"messageMailgun":{"verb":"POST","url":"/api/v1/message/message-mailgun","args":["attach","sender","recipient","subject","bodyPlain","bodyWithoutQuotes","filename"]},"uploadGroup":{"verb":"POST","url":"/api/v1/groups/upload-group","args":["photo","label","subtitle"]},"downloadGroup":{"verb":"GET","url":"/api/v1/groups/:id","args":["id"]},"destroyOneGroup":{"verb":"DELETE","url":"/api/v1/groups/destroy-one-group","args":["id"]},"updateGroup":{"verb":"PUT","url":"/api/v1/groups/update-group","args":["photo","id","subtitle"]},"updateUserGroup":{"verb":"PUT","url":"/sockets/user/update-user-group","args":["id","groupId"]},"updateSearch":{"verb":"PUT","url":"/api/v1/users/update-search","args":["count","query"]},"updateFilterDate":{"verb":"PUT","url":"/api/v1/users/update-filter-date","args":["count","query"]},"countAll":{"verb":"GET","url":"/sockets/user/count-all","args":[]},"destroyOneUser":{"verb":"DELETE","url":"/sockets/user/destroy-one-user","args":["id"]},"destroyUserGroup":{"verb":"DELETE","url":"/users/destroy-user-group","args":["id","groupId"]},"updateRatio":{"verb":"POST","url":"/api/v1/users/update-ratio","args":["ratios"]},"createContinent":{"verb":"POST","url":"/api/v1/continents/create-continent","args":["photo","label","description"]},"createKennel":{"verb":"POST","url":"/api/v1/kennels/create-kennel","args":["label","file","subtitle","phones","yourKennel","registerNumber","site","continent","country","region","city","address","dateCreate","rightName"]},"destroyOneKennel":{"verb":"DELETE","url":"/api/v1/kennels/destroy-one-kennel","args":["id"]},"createDog":{"verb":"POST","url":"/api/v1/dogs/create-dog","args":["label","fileList","subtitle","kennel","gender","dateBirth","nickname","weight","growth","type","color","stamp"]},"listSire":{"verb":"GET","url":"/api/v1/dogs/list-sire","args":[]},"listDam":{"verb":"GET","url":"/api/v1/dogs/list-dam","args":[]},"destroyOneDog":{"verb":"DELETE","url":"/api/v1/dogs/destroy-one-dog","args":["id"]},"download":{"verb":"GET","url":"/api/v1/files/download/:collection/:id/:folder/:key","args":["collection","folder","id","key"]},"undefined":{"verb":"GET","url":"/undefined","args":[]},"createRegion":{"verb":"POST","url":"/api/v1/region/create-region","args":[]},"listNative":{"verb":"GET","url":"/native","args":[]}}
  /* eslint-enable */

});
