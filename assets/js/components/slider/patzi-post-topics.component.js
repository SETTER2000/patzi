/**
 * <patzi-post-topics>
 * -----------------------------------------------------------------------------
 * Компонент для представления тем постов в слайдере.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPostTopics', {
  props: [
    'objData',
    'topics'
  ],
  data: function () {
    return {
      styleObject: {
        color: '#ff080f'
      }
    };
  },
  template: `
 <section   class="u-carousel  u-slide u-valign-middle u-block-fbe7-1" src="" id="carousel_c5ca" data-interval="5000" data-u-ride="carousel">
    <ol class="u-absolute-hcenter u-carousel-indicators u-block-fbe7-5">
    <template v-for="(i) in topics.length">
      <li data-u-target="#carousel_c5ca" class="u-grey-30"  :data-u-slide-to="i - 1"></li>
      </template>
    </ol>
    <div class="u-carousel-inner" role="listbox">
     <patzi-post-topic-item v-for="(topic,ind) of topics" @select-topic="selectPosts" :obj-data="objData" :topic="topic" :key="topic.id" ></patzi-post-topic-item>
    </div>

    <a class="u-absolute-vcenter u-carousel-control u-carousel-control-prev u-text-grey-30 u-block-fbe7-3" href="#carousel_c5ca" role="button" data-u-slide="prev">
        <span aria-hidden="true">
          <svg viewBox="0 0 477.175 477.175"><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
                    c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"></path></svg>
        </span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="u-absolute-vcenter u-carousel-control u-carousel-control-next u-text-grey-30 u-block-fbe7-4" href="#carousel_c5ca" role="button" data-u-slide="next">
        <span aria-hidden="true">
          <svg viewBox="0 0 477.175 477.175"><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
                    c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"></path></svg>
        </span>
      <span class="sr-only">Next</span>
    </a>
  </section>
`,
  beforeMount: function () {
    this.data = this.objData.data ? this.objData.data : this.data;
  },
  mounted: async function () {
    this.updateStyle(this.$refs.img, this.topics.topicBackground);
  },
  beforeDestroy: function () {
    //...
  },
  computed: {
    gop: {
      get: function () {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        return this.topics;
      }
    },

  },
  methods: {
    selectPosts(id,dateReceiving) {
      console.log('ID::; ', id);
      console.log('dateReceiving::; ', dateReceiving);
      this.$emit('select-posts', {id:id, dateReceiving:dateReceiving});
    },
    updateStyle(wrapper, objData) {
      if (!wrapper) {
        return;
      }
      let img = _.last(_.pluck(objData, 'imageSrc'));
      (img && img.length) > 0 ? $(wrapper).css('backgroundImage', 'url(' + img + ')') : '';
    }
  }
});
