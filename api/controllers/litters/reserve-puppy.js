module.exports = {


  friendlyName: 'Reserve puppy',


  description: '',


  inputs: {

    id: {
      description: 'The id of the thing being borrowed',
      type: 'number',
      required: true
    },

    expectedReturnAt: {
      type: 'number',
      description: 'Метка времени JS (эпоха мс), дата после которой заберут щенка.',
      example: 1502844074211,
      required: true
    },

    preliminaryPrice: {
      type: 'string',
      description: 'Сумма предложенная покупателем за щенка. Предварительная цена.',
      example: '€1000 - €1200',
      required: true
    }

  },


  exits: {},


  fn: async function () {

    // All done.
    return {};

  }


};
