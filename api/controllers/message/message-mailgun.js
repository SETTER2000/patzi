module.exports = {


  friendlyName: 'Message mailgun',


  description: 'Входящие сообщения для сайта, пересылаемые сервисом Mailgun.',


  inputs: {

    sender: {
      // required: true,
      type: 'string',
      // isEmail: true,
      description: 'The email address for the new account, e.g. m@example.com.'
      // extendedDescription: 'Must be a valid email address.',
    },

    recipient: {
      // required: true,
      type: 'string',
      // maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.'
    },

    subject: {
      // required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The user\'s full name.'
    },

    bodyPlain: {
      // required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The user\'s full name.'
    },

    bodyWithoutQuotes: {
      // required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The user\'s full name.'
    }
  },


  exits: {

    success: {
      description: 'Message successfully received.'
    },

    invalid: {
      responseType: 'badRequest',
      description: 'Unfortunately we could not accept your message.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
      'parameters should have been validated/coerced _before_ they were sent.'
    },
    emailAlreadyInUse: {
      statusCode: 409,
      description: 'Указанный адрес электронной почты уже используется.'
    }

  },


  fn: async function (inputs, exits) {

    let newEmailAddress = inputs.sender.toLowerCase();

    return exits.success(
      {
        sender: newEmailAddress,
        recipient: inputs.recipient,
        subject: inputs.subject,
        bodyPlain: inputs.bodyPlain,
        bodyWithoutQuotes: inputs.bodyWithoutQuotes,
      }
    );
  }
};
