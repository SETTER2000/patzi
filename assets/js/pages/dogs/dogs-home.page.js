parasails.registerPage('dogs-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    dialogTableVisible: false,
    // fits:'contain',
    // fits:'scale-down',
    fits:'cover',
    items:[
      {name:'Poale Ell Adam',src:'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2.jpg'},
      {name:'Poale Ell Bell',src:'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018-11.jpg'},
      {name:'Poale Ell Bazhen',src:'https://d3a1wbnh2r1l7y.cloudfront.net/Adam-10m.jpg'},
      {name:'Poale Ell Barthalamew',src:'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018.jpg'},
    ],
    litters:[],
    ratio:null,
    colors: ['#99A9BF', '#F7BA2A', '#FF9900'] // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    showSlider(){
      this.dialogTableVisible= true;
    },
    changeRatio() {
      this.$message({
        message: 'Спасибо за оценку. Ваш голос был учтён!',
        type: 'success'
      });
    },



  }
});
