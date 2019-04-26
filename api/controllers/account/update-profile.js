module.exports = {


  friendlyName: 'Update profile',


  description: 'Update the profile for the logged-in user.',


  inputs: {

    fullName: {
      type: 'string'
    },

    emailAddress: {
      type: 'string'
    },

  },


  exits: {

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

  },


  fn: async function (inputs) {

    var newEmailAddress = inputs.emailAddress;
    if (newEmailAddress !== undefined) {
      newEmailAddress = newEmailAddress.toLowerCase();
    }

    // Determine if this request wants to change the current user's email address,
    // revert her pending email address change, modify her pending email address
    // change, or if the email address won't be affected at all.
    // Определяем, хочет ли этот запрос изменить адрес электронной почты текущего пользователя,
    // вернуть ее ожидающий адрес электронной почты изменить, изменить ее ожидающий адрес
    // электронной почты изменить, или если адрес электронной почты не будет затронут вообще.
    var desiredEmailEffect;// ('change-immediately', 'begin-change', 'cancel-pending-change', 'modify-pending-change', or '')
    if (
      newEmailAddress === undefined ||
      (this.req.me.emailStatus !== 'change-requested' && newEmailAddress === this.req.me.emailAddress) ||
      (this.req.me.emailStatus === 'change-requested' && newEmailAddress === this.req.me.emailChangeCandidate)
    ) {
      desiredEmailEffect = '';
    } else if (this.req.me.emailStatus === 'change-requested' && newEmailAddress === this.req.me.emailAddress) {
      desiredEmailEffect = 'cancel-pending-change';
    } else if (this.req.me.emailStatus === 'change-requested' && newEmailAddress !== this.req.me.emailAddress) {
      desiredEmailEffect = 'modify-pending-change';
    } else if (!sails.config.custom.verifyEmailAddresses || this.req.me.emailStatus === 'unconfirmed') {
      desiredEmailEffect = 'change-immediately';
    } else {
      desiredEmailEffect = 'begin-change';
    }


    // If the email address is changing, make sure it is not already being used.
    // Если адрес электронной почты меняется, убедитесь, что он еще не используется.
    if (_.contains(['begin-change', 'change-immediately', 'modify-pending-change'], desiredEmailEffect)) {
      let conflictingUser = await User.findOne({
        or: [
          { emailAddress: newEmailAddress },
          { emailChangeCandidate: newEmailAddress }
        ]
      });
      if (conflictingUser) {
        throw 'emailAlreadyInUse';
      }
    }


    // Start building the values to set in the db.
    // (We always set the fullName if provided.)
    // Начало построения значений для установки в БД.
    // (Мы всегда устанавливаем fullName, если предоставлено.)
    var valuesToSet = {
      fullName: inputs.fullName,
    };

    switch (desiredEmailEffect) {

      // Change now
      case 'change-immediately':
        _.extend(valuesToSet, {
          emailAddress: newEmailAddress,
          emailChangeCandidate: '',
          emailProofToken: '',
          emailProofTokenExpiresAt: 0,
          emailStatus: this.req.me.emailStatus === 'unconfirmed' ? 'unconfirmed' : 'confirmed'
        });
        break;

      // Begin new email change, or modify a pending email change
      // Начать новое изменение электронной почты или изменить ожидающее изменение электронной почты
      case 'begin-change':
      case 'modify-pending-change':
        _.extend(valuesToSet, {
          emailChangeCandidate: newEmailAddress,
          emailProofToken: await sails.helpers.strings.random('url-friendly'),
          emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
          emailStatus: 'change-requested'
        });
        break;

      // Cancel pending email change
      // Отмена ожидающего изменения электронной почты
      case 'cancel-pending-change':
        _.extend(valuesToSet, {
          emailChangeCandidate: '',
          emailProofToken: '',
          emailProofTokenExpiresAt: 0,
          emailStatus: 'confirmed'
        });
        break;

      // Otherwise, do nothing re: email
      // В противном случае ничего не делать re: email
    }

    // Save to the db
    await User.updateOne({id: this.req.me.id })
    .set(valuesToSet);

    // If this is an immediate change, and billing features are enabled,
    // then also update the billing email for this user's linked customer entry
    // in the Stripe API to make sure they receive email receipts.
    // > Note: If there was not already a Stripe customer entry for this user,
    // > then one will be set up implicitly, so we'll need to persist it to our
    // > database.  (This could happen if Stripe credentials were not configured
    // > at the time this user was originally created.)
    // Если это немедленное изменение и функции биллинга включены,
    // затем также обновляем адрес электронной почты для связанного входа клиента
    // в API Stripe, чтобы убедиться, что они получают квитанции по электронной почте.
    //> Примечание: если для этого пользователя еще не было записи клиента Stripe,
    //> тогда один будет установлен неявно, поэтому нам нужно сохранить его в нашем
    //> база данных. (Это может произойти, если учетные данные Stripe не были настроены
    //> в то время, когда этот пользователь был изначально создан.)
    if(desiredEmailEffect === 'change-immediately' && sails.config.custom.enableBillingFeatures) {
      let didNotAlreadyHaveCustomerId = (! this.req.me.stripeCustomerId);
      let stripeCustomerId = await sails.helpers.stripe.saveBillingInfo.with({
        stripeCustomerId: this.req.me.stripeCustomerId,
        emailAddress: newEmailAddress
      }).timeout(5000).retry();
      if (didNotAlreadyHaveCustomerId){
        await User.updateOne({ id: this.req.me.id })
        .set({
          stripeCustomerId
        });
      }
    }

    // If an email address change was requested, and re-confirmation is required,
    // send the "confirm account" email.
    // Если запрашивается изменение адреса электронной почты и требуется повторное подтверждение,
    // отправить письмо с подтверждением аккаунта
    if (desiredEmailEffect === 'begin-change' || desiredEmailEffect === 'modify-pending-change') {
      await sails.helpers.sendTemplateEmail.with({
        to: newEmailAddress,
        subject: 'Your account has been updated',
        template: 'email-verify-new-email',
        templateData: {
          fullName: inputs.fullName||this.req.me.fullName,
          token: valuesToSet.emailProofToken
        }
      });
    }

  }


};
