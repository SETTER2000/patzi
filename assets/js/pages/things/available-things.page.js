parasails.registerPage('available-things', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    things: [],
    objID: 0,
    autoplay: true,
    value3: true,
    value4: true,
    items: [
      {name: 'Poale Ell Adam', src: 'https://d1lyb0stb8az10.cloudfront.net/Lux-2.jpg'},
      {name: 'Poale Ell Bell', src: 'https://d1lyb0stb8az10.cloudfront.net/Lux-2018-11.jpg'},
      {name: 'Poale Ell Bazhen', src: 'https://d1lyb0stb8az10.cloudfront.net/Adam-10m.jpg'},
      {name: 'Poale Ell Barthalamew', src: 'https://d1lyb0stb8az10.cloudfront.net/Lux-2018.jpg'},
    ],
    confirmDeleteThingModalOpen: false,
    selectedThing: undefined,
    centerDialogVisible: false,
    photoVisible: false,
    uploadThingModalOpen: false,
    showThingModalOpen: false,
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
    capital: function (value) {
      if (!value) {
        return '';
      }
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    date: function (value) {
      return value.toLocaleString();
      /*if (!value) return '';
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
      return  (ru==='ru') ? `${dt}.${month}.${year}`:`${year}.${month}.${dt}`;*/
    }
  },


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    // Сначала объединяем любые полученные данные с сервера для
    // использования в текущем компоненте.
    _.extend(this, SAILS_LOCALS);
  },


  mounted: async function () {
    //…
  },


  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    // Обработчик события нажатия на кнопку|иконку Delete|ведро в карточке товара
    // Это кнопка вызывает модальное окно <modal> с <ajax-form>
    // для удаления объекта
    clickDeleteThing: function (thingId) {
      this.confirmDeleteThingModalOpen = true;
      this.selectedThing = _.find(this.things, {id: thingId});
    },

    // Закрывает модальное окно для удаления объекта
    closeDeleteThingModal: function () {
      this.selectedThing = undefined;
      this.confirmDeleteThingModalOpen = false;
    },

    handleParsingDeleteThingForm: function () {
      return {
        id: this.selectedThing.id
      };
    },

    submittedDeleteThingForm: function () {
      _.remove(this.things, {id: this.selectedThing.id});
      this.$forceUpdate();
      this.confirmDeleteThingModalOpen = false;
      this.selectedThing = undefined;
    },

    // Обработчик события нажатия на кнопку|иконку "Add an item"|вертлюжок на странице
    // Это кнопка вызывает модальное окно "Upload <modal>" с <ajax-form> для загрузки фото
    clickAddButton: function () {
      this.uploadThingModalOpen = true;
      // this.selectedThing = _.find(this.things, {id: thingId});
    },

    // Обработчик события нажатия на кнопку|иконку "Add an item"|вертлюжок на странице
    // Это кнопка вызывает модальное окно "ShowPhoto <modal>" с <ajax-form> для загрузки фото
    clickShowPhoto: function () {
      this.showThingModalOpen = true;
      // this.selectedThing = _.find(this.things, {id: thingId});
    },

    // Обнуляет данные формы загрузки объекта, очищает поля формы
    _clearUploadThingModal: function () {
      // Close modal
      this.uploadThingModalOpen = false;
      // Reset form data
      this.uploadFormData = {
        photo: undefined,
        previewImageSrc: '',
        label: undefined,
      };
      // Clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    closeUploadThingModal: function () {
      this._clearUploadThingModal();
      /*this.selectedThing = undefined;
      this.uploadThingModalOpen = false;*/
    },

    handleParsingUploadThingForm: function () {
      this.formErrors = {};
      let argins = this.uploadFormData;

      if (!argins.photo) {
        this.formErrors.photo = true;
      }
      if (!argins.label) {
        this.formErrors.label = true;
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
    submittedUploadThingForm: function (result) {

      // Добавлем новые данные в уже имеющийся массив things
      this.things.push({
        label: this.uploadFormData.label,
        id: result.id,
        imageSrc: result.imageSrc,
        title: this.uploadFormData.title,
        subtitle: this.uploadFormData.subtitle,
        owner: {
          id: this.me.id,
          fullName: this.me.fullName,
        },
      });
      this._clearUploadThingModal();
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
      reader.onload = (event) => {
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

    clickEditThing(id) {
      this.centerDialogVisible = true;
    },
    clickPhotoVisible(id, index) {
      // console.log('id: ', id);
      this.photoVisible = true;
      this.objID = id;
    }
  }
});
