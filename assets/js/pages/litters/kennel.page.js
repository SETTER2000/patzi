parasails.registerPage('kennel', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    litters: [],

    selectedLitter: undefined,

    // Виртуальная часть URL
    virtualPageSlug:'',

    showLitterModalOpen: false,

    uploadFormData: {
      label: '',
      photo: undefined,
      previewImageSrc: '',
      gender:'',
      type:'',
      preliminaryPrice:0,
      currency:''
    },

    borrowFormData: {
      expectedReturnAt: undefined,
      preliminaryPrice: undefined
    },
    // Modals which aren't linkable:
    borrowLitterModalOpen: false,
    confirmDeleteLitterModalOpen: false,
    scheduleReturnModalOpen: false,
    confirmReturnModalOpen: false,


    // Состояние загрузки
    syncing: false,

    // Validation errors:
    formErrors: {},
    // Состояние ошибки сервера
    cloudError: '',

    borrowFormSuccess: false,
    scheduleReturnFormSuccess: false
  },


  virtualPages: true,
  html5HistoryMode: 'history',
  virtualPagesRegExp: /^\/litters\/?([^\/]+)?/,


  filters: {
    capitalize: function (value) {
      if (!value) {return '';}
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    date (value, ru) {
      // return value.toLocaleString();
      if (!value) {return '';}
      let date; let year; let month; let dt;
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
    this.$find('[data-toggle="tooltip"]').tooltip();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    /* clickLitter: async function (litterId) {

      /!*await Cloud.destroyOneLitters.with({id:litterId});
      _.remove(this.litters, {id:litterId});
      this.$forceUpdate();*!/
    }*/

    // Обработчик события нажатия на кнопку|иконку Delete|ведро в карточке товара
    // Это кнопка вызывает модальное окно <modal> с <ajax-form>
    clickDeleteLitter: function (litterId) {
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
      };
    },

    submittedDeleteLitterForm: function () {
      _.remove(this.litters, {id: this.selectedLitter.id});
      this.$forceUpdate();
      this.confirmDeleteLitterModalOpen = false;
      this.selectedLitter = undefined;
    },

    // Обработчик события нажатия на кнопку|иконку "Add an item"|вертлюжок на странице
    // Это кнопка вызывает модальное окно "Upload <modal>" с <ajax-form> для загрузки фото
    clickAddButton: function () {
      // this.uploadLitterModalOpen = true;
      this.goto('/litters/new');
      // this.selectedLitter = _.find(this.litters, {id: litterId});
    },

    // Обработчик события нажатия на кнопку|иконку "Add an item"|вертлюжок на странице
    // Это кнопка вызывает модальное окно "ShowPhoto <modal>" с <ajax-form> для загрузки фото
    clickShowPhoto: function () {
      this.showLitterModalOpen = true;
      // this.selectedLitter = _.find(this.litters, {id: litterId});
    },

    // Обнуляет данные формы загрузки объекта, очищает поля формы
    _clearUploadLitterModal: function () {
      // Close modal
      this.goto('/litters');
      // Reset form data
      this.uploadFormData = {
        photo: undefined,
        previewImageSrc: '',
        born:undefined,
        label:undefined,
        gender:undefined,
        type:undefined,
        preliminaryPrice:undefined,
        currency:undefined,
      };
      // Clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    _clearBorrowLitterModal: function() {
      // Close modal
      this.borrowLitterModalOpen = false;
      // Reset form data
      this.borrowFormData = {
        expectedReturnAt: undefined,
        preliminaryPrice: undefined
      };
      this.selectedLitter = undefined;
      // Clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    closeUploadLitterModal: function () {
      this._clearUploadLitterModal();
      /*this.selectedLitter = undefined;
      this.uploadLitterModalOpen = false;*/
    },

    handleParsingUploadLitterForm: function () {
      this.formErrors = {};
      let argins =  this.uploadFormData;
      if(!argins.photo) {
        this.formErrors.photo = true;
      }

      if(!argins.born) {
        this.formErrors.born = true;
      }

      if(!argins.label) {
        this.formErrors.label = true;
      }
      if(!argins.gender) {
        this.formErrors.gender = true;
      }
      if(!argins.type) {
        this.formErrors.type = true;
      }
      // if(!argins.preliminaryPrice) {
      //   this.formErrors.preliminaryPrice = true;
      // }
      // if(!argins.currency) {
      //   this.formErrors.currency = true;
      // }

      // Convert the return time into a real date.
      // Преобразуйте дату помёта в реальную дату.
      // Приходит timestamp типа: born: 1558472400000
      argins.born = this.$refs.datepickerref.doParseDate().getTime();

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined. (Thus signifies that the submission should be cancelled.)
      // Если были какие-либо проблемы, они были сообщены пользователю,
      // так просто вернуть undefined. (Таким образом, означает,
      // что представление должно быть отменено.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }
      // return argins;
      return _.omit(argins, ['previewImageSrc']);
    },


    /**
     * Обрабатывает success от сервера, при загрузки файла без ошибок.
     * Т.е. как только форма загрузки файла на сервере отработала без ошибок
     * эта функция получает результат и должна вставить новые данные на страницу.
     */
    submittedUploadLitterForm: function (result) {
      // Добавлем новые данные в уже имеющийся массив litters
      this.litters.push({
        label: this.uploadFormData.label,
        gender:this.uploadFormData.gender,
        type:this.uploadFormData.type,
        preliminaryPrice:this.uploadFormData.preliminaryPrice,
        currency:this.uploadFormData.currency,
        id: result.id,
        imageSrc:result.imageSrc,
        title:this.uploadFormData.title,
        subtitle:this.uploadFormData.subtitle,
        born:this.uploadFormData.born,
        owner: {
          id: this.me.id,
          fullName: this.me.fullName,
        },
      });
      this._clearUploadLitterModal();
    },

    changeFileInput: function (files) {
      if (files.length !== 1 && !this.uploadFormData.photo) {
        throw new Error('Consistency violation: `changeFileInput` ' +
          'was somehow called with an empty array of files, ' +
          'or with more than one file in the array!  This should never happen unless ' +
          'there is already an uploaded file tracked.');
      }

      let selectedFile = files[0];

      if (!selectedFile) {
        this.uploadFormData.photo = undefined;
        return;
      }


      this.uploadFormData.photo = selectedFile;

      // Set up the file preview for the UI:
      // Настройка предварительного просмотра файла для пользовательского интерфейса:
      var reader = new FileReader();
      reader.onload = (event)=>{
        this.uploadFormData.previewImageSrc = event.target.result;

        // Unbind this "onload" event.
        // Отмена привязки этого события onload.
        delete reader.onload;
      };
      // Clear out any error messages about not providing an image.
      // Удалите все сообщения об ошибках о не предоставлении изображения.
      this.formErrors.photo = false;
      reader.readAsDataURL(selectedFile);
    },


    clickBorrow: function(litterId) {
      this.selectedLitter = _.find(this.litters, {id: litterId});

      // Open the modal.
      this.borrowLitterModalOpen = true;
    },

    closeBorrowLitterModal: function() {
      this._clearBorrowLitterModal();
    },

    handleParsingBorrowLitterForm: function() {
      // Clear out any pre-existing error messages.
      // Удалите все существующие сообщения об ошибках
      this.formErrors = {};
      var argins = _.extend({ id: this.selectedLitter.id }, this.borrowFormData);

      if(!argins.expectedReturnAt) {
        this.formErrors.expectedReturnAt = true;
      }

      if(!argins.preliminaryPrice) {
        this.formErrors.preliminaryPrice = true;
      }

      // Convert the return time into a real date.
      // Конвертировать время в реальную дату.
      argins.expectedReturnAt = this.$refs.datepickerref.doParseDate().getTime();

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },

    submittedBorrowLitterForm: function() {

      // Show success message.
      // Показать сообщение об успехе.
      this.borrowFormSuccess = true;

      // Update the borrowed item in the UI.
      // Обновление элемента в пользовательском интерфейсе.
      var borrowedItem = _.find(this.litters, {id: this.selectedLitter.id});
      borrowedItem.borrowedBy = this.me;
    },


  }
});
