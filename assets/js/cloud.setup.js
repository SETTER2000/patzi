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
  methods: {"confirmEmail":{"verb":"GET","url":"/email/confirm","args":["token"]},"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password","args":["password"]},"updateLanguage":{"verb":"PUT","url":"/api/v1/account/update-language","args":["language"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName","emailAddress"]},"updateBillingCard":{"verb":"PUT","url":"/api/v1/account/update-billing-card","args":["stripeToken","billingCardLast4","billingCardBrand","billingCardExpMonth","billingCardExpYear"]},"updateAvatar":{"verb":"PUT","url":"/api/v1/account/update-avatar","args":["photo"]},"downloadAvatar":{"verb":"GET","url":"/api/v1/account/:id","args":["id"]},"updateDefaultIcon":{"verb":"PUT","url":"/api/v1/account/update-default-icon","args":["defaultIcon"]},"deleteAvatar":{"verb":"POST","url":"/api/v1/account/delete-avatar","args":["id"]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","rememberMe"]},"signup":{"verb":"POST","url":"/api/v1/entrance/signup","args":["emailAddress","password","fullName"]},"sendPasswordRecoveryEmail":{"verb":"POST","url":"/api/v1/entrance/send-password-recovery-email","args":["emailAddress"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"deliverContactFormMessage":{"verb":"POST","url":"/api/v1/deliver-contact-form-message","args":["emailAddress","topic","fullName","message"]},"destroyOneLitter":{"verb":"DELETE","url":"/api/v1/litters/destroy-one-litter","args":["id"]},"uploadLitter":{"verb":"POST","url":"/api/v1/litters/upload-litter","args":["photo","label","title","dam","sire","subtitle","born","gender","type","ourPreliminaryPrice","preliminaryPrice","currency"]},"downloadPhoto":{"verb":"GET","url":"/api/v1/kennels/:id","args":["id"]},"reservePuppy":{"verb":"PUT","url":"/api/v1/litters/:id/puppy","args":["id","expectedReturnAt","preliminaryPrice"]},"uploadFiles":{"verb":"POST","url":"/api/v1/files/upload","args":["file"]},"createLitter":{"verb":"POST","url":"/api/v1/litters/create-litter","args":["fileList","puppies","letter","born","description","sessionName","descriptionPhotoSession","dam","sire"]},"list":{"verb":"GET","url":"/api/v1/colors/list","args":[]},"updateCoverAlbum":{"verb":"PUT","url":"/api/v1/litters/update-cover-album","args":["cover","id"]},"listLetter":{"verb":"GET","url":"/api/v1/litters/list-letter","args":[]},"updateSessionName":{"verb":"POST","url":"/api/v1/litters/update-session-name","args":["id","indexPhotoSet","sessionName"]},"updateSessionDescription":{"verb":"POST","url":"/api/v1/litters/update-session-description","args":["id","indexPhotoSet","descriptionPhotoSession","dateShooting","showShootingDate"]},"updateLitter":{"verb":"POST","url":"/api/v1/litters/update-litter","args":["id","sessionName","born","description","subtitle","descriptionPhotoSession"]},"addSessionPhoto":{"verb":"POST","url":"/api/v1/litters/add-session-photo","args":["year","letter","sessionName","puppies","descriptionPhotoSession","dateShooting","showShootingDate"]},"destroySessionPhoto":{"verb":"POST","url":"/api/v1/litters/destroy-session-photo","args":["id","indexPhotoSet"]},"addPresentation":{"verb":"POST","url":"/api/v1/litters/add-presentation","args":["id","presentationUrl","presentationName","descriptionPresentation"]},"destroyOnePresentation":{"verb":"POST","url":"/api/v1/litters/destroy-one-presentation","args":["id","obj","index"]},"addComment":{"verb":"POST","url":"/api/v1/comments/add-comment","args":["comment","nameModule","parent","indexPhotoSet","userName","instanceModuleId","field","letter"]},"listComment":{"verb":"GET","url":"/api/v1/comments/list-comment/:instanceModuleId/:field","args":["instanceModuleId","field"]},"destroyOneComment":{"verb":"POST","url":"/api/v1/comments/destroy-one-comment","args":["id","nameModule","instanceModuleId","indexPhotoSet","field"]},"updateOneComment":{"verb":"POST","url":"/api/v1/comments/update-one-comment","args":["id","comment","instanceModuleId","field"]},"uploadThing":{"verb":"POST","url":"/api/v1/things/upload-thing","args":["photo","label","title","subtitle"]},"destroyOneThing":{"verb":"DELETE","url":"/api/v1/things/destroy-one-thing","args":["id"]},"addFriends":{"verb":"POST","url":"/api/v1/friends/add-friends","args":["friends"]},"approveFriend":{"verb":"POST","url":"/api/v1/friends/approve-friend","args":[]},"messageMailgun":{"verb":"POST","url":"/api/v1/message/message-mailgun","args":["attach","sender","recipient","subject","bodyPlain","bodyWithoutQuotes","filename"]},"uploadGroup":{"verb":"POST","url":"/api/v1/groups/upload-group","args":["photo","label","subtitle"]},"downloadGroup":{"verb":"GET","url":"/api/v1/groups/:id","args":["id"]},"destroyOneGroup":{"verb":"DELETE","url":"/api/v1/groups/destroy-one-group","args":["id"]},"updateGroup":{"verb":"PUT","url":"/api/v1/groups/update-group","args":["photo","id","subtitle"]},"updateUserGroup":{"verb":"PUT","url":"/sockets/user/update-user-group","args":["id","groupId"]},"updateSearch":{"verb":"PUT","url":"/api/v1/users/update-search","args":["count","query"]},"updateFilterDate":{"verb":"PUT","url":"/api/v1/users/update-filter-date","args":["count","query"]},"countAll":{"verb":"GET","url":"/sockets/user/count-all","args":[]},"destroyOneUser":{"verb":"DELETE","url":"/sockets/user/destroy-one-user","args":["id"]},"destroyUserGroup":{"verb":"DELETE","url":"/users/destroy-user-group","args":["id","groupId"]},"updateRatio":{"verb":"POST","url":"/api/v1/users/update-ratio","args":["ratios"]},"listStatus":{"verb":"GET","url":"/api/v1/users/status","args":[]},"createContinent":{"verb":"POST","url":"/api/v1/continents/create-continent","args":["photo","label","description"]},"createKennel":{"verb":"POST","url":"/api/v1/kennels/create-kennel","args":["label","file","subtitle","phones","yourKennel","registerNumber","site","continent","country","region","city","address","dateCreate","rightName"]},"destroyOneKennel":{"verb":"DELETE","url":"/api/v1/kennels/destroy-one-kennel","args":["id"]},"updateDescriptionImg":{"verb":"PUT","url":"/api/v1/dogs/update-description-img","args":["id","photoId","description","dateTaken"]},"createDog":{"verb":"POST","url":"/api/v1/dogs/create-dog","args":["label","letter","fileList","subtitle","sire","dam","saleDescription","dateBirth","dateDeath","sale","currency","price","kennel","gender","nickname","weight","growth","type","color","stamp","canine","teethCountTop","teethCountBottom","bite","dogTests"]},"getForSale":{"verb":"GET","url":"/dogs/for-sale","args":[]},"listSire":{"verb":"GET","url":"/api/v1/dogs/list-sire","args":[]},"listDam":{"verb":"GET","url":"/api/v1/dogs/list-dam","args":[]},"searchDog":{"verb":"POST","url":"/api/v1/dogs/search-dog","args":["queryString"]},"destroyOneDog":{"verb":"POST","url":"/api/v1/dogs/destroy-one-dog","args":["id"]},"updateDog":{"verb":"PUT","url":"/api/v1/dogs/update-dog","args":["id","label","gender","dateBirth","dateDeath","letter","fileList","imagesArrUrl","subtitle","sire","dam","saleDescription","sale","currency","price","nickname","weight","growth","type","color","stamp","canine","teethCountTop","teethCountBottom","bite","dogTests"]},"destroyManyImg":{"verb":"DELETE","url":"/api/v1/dogs/destroy-many-img","args":["id","removeImage"]},"download":{"verb":"GET","url":"/download/:collection/:id/:folder/:key/:photoSet?","args":["collection","folder","id","key","photoSet"]},"addLike":{"verb":"POST","url":"/api/v1/likes/add-like","args":["like","nameModule","indexPhotoSet","userName","instanceModuleId","field","letter"]},"listLike":{"verb":"GET","url":"/api/v1/likes/list-like/:instanceModuleId/:field","args":["instanceModuleId","field"]},"destroyOneLike":{"verb":"DELETE","url":"/api/v1/likes/destroy-one-like","args":["id"]},"commentLike":{"verb":"POST","url":"/api/v1/likes/comment-like","args":["commentId","like","nameModule","indexPhotoSet","userName","instanceModuleId","field","letter"]},"undefined":{"verb":"GET","url":"/undefined","args":[]},"createRegion":{"verb":"POST","url":"/api/v1/region/create-region","args":[]},"listNative":{"verb":"GET","url":"/native","args":[]}}
  /* eslint-enable */

});
