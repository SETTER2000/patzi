/**
 * <patzi-photo-ww>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPhotoWw', {
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

    <section class="u-clearfix u-section-5 mt-5 " id="sec-1f68">
      <div class="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
        <div class="u-layout">
          <div class="u-layout-row">
            <div ref="wrapper" class="u-container-style u-image u-layout-cell u-left-cell u-size-28 u-image-1">
              <div class="u-container-layout"></div>
            </div>
            <div class="u-container-style u-image u-layout-cell u-right-cell u-size-32 u-image-2">
              <div class="u-container-layout u-valign-middle-sm u-valign-middle-xs">
                <div class="u-align-left u-border-7 u-border-grey-15 u-container-style u-group u-group-1">
                  <div class="u-container-layout u-valign-middle u-container-layout-3">
                    <h1 class="u-text u-title u-text-1">world winner {{dataPhoto.dateReceiving | getCreate('YYYY')}}
                      <br>
                    </h1>
                    <div class="u-border-2 u-border-grey-dark-1 u-line u-line-horizontal u-line-1"></div>
                    <a href="#" class="u-border-0 u-link u-no-underline u-link-1">{{dataPhoto.dateReceiving | getCreate}}&nbsp;</a>
                  </div>
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
    console.log('this.dataPhoto--99222:: ', this.dataPhoto);
  },


  mounted: async function () {
    // console.log('this.objData--999:: ', this.objData);

    if (this.dataPhoto === undefined) {
      throw new Error('Neither `:data`  was passed in to <patzi-photo-ww>, but one or the other must be provided.');
    }

    this.updateStyle(this.$refs.wrapper, this.dataPhoto);
  },

  beforeDestroy: function () {
    //...
  },

  filters: {
    getCreate: function (value, format,l ) {
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
