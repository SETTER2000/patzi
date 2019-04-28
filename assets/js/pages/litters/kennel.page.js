parasails.registerPage('kennel', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    litters: [],
    confirmDeleteLitterModalOpen: false,
    selectedLitter: undefined,

    uploadLitterModalOpen: false,
    showLitterModalOpen: false,
    uploadFormData: {
      label: '',
      photo: undefined,
      previewImageSrc: ''
    },
    // Состояние загрузки
    syncing: false,
    // Validation errors:
    formErrors: {},
    // Состояние ошибки сервера
    cloudError: '',
  },
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
      };
    },

    submittedDeleteLitterForm: function () {
      console.log(`Ok it worked ID: ${this.selectedLitter.id}!`);
      _.remove(this.litters, {id: this.selectedLitter.id});
      this.$forceUpdate();
      this.confirmDeleteLitterModalOpen = false;
      this.selectedLitter = undefined;
    },

    // Обработчик события нажатия на кнопку|иконку "Add an item"|вертлюжок на странице
    // Это кнопка вызывает модальное окно "Upload <modal>" с <ajax-form> для загрузки фото
    clickAddButton: function () {
      console.log(`click the "Add an item" button!`);
      this.uploadLitterModalOpen = true;
      // this.selectedLitter = _.find(this.litters, {id: thingId});
    },

    // Обработчик события нажатия на кнопку|иконку "Add an item"|вертлюжок на странице
    // Это кнопка вызывает модальное окно "ShowPhoto <modal>" с <ajax-form> для загрузки фото
    clickShowPhoto: function () {
      console.log(`click to photo the "Show photo" !`);
      this.showLitterModalOpen = true;
      // this.selectedLitter = _.find(this.litters, {id: thingId});
    },

    // Обнуляет данные формы загрузки объекта, очищает поля формы
    _clearUploadLitterModal: function () {
      // Close modal
      this.uploadLitterModalOpen = false;
      // Reset form data
      this.uploadFormData = {
        label: '',
        photo: undefined,
        previewImageSrc: ''
      };
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
      let argins = this.uploadFormData;

      if(!argins.photo) {
        this.formErrors.photo = true;
      }

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
console.log('BORN SEARCH', this.uploadFormData);
      // Добавлем новые данные в уже имеющийся массив litters
      this.litters.push({
        label: this.uploadFormData.label,
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
      console.log('files: ', files);
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

      // console.log('Имя фото: ', selectedFile.name);

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
    }
  }
});
