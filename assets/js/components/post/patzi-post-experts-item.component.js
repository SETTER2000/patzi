/**
 * <patzi-post-experts-item>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPostExpertsItem', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'objData',
    'expert',
    'section',
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      vid: false
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `

        <div class="u-align-center u-carousel-item u-clearfix u-image" :class="classObject(section)">
          <div class="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
              <div class="u-layout-row">
                <div ref="wrapper" class="u-align-center u-container-style u-image u-layout-cell u-left-cell u-size-29 u-image-1">
                  <div class="u-container-layout u-valign-middle u-container-layout-1"></div>
                </div>
                <div class="u-container-style u-layout-cell u-palette-5-light-3 u-size-20 u-layout-cell-2 ">
                  <div class="u-container-layout u-valign-middle u-container-layout-2 ">
                    <h6 class="u-custom-font u-text u-text-font u-text-1">EXPERT FCI {{objData.preferredLocale === 'ru' ? '& RKF' : ''}}</h6>
                    <h1 class="u-custom-font u-font-roboto-condensed u-text u-text-2">{{expert.fullName}}</h1>
                    <p class="u-text u-text-3">{{expert.description}}</p>
<!--                    <p class="u-text u-text-default u-text-4"><a href="/pricing" target="_blank"><b>Poale Ell</b>-->
                      </a>
                    </p>
<!--                    <a href="#" class="u-border-2 u-border-black u-link u-text-body-color u-link-1">read more</a>-->

                    <img  :src="getFlag(expert.country)" alt="" :title="expert.country ? expert.country.label : ''" class="u-image u-image-default u-image-2" data-animation-name="slideIn" data-animation-duration="1000" data-animation-delay="0" data-animation-direction="Down" data-image-width="1424" data-image-height="749">
                  </div>
                </div>
                <div class="u-container-style u-layout-cell u-right-cell u-size-11 u-layout-cell-3">
                  <div class="u-container-layout u-valign-bottom u-container-layout-3">
                    <h2 class="u-text u-text-5">0{{section}}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
`,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    this.vid = (this.video && this.video.length > 0);
  },
  computed: {},

  mounted: async function () {
    this.updateStyle(this.$refs.wrapper);
  },

  beforeDestroy: function () {
    //...
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    classObject(index) {
      // index = index + 1;
      var o = {
        'u-active': (index === 1)
      };
      o[`u-section-5-${index}`] = true;
      return o;
    },
    removeItem(id) {
      // Генерируем событие, возможно с передаваемыми данными
      this.$emit('remove', id);
    },
    editPost(post) {
      // Генерируем событие, возможно с передаваемыми данными
      this.$emit('editpost', post);
    },
    getFlag(country) {
      return !_.isObject(country)   ? false :
        country.label ? `https://d1lyb0stb8az10.cloudfront.net/flags/${country.label}.jpg` : '';
    },
    async updateStyle(wrapper) {
      /*  const t = `${this.post.valueX}% ${this.post.valueY}%`;
        let data = {id: this.post.id, position: t, valueX: this.post.valueX, valueY: this.post.valueY};*/
      wrapper ? wrapper.style.setProperty('background-image', 'url(' + this.expert.avatar + ')') : '';
      // await io.socket.put(`/api/v1/posts/update-position-img`, data, (data, jwRes) => {
      //   console.log('Сервер update-position-img ответил кодом ' + jwRes.statusCode + ' и данными: ', data);
      // });
      // wrappers.map((wrapper, ind) => {
      //   let img = (objData && objData.length >= 1) ? objData[ind].imageSrc : '';
      //   img ? $(wrapper).css('backgroundImage', 'url(' + img + ')') : '';
      // });
    },
  }
});
