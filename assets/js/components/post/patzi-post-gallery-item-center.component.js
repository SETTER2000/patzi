/**
 * <patzi-post-gallery-item-center>
 * -----------------------------------------------------------------------------
 * Компонент дизайна отображения фотографии для компонента patzi-post-gallery.component.js
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPostGalleryItemCenter', {
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
           <div class="u-size-20 u-size-30-md">
              <div class="u-layout-col">
                <div class="u-align-center u-container-style u-expand-resize u-layout-cell u-size-40 u-layout-cell-3" src="">
                  <div class="u-container-layout u-container-layout-3">
                    <img class="u-expanded-width u-image u-image-3 lazyload" :data-src="getIm(objData[0])" data-image-width="462" data-image-height="693">
                  </div>
                </div>
                <div class="u-container-style u-expand-resize u-layout-cell u-size-20 u-layout-cell-4" src="">
                  <div v-if="getIm(objData[1])" class="u-container-layout u-container-layout-4">
                    <img class="u-expanded-width u-image u-image-4 lazyload" :data-src="getIm(objData[1])" data-image-width="1067" data-image-height="1600">
                  </div>
                </div>
              </div>
            </div>
`,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    //...
  },


  mounted: async function () {
    if (this.objData.data === undefined) {
      throw new Error('Neither `:data`  was passed in to <patzi-post-gallery-item-center>, but one or the other must be provided.');
    }
  },

  beforeDestroy: function () {
    //...
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    openRemoveDialog(id) {
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
    },
    removeItem() {
      // Генерируем событие, возможно с передаваемыми данными
      // console.log('Отправляем событие', this.removeId);
      this.$emit('remove', this.removeId);
    },
    link() {
      return `/blog/post/${this.post.id}`;
    } ,
    getIm(o) {
      return (o && o.imageSrc) ? o.imageSrc : false;
    }
  }
});
