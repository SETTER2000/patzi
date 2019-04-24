parasails.registerPage('available-things', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    things: [],
    confirmDeleteThingModalOpen: false,
    selectedThing: undefined,

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
      if (!value) {return '';}
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
    /*clickThing: async function (thingId) {
      console.log('clicked a thing #' + thingId);
      await Cloud.destroyOneThing.with({id: thingId});
      _.remove(this.things, {id: thingId});
      this.$forceUpdate();
    },*/
    // Обработчик события нажатия на кнопку|иконку Delete|ведро в карточке товара
    // Это кнопка вызывает модальное окно <modal> с <ajax-form>
    // для удаления объекта
    clickDeleteThing: function (thingId) {
      console.log(`click the "delete" button! ID: ${thingId}`);
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
      console.log('Ok it worked!');
      _.remove(this.things, {id: this.selectedThing.id});
      this.$forceUpdate();
      this.confirmDeleteThingModalOpen = false;
      this.selectedThing = undefined;
    },

    // Обработчик события нажатия на кнопку|иконку "Add an item"|вертлюжок на странице
    // Это кнопка вызывает модальное окно "Upload <modal>" с <ajax-form> для загрузки фото
    clickAddButton: function () {
      console.log(`click the "Add an item" button!`);
      this.uploadThingModalOpen = true;
      // this.selectedThing = _.find(this.things, {id: thingId});
    },

    // Обработчик события нажатия на кнопку|иконку "Add an item"|вертлюжок на странице
    // Это кнопка вызывает модальное окно "ShowPhoto <modal>" с <ajax-form> для загрузки фото
    clickShowPhoto: function () {
      console.log(`click to photo the "Show photo" !`);
      this.showThingModalOpen = true;
      // this.selectedThing = _.find(this.things, {id: thingId});
    },

    // Обнуляет данные формы загрузки объекта, очищает поля формы
    _clearUploadThingModal: function () {
      // Close modal
      this.uploadThingModalOpen = false;
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

    closeUploadThingModal: function () {
      this._clearUploadThingModal();
      /*this.selectedThing = undefined;
      this.uploadThingModalOpen = false;*/
    },

    handleParsingUploadThingForm: function () {
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
    submittedUploadThingForm: function (result) {

      // Добавлем новые данные в уже имеющийся массив things
      this.things.push({
        label: this.uploadFormData.label,
        id: result.id,
        imageSrc:result.imageSrc,
        title:this.uploadFormData.title,
        subtitle:this.uploadFormData.subtitle,
        owner: {
          id: this.me.id,
          fullName: this.me.fullName,
        },
      });
      this._clearUploadThingModal();
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

      console.log('Имя фото: ', selectedFile.name);

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



    /*  changeFileInput: function(files) {
        if (files.length !== 1 && !this.uploadFormData.photo) {
          throw new Error('Consistency violation: `changeFileInput` was somehow called with an empty array of files, or with more than one file in the array!  This should never happen unless there is already an uploaded file tracked.');
        }
        var selectedFile = files[0];

        // If you cancel from the native upload window when you already
        // have a photo tracked, then we just avast (return early).
        // In this case, we just leave whatever you had there before.
        // Если вы отменяете из собственного окна загрузки, когда вы уже
        // отслеживаем фотографию, тогда мы просто avast (возвращаемся рано).
        // В этом случае мы просто оставляем все, что у вас было раньше.
        if (!selectedFile && this.uploadFormData.photo) {
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
        // Убираем любые сообщения об ошибках о не предоставлении изображения.
        this.formErrors.photo = false;
        reader.readAsDataURL(selectedFile);

      },*/



    /*   rejectedDeleteThingForm: function (err) {
         console.log('Ups!!: ', err);
         /!*_.remove(this.things, {id: this.selectedThing.id});*!/
         this.$forceUpdate();
         this.confirmDeleteThingModalOpen = false;
         this.selectedThing = undefined;
       }*/
  }
});
