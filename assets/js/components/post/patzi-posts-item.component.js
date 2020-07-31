/**
 * <patzi-posts-item>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPostsItem', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: {
    'objData': {
      type: Object,
      require: true
    },
    'post': {
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
      removeId: undefined,
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `<div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-20 u-layout-cell-1"
                          >

                            <div  class="u-container-layout u-valign-top-md u-valign-top-sm u-valign-top-xl u-valign-top-xs u-container-layout-1">
                                <div class="u-align-left u-border-5 u-border-palette-1-base u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-shape u-shape-1"></div>

                                <img ref="wrapper" v-if="post.images && (post.images.length>0)" 
                                class="u-expand-resize u-expanded-width-lg u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-image u-image-1 lazyload"
                                     :data-src="post.images[0].imageSrc" data-image-width="462"
                                     data-image-height="693"
                                     :data-href="link()">
                                <img v-else data-src="/images/default-image.jpg" alt="not found" 
                                class="u-expand-resize u-expanded-width-lg u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-image u-image-1 lazyload"
                                      data-image-width="462"
                                     data-image-height="693"
                                     :data-href="link()">
                                <div class="poale-text">
                                     <h3 class="u-text u-text-1">{{objData.preferredLocale === 'ru' ? post.labelRu : post.label}}</h3>
                                     <div class="u-text u-text-grey-30  flex justify-content-between">
                                      <p class="nonMar">{{post.dateEvent  | getCreate(objData.preferredLocale)}}</p>
                                       <p  class="nonMar" v-if="delButton">
                                       <a href="#" @click="openRemoveDialog(post.id)"><i class="el-icon-delete"></i></a>

                                       <a href="#" @click="openEditDialog()"><i class="el-icon-edit-outline"></i></a>
                                       </p>
                                     </div>
                                     <p class="u-text u-text-3">{{objData.preferredLocale === 'ru' ? post.subtitleRu.limit(70) : post.subtitle}} <el-link :href="link()" icon="el-icon-top-right"></el-link></p>
                                </div>
                            </div>
                        </div>`,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    //...
  },


  mounted: async function () {
    this.updateStyle(this.$refs.wrapper);
  },

  beforeDestroy: function () {
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
    openEditDialog() {
      this.$emit('editpost', this.post);
    },
    removeItem() {
      // Генерируем событие, возможно с передаваемыми данными
      this.$emit('remove', this.removeId);
    },
    link() {
      return `/blog/post/${this.post.id}`;
    },
/*    updateStyle(wrappers, objData) {
      if (!_.isArray(wrappers) && wrappers.length < 1) {
        return;
      }
      wrappers.map((wrapper, ind) => {
        let img = (objData && objData.length >= 1) ? objData[ind].imageSrc : '';
        img ? $(wrapper).css('backgroundImage', 'url(' + img + ')') : '';
      });
    } ,
              */
    async updateStyle(wrapper) {
    /*  const t = `${this.post.valueX}% ${this.post.valueY}%`;
      let data = {id: this.post.id, position: t, valueX: this.post.valueX, valueY: this.post.valueY};*/
      wrapper ? wrapper.style.setProperty('object-position', this.post.position) : '';
      // await io.socket.put(`/api/v1/posts/update-position-img`, data, (data, jwRes) => {
      //   console.log('Сервер update-position-img ответил кодом ' + jwRes.statusCode + ' и данными: ', data);
      // });
      // wrappers.map((wrapper, ind) => {
      //   let img = (objData && objData.length >= 1) ? objData[ind].imageSrc : '';
      //   img ? $(wrapper).css('backgroundImage', 'url(' + img + ')') : '';
      // });
    },
  }
});
