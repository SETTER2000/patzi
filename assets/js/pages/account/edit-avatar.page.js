parasails.registerPage('edit-avatar', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {


    // Main syncing/loading state for this page.
    syncing: false,

    selectedAvatar: undefined,

    // Form data
    formData: {
      photo: undefined,
      avatar: undefined,
    },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: {/* … */},
    borrowFormSuccess: false,
    // Server error state for the form
    cloudError: '',
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.formData.avatar = this.me.avatar;
    this.formData.id = this.me.id;
    /* this.formData.gravatar = this.me.gravatar;*/
  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    // Закрыть страницу редактирования и перейти обратно в /account
    submittedForm: async function () {
      // Redirect to the account page on success.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
      this.syncing = true;
      window.location = '/account';
    },


    clickDeleteAvatar: async function () {
      this.formData.avatar = '';
    },


    // Проверяем данные перед отправкой
    handleParsingFormUpdate: function () {
      const argins = this.formData;
      if (!argins.photo) {
        this.formErrors.photo = true;
      }
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      console.log('argins: ', argins);

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },


    handleParsingDefaultIconForm: function () {

      console.log('id: ', this.req.me.id);

      return this.formData;

    },

    // Метод обработчик действии update файла
    changeFileUpdate: function (files) {

      if (files.length !== 1 && !this.formData.photo) {
        throw new Error('Consistency violation: `changeFileUpdate` ' +
          'was somehow called with an empty array of files, ' +
          'or with more than one file in the array!  This should never happen unless ' +
          'there is already an uploaded file tracked.');
      }

      let selectedFile = files[0];

      if (!selectedFile && !this.formData.photo) {
        return;
      }
      this.formData.photo = selectedFile;
      // this.formData.subtitle = selectedFile;


      // Настройка предварительного просмотра файла для пользовательского интерфейса:
      const reader = new FileReader();
      reader.onload = (event) => {
        this.formData.avatar = event.target.result;

        // Отмена привязки этого события onload.
        delete reader.onload;
      };
      // Clear out any error messages about not providing an image.
      // Удалите все сообщения об ошибках о не предоставлении изображения.
      this.formErrors.photo = false;
      reader.readAsDataURL(selectedFile);
    },


    submittedFormUpdate: function (event) {

      // Показать сообщение об успехе.
      this.borrowFormSuccess = true;
      console.log('event:: ', event);
      // Обновление элемента в пользовательском интерфейсе.
      // var borrowedItem = _.find(this.groups, {id: this.selectedGroup.id});

      // borrowedItem.photo = this.formData.photo;
      // borrowedItem.subtitle = this.uploadFormData.subtitle;

      this.selectedGroup = false;

    },
  }
});
