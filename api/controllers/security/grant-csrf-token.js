module.exports = {


  friendlyName: 'Grant csrf token',


  description: '',


  inputs: {},


  exits: {
    success: { description: 'New token was created successfully.'},
    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request '+
      'parameters should have been validated/coerced _before_ they were sent.'
    },
    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    }
  },


  fn: async function (inputs, exits) {
    let hostname =  this.req.hostname;
    let owner =  hostname;
    let path =  `${this.req.path}`;
    let _csrf = await this.req.csrfToken();

    let newTokenRecord = await Security.create({
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
      subject: 'Выдан новый _csrf токен. ',
      template: 'email-create-new-token',
      templateData: {
        fullName: hostname ||this.req.me.fullName,
        token: _csrf
      }
    });
    return exits.success({token:_csrf});
  }
};
