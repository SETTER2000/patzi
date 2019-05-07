parasails.registerPage('group-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    groups: [],
    // Виртуальная часть URL
    virtualPageSlug: '',


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
    // Modals которые нельзя связать:
    updateGroupModalOpen: false,
    confirmDeleteGroupModalOpen: false,
    scheduleReturnModalOpen: false,
    confirmReturnModalOpen: false,

    selectedGroup: undefined,


    showGroupModalOpen: false,

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


    // Обработчик события нажатия на кнопку|иконку "Add an item"|вертлюжок на странице
    // Это кнопка вызывает модальное окно "Upload <modal>" с <ajax-form>
    clickAddButton: function () {
      // this.uploadGroupModalOpen = true;
      this.me.isSuperAdmin ? this.goto('/groups/new') : alert('Не достаточно прав.');
      // this.selectedGroup = _.find(this.groups, {id: groupId});
    },


    // Это кнопка вызывает модальное окно "Update <modal>" с <ajax-form>
    clickUpdateButton: function (groupId) {
      this.me.isSuperAdmin ? this.goto('/groups/edit') : alert('Не достаточно прав.');
      this.selectedGroup = _.find(this.groups, {id: groupId});
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
        label: '',
        previewImageSrc: '',
        subtitle: undefined
      };
      // Clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    _clearGroupModalUpdate: function () {
      // Close modal
      this.updateGroupModalOpen = false;
      // Reset form data
      this.uploadFormData = {
        label: '',
        photo: undefined,
        previewImageSrc: '',
        subtitle: ''
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

    // Метод для добавления файла
    changeFileInput: function (files) {
      if (files.length !== 1 && !this.uploadFormData.photo) {
        throw new Error('Consistency violation: `changeFileInput` was somehow called with an empty array of files, or with more than one file in the array!  This should never happen unless there is already an uploaded file tracked.');
      }
      let selectedFile = files[0];

      // If you cancel from the native upload window when you already
      // have a photo tracked, then we just avast (return early).
      // In this case, we just leave whatever you had there before.
      if (!selectedFile && this.uploadFormData.photo) {
        return;
      }

      this.uploadFormData.photo = selectedFile;

      // Set up the file preview for the UI:
      var reader = new FileReader();
      reader.onload = (event) => {
        this.uploadFormData.previewImageSrc = event.target.result;

        // Unbind this "onload" event.
        delete reader.onload;
      };
      // Clear out any error messages about not providing an image.
      this.formErrors.photo = false;
      reader.readAsDataURL(selectedFile);

    },

    // Метод обработчик действии update файла
    changeFileUpdate: function (files) {

      if (files.length !== 1 && !this.uploadFormData.photo) {
        throw new Error('Consistency violation: `changeFileUpdate` ' +
          'was somehow called with an empty array of files, ' +
          'or with more than one file in the array!  This should never happen unless ' +
          'there is already an uploaded file tracked.');
      }

      let selectedFile = files[0];

      if (!selectedFile && !this.uploadFormData.photo) {
        // this.uploadFormData.photo = undefined;
        return;
      }
      this.uploadFormData.photo = selectedFile;


      // Настройка предварительного просмотра файла для пользовательского интерфейса:
      const reader = new FileReader();
      reader.onload = (event) => {
        this.selectedGroup.imageSrc = event.target.result;

        // Отмена привязки этого события onload.
        delete reader.onload;
      };
      // Clear out any error messages about not providing an image.
      // Удалите все сообщения об ошибках о не предоставлении изображения.
      this.formErrors.photo = false;
      reader.readAsDataURL(selectedFile);
    },


    closeGroupModalUpdate: function () {
      this._clearGroupModalUpdate();
    },

    // После проверки отправляеи=т на сервер данные
    handleParsingUpdateGroupForm: function () {

      // Clear out any pre-existing error messages.
      // Удалите все существующие сообщения об ошибках
      this.formErrors = {};

      var argins = _.extend({id: this.selectedGroup.id}, this.uploadFormData);

      // Если были какие-либо проблемы, они уже были сообщены пользователю,
      // так просто вернуть undefined. (Это означает, что представление должно быть
      // отменено.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return _.omit(argins, ['previewImageSrc']);
    },

    submittedGroupFormUpdate: function (event) {

      // Показать сообщение об успехе.
      this.borrowFormSuccess = true;

      // Обновление элемента в пользовательском интерфейсе.
      var borrowedItem = _.find(this.groups, {id: this.selectedGroup.id});

      borrowedItem.photo = this.uploadFormData.photo;

      this.selectedGroup = false;

    },
  }
});
