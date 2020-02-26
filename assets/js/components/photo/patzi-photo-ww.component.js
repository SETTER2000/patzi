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
 <section class="u-clearfix u-section-5" id="sec-1f68">
      <div class="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
        <div class="u-layout">
          <div class="u-layout-row">
            <div class="u-container-style u-image u-layout-cell u-left-cell u-size-32 u-image-1">
              <div class="u-container-layout"></div>
            </div>
            <div class="u-container-style u-image u-layout-cell u-right-cell u-size-28 u-image-2">
              <div class="u-container-layout">
                <div class="u-align-left-xs u-container-style u-group u-group-1">
                  <div class="u-container-layout u-container-layout-3">
                    <p class="u-align-right-lg u-align-right-md u-align-right-sm u-align-right-xl u-small-text u-text u-text-default u-text-grey-30 u-text-variant u-text-1">{{dataPhoto.city}}&nbsp;</p>
                    <p class="u-align-left-lg u-align-left-md u-align-left-sm u-align-left-xl u-small-text u-text u-text-default u-text-grey-30 u-text-variant u-text-2">{{dataPhoto.country}}</p>
                    <h2 class="u-align-left-lg u-align-left-md u-align-left-sm u-align-left-xl u-text u-text-3">world winner {{dataPhoto.dateReceiving | getCreate('YYYY')}}
                      <br>
                    </h2>
                    <div class="u-border-2 u-border-grey-dark-1 u-expanded-width u-line u-line-horizontal u-line-1"></div>
                    <a href="#" class="u-border-0 u-link u-no-underline u-link-1">{{dataPhoto.dateReceiving | getCreate}}&nbsp;</a>
                    <el-button  v-if="me.isAdmin || me.isSuperAdmin" @click="removeItem"  class="u-border-radius-50 u-btn u-btn-round u-button-style u-btn-1">x</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
<!--    <section class="u-clearfix u-section-5 mt-5 " id="sec-1f68">
      <div class="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
        <div class="u-layout">
          <div class="u-layout-row">
            <div ref="wrapper" class="u-container-style u-image u-layout-cell u-left-cell u-size-28 u-image-1">
              <div class="u-container-layout"></div>
            </div>
            <div class="u-container-style u-image u-layout-cell u-right-cell u-size-32 u-image-2">
              <div class="u-container-layout u-valign-middle-sm u-valign-middle-xs">
                <div class="u-align-left u-border-7 u-border-grey-15 u-container-style u-group u-group-1">
                
                <div class="u-container-layout u-container-layout-3">
                    <p class="u-align-right u-small-text u-text u-text-default u-text-grey-30 u-text-variant u-text-1">{{dataPhoto.city}}</p>
                    <p class="u-align-left u-small-text u-text u-text-default u-text-grey-30 u-text-variant u-text-2">{{dataPhoto.country}}</p>
                    <h1 class="u-align-left u-text u-title u-text-3">world winner {{dataPhoto.dateReceiving | getCreate('YYYY')}}
                      <br>
                    </h1>
                    <div class="u-border-2 u-border-grey-dark-1 u-expanded-width u-line u-line-horizontal u-line-1"></div>
                    <a href="#" class="u-border-0 u-link u-no-underline u-link-1">{{dataPhoto.dateReceiving | getCreate}}</a>
                    <el-button  v-if="me.isAdmin || me.isSuperAdmin" @click="removeItem" class="my-3" type="danger" icon="el-icon-delete" circle></el-button>
                  </div>
                
                
                 &lt;!&ndash; <div class="u-container-layout u-valign-middle u-container-layout-3">
                    <h1 class="u-text u-title u-text-1">world winner {{dataPhoto.dateReceiving | getCreate('YYYY')}}
                      <br>
                    </h1>
                    <div class="u-border-2 u-border-grey-dark-1 u-line u-line-horizontal u-line-1"></div>
                    <a href="#" class="u-border-0 u-link u-no-underline u-link-1">{{dataPhoto.dateReceiving | getCreate}}&nbsp;</a>
                  </div>&ndash;&gt;
                </div>
              </div>
            </div>
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

    removeItem: function() {
      // генерируем событие 'remove' и передаём id элемента
      this.$emit('remove', this.dataPhoto.id, this.dataPhoto.dateReceiving);
    },

    updateStyle(wrapper, objData) {
      if (!wrapper) {
        return;
      }
      // console.log('objData:: ', objData);
      let img = (objData.photos && objData.photos.length > 1) ? objData.photos[1].imageSrc : '';

      (img && img.length) > 0 ? $(wrapper).css('backgroundImage', 'url(' + img + ')') : '';

    }
  }
});
