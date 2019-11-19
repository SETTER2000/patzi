module.exports = {


  friendlyName: 'Group by',


  description: '',


  inputs: {
    group: {
      type: 'string',
      require: true
    },
    me:{
      type:'ref',
      require:true
    }
  },



  fn: async function (inputs) {

    let groups = await Group.findOne({label: inputs.group}).populate('users');
    console.log('req.me.id:::: ', inputs.me.id);
    console.log('inputs.me.fullName:::: ', inputs.me.fullName);
    console.log('groups:::: ', groups);
    console.log('PLUCK^^^', _.find(groups.users, {fullName: inputs.me.fullName, id: inputs.me.id}));


    return !groups ? false :  _.find(groups.users, {fullName: inputs.me.fullName, id: inputs.me.id});
  }


};

