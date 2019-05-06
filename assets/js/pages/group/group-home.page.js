parasails.registerPage('group-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    groups: [],
    // Виртуальная часть URL
    virtualPageSlug: '',


    selectedGroup: undefined,


    showGroupModalOpen: false,

    uploadFormData: {
      label: '',
      photo: undefined,
      previewImageSrc: '',
      subtitle: ''
    },

    borrowFormData: {
      expectedReturnAt: undefined,
      preliminaryPrice: undefined,
      ourPreliminaryPrice: undefined
    },
    // Modals which aren't linkable:
    borrowGroupModalOpen: false,
    confirmDeleteGroupModalOpen: false,
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
  virtualPagesRegExp: /^\/groups\/?([^\/]+)?/,
  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    this.$find('[data-toggle="tooltip"]').tooltip();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    // Обработчик события нажатия на кнопку|иконку "Add an item"|вертлюжок на странице
    // Это кнопка вызывает модальное окно "Upload <modal>" с <ajax-form>
    clickAddButton: function () {
      // this.uploadGroupModalOpen = true;
      this.me.isSuperAdmin ? this.goto('/groups/new') : alert('Не достаточно прав.');
      // this.selectedGroup = _.find(this.groups, {id: groupId});
    },
    // Обработчик события нажатия на кнопку|иконку Delete|ведро в карточке товара
    // Это кнопка вызывает модальное окно <modal> с <ajax-form>
    clickDeleteGroup: function (groupId) {
      this.confirmDeleteGroupModalOpen = true;
      this.selectedGroup = _.find(this.groups, {id: groupId});
    },

    closeDeleteGroupModal: function () {
      this.selectedGroup = undefined;
      this.confirmDeleteGroupModalOpen = false;
    },

    handleParsingDeleteGroupForm: function () {
      return {
        id: this.selectedGroup.id
      };
    },

    submittedDeleteGroupForm: function () {
      _.remove(this.groups, {id: this.selectedGroup.id});
      this.$forceUpdate();
      this.confirmDeleteGroupModalOpen = false;
      this.selectedGroup = undefined;
    },


    // Обработчик события нажатия на кнопку|иконку "Add an item"|вертлюжок на странице
    // Это кнопка вызывает модальное окно "ShowPhoto <modal>" с <ajax-form> для загрузки фото
    clickShowPhoto: function () {
      this.showGroupModalOpen = true;
      // this.selectedGroup = _.find(this.groups, {id: groupId});
    },

    // Обнуляет данные формы загрузки объекта, очищает поля формы
    _clearUploadGroupModal: function () {
      // Close modal
      this.goto('/groups');
      // Reset form data
      this.uploadFormData = {
        photo: undefined,
        label: undefined,
        subtitle: undefined
      };
      // Clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    _clearBorrowGroupModal: function () {
      // Close modal
      this.borrowGroupModalOpen = false;
      // Reset form data
      this.borrowFormData = {
        expectedReturnAt: undefined,
        preliminaryPrice: undefined,
        ourPreliminaryPrice: undefined
      };
      this.selectedGroup = undefined;
      // Clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    closeUploadGroupModal: function () {
      this._clearUploadGroupModal();
      /*this.selectedGroup = undefined;
      this.uploadGroupModalOpen = false;*/
    },

    handleParsingUploadGroupForm: function () {
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

      return _.omit(argins, ['previewImageSrc']);
    },


    /**
     * Обрабатывает success от сервера, при загрузки файла без ошибок.
     * Т.е. как только форма загрузки файла на сервере отработала без ошибок
     * эта функция получает результат и должна вставить новые данные на страницу.
     */
    submittedUploadGroupForm: function (result) {
      // Добавлем новые данные в уже имеющийся массив groups
      console.log(this.uploadFormData);
      this.groups.push({
        label: this.uploadFormData.label,
        id: result.id,
        imageSrc: result.imageSrc,
        subtitle: this.uploadFormData.subtitle,
        owner: {
          id: this.me.id,
          fullName: this.me.fullName,
        },
      });
      this._clearUploadGroupModal();
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


    clickBorrow: function (groupId) {
      this.selectedGroup = _.find(this.groups, {id: groupId});

      // Open the modal.
      this.borrowGroupModalOpen = true;
    },

    closeBorrowGroupModal: function () {
      this._clearBorrowGroupModal();
    },

    handleParsingBorrowGroupForm: function () {
      // Clear out any pre-existing error messages.
      // Удалите все существующие сообщения об ошибках
      this.formErrors = {};
      var argins = _.extend({id: this.selectedGroup.id}, this.borrowFormData);

      if (!argins.expectedReturnAt) {
        this.formErrors.expectedReturnAt = true;
      }

      if (!argins.preliminaryPrice) {
        this.formErrors.preliminaryPrice = true;
      }
      if (!argins.ourPreliminaryPrice) {
        this.formErrors.ourPreliminaryPrice = true;
      }


      // argins.expectedReturnAt = this.$refs.datepickerref.doParseDate().getTime();

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }
      return argins;
    },

    submittedBorrowGroupForm: function () {

      // Show success message.
      // Показать сообщение об успехе.
      this.borrowFormSuccess = true;

      // Update the borrowed item in the UI.
      // Обновление элемента в пользовательском интерфейсе.
      var borrowedItem = _.find(this.groups, {id: this.selectedGroup.id});
      borrowedItem.borrowedBy = this.me;
    },
  }
});
