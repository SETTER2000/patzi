/**
 * <datepicker>
 * -----------------------------------------------------------------------------
 * A wrapper for the jQuery UI datepicker
 * Обертка для средства выбора даты jQuery UI
 *
 * @type {Component}
 *
 * @event input   [emitted when the value changes]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('datepicker', {

  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    // The v-model
    'value',
    // Флаг, сообщающий нам, должен ли указатель даты быть всплывающим
    // или всегда видимый (если ложь)
    'popup',
    // Следующее применимо только при использовании всплывающего стиля datepicker:
    'invalid',
    'validationErrorMessage',
    'placeholderText'
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
  template: `
  <div class="datepicker-wrapper">
    <div datepicker-el v-if="!popup"></div>
    <input class="form-control" v-else :value="value" type="text" :class="[invalid ? 'is-invalid' : '']"  :placeholder="placeholderText || 'Choose return date'" datepicker-el/>
    <div class="invalid-feedback" v-if="invalid">{{validationErrorMessage}}</div>
  </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  mounted: function () {

    this.$find('[datepicker-el]').datepicker({
      onSelect: (dateText, datepicker) => {//eslint-disable-line no-unused-vars
        this.$emit('input', dateText);
      }
    });

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    doParseDate: function () {
      return $.datepicker.parseDate('mm/dd/yy', this.value);
      // return $.datepicker.parseDate('@', new Date( this.value));
    },
    doTimeStump: function () {
      // Функция возвращает из строки даты (22.12.2019), TIMESTAMP согласно предоопределённому стандарту @
      // Используется для форматирования даты перед записью в БД
      return (SAILS_LOCALS.me.preferredLocale === 'ru') ? $.datepicker.parseDate('dd.mm.yy', this.value) : $.datepicker.parseDate('mm/dd/yy', this.value);
    }
  }
});
