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
    'dataPhoto',
    'me'
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
<section class="u-clearfix u-section-3" id="carousel_8bf4">
      <div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-clearfix u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-gutter-40 u-layout-wrap u-layout-wrap-1">
          <div class="u-gutter-0 u-layout">
            <div class="u-layout-row">
              <div class="u-size-31-lg u-size-31-xl u-size-40-md u-size-40-sm u-size-40-xs">
                <div class="u-layout-row">
                  <div class="u-container-style u-layout-cell u-left-cell u-size-60 u-layout-cell-1" src="">
                    <div class="u-container-layout u-container-layout-1" src="">
                      <img class="u-absolute-hcenter-xs u-expand-resize u-expanded u-image" :src="dataPhoto.photos[1].imageSrc" data-image-width="460" data-image-height="690">
                    </div>
                  </div>
                </div>
              </div>
              <div class="u-size-28-sm u-size-28-xs u-size-29-lg u-size-29-xl u-size-52-md">
                <div class="u-layout-col">
                  <div class="u-size-40">
                    <div class="u-layout-row">
                      <div class="u-align-left u-container-style u-image u-layout-cell u-right-cell u-size-60 u-image-2"  ref="wrapper"  data-image-width="573" data-image-height="800">
                        <div class="u-container-layout u-container-layout-2" src=""></div>
                      </div>
                    </div>
                  </div>
                  <div class="u-size-20">
                    <div class="u-layout-row">
                      <div class="u-align-left u-container-style u-hidden-sm u-hidden-xs u-layout-cell u-right-cell u-size-60 u-layout-cell-3" >
                        <div class="u-container-layout u-container-layout-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="u-clearfix u-expanded-width-xs u-gutter-0 u-layout-wrap u-layout-wrap-2">
          <div class="u-layout">
            <div class="u-layout-col">
              <div class="u-align-right u-container-style u-layout-cell u-left-cell u-right-cell u-size-20 u-layout-cell-4">
                <div class="u-container-layout u-container-layout-4">
                  <h2 class="u-text u-text-1">{{dataPhoto.title.subtitleRu}}</h2>
                </div>
              </div>
              <div class="u-align-right u-container-style u-layout-cell u-left-cell u-right-cell u-size-20 u-layout-cell-5">
                <div class="u-container-layout u-container-layout-5">
                  <p class="u-text u-text-palette-1-base u-text-2">{{dataPhoto.dateReceiving | getCreate}}</p>
                </div>
              </div>
              <div class="u-align-right u-container-style u-layout-cell u-left-cell u-right-cell u-size-20 u-layout-cell-6">
                <div class="u-container-layout u-valign-middle u-container-layout-6">
                  <el-button  v-if="me.isAdmin || me.isSuperAdmin" @click="removeItem"  class="u-border-radius-50 u-btn u-btn-round u-button-style u-btn-1">x</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
<!-- <section class="u-clearfix u-white u-section-3" id="carousel_8bf4">
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
                          <el-button  v-if="me.isAdmin || me.isSuperAdmin" @click="removeItem" class="my-3" type="danger" icon="el-icon-delete" circle></el-button>
                    </div>
                </div>
            </div>
        </section>-->
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
      let img = (objData.photos && objData.photos.length > 1) ? objData.photos[0].imageSrc : '';
      (img && img.length) > 0 ? $(wrapper).css('backgroundImage', 'url(' + img + ')') : '';
    }
  }
});
