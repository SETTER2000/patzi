parasails.registerPage('kennels-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    kennels: [],
    continent: ["Eurasia", "South America", "Africa",
      "North America", "Australia"],
    country: ["Alabama", "Alaska", "Arizona",
      "Arkansas", "California", "Colorado",
      "Connecticut", "Delaware", "Florida",
      "Georgia", "Hawaii", "Idaho", "Illinois",
      "Indiana", "Iowa", "Kansas", "Kentucky",
      "Louisiana", "Maine", "Maryland",
      "Massachusetts", "Michigan", "Minnesota",
      "Mississippi", "Missouri", "Montana",
      "Nebraska", "Nevada", "New Hampshire",
      "New Jersey", "New Mexico", "New York",
      "North Carolina", "North Dakota", "Ohio",
      "Oklahoma", "Oregon", "Pennsylvania",
      "Rhode Island", "South Carolina",
      "South Dakota", "Tennessee", "Texas",
      "Utah", "Vermont", "Virginia",
      "Washington", "West Virginia", "Wisconsin",
      "Wyoming"],
    options: [],
    value: [],
    list: [],
    loading: false,
    uploadModalOpen: false,
    uploadFormData: {
      label: '',
      photo: undefined,
      previewImageSrc: ''
    },
    ruleForm: {
      label: '',
      continent: null,
      country: null,
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    },
    centerDialogVisible: false,
    rules: {
      label: [
        {required: true, message: 'Please input Kennel name', trigger: 'blur'},
        {min: 3, max: 100, message: 'Length should be 3 to 100', trigger: 'blur'}
      ],
      continent: [
        {required: true, message: 'Please select your continent', trigger: 'change'}
      ],
      country: [
        {required: true, message: 'Please select your country', trigger: 'change'}
      ],
      date1: [
        {type: 'date', required: true, message: 'Please pick a date', trigger: 'change'}
      ],
      date2: [
        {type: 'date', required: true, message: 'Please pick a time', trigger: 'change'}
      ],
      type: [
        {type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change'}
      ],
      resource: [
        {required: true, message: 'Please select activity resource', trigger: 'change'}
      ],
      desc: [
        {required: true, message: 'Please input activity form', trigger: 'blur'}
      ]
    },
    // Состояние загрузки
    syncing: false,
    // Validation errors:
    formErrors: {},
    // Состояние ошибки сервера
    cloudError: '',
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    // Использование .get('/user') извлечет список текущих пользовательских моделей,
    // подписываем этот сокет на эти модели, И подписываем этот сокет
    // для уведомлений о новых моделях пользователей при их создании.
    io.socket.get(`/api/v1/continents/list`, function gotResponse(body, response) {
      console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });

    io.socket.on('list', (data) => {
      this.continents = data;
      // this.count = _.get(data, 'count') ?  data.count : this.count;
    });
  },
  mounted: async function () {
    // this.list = this.states.map(item => {
    //   return { value: item, label: item };
    // });
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    // Обработчик события нажатия на кнопку|иконку "Add an item"|вертлюжок на странице
    // Это кнопка вызывает модальное окно "Upload <modal>" с <ajax-form> для загрузки фото
    clickAddButton: function () {
      this.uploadModalOpen = true;
      // this.selectedThing = _.find(this.kennels, {id: thingId});
    },


    handleParsingUploadForm: function () {
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


    submittedDeleteForm: function () {
      _.remove(this.kennels, {id: this.selectedThing.id});
      this.$forceUpdate();
      this.confirmDeleteThingModalOpen = false;
      this.selectedThing = undefined;
    },


    submittedUploadForm: function (result) {

      // Добавлем новые данные в уже имеющийся массив kennels
      this.kennels.push({
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
      this._clearUploadModal();
    },


    // Обнуляет данные формы загрузки объекта, очищает поля формы
    _clearUploadModal: function () {
      // Close modal
      this.uploadModalOpen = false;
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


    closeUploadModal: function () {
      this._clearUploadModal();
      /*this.selectedThing = undefined;
      this.uploadThingModalOpen = false;*/
    },


    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    goTo(){
      window.location = '/account';
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },

    changeSelectContinent() {
      this.ruleForm.country = null;
    },

    getPull() {
      let t = this.continents.filter(cont => {
        return cont.id === this.ruleForm.continent;
      });
      // console.log(t[0]);
      return t[0].countrys;
    }

  }
});
