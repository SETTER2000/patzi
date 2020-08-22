/**
 * <patzi-tree-item>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziTreeItem', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝

  props: {
    // 'objData': {
    //   type: Object,
    //   require: true
    // },
    'item': {
      type: Object,
      // require: true
    }
  },
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      isOpen: false,
      text:'',
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `<li>
        <div
          :class="{bold: isFolder}"
          @click="toggle2"
          @dblclick="makeFolder2"><!--<p>{{text}}</p>-->
          {{ item.fullName }} <!--isOpen:{{isOpen}} isFolder:{{isFolder}}-->
          <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
        </div>
        <ul v-show="isOpen" v-if="isFolder">
          <patzi-tree-item
            class="item"
            v-for="(child, index) in item.parents"
            :key="index"
            :item="child"
            @make-folder="$emit('make-folder', $event)"
            @add-item="$emit('add-item', $event)"
          ></patzi-tree-item>
          <li class="add" @click="$emit('add-item', item)">+</li>
        </ul>
      </li>
`,
  computed: {
    isFolder: function() {
      return this.item.parents && this.item.parents.length;
    }
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
/*  beforeMount: function () {
    //...
  },

  filters: {
    getCreate: function (value, l, format) {
      if (!value) {
        return '';
      }
      // console.log('format::: ', format);
      moment.locale(l);
      let formatNew = _.isEmpty(format) ? 'LLL' : format;
      return (moment(value).format(formatNew)) ? moment(value).format(formatNew) : value;
      // return (moment.parseZone(value).format(formatNew)) ? moment.parseZone(value).format(formatNew) : value;
    },
  },*/

  // mounted: async function () {
  //   // console.log('objData++::', this.objData);
  //   // this.data = this.objData.data ? this.objData.data : this.data;
  // },
  //
  // beforeDestroy: function () {
  //   //...
  // },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    toggle2: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
        this.text = this.isOpen ? 'Func component.toggle2' : '';
      }
    },
    makeFolder2: function () {
      if (!this.isFolder) {
        this.$emit("make-folder", this.item);
        this.isOpen = true;
      }
    }
    /*    removeItem(id){
          // Генерируем событие, возможно с передаваемыми данными
          // console.log('Отправляем событие', id);
          this.$emit('remove', id);
        } ,
        editPost(post){
          // Генерируем событие, возможно с передаваемыми данными
          // console.log('Отправляем событие', id);
          this.$emit('editpost', post);
        } ,*/
  }
});
