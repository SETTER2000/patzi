module.exports = {


  friendlyName: 'View account overview',


  description: 'Display "Account Overview" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/account/account-overview',
    }

  },


  fn: async function (inputs, exits) {
    // Бибилиотека Node.js
    const url = require('url');
    let account = await User.findOne({id:this.req.me.id});

    account.imageSrc = url.resolve(sails.config.custom.baseUrl, `/api/v1/account/${account.id}`);
    // ... затем мы удаляем наш файловый дескриптор
    delete account.imageUploadFD;
    // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию
    delete account.imageUploadMime;



    // Respond with view.
    return exits.success({
      seo: {
        description: `Аккаунт`,
        title: `Аккаунт`,
        canonical:`https://${this.req.headers.host}${this.req.originalUrl}`
      },
      account,
      currentSection: 'account',
      stripePublishableKey: sails.config.custom.enableBillingFeatures? sails.config.custom.stripePublishableKey : undefined,

    });
    // If billing features are enabled, include our configured Stripe.js
    // public key in the view locals.  Otherwise, leave it as undefined.
    // return {
    //   currentSection: 'account',
    //   stripePublishableKey: sails.config.custom.enableBillingFeatures? sails.config.custom.stripePublishableKey : undefined,
    // };

  }


};
