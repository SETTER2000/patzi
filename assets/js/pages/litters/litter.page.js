parasails.registerPage('litter', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dialogTableVisible: false,
    autoplay:true,
    // fits:'contain',
    // fits:'scale-down',
    fits:'cover',
    items:[
      {label:'Poale Ell Adam',       imageSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2.jpg'},
      {label:'Poale Ell Bell',       imageSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018-11.jpg'},
      {label:'Poale Ell Bazhen',     imageSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/Adam-10m.jpg'},
      {label:'Poale Ell Barthalamew',imageSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018.jpg'},
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

    changeRatio() {
      this.$message({
        message: 'Спасибо за оценку. Ваш голос был учтён!',
        type: 'success'
      });
    },
    showSlider(){
      this.dialogTableVisible= true;
    }
  }
});
