parasails.registerPage('welcome', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    modal: '',
    pageLoadedAt: Date.now(),
    WxH: '800x420',
    coverMode: 'cover',
    fp: 'fp-x:0.5,fp-y:0.5,fp-z:1',
    cloudFrontUrl: 'https://d1lyb0stb8az10.cloudfront.net',
    posts: [],
    post: {},
    showPostsSection: true
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    io.socket.get(`/api/v1/posts/cnt`, function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // Принимаем данные по событию list-*
    io.socket.on('post-count', data => {
      // console.log('POSTS LIST:: ', data);
      if (_.isArray(data) && data.length < 1) {
        this.showPostsSection = false;
      } else {
        this.showPostsSection = true;
        this.posts = this.cashPosts = data;
        this.post = _.last(_.at(this.posts, [0]));
        // console.log('ONE POST::: ', this.post);
      }
    });

  },
  mounted: async function () {
    //…
  },
  computed: {},
  //  ╦  ╦╦╦═╗╔╦╗╦ ╦╔═╗╦    ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ╚╗╔╝║╠╦╝ ║ ║ ║╠═╣║    ╠═╝╠═╣║ ╦║╣ ╚═╗
  //   ╚╝ ╩╩╚═ ╩ ╚═╝╩ ╩╩═╝  ╩  ╩ ╩╚═╝╚═╝╚═╝
  // Configure deep-linking (aka client-side routing)
  virtualPagesRegExp: /^\/welcome\/?([^\/]+)?\/?/,
  afterNavigate: async function (virtualPageSlug) {
    // `virtualPageSlug` is determined by the regular expression above, which
    // corresponds with `:unused?` in the server-side route for this page.
    switch (virtualPageSlug) {
      case 'hello':
        this.modal = 'example';
        break;
      default:
        this.modal = '';
    }
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    /**
     * Функция устанавливает размеры, увелечение и расположение фото
     * @param imgName (name.jpg)
     * @param coverMode (cover, cover:smart, cover:attention, cover:entropy, cover:face, cover:northeast )
     * @param WxH  (450x100)
     * @param fp  Точка в центре фото, увелечения нет (1)  или от 1 до 10.
     * @returns {string}
     */
    getSrc(imgName, coverMode = '', WxH = '', fp = '') {
      return `https://img.imageboss.me/${coverMode ? coverMode : this.coverMode}/${WxH ? WxH : this.WxH}/${fp ? fp : this.fp}/https://paltos.s3.amazonaws.com/${imgName}`;
      // return `https://img.imageboss.me/${this.coverMode}/${this.WxH}/http://patzi.s3-website-us-east-1.amazonaws.com/${imgName}`;
    },
    clickOpenExampleModalButton: async function () {
      this.goto('/welcome/hello');
      // Or, without deep links, instead do:
      // ```
      // this.modal = 'example';
      // ```
    },

    urlB() {
      const imageRequest = JSON.stringify({
       bucket: 'paltos',
        key: 'banner-img.jpg',
        edits: {
          // grayscale: true,
          resize: {
            fit: 'inside',
            width: 1424,
            height: 800
          }
        }
      });
      return `${this.cloudFrontUrl}/${btoa(imageRequest)}`;
    },

    closeExampleModal: async function () {
      this.goto('/welcome');
      // Or, without deep links, instead do:
      // ```
      // this.modal = '';
      // ```
    },
  }
});
