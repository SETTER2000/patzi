module.exports = {


  friendlyName: 'Message mailgun',


  description: 'Входящие сообщения для сайта, пересылаемые сервисом Mailgun.',
  // Всегда расположен должен быть прежде всех
  files: ['attach'], // именуем поле, через которое будет передоваться файл при загрузки

  inputs: {

    attach: {
      type: 'ref',
      description: 'Uploaded file stream.',
      // required: true
    },

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
    },

    filename: {
      // required: true,
      type: 'string',
      example: 'doc.txt',
      description: 'Имя вложенного файла.'
    }
  },


  exits: {

    success: {
      description: 'Message successfully received.'
    },

    invalid: {
      responseType: 'badRequest',
      description: 'К сожалению, мы не смогли принять ваше сообщение.',
      extendedDescription: `Если этот запрос был отправлен из графического интерфейса пользователя, запрос
       параметры должны были быть проверены/принудительно _before_ тем как они были отправлены.`
    },
    emailAlreadyInUse: {
      statusCode: 409,
      description: 'Указанный адрес электронной почты уже используется.'
    }

  },


  fn: async function (inputs, exits) {

    // console.log('META: ', inputs.attach);
    const token = await sails.helpers.strings.random('url-friendly');
    let fd = '';
    let type = '';
    let filename = '';
    // Бибилиотека Node.js
    const url = require('url');
    let newEmailAddress = inputs.sender;

    let info = await sails.uploadOne(inputs.attach);




    if (info) {
      fd = info.fd;
      type = info.type;
      filename = info.filename;
    }


    let message = await Message.create({
      imageUploadFD: fd,
      imageUploadMime: type,
      filename: filename,
      sender: newEmailAddress,
      recipient: inputs.recipient,
      subject: inputs.subject,
      bodyPlain: inputs.bodyPlain,
      bodyWithoutQuotes: inputs.bodyWithoutQuotes
    }).fetch();

    await sails.helpers.sendTemplateEmail.with({
      to: sails.config.custom.internalEmailAddress,
      subject: 'Пришло новое сообщение от Mailgun. Api message-mailgun',
      template: 'email-create-new-token',
      templateData: {
        fullName: inputs.subject,
        token: inputs.recipient
      }
    });

    message.imageSrc = message.filename ? url.resolve(sails.config.custom.baseUrl, `/api/v1/message/${message.id}`) : '';
    // ... затем мы удаляем наш файловый дескриптор
    delete message.imageUploadFD;
    // ... удаляем MIME тип, так как внешнему интерфейсу не нужно знать эту информацию
    delete message.imageUploadMime;
    delete message.createdAt;
    delete message.updatedAt;
    delete message.id;

    return exits.success(message);
  }
};
