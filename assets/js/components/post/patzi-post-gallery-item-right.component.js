/**
 * <patzi-post-gallery-item-right>
 * -----------------------------------------------------------------------------
 * Компонент дизайна отображения фотографий для компонента patzi-post-gallery.component.js
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPostGalleryItemRight', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: {
    'objData': {
      type: Array,
      require: true
    },
    'delButton': false
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
          <div class="u-size-20 u-size-60-md">
              <div class="u-layout-col">
                <div ref="wrapper" class="u-container-style u-image u-layout-cell u-right-cell u-size-20 u-image-5" src="" data-image-width="690" data-image-height="460">
                  <div class="u-container-layout u-valign-middle u-container-layout-5"></div>
                </div>
                <div ref="wrapper1" class="u-container-style u-image u-layout-cell u-right-cell u-size-40 u-image-6" src="" data-image-width="690" data-image-height="460">
                  <div class="u-container-layout u-valign-middle u-container-layout-6"></div>
                </div>
              </div>
            </div>
`,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
  },


  mounted: async function () {
    this.updateStyle([this.$refs.wrapper, this.$refs.wrapper1], this.objData);
  },

  beforeDestroy: function () {
    //...
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
   /* openRemoveDialog(id) {
      this.removeId = id;
      this.$confirm('Это навсегда удалит объект. Продолжить?', 'Внимание', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Отмена',
        type: 'warning'
      }).then(() => {
        this.removeItem();

      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Удаление отменено'
        });
      });
    },*/
    // removeItem() {
    //   // Генерируем событие, возможно с передаваемыми данными
    //   // console.log('Отправляем событие', this.removeId);
    //   this.$emit('remove', this.removeId);
    // },
    link() {
      return `/blog/post/${this.post.id}`;
    },
    updateStyle(wrappers, objData) {
      if (!_.isArray(wrappers) && wrappers.length < 1) {
        return;
      }
      wrappers.map((wrapper, ind) => {
        let img = (objData && objData.length >= 1) ? objData[ind].imageSrc : '';
        img ? $(wrapper).css('backgroundImage', 'url(' + img + ')') : '';
      });
    }
  }
});
