parasails.registerPage('litters-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    litters: [],
    letters: [],
    dams: [],
    noBase:'нет в базе',
    dialogTableVisible: false,
    autoplay: true,
    sires: [],
    limit: 50,
    litterId: '',
    indexPhoto: 0,
    imageUrl2: '',
    keyRootPhotoAlbum: 6,
    // fileList: [],
    warning: '',
    dialogImageUrl: '',
    centerDialogAdded: false,
    confirmDeleteModalOpen: false,
    centerDialogVisibleWarnings: false,
    dialogVisible: false,
    selectedLitter: undefined,
    imageUrl: '',
    // sire: '',
    dam: '',
    sizeLess: 500,
    innerVisible: false,
    url: 'https://d3a1wbnh2r1l7y.cloudfront.net/Continents.jpg',
    fit: 'cover',
    ruleForm: {
      sire: '',
      dam: '',
      sessionName:'',
      label: '',
      data: [],
      fileList: [],
      fileListPuppies: [],
      file: []
    },
    rules: {
      born: [
        {type: 'date', required: true, message: 'Please pick a date', trigger: 'change'}
      ],
      sessionName: [
        {required: true, message: 'Please enter the name of the photo session', trigger: 'blur'},
        {min: 1, max: 60, message: 'Length should be 1 to 60', trigger: 'blur'}
      ],
      // Родители не обязательны к заполнению, потому что их может не быть в базе.
      // dam: [
      //   {required: true, message: 'Please enter the name of the dam dog', trigger: 'blur'},
      //   {min: 2, max: 60, message: 'Length should be 1 to 60', trigger: 'blur'}
      // ],
      // sire: [
      //   {required: true, message: 'Please enter the name of the sire dog', trigger: 'blur'},
      //   {min: 2, max: 60, message: 'Length should be 1 to 60', trigger: 'blur'}
      // ],
      // kennel: [
      //   {required: true, message: 'Please select kennel name', trigger: 'change'}
      // ],
      letter: [
        {required: true, message: 'Please enter a litter letter', trigger: 'blur'},
        {min: 1, max: 5, message: 'Length should be 1 to 5', trigger: 'blur'}
      ],
      // growth: [
      //   {required: true, message: 'Please input height dog', trigger: 'change'},
      //   // {min: 20, max: 40, message: 'Height should be 20 to 40 cm', trigger: 'change'}
      // ],
      // gender: [
      //   {required: true, message: 'Please select a dog gender.', trigger: 'change'}
      // ],
    },
    // Виртуальная часть URL
    virtualPageSlug: '',

    showLitterModalOpen: false,
    value2: '',
    pickerOptions: {
      shortcuts: [{
        text: 'Today',
        onClick(picker) {
          picker.$emit('pick', new Date());
        }
      }, {
        text: 'Yesterday',
        onClick(picker) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          picker.$emit('pick', date);
        }
      }, {
        text: 'A week ago',
        onClick(picker) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', date);
        }
      }]
    },
    uploadFormData: {
      label: '',
      photo: undefined,
      previewImageSrc: '',
      gender: '',
      type: '',
      dam: '',
      sire: '',
      preliminaryPrice: 0,
      ourPreliminaryPrice: 0,
      currency: ''
    },

    borrowFormData: {
      expectedReturnAt: undefined,
      preliminaryPrice: undefined,
      ourPreliminaryPrice: undefined
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
    scheduleReturnFormSuccess: false,

    dic: [
      ['en', {
        warnNoDogs: `There is no possibility to create a litter, while at least one pair of dogs is missing.`,
        warnNoKennel: `At the moment there is no nursery in the database.
         You should create at least one kennel to start with to add a dog.`,
        text400Err: 'Error. Could not create! ',
        text500Err: 'Server Error! Unable to create. ',
        text500ExistsErr: 'Looks like such an entry already exists. Cannot create two identical names. ',
        success: 'Congratulations! Object successfully created. ',
        selectGender: 'Please select a dog gender.',
        limitExceededText: `The limit is: `,
        limitExceededText2: `you selected `,
        limitExceededText3: `Total: `,
        files: `files`,
        successUploadFiles: `Files uploaded successfully!`,
      }],
      ['ru', {
        warnNoDogs: `Нет возможности создать помёт, пока отсутствует хотя бы одна пара собак.`,
        warnNoKennel: `В данный момент не существует ни одного питомника в базе. 
        Вам следует создать для начала хотя бы один питомник, что бы добавить собаку.`,
        text400Err: 'Ошибка. Не смог создать!',
        text500Err: 'Ошибка сервера! Невозможно создать.',
        text500ExistsErr: 'Похоже такая запись уже существует. Невозможно создать два одинаковых имя.',
        success: 'Поздравляем! Объект успешно создан.',
        selectGender: 'Пожалуйста выберите пол собаки.',
        limitExceededText: `Лимит`,
        limitExceededText2: `вы выбрали`,
        limitExceededText3: `Всего`,
        files: `файлов`,
        successUploadFiles: `Файлы успешно загружены!`,
      }]
    ],
  },


  virtualPages: true,

  html5HistoryMode: 'history',

  virtualPagesRegExp: /^\/litters\/?([^\/]+)?/,


  filters: {
    capitalize: function (value) {
      if (!value) {
        return '';
      }
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    date(value) {
      return (!value) ? '' : moment(value).format('LLL');
    }
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    moment().locale(this.me.preferredLocale);


    this.getList();


    // Кобели
    this.sireList();

    // Суки
    this.damList();

    // Буквы помётов
    this.letterList()
  },

  mounted: async function () {
    this.$find('[data-toggle="tooltip"]').tooltip();
  },


  computed: {
    i19p: {
      get: function () {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        return new Map(this.dic).get(this.me.preferredLocale);
      }
    },
    // photoCover: function () {
    //   return this.keyRootPhotoAlbum - 1;
    // },
    // Вытаскивает фото для обложки альбома
    photoCover: function () {
      // return _.pickBy(this.litters, function(u) {
      //   return u.active;
      // });
      _.each(this.litters, async (litter) => {

      });
      // console.log('DXXX:', this.litters.filter(litter => litter.images[litter.cover]));
    },
    photos: function () {
      // return _.pickBy(this.litters, function(u) {
      //   return u.active;
      // });
      return (_.isArray(this.litters)) ? _.pluck(this.litters.filter(litter => litter.id === this.litterId), 'images')[0] : '';
    },
    indexSlide: {
      get: function () {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        return this.indexPhoto;
      },
      set: function (i) {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        this.indexPhoto = i;
      }
    }
    // isPhoto: function () {
    //   return  this.litters.filter(litter => {
    //     !_.isUndefined(litter.images);
    //     console.log('IMAGE: ',litter.images);
    //   });
    // }

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    async getList() {
      /*   await io.socket.get(`/api/v1/continents/list`, function gotResponse(body, response) {
           console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
         });*/

      await io.socket.get(`/api/v1/litters/list`, function gotResponse(body, response) {
        // console.log('Сервер litters/list ответил кодом ' + response.statusCode + ' и данными: ', body);
      });

      // Принимаем данные по событию list-*
      await io.socket.on('list-litter', (data) => {
        this.litters = data;
        // console.log('this.litters: ', this.litters);
      });


    },


    async coverPhoto(id, index) {
      await io.socket.put(`/api/v1/litters/update-cover-album`, {id: id, cover: index}, (body, response) => {
        this.litters.map(litter => {
          (litter.id === id) ? litter.cover = index : litter;
        });
        // console.log('Сервер files/set-album-cover ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
    },


    // Обработчик события нажатия на кнопку|иконку Delete|ведро в карточке товара
    // Это кнопка вызывает модальное окно <modal> с <ajax-form> для удаления помёта
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
      this.warning = this.i19p.warnNoDogs;
      return (this.sires.length > 0 && this.dams.length > 0) ? this.centerDialogAdded = true : this.centerDialogVisibleWarnings = true;
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
        born: undefined,
        label: undefined,
        gender: undefined,
        sire: undefined,
        dam: undefined,
        type: undefined,
        preliminaryPrice: undefined,
        ourPreliminaryPrice: undefined,
        currency: undefined,
      };
      // Clear error states
      this.formErrors = {};
      this.cloudError = '';
    },

    _clearBorrowLitterModal: function () {
      // Close modal
      this.borrowLitterModalOpen = false;
      // Reset form data
      this.borrowFormData = {
        expectedReturnAt: undefined,
        preliminaryPrice: undefined,
        ourPreliminaryPrice: undefined
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
      let argins = this.uploadFormData;
      if (!argins.photo) {
        this.formErrors.photo = true;
      }

      if (!argins.born) {
        this.formErrors.born = true;
      }

      if (!argins.label) {
        this.formErrors.label = true;
      }
      /*if (!argins.gender) {
        this.formErrors.gender = true;
      }*/
      /* if (!argins.type) {
         this.formErrors.type = true;
       }*/


      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined. (Thus signifies that the submission should be cancelled.)
      // Если были какие-либо проблемы, они были сообщены пользователю,
      // так просто вернуть undefined. (Таким образом, означает,
      // что представление должно быть отменено.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      } else {
        // Convert the return time into a real date.
        // Преобразуйте дату помёта .
        // Приходит timestamp типа: born: 1558472400000
        argins.born = this.$refs.datepickerref.doTimeStump(this.me.preferredLocale).getTime();
      }

      return _.omit(argins, ['previewImageSrc']);
    },


    /**
     * Обрабатывает success от сервера, при загрузки файла без ошибок.
     * Т.е. как только форма загрузки файла на сервере отработала без ошибок
     * эта функция получает результат и должна вставить новые данные на страницу.
     */
    // submittedUploadLitterForm: function (result) {
    //   console.log('this.uploadFormData.born:', this.uploadFormData.born);
    //   // Добавлем новые данные в уже имеющийся массив litters
    //   console.log(this.uploadFormData);
    //   this.litters.push({
    //     label: this.uploadFormData.label,
    //     gender: this.uploadFormData.gender,
    //     type: this.uploadFormData.type,
    //     detail: result.detail,
    //     preliminaryPrice: this.uploadFormData.preliminaryPrice,
    //     ourPreliminaryPrice: this.uploadFormData.ourPreliminaryPrice,
    //     currency: this.uploadFormData.currency,
    //     id: result.id,
    //     imageSrc: result.imageSrc,
    //     title: this.uploadFormData.title,
    //     sire: this.uploadFormData.sire,
    //     dam: this.uploadFormData.dam,
    //     subtitle: this.uploadFormData.subtitle,
    //     born: moment(this.uploadFormData.born).locale(this.me.preferredLocale).format('LL'),
    //     owner: {
    //       id: this.me.id,
    //       fullName: this.me.fullName,
    //     },
    //   });
    //   this._clearUploadLitterModal();
    // },

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


    // clickBorrow: function (litterId) {
    //   this.selectedLitter = _.find(this.litters, {id: litterId});
    //
    //   // Open the modal.
    //   this.borrowLitterModalOpen = true;
    // },

    closeBorrowLitterModal: function () {
      this._clearBorrowLitterModal();
    },

    handleParsingBorrowLitterForm: function () {
      // Clear out any pre-existing error messages.
      // Удалите все существующие сообщения об ошибках
      this.formErrors = {};
      var argins = _.extend({id: this.selectedLitter.id}, this.borrowFormData);

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
      } else {
        // Convert the return time into a real date.
        // Конвертировать время в реальную дату.
        argins.expectedReturnAt = this.$refs.datepickerref.doTimeStump(this.me.preferredLocale).getTime();
      }

      return argins;
    },

    // submittedBorrowLitterForm: function () {
    //
    //   // Show success message.
    //   // Показать сообщение об успехе.
    //   this.borrowFormSuccess = true;
    //
    //   // Update the borrowed item in the UI.
    //   // Обновление элемента в пользовательском интерфейсе.
    //   var borrowedItem = _.find(this.litters, {id: this.selectedLitter.id});
    //   borrowedItem.borrowedBy = this.me;
    // },


    handleRemove(file, fileList) {
      // console.log('file:: ** :');
      // console.log(file);
      // console.log('fileList:: ** :');
      // console.log(fileList);
      this.ruleForm.fileList = [];
      this.ruleForm.fileList = _.pluck(fileList, 'response');
      // this.ruleForm.fileList = _.remove(this.ruleForm.fileList, file);
      // console.log(' Remove this.ruleForm.fileList:: ',  this.ruleForm.fileList);

      // this.ruleForm.fileList.push(fileList);
      // this.ruleForm.fileList = fileList;
    },

    handleRemovePuppies(file, fileList) {
      // console.log('file:: ** :');
      // console.log(file);
      // console.log('fileList:: ** :');
      // console.log(fileList);
      this.ruleForm.fileListPuppies = [];
      this.ruleForm.fileListPuppies = _.pluck(fileList, 'response');
      // this.ruleForm.fileList = _.remove(this.ruleForm.fileList, file);
      console.log(' Remove this.ruleForm.fileListPuppies: ', this.ruleForm.fileListPuppies);

      // this.ruleForm.fileList.push(fileList);
      // this.ruleForm.fileList = fileList;
    },

    handlePreview(file) {
      console.log('handlePreview:: ** :', file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // функция перехвата при превышении лимита
    handleExceed(files, fileList) {
      this.$message.warning(`${this.i19p.limitExceededText} ${this.limit} ${this.i19p.files}, 
      ${this.i19p.limitExceededText2}  ${fileList.length} + ${files.length}. ${this.i19p.limitExceededText3}: 
      ${files.length + fileList.length} ${this.i19p.files}`);
    },

    handleExceedPuppies(files, fileList) {
      this.$message.warning(`${this.i19p.limitExceededText} ${this.limit} ${this.i19p.files}, 
      ${this.i19p.limitExceededText2}  ${fileList.length} + ${files.length}. ${this.i19p.limitExceededText3}: 
      ${files.length + fileList.length} ${this.i19p.files}`);
    },


    clickDelete(id) {
      this.confirmDeleteModalOpen = true;
      this.selectedThing = _.find(this.things, {id: id});
    },


    // Выбираем всех кобелей
    async sireList() {
      await io.socket.get(`/api/v1/dogs/list-sire`, function gotResponse(body, response) {
        // console.log('Сервис Dogs sire ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию list-*
      await io.socket.on('list-sire', (data) => {
        // console.log('sires: ', data);
        this.sires = data;
      });
    },

    // Выбираем всех сук
    async damList() {
      await io.socket.get(`/api/v1/dogs/list-dam`, function gotResponse(body, response) {
        // console.log('Сервис Dogs dam ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию list-*
      await io.socket.on('list-dam', (data) => {
        // console.log('dams: ', data);
        this.dams = data;
      });
    },

    /* Авто поиск по собакам. Кобели. */
    querySearchSires(queryString, cb) {
      let links = this.sires;
      console.log('LINKS querySearchSires: ', links);
      let results = queryString ? links.filter(this.createFilter(queryString)) : links;
      cb(results);
    },

    /* Авто поиск по собакам. Суки. */
    querySearchDams(queryString, cb) {
      let links = this.dams;
      // console.log('LINKS querySearchDams: ', links);
      let results = queryString ? links.filter(this.createFilter(queryString)) : links;
      cb(results);
    },


    createFilter: function (queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },

    async handleSelect(e) {
      this.dogId = (_.isNumber(e.id)) ? e.id : undefined;
    },


    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addLitter();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


    beforeUpload(file) {
      // Проверка размера входящего файла картинки не более (MB)
      let size = 1;
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < size;

      if (!isJPG) {
        this.$message.error('Picture must be JPG format!');
      }

      if (!isLt2M) {
        this.$message.error(`Picture size can not exceed ${size}MB!`);
      }

      // else{
      //   this.$message.info(this.i19p.successUploadFiles);
      // }
      // // setTimeout(()=>{  }, 3000);

      // console.log('xxx file xxx: ', file);
      // console.log('xxx fileList xxx: ', fileList);

      return isJPG && isLt2M;

    },


    handleSuccess(res, file) {
      console.log('RESSS:', res);
      // this.litters.images.push({imageSrc : URL.createObjectURL(file.raw)});
      this.ruleForm.fileList.push(res);
      console.log('this.ruleForm.fileList YYY: ', this.ruleForm.fileList);
    },


    handleSuccessPuppies(res, file) {
      console.log('Uploads Puppies:', res);
      // this.litters.images.push({imageSrc : URL.createObjectURL(file.raw)});

      this.ruleForm.fileListPuppies.push(res);
      console.log('this.ruleForm.fileListPuppies YYY: ', this.ruleForm.fileListPuppies);
    },
    // Выбираем все буквы помётов
    async letterList() {
      await io.socket.get(`/api/v1/litters/list-letter`, function gotResponse(body, response) {
        console.log('Сервис Letter List ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию list-*
      await io.socket.on('list-letter', (data) => {
        console.log('letter: ', data);
        this.letters = data;
      });
    },
    fixLetter() {
      // console.log('this.letters: ', this.letters);
      return (_.find(this.letters, letter => letter.letter === this.ruleForm.letter.toUpperCase())) ? this.mesError(text = 'Такой помёт уже существует. Измените букву помёта.') :
        this.ruleForm.letter;
    },
    async addLitter() {
      // this.$refs.upload.submit();
      // console.log('this.ruleForm.fileList: ****||| ', this.ruleForm.fileList);
      this.openFullScreen();
      let data = {
        fileList: this.ruleForm.fileList,
        puppies: this.ruleForm.fileListPuppies,
        letter: this.fixLetter(),
        dam: this.getDamArr(),
        sire: this.getSireArr(),
        born: JSON.stringify(this.ruleForm.born),
        description: this.ruleForm.description,
        sessionName: this.ruleForm.sessionName,
      };

      io.socket.post('/api/v1/litters/create-litter', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';

        this.centerDialogAdded = false;
        this.loading.close();
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          // this.ruleForm.fileList = [];
                    // this.ruleForm.list = [];
                    // this.ruleForm.imageUrl = '';
          this.getList();
        }
      });
    },


    getIdDam() {
      return _.pluck(this.dams.filter(dam => (dam.value === this.ruleForm.dam) ? dam.id : ''), 'id').toString();
    },

    // Получаем ID кобеля помёта
    getIdSire() {
      return _.pluck(this.sires.filter(sire => (sire.value === this.ruleForm.sire) ? sire.id : ''), 'id').toString();
    },


    // Получаем массив [id, label] кобеля помёта
    getSireArr() {
      let arr = [];
      arr.push(this.getIdSire());
      arr.push(this.ruleForm.sire);
      return arr;
    },


    // Получаем массив [id, label] суки помёта
    getDamArr() {
      let arr = [];
      arr.push(this.getIdDam());
      arr.push(this.ruleForm.dam);
      return arr;
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


    resetForm(formName) {
      this.$refs.upload.clearFiles();
      this.$refs.uploadPuppies.clearFiles();
      this.$refs[formName].resetFields();
      this.ruleForm.fileList = [];
      this.ruleForm.fileListPuppies = [];
      this.ruleForm.list = [];
      this.ruleForm.imageUrl = '';

    },


    goTo(path) {
      window.location = `${path}`;
    },

    openFullScreen() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      // setTimeout(() => {
      //   loading.close();
      // }, 2000);
    },
    showSlider(litterId, indexPhoto) {
      this.dialogTableVisible = true;
      this.litterId = litterId;
      this.indexSlide = indexPhoto;
      this.handlerSetActiveSlider();
      console.log('this.litterId: ', this.litterId);
      console.log('this.indexPhoto: ', this.indexPhoto);
    },

    handlerCloseDialogSlider() {
      this.indexPhoto = 0;
      this.autoplay = false;
    },
    handlerSetActiveSlider() {
      return this.indexPhoto;
    }
  }
});
