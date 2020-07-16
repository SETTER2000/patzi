/**
 * <patzi-post-gallery-item-lines>
 * -----------------------------------------------------------------------------
 * Компонент дизайна отображения фотографий для компонента patzi-post-gallery.component.js
 * просто в линию друг за другом
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPostGalleryItemLines', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: {
    'objData': {
      type: Object,
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
        <div class="photo-flex">   
            <el-image  v-for="(img, index) of objData.images" 
                       class="child"
                       :key="'ims-'+index"
                       :src="img.imageSrc"
                       :preview-src-list="objData.imagesArrUrl"
                       :fit="'cover'"
                       lazy>
            </el-image>                
        </div>
`,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    //...
  },


  mounted: async function () {

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
    }
  }
});
