parasails.registerPage('kennel', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    litters: [],
    confirmDeleteLitterModalOpen: false,
    selectedLitter: undefined,
    // Состояние загрузки
    syncing: false,
    // Состояние ошибки сервера
    cloudError: '',
  },
  filters: {
    capitalize: function (value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    date: function (value,ru) {
      if (!value) return '';
      let date, year, month, dt;
      date = new Date(value);
      year = date.getFullYear();
      month = date.getMonth() + 1;
      dt = date.getDate();
      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }
      return  (ru==='ru') ? `${dt}.${month}.${year}`:`${year}.${month}.${dt}`;
    }
  },
  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function () {

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
   /* clickLitter: async function (litterId) {
      console.log('clicked a litter #' + litterId);
      /!*await Cloud.destroyOneLitters.with({id:litterId});
      _.remove(this.litters, {id:litterId});
      this.$forceUpdate();*!/
    }*/

    // Обработчик события нажатия на кнопку|иконку Delete|ведро в карточке товара
    // Это кнопка вызывает модальное окно <modal> с <ajax-form>
    clickDeleteLitter: function (litterId) {
      console.log(`click the "delete" button! ID: ${litterId}`);
      this.confirmDeleteLitterModalOpen = true;
      this.selectedLitter = _.find(this.litters, {id: litterId});
    },

    closeDeleteLitterModal: function () {
      this.selectedLitter = undefined;
      this.confirmDeleteLitterModalOpen = false;
    },

    handleParsingDeleteLitterForm: function () {
      return {
        id: this.selectedLitter.id
      }
    },

    submittedDeleteLitterForm: function () {
      console.log(`Ok it worked ID: ${this.selectedLitter.id}!`);
      _.remove(this.litters, {id: this.selectedLitter.id});
      this.$forceUpdate();
      this.confirmDeleteLitterModalOpen = false;
      this.selectedLitter = undefined;
    }
  }
});
