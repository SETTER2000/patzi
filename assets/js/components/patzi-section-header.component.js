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
  <section class="banner-area relative" ref="wrapper">
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="about-content col-lg-12">
          <h1 class="text-white"> {{objData.preferredLocale === 'ru' ? objData.header.ru : objData.header.en}}{{label ? ': ' : ''}}{{!label ? '' : objData.preferredLocale === 'ru' ? objData.data.labelRu :  objData.title }}</h1>
          <p>{{objData.preferredLocale === 'ru' ? objData.subTitle.ru : objData.subTitle.en}}</p>
        </div>
      </div>
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
    console.log('this.objData+++::: ', this.objData);
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
      console.log('objData:: ', objData);
      let img = _.last(_.pluck(objData, 'imageSrc'));
      console.log('imm:', img);

      (img && img.length) > 0 ? $(wrapper).css('backgroundImage', 'url(' + img + ')') : '';

    }
  }
});
