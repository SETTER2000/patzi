
parasails.registerPage('homepage', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    heroHeightSet: false,
    year:'',
    language:'en',
    posts:[]
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.language = window.navigator.language;

    // Запрос для события list-*
    io.socket.get(`/api/v1/posts/cnt`, function gotResponse(body, response) {
      console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // Принимаем данные по событию list-*
    io.socket.on('post-count', data => {
      this.posts = this.cashPosts = data;
    });
  },


  mounted: async function(){
    this._setHeroHeight();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clickHeroButton: async function() {
      // Scroll to the 'get started' section:
      $('html, body').animate({
        scrollTop: this.$find('[role="scroll-destination"]').offset().top
      }, 500);

    },

    // Private methods not tied to a particular DOM event are prefixed with _
    _setHeroHeight: function() {
      var $hero = this.$find('[full-page-hero]');
      var headerHeight = $('#page-header').outerHeight();
      var heightToSet = $(window).height();
      heightToSet = Math.max(heightToSet, 500);//« ensure min height of 500px - header height
      heightToSet = Math.min(heightToSet, 1000);//« ensure max height of 1000px - header height
      $hero.css('min-height', heightToSet - headerHeight+'px');
      this.heroHeightSet = true;
    },

    newYear(){
      this.year = moment().get('year');
      return moment().isBetween(moment().startOf('year'), moment().startOf('year').add(2, 'week')); // true;
      // return true;
    } ,
    showPosts(){
      return  _.some(this.posts, 'rootPage', true);
    } ,
  }
});
