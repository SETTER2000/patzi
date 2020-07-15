/**
 * <patzi-posts-homepage-item>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPostsHomepageItem', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: {
    'objData': {
      type: Object,
      require: true
    },
    'post': {
      type: Object,
      require: true
    },
    'index': {
      type: Number,
      require: true
    },
    'lang': {
      type: String
    },
    // 'delButton': false
  },

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      //...
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
    <div class="u-clearfix u-sheet u-sheet-1">
            <div class="u-clearfix u-expanded-width-md u-expanded-width-sm u-gutter-10 u-layout-wrap u-layout-wrap-1">
                <div class="u-gutter-0 u-layout">
                    <div class="u-layout-row">
                        <div class="u-size-30 u-size-60-md">
                            <div class="u-layout-col">
                                <div class="u-size-30">
                                    <div class="u-layout-row">
                                        <div ref="wrapper" class="u-align-center u-container-style u-image u-layout-cell u-left-cell u-size-30 u-image-1"
                                             src="" data-animation-name="rollIn" data-animation-duration="1000"
                                             data-animation-delay="0" data-animation-direction="">
                                            <div class="u-container-layout u-valign-middle u-container-layout-1"
                                                 src=""></div>
                                        </div>
                                        <div ref="wrapper1" class="u-align-center u-container-style u-image u-layout-cell u-size-30 u-image-2"
                                             src="" data-animation-name="fadeIn" data-animation-duration="1000"
                                             data-animation-delay="0">
                                            <div class="u-container-layout u-valign-middle u-container-layout-2"
                                                 src=""></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="u-size-30">
                                    <div class="u-layout-row">
                                        <div ref="wrapper2"  class="u-align-center u-container-style u-image u-layout-cell u-left-cell u-shading u-size-30 u-image-3"
                                             src="" data-animation-name="jackInTheBox" data-animation-duration="1000"
                                             data-animation-delay="0" data-animation-direction="" data-href="#">
                                            <div class="u-container-layout u-valign-middle u-container-layout-3"
                                                 src=""></div>
                                        </div>
                                        <div ref="wrapper3"  class="u-align-center u-container-style u-image u-layout-cell u-size-30 u-image-4"
                                             src="" data-animation-name="fadeIn" data-animation-duration="1000"
                                             data-animation-delay="0">
                                            <div class="u-container-layout u-valign-middle u-container-layout-4"
                                                 src=""></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="u-size-30 u-size-60-md">
                            <div class="u-layout-col">
                                <div class="u-align-center-lg u-align-center-md u-align-center-sm u-align-center-xs u-container-style u-layout-cell u-right-cell u-size-60 u-layout-cell-5">
                                    <div class="u-container-layout u-valign-middle-lg u-valign-middle-xl u-valign-top-md u-container-layout-5">
                                        <div ref="wrapper4"  alt="" class="u-border-8 u-border-white u-image u-image-circle u-image-5"
                                             src=""></div>
                                        <p class="u-align-center-lg u-align-center-md u-align-center-xl u-text u-text-1"
                                           data-animation-name="bounceIn" data-animation-duration="1000"
                                           data-animation-delay="0"
                                           data-animation-direction="">{{post.dateEvent  | getCreate(lang)}}</p>
                             
                                        <h2 class="u-align-center-lg u-align-center-md u-align-center-xl u-text u-text-2">{{lang === 'ru' ? post.labelRu : post.label}}</h2>
                                        <p class="u-align-center-lg u-align-center-md u-align-center-xl u-text u-text-3">
                                           {{lang === 'ru' ? post.subtitleRu.limit(70) : post.subtitle}}</p>
                                        <a href="/blog" class="u-btn u-button-style u-btn-1">{{lang === 'ru' ? 'Подробнее' : 'More'}}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <el-divider v-if="index > 0"><i class="el-icon-star-on"></i></el-divider>  
                    </div>
                </div>
            </div>
            <div ref="wrapper6" alt="" class="u-border-10 u-border-white u-image u-image-circle u-image-6" src=""
                 data-animation-name="bounceIn" data-animation-duration="1000" data-animation-delay="0"
                 data-animation-direction=""></div>
        </div>

`,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    //...
  },


  mounted: async function () {
    this.data = this.objData.data ? this.objData.data : this.data;
    // if (this.dataPhoto === undefined) {
    //   throw new Error('Neither `:data`  was passed in to <patzi-photo-ww>, but one or the other must be provided.');
    // }
    this.updateStyle([this.$refs.wrapper, this.$refs.wrapper1, this.$refs.wrapper2, this.$refs.wrapper3, this.$refs.wrapper4, this.$refs.wrapper5, this.$refs.wrapper6], this.post);
  },

  beforeDestroy: function () {
    //...
  },
  filters: {
    getCreate: function (value, l, format) {
      if (!value) {
        return '';
      }
      // console.log('format::: ', format);
      moment.locale(l);
      let formatNew = _.isEmpty(format) ? 'LLL' : format;
      return (moment(value).format(formatNew)) ? moment(value).format(formatNew) : value;
      // return (moment.parseZone(value).format(formatNew)) ? moment.parseZone(value).format(formatNew) : value;
    },
  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    updateStyle(wrappers, objData) {
      if (!_.isArray(wrappers) && wrappers.length < 1) {
        return;
      }
      // console.log('objData:: ', objData);
      wrappers.map((wrapper, ind) => {
        let img = (objData.images && objData.images.length > 1 && objData.images[ind]) ? objData.images[ind].imageSrc : '';
        (img && img.length) > 0 ? $(wrapper).css('backgroundImage', 'url(' + img + ')') : '';
      });


    }
  }
});
