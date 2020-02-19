/**
 * <patzi-foto-left>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziFotoLeft', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'styleObj',
    'objData'
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
  <section class="u-clearfix u-white u-section-3" id="carousel_8bf4">
            <div class="u-clearfix u-sheet u-sheet-1">
                <div class="u-clearfix u-expanded-width-lg u-expanded-width-md u-expanded-width-sm u-expanded-width-xl u-gutter-40 u-layout-wrap u-layout-wrap-1">
                    <div class="u-layout">
                        <div class="u-layout-row">
                            <div class="u-align-left u-container-style u-expand-resize u-image u-layout-cell u-left-cell u-size-27 u-image-1" ref="wrapper">
                                <div class="u-container-layout"></div>
                            </div>
                            <div class="u-container-style u-expand-resize u-layout-cell u-right-cell u-size-33 u-layout-cell-2">
                                <div class="u-container-layout">
                                    <img class="u-expanded-height-sm u-expanded-height-xs u-image u-image-2" src="/images/RUSJCH.jpg"
                                         data-image-width="573" data-image-height="800">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="u-align-right u-container-style u-expanded-width-lg u-expanded-width-xl u-expanded-width-xs u-group u-group-1">
                    <div class="u-container-layout u-valign-middle-sm u-valign-middle-xs u-container-layout-3">
                        <h2 class="u-text u-text-1">young champion of Russia</h2>
                        <a href="#" class="u-border-0 u-link u-no-underline u-link-1">22 февраля 2019</a>
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
    console.log('this.objData:: ', this.objData);
    if (this.objData.data === undefined) {
      throw new Error('Neither `:data`  was passed in to <patzi-foto-left>, but one or the other must be provided.');
    }

    this.updateStyle(this.$refs.wrapper, this.objData);

  },

  beforeDestroy: function () {
    //...
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    updateStyle(wrapper, objData) {
      if (!wrapper) {
        return;
      }
      console.log('objData:: ', objData);
      let img = _.last(_.pluck(objData, 'imageSrc'));
      console.log('imm:', img);

      (img && img.length) > 0 ? $(wrapper).css('backgroundImage', 'url(' + img + ')') : '';

    }
  }
});
