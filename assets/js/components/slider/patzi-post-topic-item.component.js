/**
 * <patzi-post-topic-item>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPostTopicItem', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: {
    'objData':{
      type:Object,
      require:true
    },
    'topic': {
      type: Object,
      require: true
    }
  },

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      XXXX:{
        'background-image':'url(http://localhost:1337/download/topic/5e34c88a6c06cf23ec4cc342/topicBackground/0)',
    }
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: ` <div   class="-lg -sm -xl -xs u-align-center u-carousel-item u-clearfix u-image u-shading" 
 :class="[{'u-active':topic.active},topic.uSectionClass]" :style="{backgroundImage: 'linear-gradient(0deg,rgba(0,0,0,.3),rgba(0,0,0,.3)),url(' + topic.topicBackground[0].imageSrc + ')', 'background-position':topic.backgroundPosition}" src="" data-image-widatah="1148" data-image-height="678">
        <div class="u-clearfix u-sheet u-sheet-1">
          <div class="u-align-left u-container-style u-expanded-widatah u-group u-group-1">
            <div class="u-container-layout u-container-layout-1">
              <h1 class="u-text u-title u-text-1" :style="{'font-size': '3rem'}">{{objData.preferredLocale === 'ru' ? topic.labelRu : topic.label}}</h1>
              <p class="u-large-text u-text u-text-variant u-text-2">{{objData.preferredLocale === 'ru' ? topic.subtitleRu : topic.subtitle}}</p>
              <a href="#" class="u-border-radius-0 u-btn u-btn-rectangle u-button-style u-palette-1-base u-btn-1">{{objData.preferredLocale === 'ru' ? 'Выбрать' : 'Select'}}</a>
            </div>
          </div>
          <div class="u-clearfix u-expanded-widatah u-gutter-30 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
              <div class="u-layout-row">
                  <patzi-post-topic-item-img v-for="(img,ind) of topic.images" :obj-data="objData" :img="img" :key="img.id" ></patzi-post-topic-item-img>
                <!-- <div class="u-align-left u-container-style u-image u-layout-cell u-left-cell u-size-15 u-size-30-md u-image-1" src="">
                  <div class="u-container-layout u-container-layout-2" src=""></div>
                </div>
                <div class="u-align-center u-container-style u-image u-layout-cell u-size-15 u-size-30-md u-image-2" src="" data-image-widatah="1600" data-image-height="1067">
                  <div class="u-container-layout u-container-layout-3" src=""></div>
                </div>
                <div class="u-align-left u-container-style u-hidden-sm u-hidden-xs u-image u-layout-cell u-size-15 u-size-30-md u-image-3" src="">
                  <div class="u-container-layout u-container-layout-4" src=""></div>
                </div>
                <div class="u-align-left u-container-style u-hidden-sm u-hidden-xs u-image u-layout-cell u-right-cell u-size-15 u-size-30-md u-image-4" src="">
                  <div class="u-container-layout u-container-layout-5" src=""></div>
                </div>-->
              </div>
            </div>
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
    // if (this.objData.data === undefined) {
    //   throw new Error('Neither `:data`  was passed in to <d3-bars-chart>, but one or the other must be provided.');
    // }
  },

  beforeDestroy: function () {
    //...
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //...
  }
});
