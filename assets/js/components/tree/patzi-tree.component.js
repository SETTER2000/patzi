/**
 * <patzi-tree>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziTree', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝

  props: {
    'objData': {
      type: Object,
      require: true
    },
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
      isOpen: false
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `<section class="u-align-center u-clearfix u-image u-image-tiles u-section-4" id="carousel_6b06" data-image-width="400"
             data-image-height="400">
             <!--0 lev-->
                <div class="d-flex   justify-content-center align-content-center">
                    <div class="block"
                        :class="isFolder ? 'pointer' : ''"
                        @click="toggle"
                        @dblclick="makeFolder"
                    >
                        <div class="flex justify-content-between align-content-stretch">
                            <h3 style="margin: 0;padding: 0;">
                                <a :href="item.detail">{{item
                                    .fullName}}</a></h3>
                            <div style="height: 50px; padding-top: 9px" class="">dob: {{item.dateBirth |
                                getCreate(objData.preferredLocale, 'lll')}}
                            </div>
                       </div>
                        <el-image
                                style="max-width: 470px; "
                                :src="item.images[0].imageSrc"
                          
                        >      <!-- :preview-src-list="o.imagesArrUrl"-->
                            <div slot="placeholder" class="image-slot">
                                Loading<span class="dot">...</span>
                            </div>
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
<!--                        <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>-->
                    </div>
                </div>
                <div  v-if="isOpen" class="d-flex  justify-content-around"  >
                 <patzi-tree
                        class="item"
                        :obj-data="objData"
                        v-for="(o, index) in item.parents"
                        :key="'ind-' + index"
                        :item="o"
                        @make-folder="$emit('make-folder', $event)"
                        @add-item="$emit('add-item', $event)"
                ></patzi-tree>
<!--                <li class="add" @click="$emit('add-item', item)">+</li>-->
                 <!--   <div class="block" v-for="(o, index) in item.parents" :key="o.id">
                        <div class="flex justify-content-between align-content-center">
                            <h3 style="margin: 0;padding: 0;"><a :href="item.detail">
                                    {{o.fullName}}</a></h3>
                            <div style="height: 50px; padding-top: 9px" class="">dob: {{o.dateBirth |
                                getCreate(objData
                                .preferredLocale, 'lll')}}
                            </div>
                        </div>
                        <el-image
                                @click=""
                                style="max-width: 470px; "
                                :src="o.images[0].imageSrc"
                               
                        >
&lt;!&ndash;                         :preview-src-list="o.imagesArrUrl"&ndash;&gt;
                            <div slot="placeholder" class="image-slot">
                                Loading<span class="dot">...</span>
                            </div>
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </div>-->
                </div>
    </section>
`,
  computed: {
    isFolder: function () {
      return this.item.parents && this.item.parents.length;
    }
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
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
  },

  mounted: async function () {
    // console.log('objData++::', this.objData);
    this.data = this.objData.data ? this.objData.data : this.data;
  },

  beforeDestroy: function () {
    //...
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    makeFolder: function () {
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
