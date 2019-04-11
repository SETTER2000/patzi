parasails.registerPage('available-things', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    things: [],
    confirmDeleteThingModalOpen: false,
    selectedThing: undefined,

    uploadThingModalOpen: false,
    uploadFormData: {
      label: ''
    },
    // Validation errors:
    formErrors: {},
    // Состояние загрузки
    syncing: false,
    // Состояние ошибки сервера
    cloudError: '',
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
    clickDeleteThing: function (thingId) {
      console.log(`click the "delete" button! ID: ${thingId}`);
      this.confirmDeleteThingModalOpen = true;
      this.selectedThing = _.find(this.things, {id: thingId});
    },

    // Обработчик события нажатия на кнопку|иконку "Add an item"|вертлюжок на странице
    // Это кнопка вызывает модальное окно "Upload <modal>" с <ajax-form> для загрузки фото
    clickUploadThing: function () {
      console.log(`click the "Add an item" button!`);
      this.uploadThingModalOpen = true;
      // this.selectedThing = _.find(this.things, {id: thingId});
    },
    _clearUploadThingModal: function () {
      // Close modal
      this.uploadThingModalOpen = false;
      // Reset form data
      this.uploadFormData = {
        label: ''
      };
      // Clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    closeDeleteThingModal: function () {
      this.selectedThing = undefined;
      this.confirmDeleteThingModalOpen = false;
    },

    closeUploadThingModal: function () {
      this.selectedThing = undefined;
      this.uploadThingModalOpen = false;
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

    handleParsingUploadThingForm: function () {
      this.formErrors = {};
      let argins = this.uploadFormData;

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined. (Thus signifies that the submission should be cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }
      return argins;
    },

    submittedUploadThingForm: function (result) {
      this._clearUploadThingModal();
    },

    changeFileInput: function(files) {
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

    },
    /*   rejectedDeleteThingForm: function (err) {
         console.log('Ups!!: ', err);
         /!*_.remove(this.things, {id: this.selectedThing.id});*!/
         this.$forceUpdate();
         this.confirmDeleteThingModalOpen = false;
         this.selectedThing = undefined;
       }*/
  }
});
