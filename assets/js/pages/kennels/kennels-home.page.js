parasails.registerPage('kennels-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    kennels: [],
    options: [],
    continents: [],
    files: [],
    text: '',
    value: [],
    list: [],
    yourKennel: false,
    loading: false,
    centerDialogVisibleConfirm: false,
    uploadModalOpen: false,
    // uploadFormData: {
    //   label: '',
    //   photo: undefined,
    //   previewImageSrc: '',
    //   continent: null,
    //   country: null
    // },
    ruleForm: {
      file: undefined,
      label: '',
      website: '',
      imageUrl: '',
      previewImageSrc: '',
      continent: null,
      dialogImageUrl: '',
      dialogVisible: false,
      country: null,
      rightName: true,
      registerNumber: '',
      dateCreate: '',
      subtitle: ''
    },
    centerDialogVisible: false,
    centerDialogKennelVisible: false,
    rules: {
      label: [
        {required: true, message: 'Please input kennel name', trigger: 'blur'},
        {min: 3, max: 100, message: 'Length should be 3 to 100', trigger: 'blur'}
      ],
      registerNumber: [
        {required: true, message: 'Please input kennel name', trigger: 'blur'},
        {min: 3, max: 100, message: 'Length should be 3 to 100', trigger: 'blur'}
      ],
      region: [
        {required: true, message: 'Please select Activity zone', trigger: 'change'}
      ],
      continent: [
        {required: true, message: 'Please select your continent', trigger: 'change'}
      ],
      country: [
        {required: true, message: 'Please select your country', trigger: 'change'}
      ],
      dateCreate: [
        {type: 'date', required: true, message: 'Please pick a date', trigger: 'change'}
      ],
      subtitle: [
        {required: true, message: 'Please tell about the nurseries. It is very interesting.', trigger: 'change'},
        {min: 10, max: 100, message: 'Length should be 10 to 100', trigger: 'blur'}
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


    io.socket.get(`/api/v1/kennels/list`, function gotResponse(body, response) {
      console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });

    // Ждём данные от загрузки нового питомника
    io.socket.on('list-kennel', (data) => {
      this.kennels = data;
      console.log('this.kennels: ', this.kennels);
      // this.count = _.get(data, 'count') ?  data.count : this.count;
    });
    // Получаем данные для селектов в форме
    io.socket.on('list-continent', (data) => {
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

      // argins.date1=JSON.stringify (this.uploadFormData.date1);

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
        // dateCreate: JSON.stringify(this.uploadFormData.date1),
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

          console.log('this.ruleForm.file: ', this.ruleForm.file);
          // console.log('formName: ', formName.name);


          let data = {
            file: this.ruleForm.file,
            label: this.ruleForm.label,
            dateCreate: JSON.stringify(this.ruleForm.dateCreate),
            continent: this.ruleForm.continent,
            country: this.ruleForm.country,
            rightName: this.ruleForm.rightName,
            site: this.ruleForm.site,
            registerNumber: this.ruleForm.registerNumber,
            subtitle: this.ruleForm.subtitle,
            yourKennel: this.ruleForm.yourKennel
          };

          io.socket.post('/api/v1/kennels/create-kennel', data, (resData, jwRes) => {
            (jwRes.statusCode === 200) ? this.mesSuccess('Поздравляем! Питомник добавлен.') :
              (jwRes.statusCode === 400) ? this.mesError('Ошибка. Не смог создать!') :
                (jwRes.statusCode >= 500) ? this.mesError('Ошибка сервера! Невозможно создать.') : '';
            this.resetForm('ruleForm');
            this.centerDialogKennelVisible = false;
            this.ruleForm.file=[];
            this.ruleForm.imageUrl='';
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    goTo() {
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
    },

    mesSuccess(text = '') {
      this.$notify({
        title: 'Success',
        message: text,
        offset: 100,
        type: 'success'
      });
    },

    mesWarning(text = '') {
      this.$notify({
        title: 'Warning',
        message: text,
        offset: 100,
        type: 'warning'
      });
    },

    mesInfo(text = '') {
      this.$notify.info({
        title: 'Info',
        message: text,
        offset: 100,
      });
    },

    mesError(text = '') {
      this.$notify.error({
        title: 'Error',
        message: text,
        offset: 100,
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.ruleForm.dialogImageUrl = file.url;
      this.ruleForm.dialogVisible = true;
    },

    submitUpload() {
      // this.$refs.upload.data={label:'sssssssssss'};
      this.$refs.upload.submit();
    },

    fileListing(file) {
      console.log('FILE:', file);
// console.log('fileList:',  fileList);
    },


    handleAvatarSuccess(res, file) {
      this.files.push(file.response);
      console.log('file response:  ', file.response);
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.file = file.response;
    },

    beforeAvatarUpload(file) {
      console.log('file.size: ' , file.size);
      const isJPG = file.type === 'image/jpeg';
      const isLt1M = file.size / 1024 / 1024 < 0.25;


      if (!isJPG) {
        this.$message.error('Logo picture must be JPG format!');
      }
      if (!isLt1M) {
        this.$message.error('Logo picture size can not exceed 250Kb!');
      }

      if(isJPG && isLt1M)  this.$message.success('Logo uploaded successfully.');


      return isJPG && isLt1M;
    }
  }
});
