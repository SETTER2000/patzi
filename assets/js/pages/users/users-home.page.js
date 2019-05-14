parasails.registerPage('users-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    value:'',
    option: Array({
      value: 'Option1',
      label: 'Option1'
    }, {
      value: 'Option2',
      label: 'Option2'
    }),
    cols: [
      {
        label: 'Name222',
        field: 'name',
      },
      {
        label: 'Age',
        field: 'age',
        type: 'number',
      },
      {
        label: 'Created On',
        field: 'createdAt',
        type: 'date',
        dateInputFormat: 'YYYY-MM-DD',
        dateOutputFormat: 'MMM Do YY',
      },
      {
        label: 'Percent',
        field: 'score',
        type: 'percentage',
      }],
    rws: [
      {id: 1, name: "John555", age: 20, createdAt: '201-10-31:9: 35 am', score: 0.03343},
      {id: 2, name: "Jane", age: 24, createdAt: '2011-10-31', score: 0.03343},
      {id: 3, name: "Susan", age: 16, createdAt: '2011-10-30', score: 0.03343},
      {id: 4, name: "Chris", age: 55, createdAt: '2011-10-11', score: 0.05343},
      {id: 5, name: "Dan", age: 40, createdAt: '2011-10-21', score: 0.03343},
      {id: 6, name: "John", age: 20, createdAt: '2011-10-31', score: 0.03343},
    ]
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
  }
});
