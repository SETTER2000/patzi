/**
 * <patzi-post-header>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPostHeader', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'objData',
    'post',
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      valueX: 0,
      valueY: 0,
      showRule: false,
      vs: 0,
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <section class="skrollable skrollable-between u-clearfix u-image u-shading u-section-1" id="carousel_6c71" data-image-width="1148" data-image-height="678">
    <div class="u-clearfix u-sheet u-sheet-1">
      <div class="u-clearfix u-expanded-width u-gutter-30 u-layout-wrap u-layout-wrap-1">
        <div class="u-layout">
          <div class="u-layout-row">
            <div class="u-container-style u-expand-resize u-layout-cell u-left-cell u-size-39 u-layout-cell-1">
              <div class="u-container-layout u-valign-middle-xs u-container-layout-1">
                <div class="u-align-left u-expanded-height u-palette-1-base u-shape u-shape-1"></div>
                <div  class="u-align-left u-container-style u-group u-group-1">
                  <div class="u-container-layout u-valign-middle u-container-layout-2">
                                        <span class="u-icon u-icon-circle u-text-white u-icon-1">
                        <svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 58 58" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-9af0"></use></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="svg-9af0" x="0px" y="0px" viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve" class="u-svg-content"><g><circle cx="22" cy="24.5" r="1"></circle><circle cx="29" cy="24.5" r="1"></circle><circle cx="36" cy="24.5" r="1"></circle><circle cx="43" cy="24.5" r="1"></circle><circle cx="50" cy="24.5" r="1"></circle><circle cx="8" cy="32.5" r="1"></circle><circle cx="15" cy="32.5" r="1"></circle><circle cx="22" cy="32.5" r="1"></circle><circle cx="29" cy="32.5" r="1"></circle><circle cx="36" cy="32.5" r="1"></circle><circle cx="43" cy="32.5" r="1"></circle><circle cx="50" cy="32.5" r="1"></circle><circle cx="8" cy="39.5" r="1"></circle><circle cx="15" cy="39.5" r="1"></circle><circle cx="22" cy="39.5" r="1"></circle><circle cx="29" cy="39.5" r="1"></circle><circle cx="36" cy="39.5" r="1"></circle><circle cx="43" cy="39.5" r="1"></circle><circle cx="50" cy="39.5" r="1"></circle><circle cx="8" cy="47.5" r="1"></circle><circle cx="15" cy="47.5" r="1"></circle><circle cx="22" cy="47.5" r="1"></circle><circle cx="29" cy="47.5" r="1"></circle><circle cx="36" cy="47.5" r="1"></circle><path d="M26,0.5c-0.553,0-1,0.447-1,1s0.447,1,1,1c1.302,0,2.402,0.838,2.816,2h2.083C30.434,2.221,28.414,0.5,26,0.5z"></path><path d="M32,0.5c-0.553,0-1,0.447-1,1s0.447,1,1,1c1.302,0,2.402,0.838,2.816,2h2.083C36.434,2.221,34.414,0.5,32,0.5z"></path><path d="M38,0.5c-0.553,0-1,0.447-1,1s0.447,1,1,1c1.302,0,2.402,0.838,2.816,2h2.083C42.434,2.221,40.414,0.5,38,0.5z"></path><path d="M42.899,4.5C42.965,4.823,43,5.158,43,5.5c0,2.757-2.243,5-5,5c-0.553,0-1-0.447-1-1s0.447-1,1-1c1.654,0,3-1.346,3-3   c0-0.353-0.072-0.686-0.184-1h-3.917C36.965,4.823,37,5.158,37,5.5c0,2.757-2.243,5-5,5c-0.553,0-1-0.447-1-1s0.447-1,1-1   c1.654,0,3-1.346,3-3c0-0.353-0.072-0.686-0.184-1h-3.917C30.965,4.823,31,5.158,31,5.5c0,2.757-2.243,5-5,5c-0.553,0-1-0.447-1-1   s0.447-1,1-1c1.654,0,3-1.346,3-3c0-0.353-0.072-0.686-0.184-1h-3.917C24.965,4.823,25,5.158,25,5.5c0,2.757-2.243,5-5,5   c-0.553,0-1-0.447-1-1s0.447-1,1-1c1.654,0,3-1.346,3-3c0-0.353-0.072-0.686-0.184-1H18h-0.816c0.414-1.162,1.514-2,2.816-2   s2.402,0.838,2.816,2h2.083c-0.465-2.279-2.484-4-4.899-4s-4.434,1.721-4.899,4H14H0v11v2v40h58v-40v-2v-11H42.899z M56,55.5H2v-38   h54V55.5z"></path>
</g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                      </span>
                    <p class="u-custom-font u-heading-font u-text u-text-white u-text-1">{{post.dateEvent | getCreate(objData.preferredLocale)}}</p>
                  </div>
                </div>


                <img ref="wrapper" :src="getUrlImg()" alt="" class="u-align-left u-image u-image-1">
                  <transition name="fade">
                  <div v-if="showRule"  class="block d-flex justify-content-center align-content-center" >
                  <el-slider
                        @input="changePositionX"
                        v-model="post.valueX"
                        style="width: 250px"
                     >
                    </el-slider>
                  </div>
                  </transition>
                <div class="u-border-4 u-border-palette-1-base u-shape u-shape-circle u-shape-2"></div>
              </div>
                 <transition name="fade">
                <div v-if="showRule"  class="d-flex flex-column justify-content-center">
                  <el-slider
                    v-model="post.valueY"
                     @input="changePositionY"
                    vertical
                    height="200px">
                  </el-slider>
                </div>
                </transition>

            </div>
            <div class="u-align-left u-container-style u-layout-cell u-right-cell u-size-21 u-layout-cell-2">

              <div class="u-container-layout u-container-layout-3">

                <div class="u-border-9 u-border-grey-5 u-line u-line-horizontal u-line-1"></div>
                <h1 class="u-custom-font u-font-oswald u-text u-text-grey-10 u-text-3">{{objData.preferredLocale ==='ru' ? post.labelRu : post.label}}</h1>
                <h4 class="u-custom-font u-font-open-sans u-text u-text-5"> <strong> {{objData.preferredLocale ==='ru' ? 'Тема' : 'Theme'}}</strong>: {{objData.preferredLocale ==='ru' ? post.topic.labelRu : post.topic.label}}</h4>
                <p class="u-text u-text-5">
                {{objData.preferredLocale ==='ru' ? post.subtitleRu : post.subtitle}}
                </p>

                <el-row class="edit-buttons" >
                    <el-button  @click="goto('/blog')" icon="el-icon-house" circle></el-button>
                    <template v-if="post.isAdmin || post.isSuperAdmin">
                    <el-button  @click="openEditDialog()" type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button type="warning" @click="toggle" icon="el-icon-s-operation" circle></el-button>
                    <el-button  @click="removeItem()" type="danger" icon="el-icon-delete" circle></el-button>
                    </template>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`,

  beforeMount: function () {
    // Принимаем данные по событию list-*
    io.socket.on('post-position', data => {
      this.$forceUpdate();
    });
  },

  watch: {
    // эта функция запускается при любом изменении count
    /*  valueX: async function (newVal) {
         this.post.valueX = newVal;
         this.updateStyle(this.$refs.wrapper);
         // await io.socket.update(`/sockets/user/list/${this.value}`, function gotResponse(body, response) {
         //   // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
         // });
       },
       valueY: async function (newVal) {
         this.post.valueY = newVal;
         this.updateStyle(this.$refs.wrapper);
         // await io.socket.update(`/sockets/user/list/${this.value}`, function gotResponse(body, response) {
         //   // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
         // });
       }*/
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
      moment.locale(l);
      let formatNew = _.isEmpty(format) ? 'LLL' : format;
      return (moment(value).format(formatNew)) ? moment(value).format(formatNew) : value;
    },
  },
  methods: {
    openEditDialog() {
      this.$emit('editpost', this.post);
    },
    removeItem() {
      // Генерируем событие, возможно с передаваемыми данными
      this.$emit('remove', this.post.id);
    },
    changePositionX(newVol) {
      console.log('newVol X:: ', newVol);
      this.post.valueX = newVol;
      this.updateStyle(this.$refs.wrapper);
    },

    changePositionY(newVol) {
      console.log('newVol Y:: ', newVol);
      this.post.valueY = newVol;
      this.updateStyle(this.$refs.wrapper);
    },
    async updateStyle(wrapper) {
      const t = `${this.post.valueX}% ${this.post.valueY}%`;
      let data = {id: this.post.id, position: t, valueX: this.post.valueX, valueY: this.post.valueY};
      wrapper ? wrapper.style.setProperty('object-position', t) : '';
      console.log('Before sends: ', data);
      await io.socket.put(`/api/v1/posts/update-position-img`, data, (data, jwRes) => {
        // console.log('Сервер update-position-img ответил кодом ' + jwRes.statusCode + ' и данными: ', data);
      });
    },
    toggle() {
      this.showRule = !this.showRule;
    },
    getUrlShare(){
      return `#`;
    },
    getUrlImg(){
      return  this.post.images && this.post.images.length > 0 ? this.post.images[this.post.cover].imageSrc : '/images/default-image.jpg' ;
    }
  }
});
