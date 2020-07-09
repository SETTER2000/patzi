/**
 * <patzi-post-header>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPostHeader', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'objData',
    'post',
  ],

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
  <section class="skrollable skrollable-between u-clearfix u-image u-shading u-section-1" id="carousel_6c71" data-image-width="1148" data-image-height="678">
    <div class="u-clearfix u-sheet u-sheet-1">
      <div class="u-clearfix u-expanded-width u-gutter-30 u-layout-wrap u-layout-wrap-1">
        <div class="u-layout">
          <div class="u-layout-row">
            <div class="u-container-style u-expand-resize u-layout-cell u-left-cell u-size-39 u-layout-cell-1">
              <div class="u-container-layout u-valign-middle-xs u-container-layout-1">
                <div class="u-align-left u-expanded-height u-palette-1-base u-shape u-shape-1"></div>
                <div class="u-align-left u-container-style u-group u-group-1">
                  <div class="u-container-layout u-valign-middle u-container-layout-2">
                                        <span class="u-icon u-icon-circle u-text-white u-icon-1">
                        <svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 58 58" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-9af0"></use></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="svg-9af0" x="0px" y="0px" viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve" class="u-svg-content"><g><circle cx="22" cy="24.5" r="1"></circle><circle cx="29" cy="24.5" r="1"></circle><circle cx="36" cy="24.5" r="1"></circle><circle cx="43" cy="24.5" r="1"></circle><circle cx="50" cy="24.5" r="1"></circle><circle cx="8" cy="32.5" r="1"></circle><circle cx="15" cy="32.5" r="1"></circle><circle cx="22" cy="32.5" r="1"></circle><circle cx="29" cy="32.5" r="1"></circle><circle cx="36" cy="32.5" r="1"></circle><circle cx="43" cy="32.5" r="1"></circle><circle cx="50" cy="32.5" r="1"></circle><circle cx="8" cy="39.5" r="1"></circle><circle cx="15" cy="39.5" r="1"></circle><circle cx="22" cy="39.5" r="1"></circle><circle cx="29" cy="39.5" r="1"></circle><circle cx="36" cy="39.5" r="1"></circle><circle cx="43" cy="39.5" r="1"></circle><circle cx="50" cy="39.5" r="1"></circle><circle cx="8" cy="47.5" r="1"></circle><circle cx="15" cy="47.5" r="1"></circle><circle cx="22" cy="47.5" r="1"></circle><circle cx="29" cy="47.5" r="1"></circle><circle cx="36" cy="47.5" r="1"></circle><path d="M26,0.5c-0.553,0-1,0.447-1,1s0.447,1,1,1c1.302,0,2.402,0.838,2.816,2h2.083C30.434,2.221,28.414,0.5,26,0.5z"></path><path d="M32,0.5c-0.553,0-1,0.447-1,1s0.447,1,1,1c1.302,0,2.402,0.838,2.816,2h2.083C36.434,2.221,34.414,0.5,32,0.5z"></path><path d="M38,0.5c-0.553,0-1,0.447-1,1s0.447,1,1,1c1.302,0,2.402,0.838,2.816,2h2.083C42.434,2.221,40.414,0.5,38,0.5z"></path><path d="M42.899,4.5C42.965,4.823,43,5.158,43,5.5c0,2.757-2.243,5-5,5c-0.553,0-1-0.447-1-1s0.447-1,1-1c1.654,0,3-1.346,3-3   c0-0.353-0.072-0.686-0.184-1h-3.917C36.965,4.823,37,5.158,37,5.5c0,2.757-2.243,5-5,5c-0.553,0-1-0.447-1-1s0.447-1,1-1   c1.654,0,3-1.346,3-3c0-0.353-0.072-0.686-0.184-1h-3.917C30.965,4.823,31,5.158,31,5.5c0,2.757-2.243,5-5,5c-0.553,0-1-0.447-1-1   s0.447-1,1-1c1.654,0,3-1.346,3-3c0-0.353-0.072-0.686-0.184-1h-3.917C24.965,4.823,25,5.158,25,5.5c0,2.757-2.243,5-5,5   c-0.553,0-1-0.447-1-1s0.447-1,1-1c1.654,0,3-1.346,3-3c0-0.353-0.072-0.686-0.184-1H18h-0.816c0.414-1.162,1.514-2,2.816-2   s2.402,0.838,2.816,2h2.083c-0.465-2.279-2.484-4-4.899-4s-4.434,1.721-4.899,4H14H0v11v2v40h58v-40v-2v-11H42.899z M56,55.5H2v-38   h54V55.5z"></path>
</g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                      </span>
                    <p class="u-custom-font u-heading-font u-text u-text-white u-text-1">{{post.dateEvent | getCreate(objData.preferredLocale)}}</p>
                  </div>
                </div>
     
                <el-image :src="post.images[0].imageSrc" :fit="'cover'"
                class="u-align-left u-image u-image-1"
                :preview-src-list="post.imagesArrUrl">
                </el-image>
                <div class="u-border-4 u-border-palette-1-base u-shape u-shape-circle u-shape-2"></div>
              </div>
            </div>
            <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-21 u-layout-cell-2">
              <div class="u-container-layout u-container-layout-3">
                <div class="u-border-9 u-border-grey-5 u-line u-line-horizontal u-line-1"></div>
                <h1 class="u-custom-font u-font-oswald u-text u-text-grey-10 u-text-3">{{objData.preferredLocale ==='ru' ? post.labelRu : post.label}}</h1>
                <h4 class="u-custom-font u-font-open-sans u-text u-text-5"> <strong> {{objData.preferredLocale ==='ru' ? 'Тема' : 'Theme'}}</strong>: {{objData.preferredLocale ==='ru' ? post.topic.labelRu : post.topic.label}}</h4>
                <p class="u-text u-text-5">
                {{objData.preferredLocale ==='ru' ? post.subtitleRu : post.subtitle}}
                </p>
                <!--<a href="#" class="u-border-radius-0 u-btn u-btn-rectangle u-button-style u-palette-1-base u-btn-1" data-animation-name="rollIn" data-animation-duration="1000" data-animation-delay="0" data-animation-direction="">More</a>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

`,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    //...
  },


  mounted: async function () {
    if (this.objData === undefined) {
      throw new Error('Neither `:data`  was passed in to <patzi-post-header>, but one or the other must be provided.');
    }
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
    //...
  }
});
