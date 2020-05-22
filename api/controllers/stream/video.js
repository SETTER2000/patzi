module.exports = {


  friendlyName: 'Video',


  description: 'Video stream.',
  inputs: {
    stream: {
      type: 'ref',
      description: `Video stream.`,
      // required: true
    },

  },


  exits: {
    success: {
      anyData: 'Вы транслируете себя в интернет.'
    },
    notFound: {
      description: 'There is no such object with such ID.',
      responseType: 'notFound' // как раньше res.notFound(), сейчас это встроеная функция sails
    },
    forbidden: {
      description: 'The litter who makes this request does not have permission to delete this entry.',
      responseType: 'forbidden' // как раньше res.forbidden(), сейчас это встроеная функция sails
    },
    badRequest: {
      description: 'Error.',
      responseType: 'badRequest'
    }
  },
  fn: async function (inputs, exits) {
    const req = this.req;
    // Убедитесь, что это запрос сокета (не традиционный HTTP)
    if (!req.isSocket) {
      throw 'badRequest';
    }
    await sails.sockets.join(req, 'stream');


    // Бибилиотека Node.js
    // const url = require('url');
    // const moment = require('moment');

    await sails.sockets.broadcast('stream', 'stream-on',inputs.stream, req);
    return exits.success();

  }


};
