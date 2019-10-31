module.exports = {


  friendlyName: 'Gen email',


  description: 'Генерируется email из полного имени пользователя.',


  inputs: {
    email: {
      type: 'string',
      description: `Email входящий или пусто`
    },
    fullName: {
      type: 'string',
      description: `Полное имя пользователя, которое берётся за основу создания email.`
    },
    domain: {
      type: 'string',
      defaultsTo:sails.config.custom.mailgunDomain,
      description: `Домен для которого генерится email.`
    }
  },


  fn: async function (inputs) {
    let email = inputs.email;
    let fullName = inputs.fullName;
    fullName = await sails.helpers.translitWord.with({str: fullName});
    return email ? email.toLowerCase() :
      !_.isEmpty(fullName) ? fullName.trim().toLowerCase().split(' ').join('_') + '@' + inputs.domain : '';
  }
};

