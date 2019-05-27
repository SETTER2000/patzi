parasails.registerPage('litter', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dialogTableVisible: false,
    autoplay:true,
    isAfterDate:false,
    url:null,
    photos:[
      {imagesSrc:'/images/elements/g1.jpg'},
      {imagesSrc:'/images/elements/g2.jpg'},
      {imagesSrc:'/images/elements/g3.jpg'},
      {imagesSrc:'/images/elements/g4.jpg'},
      {imagesSrc:'/images/elements/g5.jpg'},
      {imagesSrc:'/images/elements/g6.jpg'},
      {imagesSrc:'/images/elements/g7.jpg'},
      {imagesSrc:'/images/elements/g8.jpg'},
      {imagesSrc:'/images/elements/g9.jpg'},
      {imagesSrc:'/images/elements/g10.jpg'},
    ],
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
    this.isAfter();
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
    },
    isAfter(){
      // Проверка даты
      // Вернёт true, если this.litter.born  пока в будущем (не прошла)
      this.isAfterDate = moment(new Date()).isSameOrBefore(moment(this.litter.born, "LL"));
    }
  }
});
