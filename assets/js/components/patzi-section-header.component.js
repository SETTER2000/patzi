/**
 * <patzi-section-header>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziSectionHeader', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'styleObj',
    'objData',
    'label',
    'video'

  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      styleObjType: Object,
      /**
       * В основном все значения действуют поумолчанию, если нет таких же входящих данных.
       * Например как color в beforeMount
       */
      width: window.innerWidth, // ширина svg
      height: window.innerHeight, // высота svg
      color: ['#8ab200', '#8ab200'], // диапазон цветов столбцов от...до
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <!-- start banner Area -->
  <section v-if="!video" class="banner-area relative" ref="wrapper">
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="about-content col-lg-12">
          <h1 class="text-white"> {{objData.preferredLocale === 'ru' ? objData.header.ru : objData.header.en}}{{label ? ': ' : ''}}{{!label ? '' : objData.preferredLocale === 'ru' ? objData.data.labelRu :  objData.title }}</h1>
          <p>{{objData.preferredLocale === 'ru' ? objData.subTitle.ru : objData.subTitle.en}}</p>
        </div>
      </div>
    </div>
  </section>
    <section v-else class="u-clearfix u-video u-section-1" id="sec-53d9">
    <div style="" class="u-background-video u-expanded u-video-cover">
      <div style=" position: absolute;width:178%;left:-39%;height:178%;top:-39%" class="embed-responsive">
        <iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;" class="embed-responsive-item" src="https://www.youtube.com/embed/RPp6p73ria4?playlist=RPp6p73ria4&amp;loop=1&amp;mute=1&amp;showinfo=0&amp;controls=0&amp;start=0&amp;autoplay=1" frameborder="0" allowfullscreen=""></iframe>
      </div>
    </div>
    <div class="u-clearfix u-sheet u-sheet-1">
      <img src="images/adc12b1e1454f20fadfaabb27bbc3476.png" alt="" class="u-image u-image-contain u-image-default u-image-1" data-image-width="195" data-image-height="199" data-animation-name="bounceIn" data-animation-duration="1000" data-animation-delay="0" data-animation-direction="">
      <div class="u-align-center u-container-style u-expanded-width u-group u-group-1">
        <div class="u-container-layout">
          <h3 class="u-text u-text-white u-text-1">hello, we are</h3>
          <h1 class="u-text u-text-white u-title u-text-2" data-animation-name="fadeIn" data-animation-duration="1000" data-animation-delay="0" data-animation-direction="">Poale Ell Chester</h1>
          <p class="u-text u-text-body-alt-color u-text-3">Chinese Crested Dog Lovely baby</p>
        </div>
      </div>
      <img src="images/a43f0c881afb6a0766cbd11968251686.png" alt="" class="u-image u-image-contain u-image-default u-image-2" data-image-width="195" data-image-height="199" data-animation-name="rollIn" data-animation-duration="1000" data-animation-delay="0" data-animation-direction="">
    </div>
  </section>
  <!-- End banner Area -->

`,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
  },


  mounted: async function () {
    if (this.objData.header === undefined) {
      throw new Error('Neither `:header`  was passed in to <patzi-section-header>, but one or the other must be provided.');
    }

    this.updateStyle(this.$refs.wrapper, this.objData.topicBackground);
  },

  beforeDestroy: function () {
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    updateStyle(wrapper, objData) {
      if (!wrapper) {
        return;
      }
      let img = _.last(_.pluck(objData, 'imageSrc'));
      (img && img.length) > 0 ? $(wrapper).css('backgroundImage', 'url(' + img + ')') : '';
    }
  }
});
