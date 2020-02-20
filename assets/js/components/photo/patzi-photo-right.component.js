/**
 * <patzi-photo-right>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPhotoRight', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'styleObj',
    'dataPhoto'
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


<section class="u-clearfix u-white u-section-4" id="carousel_1ded">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-clearfix u-expanded-width-xl u-gutter-40 u-layout-wrap u-layout-wrap-1">
          <div class="u-layout">
            <div class="u-layout-row">
              <div class="u-container-style u-expand-resize u-layout-cell u-right-cell u-size-33 u-layout-cell-1" >
                <div class="u-container-layout">
                  <img class="u-expanded-height-sm u-expanded-height-xs u-image u-image-1" :src="dataPhoto.photos[0].imageSrc">
                  <div class="u-align-left u-container-style u-group u-group-1">
                    <div
                      class="u-container-layout u-valign-middle-lg u-valign-middle-sm u-valign-middle-xl u-valign-middle-xs u-container-layout-2">
                      <h2 class="u-text u-text-1">{{dataPhoto.title.subtitleRu}}</h2>
                      <a href="#" class="u-border-0 u-link u-no-underline u-link-1">{{dataPhoto.dateReceiving | getCreate}}</a>
                    </div>
                  </div>
                </div>
              </div>
              <div ref="wrapper" class="u-container-style u-expand-resize u-image u-layout-cell u-left-cell u-size-27 u-image-2"
                   data-image-width="1163" data-image-height="1600">
                <div class="u-container-layout"></div>
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
    console.log('this.dataPhoto--99222:: ', this.dataPhoto);
  },


  mounted: async function () {
    // console.log('this.objData--999:: ', this.objData);

    if (this.dataPhoto === undefined) {
      throw new Error('Neither `:data`  was passed in to <patzi-photo-right>, but one or the other must be provided.');
    }

    this.updateStyle(this.$refs.wrapper, this.dataPhoto);
  },

  beforeDestroy: function () {
    //...
  },

  filters: {
    getCreate: function (value, l, format) {
      if (!value) {
        return '';
      }
      moment.locale(l);
      let formatNew = (!format) ? 'LL' : format;
      return (moment.parseZone(value).format(formatNew)) ? moment.parseZone(value).format(formatNew) : value;
    },
  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    updateStyle(wrapper, objData) {
      if (!wrapper) {
        return;
      }
      // console.log('objData:: ', objData.photos);
      let img = objData.photos[1].imageSrc;
      // console.log('imm:', img);
// console.log('wrapper:: ' , wrapper);
      (img && img.length) > 0 ? $(wrapper).css('backgroundImage', 'url(' + img + ')') : '';

    }
  }
});
