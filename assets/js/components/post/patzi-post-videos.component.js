/**
 * <patzi-post-videos>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPostVideos', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'objData',
    'video',
    'delButton'
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      vid: false
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: ` <section  class="u-carousel u-slide u-block-926e-1" id="carousel_62aa" data-interval="5000" data-u-ride="carousel">
      <template v-if="vid" >
        <ol class="u-absolute-hcenter u-carousel-indicators u-block-926e-5">
            <li v-for="(post, index) of video" data-u-target="#carousel_62aa" class="u-palette-1-light-1" :data-u-slide-to="index"></li>
<!--            <li data-u-target="#carousel_62aa" class="u-palette-1-light-1" data-u-slide-to="1"></li>
            <li data-u-target="#carousel_62aa" class="u-palette-1-light-1" data-u-slide-to="2"></li>-->
        </ol>
<!--        Окно карусели видео роликов-->
        <div class="u-carousel-inner" role="listbox" :autoplay="false">
            <div v-for="(post, index) of video"   :key="'io-'+index" class="u-align-center u-carousel-item u-clearfix u-palette-1-base" :class="classObject(index)"  >
                <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
                    <div class="u-align-left u-expanded-width-sm u-expanded-width-xs u-video u-video-contain u-video-1" >
                        <div style="position: absolute;" class="embed-responsive" >
                            <iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"
                                    class="embed-responsive-item" :src="'https://www.youtube.com/embed/'+post.videoUrl"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen></iframe>
                            <!--              <iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;" class="embed-responsive-item" src="https://www.youtube.com/embed/TUar0_aUWq8?mute=0&amp;showinfo=0&amp;controls=0&amp;start=0" frameborder="0" allowfullscreen=""></iframe>-->
                        </div>
                    </div>
                    <h2 class="u-text u-text-1">{{post.videoHeader}}</h2>
                    <p class="u-text u-text-2">{{post.videoDescription}}</p>
                </div>
            </div>
        </div>
        <a class="u-absolute-vcenter u-carousel-control u-carousel-control-prev u-text-palette-1-light-1 u-block-926e-3"
           href="#carousel_62aa" role="button" data-u-slide="prev">
        <span aria-hidden="true">
          <svg viewBox="0 0 477.175 477.175"><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
                    c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"></path></svg>
        </span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="u-absolute-vcenter u-carousel-control u-carousel-control-next u-text-palette-1-light-1 u-block-926e-4"
           href="#carousel_62aa" role="button" data-u-slide="next">
        <span aria-hidden="true">
          <svg viewBox="0 0 477.175 477.175"><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
                    c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"></path></svg>
        </span>
            <span class="sr-only">Next</span>
        </a>
        </template>
    </section>

`,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    this.vid = (this.video && this.video.length > 0);
  },
  computed: {},

  mounted: async function () {
    this.data = this.objData.data ? this.objData.data : this.data;
  },

  beforeDestroy: function () {
    //...
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    classObject(index) {
      index = index + 1;
      var o = {
        'u-active': (index === 1)
      };
      o[`u-section-3-${index}`] = true;
      return o;
    },
    removeItem(id) {
      // Генерируем событие, возможно с передаваемыми данными
      this.$emit('remove', id);
    },
    editPost(post) {
      // Генерируем событие, возможно с передаваемыми данными
      this.$emit('editpost', post);
    },
  }
});
