module.exports = {


  friendlyName: 'Update billing card',


  description: 'Update the credit card for the logged-in user.',


  inputs: {

    stripeToken: {
      type: 'string',
      example: 'tok_199k3qEXw14QdSnRwmsK99MH',
      description: 'The single-use Stripe Checkout token identifier representing the user\'s payment source (i.e. credit card.)',
      extendedDescription: 'Omit this (or use "") to remove this user\'s payment source.',
      whereToGet: {
        description: 'This Stripe.js token is provided to the front-end (client-side) code after completing a Stripe Checkout or Stripe Elements flow.'
      }
    },

    billingCardLast4: {
      type: 'string',
      example: '4242',
      description: 'Omit if removing card info.',
      whereToGet: {description: 'Credit card info is provided by Stripe after completing the checkout flow.'}
    },

    billingCardBrand: {
      type: 'string',
      example: 'visa',
      description: 'Omit if removing card info.',
      whereToGet: {description: 'Credit card info is provided by Stripe after completing the checkout flow.'}
    },

    billingCardExpMonth: {
      type: 'string',
      example: '08',
      description: 'Omit if removing card info.',
      whereToGet: {description: 'Credit card info is provided by Stripe after completing the checkout flow.'}
    },

    billingCardExpYear: {
      type: 'string',
      example: '2023',
      description: 'Omit if removing card info.',
      whereToGet: {description: 'Credit card info is provided by Stripe after completing the checkout flow.'}
    },

  },


  fn: async function (inputs) {

    // Add, update, or remove the default payment source for the logged-in user's
    // customer entry in Stripe.
    // Добавить, обновить или удалить источник платежа по умолчанию для вошедшего в систему
    // пользователя запись клиента в Stripe.
    var stripeCustomerId = await sails.helpers.stripe.saveBillingInfo.with({
      stripeCustomerId: this.req.me.stripeCustomerId,
      token: inputs.stripeToken || '',
      plan: 'plan_Ewe65L4lpaItOT'
    }).timeout(5000).retry();

    // Update (or clear) the card info we have stored for this user in our database.
    // > Remember, never store complete card numbers-- only the last 4 digits + expiration!
    // > Storing (or even receiving) complete, unencrypted card numbers would require PCI
    // > compliance in the U.S.
    // Обновить (или очистить) информацию о карте, которую мы сохранили для этого пользователя в нашей базе данных.
    //> Помните, никогда не сохраняйте полные номера карт - только последние 4 цифры + срок действия!
    //> Для хранения (или даже получения) полных незашифрованных номеров карт потребуется PCI
    //> соответствие в США
    await User.updateOne({id: this.req.me.id})
      .set({
        stripeCustomerId,
        hasBillingCard: inputs.stripeToken ? true : false,
        billingCardBrand: inputs.stripeToken ? inputs.billingCardBrand : '',
        billingCardLast4: inputs.stripeToken ? inputs.billingCardLast4 : '',
        billingCardExpMonth: inputs.stripeToken ? inputs.billingCardExpMonth : '',
        billingCardExpYear: inputs.stripeToken ? inputs.billingCardExpYear : ''
      });

  }


};
