module.exports = {


  friendlyName: 'Grant csrf token',


  description: '',


  inputs: {},


  exits: {
    success: {description: 'New token was created successfully.'},
    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
      'parameters should have been validated/coerced _before_ they were sent.'
    },
    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    }
  },


  fn: async function (inputs, exits) {
    const req = this.req;

    let hostname = req.hostname;
    let owner = await req.header('x-forwarded-for') || req.connection.remoteAddress;
    let path = `${req.path}`;
    let _csrf = await req.csrfToken();

    await Security.create({
      hostname: hostname,
      owner: owner,
      token: _csrf,
      path: path,
      label: '_csrf'
    })
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();


    await sails.helpers.sendTemplateEmail.with({
      to: sails.config.custom.internalEmailAddress,
      subject: 'Выдан новый csrf токен. Api: sous',
      template: 'email-create-new-token',
      templateData: {
        fullName: hostname || req.me.fullName,
        token: _csrf
      }
    });
    return exits.success({token: _csrf});
  }
};
