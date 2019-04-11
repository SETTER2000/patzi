module.exports = {


  friendlyName: 'Upload thing',


  description: '',

  files: ['photo'],
  inputs: {
    photo: {
      type: 'ref',
      description: 'Uploaded file stream.',
      required: true
    },
    label: {
      type: 'string'
    }
  },


  exits: {},


  fn: async function (inputs, exits) {
    let info = await sails.uploadOne(inputs.photo);
    console.log(info);

    await Thing.create({
      label: inputs.label,
      owner: this.req.me.id
    });
    return exits.success();

  }


};
