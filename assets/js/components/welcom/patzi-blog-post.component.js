/**
 * <patzi-blog-post>
 * -----------------------------------------------------------------------------
 * Компонент выводит на страницу welcome последний пост из блога
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziBlogPost', {
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
      //...
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `<!-- <section        
            class="skrollable skrollable-between u-align-center-md u-align-center-sm u-align-center-xl u-align-center-xs u-align-left-lg u-clearfix u-section-2"
            id="sec-2f66">
       
          <patzi-posts-homepage-item  v-if="post.rootPage" v-for="(post,ind) of posts" :obj-data="objData" :index="ind" :lang="lang" :post="post" :key="post.id" >  </patzi-posts-homepage-item>
    </section>-->

    
<section class="u-clearfix u-section-7" id="sec-04f4">       
    <div class="u-clearfix u-sheet u-sheet-1">
      <div class="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
        <div class="u-layout">
          <div class="u-layout-row">
            <div class="u-container-style u-expand-resize u-layout-cell u-left-cell u-size-30 u-layout-cell-1">
              <div class="u-container-layout" >
                <a :href="post.detail">
                <!-- <el-image 
                   data-image-width="1600" data-image-height="1067"
                       class="u-image u-image-1 cover-container"
                       :src="getIm(_.last(_.at(post.images, [0])))"
                       :fit="'cover'">
                       <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                        </div>
            </el-image> 
            <el-image 
                   data-image-width="1600" data-image-height="1067"
                       class="u-align-left u-image u-image-2"
                       :src="getIm(_.last(_.at(post.images, [1])))"
                       :fit="'cover'">
                        <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                        </div>
            </el-image> -->
                <img v-if="getIm(_.last(_.at(post.images, [0])))" class="u-image u-image-1 cover-container lazyload" :data-src="getIm(_.last(_.at(post.images, [0])))"
                     data-image-width="1600" data-image-height="1067">
                <img v-if="getIm(_.last(_.at(post.images, [1])))" :data-src="getIm(_.last(_.at(post.images, [1])))" alt=""  class="u-align-left u-image u-image-2 lazyload">
                </a>
              </div>
            </div>
            <div class="u-container-style u-layout-cell u-right-cell u-size-30 u-layout-cell-2">
              <div class="u-container-layout u-valign-middle u-container-layout-2">
                <h2 class="u-align-left u-text u-text-1">{{objData.preferredLocale === 'ru' ? post.labelRu : post.label}}</h2>
                <h4 class="u-align-left u-text u-text-2"><a href="/blog">{{objData.preferredLocale === 'ru' ? (post.topic && post.topic.labelRu ? post.topic.labelRu: '') : (post.topic && post.topic.label ? post.topic.label: '')}}</a> </h4>
                <p class="u-align-left u-text u-text-3">{{post.dateEvent  | getCreate(objData.preferredLocale)}}</p>
                <p class="u-align-left u-text u-text-4"> 
                  {{objData.preferredLocale === 'ru' ? post.subtitleRu : post.subtitle}} 
                </p>
                <p class="u-align-right u-text u-text-5">Poale Ell</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`,


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
    this.data = this.objData.data ? this.objData.data : this.data;
    // if (this.objData.data === undefined) {
    //   throw new Error('Neither `:data`  was passed in to <patziPostsHomepage>, but one or the other must be provided.');
    // }
  },

  beforeDestroy: function () {
    //...
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    getIm(o) {
      return (o && o.imageSrc) ? o.imageSrc : false;
    }
  }
});
