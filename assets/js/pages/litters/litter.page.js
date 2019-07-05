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
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/1_1.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/1_2.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/1_3.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/2_1.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/2_2.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/2_3.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/3_1.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/3_2.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/3_3.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/3_4.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/3_5.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/3_6.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/3_7.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/3_8.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/4_1.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/4_2.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/4_3.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/4_4.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/4_5.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/4_6.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/4_7.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/4_8.jpg'},
      {imagesSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/4_9.jpg'},
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
    },

    goTo(path) {
      window.location = `${path}`;
    },
  },
});
