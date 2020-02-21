/**
 * <patzi-photo-list>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPhotoList', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'styleObj',
    'collectionTitles',
    'me'
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      list: []
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
                <div class="mb-5" >
                    <template   v-for="(title, i) in collectionTitles">
                        <template v-if="title.title.label !== 'WW'">
                            <patzi-photo-right v-if="i%2" :data-photo="title" :me="me" @remove="removeFromList"></patzi-photo-right>
                            <patzi-photo-left v-else :data-photo="title" :me="me" @remove="removeFromList"></patzi-photo-left>
                        </template>
                    </template>
                    <template   v-for="(title, i) in collectionTitles">
                        <template v-if="title.title.label === 'WW'">
                             <patzi-photo-ww :data-photo="title" :me="me" @remove="removeFromList"></patzi-photo-ww>
                        </template>
                    </template>
                </div>
`,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    //...
  },


  mounted: async function () {
    if (this.collectionTitles === undefined) {
      throw new Error('Neither `:data`  was passed in to <patzi-photo-list>, but one or the other must be provided.');
    }
    this.list = this.collectionTitles.data;
  },

  beforeDestroy: function () {
    //...
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    removeFromList(id,dateReceiving) {
      this.$emit('remove-title', {id:id, dateReceiving:dateReceiving});
    },

  }
});
