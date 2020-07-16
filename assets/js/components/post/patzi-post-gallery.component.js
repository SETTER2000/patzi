/**
 * <patzi-post-gallery>
 * -----------------------------------------------------------------------------
 * Компонент для вывода фотографий на странице поста в блоге.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPostGallery', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'objData',
    'post',
    'delButton',
    'lines',
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
 <div class="u-clearfix u-expanded-width u-gutter-30 u-layout-wrap u-layout-wrap-1">
        <div class="u-layout">
          <div class="u-layout-row">
          <template v-if="!lines">
          <patzi-post-gallery-item-left  v-if="post.images && post.images.length > 0" :obj-data="_.at(post.images, [0, 1])" :del-button="delButton" @remove="removeItem" ></patzi-post-gallery-item-left> 
          <patzi-post-gallery-item-center  v-if="post.images && post.images.length >= 3" :obj-data="_.at(post.images, [2, 3])" :del-button="delButton" @remove="removeItem" ></patzi-post-gallery-item-center>
          <patzi-post-gallery-item-right  v-if="post.images && post.images.length >= 5" :obj-data="_.at(post.images, [4, 5])" :del-button="delButton" @remove="removeItem"  ></patzi-post-gallery-item-right>
          </template>
          <template v-else> 
          <patzi-post-gallery-item-lines   :obj-data="post" :del-button="delButton" @remove="removeItem"  ></patzi-post-gallery-item-lines>
          </template> 
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
    // if (this.objData.data === undefined) {
    //   throw new Error('Neither `:data`  was passed in to <patzi-post-gallery>, but one or the other must be provided.');
    // }
  },

  beforeDestroy: function () {
    //...
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    removeItem(id){
      // Генерируем событие, возможно с передаваемыми данными
      // console.log('Отправляем событие', id);
      this.$emit('remove', id);
    } ,
  }
});
