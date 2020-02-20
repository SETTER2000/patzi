/**
 * <patzi-photo-left>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPhotoLeft', {
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
                                    <img class="u-expanded-height-sm u-expanded-height-xs u-image u-image-2" :src="dataPhoto.photos[0].imageSrc"
                                         data-image-width="573" data-image-height="800">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="u-align-right u-container-style u-expanded-width-lg u-expanded-width-xl u-expanded-width-xs u-group u-group-1">
                    <div class="u-container-layout u-valign-middle-sm u-valign-middle-xs u-container-layout-3">
                        <h2 class="u-text u-text-1">{{dataPhoto.title.subtitleRu}}</h2>
                        <a href="#" class="u-border-0 u-link u-no-underline u-link-1">{{dataPhoto.dateReceiving | getCreate}}</a>
                          <el-button  @click="removeItem" class="my-3" type="danger" icon="el-icon-delete" circle></el-button>
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
    if (this.dataPhoto === undefined) {
      throw new Error('Neither `:data`  was passed in to <patzi-foto-left>, but one or the other must be provided.');
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

    removeItem: function() {
      // генерируем событие 'remove' и передаём id элемента
      this.$emit('remove', this.dataPhoto.id, this.dataPhoto.dateReceiving);
    },


    updateStyle(wrapper, objData) {
      if (!wrapper) {
        return;
      }
      let img = objData.photos[1].imageSrc;
      (img && img.length) > 0 ? $(wrapper).css('backgroundImage', 'url(' + img + ')') : '';
    }
  }
});
