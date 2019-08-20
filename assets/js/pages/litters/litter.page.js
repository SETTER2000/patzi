parasails.registerPage('litter', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dialogTableVisible: false,
    dialogPedigreeVisible: true,
    // show: false,

    comment: '',
    commentsLength:0,
    activeNames: '1',
    likeLength:0,
    commentsLengthNew:0,
    comments: [],
    dateFrom: moment(),
    // litterComments: [
    //   {user:'Александр Петров', comment: 'Трата та, Тра та та, мы ведём с собой котааа', data: moment().format('LLL')},
    //   {user:'Александр Петров', comment: 'Трата та, Тра та та, мы ведём с собой котааа 22aZ', data: moment().format('LLL')},
    //   {user:'Александр Петров', comment: 'Трата та, Тра та та, мы ведём с собой котааа 3', data: moment().format('LLL')},
    //   {user:'Александр Петров', comment: 'Трата та, Тра та та, мы ведём с собой котааа 4', data: moment().format('LLL')},
    //
    // ],
    confirmDeleteLitterModalOpen: false,
    confirmDeletePresentationModalOpen: false,
    editableTabsValue: 'photo',
    virtualPageSlug: '',
    deletePresentationIndex: '',
    activeName: 'first',
    photoSetDescriptionLength: 300,
    photoSetNameLength: 60,
    subtitleLength: 100,
    descriptionLitterLength: 500,
    presentationUrlLength: 280,
    // Состояние ошибки сервера
    cloudError: '',
    selectedLitter: undefined,
    // Состояние загрузки
    syncing: false,
    title: '',
    loading: true,
    loadingVideo: false,
    fullscreenLoading: false,
    countVideo: 0,
    dialogImageUrl: '',
    indexPhotoSet: 0,
    nameSessionPhoto: '',
    count: 0,
    dialogVisible: false,
    circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    limit: 50,
    letter: '',
    autoplay: true,
    isAfterDate: false,
    dialogFormVisible: false,
    dialogDescriptionPhotoSession: false,
    dialogEditor: false,
    dialogAddedPhotoSession: false,
    dialogDeletePhotoSession: false,
    dialogAddedPresentation: false,
    dialogDeletePresentation: false,
    photos: '',
    commentForm: {
      comment: '',
    },
    ruleForm: {
      show: undefined,
      // indexPhotoSet:undefined,
      sire: '',
      dam: '',
      label: '',
      data: [],
      fileList: [],
      fileListPuppies: [],
      file: []
    },
    rules: {
      // born: [
      //   {type: 'date', required: true, message: 'Please pick a date', trigger: 'change'}
      // ],
      // kennel: [
      //   {required: true, message: 'Please select kennel name', trigger: 'change'}
      // ],
      sessionName: [
        {required: true, message: 'Please enter the name of the photo session', trigger: 'blur'},
        {min: 1, max: 60, message: 'Length should be 1 to 60', trigger: 'blur'}
      ],
      presentationUrl: [
        {required: true, message: 'Please enter the URL', trigger: 'blur'},
        {
          min: 15,
          max: 280,
          message: `Length should be 15 to 280`,
          trigger: 'blur'
        }
      ],
      // growth: [
      //   {required: true, message: 'Please input height dog', trigger: 'change'},
      //   // {min: 20, max: 40, message: 'Height should be 20 to 40 cm', trigger: 'change'}
      // ],
      // gender: [
      //   {required: true, message: 'Please select a dog gender.', trigger: 'change'}
      // ],
    },
    form: {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    },
    formLabelWidth: '120px',
    url: null,
    activeIndex: '1',
    fit: 'cover',
    tabPosition: 'top',
    indexPhoto: 0,
    letters: [],
    dic: [
      ['en', {
        warnNoDogs: `There is no possibility to create a litter, while at least one pair of dogs is missing.`,
        warnNoKennel: `At the moment there is no nursery in the database.
         You should create at least one kennel to start with to add a dog.`,
        text400Err: 'Error. Could not update! ',
        text500Err: 'Server Error! Unable to update. ',
        text500ExistsErr: 'Looks like such an entry already exists. Cannot create two identical names. ',
        success: 'Congratulations! Object successfully updated. ',
        selectGender: 'Please select a dog gender.',
        limitExceededText: `The limit is: `,
        limitExceededText2: `you selected `,
        limitExceededText3: `Total: `,
        files: `files`,
        textUrlErr: 'Invalid URL field. Data transfer protocol not specified. For example: http:// or https:// ',
        successUploadFiles: `Files uploaded successfully!`,
        titlePuppies: `Puppies`,
        titleParents: `Parents`,
        getFormatDateLocale: `yyyy-MM-dd`,
        getFormatDateTimeLocale: `yyyy-MM-dd HH:mm:ss`,
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
        textUrlErr: 'Не верно заполнено поле УРЛ. Не указан протокол передачи данных. Например:  http:// or https:// ',
        successUploadFiles: `Файлы успешно загружены!`,
        titlePuppies: `Щенки`,
        titleParents: `Родители`,
        getFormatDateLocale: `dd.MM.yyyy`,
        getFormatDateTimeLocale: `dd.MM.yyyy HH:mm:ss`,
      }]
    ],
    fits: 'cover',
    // items: [
    //   {label: 'Poale Ell Adam', imageSrc: 'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2.jpg'},
    //   {label: 'Poale Ell Bell', imageSrc: 'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018-11.jpg'},
    //   {label: 'Poale Ell Bazhen', imageSrc: 'https://d3a1wbnh2r1l7y.cloudfront.net/Adam-10m.jpg'},
    //   {label: 'Poale Ell Barthalamew', imageSrc: 'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018.jpg'},
    // ],
    litters: [],
    ratio: null,
    ratios: [],
    colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    // ratioMeTestArr:[
    //   {litter:2, letter:'A'},
    //   {litter:4, letter:'A'},
    //   {litter:4, letter:'A'},
    //   {litter:5, letter:'A'},
    //   {litter:5, letter:'B'},
    //   {litter:2, letter:'B'},
    //   {litter:1, letter:'B'}
    // ]
  },
  virtualPages: true,
  html5HistoryMode: 'history',
  virtualPagesRegExp: /^\/litter\/?[A-Z]+?\/?([^\/]+)?/,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);

    this.isAfter();
    this.ratio = _.last(_.pluck(this.me.ratio.filter(rat => rat.letter === this.litter.letter), 'litter'));

    // Буквы помёта
    this.letterList();
    // Принимаем данные по событию list-*
    io.socket.on('list-comment', (data) => {
      console.log('list-comment: ', data);
      // this.commentsLength=0;

      this.litter = data;
    });
    // Выбираем все комментарии
    // this.commentList();
  },
  filters: {
    getCreate: function (value, l, format) {
      if (!value) {return '';}
      moment.locale(l);
      let formatNew = (!format) ? 'LLL' : format;
      return (moment.parseZone(value).format(formatNew)) ? moment.parseZone(value).format(formatNew) : value;
    }
  },
  mounted: async function () {
    //…
  },

  computed: {
    i19p: {
      get: function () {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        return new Map(this.dic).get(this.me.preferredLocale);
      }
    },
    //
    srcAvatar(){

        return this.me.defaultIcon === 'gravatar' ? this.me.gravatar : this.me.avatar;
    },
    // litter:{
    //    get: function(){
    //      return this.litter;
    //    } ,
    //   set:function (i) {
    //      this.litter = i;
    //
    //   }
    // },

    noMore() {
      return this.count >= 20;
    },
    disabled() {
      return this.loadingVideo || this.noMore;
    },

    indexSlide: {
      get: function () {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        return this.indexPhoto;
      },
      set: function (i) {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        this.indexPhoto = i;
      },


      // loading:  {
      //   // getter
      //   get: function () {
      //     return (!_.isArray(this.photos) && this.photos.length > 1);
      //   },
      //   // setter
      //   set: function (newValue) {
      //     return newValue;
      //   }
      //   // `this` points to the vm instance
      // },
      // photoCover: function () {
      //   return this.keyRootPhotoAlbum - 1;
      // },

      // photos: function () {
      //   // return _.pickBy(this.litters, function(u) {
      //   //   return u.active;
      //   // });
      //   return  _.pluck(this.litter.puppies, 'photos');
      //   // return this.litter.puppies;
      //   // _.each(this.litters, async (litter) => {
      //   //
      //   // });
      //   // console.log('DXXX:', this.litters.filter(litter => litter.images[litter.cover]));
      // },
      // photos: {
      //    get: function () {
      //      return  _.pluck(this.litter.puppies, 'photos');
      //    },
      //    set: function (arr) {
      //      // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
      //      this.photos = arr;
      //    }
      //  },

    }


  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    changeRatio: function (letter) {
      this.me.ratio.push({litter: this.ratio, letter: letter});
      this.updateRatioList();
    },

    // Обновляем рейтинг
    async updateRatioList() {
      let data = {
        ratios: this.me.ratio
      };
      let sel = this;
      console.log('Данные отправляемые на сервер: ', data);
      await io.socket.post(`/api/v1/users/update-ratio`, data, function gotResponse(body, response) {
        console.log('Сервис Letter List ответил кодом ' + response.statusCode + ' и данными: ', body);
        if (response.statusCode === 200) {
          sel.$message({
            message: 'Спасибо за оценку. Ваш голос был учтён!',
            type: 'success'
          });
        } else {
          sel.$message({
            message: `Произошла ошибка ${response.statusCode}! Рейтинг не засчитан.`,
            type: 'error'
          });
        }

      });
      // Принимаем данные по событию list-*
      await io.socket.on('user-ratio', (data) => {
        console.log('server return ratios: ', data);
        // this.ratios = data;
        console.log('this.ratio: ', this.ratio);
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

    isAfter() {
      // Проверка даты
      // Вернёт true, если this.litter.born  пока в будущем (не прошла)
      this.isAfterDate = moment(new Date()).isSameOrBefore(moment(this.litter.born, 'LL'));
    },

    goTo(path) {
      console.log('lett.letter: ' ,path);
      // this.goto(`/litter/${path}/photo`);
      window.location = `/litter/${path}/photo`;
    },

    handleSuccessPuppies(res, file) {
      console.log('Uploads Puppies:', res);
      // this.litters.images.push({imageSrc : URL.createObjectURL(file.raw)});

      this.ruleForm.fileListPuppies.push(res);
      console.log('this.ruleForm.fileListPuppies YYY: ', this.ruleForm.fileListPuppies);
    },

    handleExceedPuppies(files, fileList) {
      this.$message.warning(`${this.i19p.limitExceededText} ${this.limit} ${this.i19p.files}, 
      ${this.i19p.limitExceededText2}  ${fileList.length} + ${files.length}. ${this.i19p.limitExceededText3}: 
      ${files.length + fileList.length} ${this.i19p.files}`);
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

    setActiveItem() {
      return this.indexSlide;
    },

    showSliderImages(indexPhoto) {
      this.fullscreenLoading = true;
      this.dialogTableVisible = true;
      this.litterId = this.litter.id;
      this.photos = this.litter.images;
      this.title = this.i19p.titleParents;
      this.indexSlide = indexPhoto;
      this.handlerSetActiveSlider();
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    showSlider: async function (indexPhoto, indexPhotoSet) {
      this.fullscreenLoading = true;
      this.indexSlide = indexPhoto;
      this.indexPhotoSet = indexPhotoSet;
      // console.log('indexPhoto:: ', indexPhoto);
      // console.log('indexPhotoSet:: ', this.indexPhotoSet);
      this.title = this.i19p.titlePuppies;
      this.dialogTableVisible = true;
      let photoSession = await this.litter.puppies.filter((phSes, i) => i === this.indexPhotoSet);
      this.photos = photoSession[0].photos;
      this.litterId = this.litter.id;
      this.handlerSetActiveSlider();
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    },


    clickPedigree() {
      // this.dialogPedigreeVisible = true;
      this.goto(`/litter/${this.litter.letter}/pedigree`);
      // this.litterId = litterId;
      // this.indexSlide = indexPhoto;
      // this.handlerSetActiveSlider();
      // console.log('this.litterId: ', this.litterId);
      // console.log('this.indexPhoto: ', this.indexPhoto);
    },

    clickPuppiesSale() {
      this.goto(`/dogs`);
    },


    handlerCloseDialogSlider() {
      this.photos = [];
      this.fullscreenLoading = false;
      this.goto(`/litter/${this.litter.letter}/photo`);
    },


    handlerSetActiveSlider(i) {
      console.log('Нажали по слайду: ', i);
      // this.photos = _.pluck(this.litter.puppies, 'photos');
      return this.indexPhoto;
    },

    handlerSetActivePresentation(i) {
      console.log('Нажали по презентации: ', i);
      // this.photos = _.pluck(this.litter.puppies, 'photos');
      return this.deletePresentationIndex;
    },

    // Установить инбекс фотосессии
    setIndexPhotoSet: function (command) {
      this.indexPhotoSet = command.i;

    },


    // Открыть диалоговое окно "Добавить фотосессию"
    setAddedPhotoSet: function (command) {
      this.dialogAddedPhotoSession = true;
    },

    // Открыть диалоговое окно "Добавить фотосессию"
    setAddedPresentation: function (command) {
      this.dialogAddedPresentation = true;
    },


    /* Открывает диалоговое окно редактирования*/
    handleCommand(command) {
      switch (command.com) {
        case 'a':
          this.setIndexPhotoSet(command);
          this.dialogFormVisible = true;
          break;
        case 'b':
          this.setIndexPhotoSet(command);
          this.dialogDescriptionPhotoSession = true;
          break;
        case 'c':
          this.setAddedPhotoSet(command);
          break;
        case 'd':
          this.setIndexPhotoSet(command);
          this.dialogDeletePhotoSession = true;
          this.nameSessionPhoto = command.name;
          // this.ruleForm.description =  this.litter.description;
          break;
        case 'e':
          this.dialogEditor = true;
          // this.ruleForm.description =  this.litter.description;
          break;
        case 'f':
          window.location = '/litters/new';
          break;
        case 'g':
          this.setAddedPresentation(command);
          break;
        case 'dl':
          this.clickDeleteLitter();
          break;
        case 'link':
          window.location = '/litters';
          break;
        //default:  this.setIndexPhotoSet(command);
      }
      // }
      // this.$message('Нажат элемент: ' + command);
    },


    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateLitter();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    async updateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addPhotoSet();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    async addedPresentForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addedPresent();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    async getNameSession(indexPhotoSet) {
      return this.litter.puppies[0].hasOwnProperty('sessionName') ? this.litter.puppies[0].sessionName : '';
    },
    async deleteForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.deletePhotoSet();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


    _clearAddFriendsModal: function () {
      this.goto(`/litter/${this.litter.letter}/photo`);
      this.formErrors = {};
      this.cloudError = '';
    },


    closeAddFriendsModal: function () {
      this._clearAddFriendsModal();
    },

    closeModal: function () {
      this._clearAddFriendsModal();
    },

    fixDescription(i) {
      this.ruleForm.description > i ? this.mesError('Много текста!') : '';
    },

    async addPhotoSet() {
      this.fixDescription();
      let data = {
        // fileList: this.ruleForm.sessionName,
        puppies: this.ruleForm.fileListPuppies,
        // letter: this.fixLetter(),
        // dam: this.getDamArr(),
        // sire: this.getSireArr(),
        // born: JSON.stringify(this.ruleForm.born),
        id: this.litter.id,
        sessionName: this.ruleForm.sessionName,
        descriptionPhotoSession: this.ruleForm.descriptionPhotoSession,
      };

      io.socket.post('/api/v1/litters/add-session-photo', data, (dataRes, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';

        this.dialogAddedPhotoSession = false;
        // this.loading.close();
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          _.isArray(this.litter.puppies) ? this.litter.puppies.push(data) : this.litter.puppies = [data];
          setTimeout(() => {
            window.location = `/litter/${this.litter.letter}/photo`;
          }, 1500);


        }
      });
    },

    async addedPresent() {
      this.fixDescription(this.presentationUrlLength);
      if (_.isNull(this.ruleForm.presentationUrl.match(/^http:\/\/|^https:\/\//))) {
        this.mesError(this.i19p.textUrlErr);
        return false;
      }

      let data = {
        id: this.litter.id,
        presentationName: this.ruleForm.presentationName,
        presentationUrl: this.ruleForm.presentationUrl,
        descriptionPresentation: this.ruleForm.descriptionPresentation,
        // born: JSON.stringify(this.ruleForm.born),
      };

      io.socket.post('/api/v1/litters/add-presentation', data, (dataRes, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';

        this.dialogAddedPresentation = false;

        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          _.isArray(this.litter.presentation) ? this.litter.presentation.push(data) : this.litter.presentation = [data];
          this.goto(`/litter/${this.litter.letter}/presentation`);
          // setTimeout(() => {
          //   window.location = `/litter/${this.litter.letter}`;
          // }, 1500);
        }
      });
    },


    async deletePhotoSet() {

      let data = {
        id: this.litter.id,
        indexPhotoSet: this.indexPhotoSet
      };

      io.socket.post('/api/v1/litters/destroy-session-photo', data, (dataRes, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';
        this.dialogDeletePhotoSession = false;
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.litter.puppies.splice(data.indexPhotoSet, 1);
          setTimeout(() => {
            window.location = `/litter/${this.litter.letter}/photo`;
          }, 1500);
        }
      });
    },


    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    async updateLitter() {
      this.fixDescription(this.descriptionLitterLength);
      let data = {
        id: this.litter.id,
        description: this.ruleForm.description,
        subtitle: this.ruleForm.subtitle,
        born: this.ruleForm.born ? this.ruleForm.born : this.litter.born,
        sessionName: this.ruleForm.sessionName,
        descriptionPhotoSession: this.ruleForm.descriptionPhotoSession,
      };

      io.socket.post('/api/v1/litters/update-litter', data, (dataRes, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';

        this.centerDialogAdded = false;

        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.litter.sessionName = data.sessionName ? data.sessionName : this.litter.sessionName;
          this.litter.description = data.description ? data.description : this.litter.description;
          this.litter.subtitle = data.subtitle ? data.subtitle : this.litter.subtitle;
          this.litter.descriptionPhotoSession = data.descriptionPhotoSession ? data.descriptionPhotoSession : '';
          this.litter.bornNt = data.born ? moment.parseZone(data.born).format('LL') : this.litter.bornNt;
        }
      });
    },


    async updatePhotoSetName() {
      let data = {
        id: this.litter.id,
        indexPhotoSet: this.indexPhotoSet,
        sessionName: this.ruleForm.sessionName,
      };
      io.socket.post('/api/v1/litters/update-session-name', data, (dataRes, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';
        this.dialogFormVisible = false;
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.litter.puppies[data.indexPhotoSet].sessionName = data.sessionName ? data.sessionName : '';
        }
      });
    },

    async updatePhotoSetDescription() {
      this.fixDescription(this.photoSetDescriptionLength);
      let data = {
        id: this.litter.id,
        indexPhotoSet: this.indexPhotoSet,
        sessionName: this.ruleForm.sessionName,
        descriptionPhotoSession: this.ruleForm.descriptionPhotoSession
      };
      io.socket.post('/api/v1/litters/update-session-description', data, (dataRes, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';

        this.dialogDescriptionPhotoSession = false;
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.litter.puppies[data.indexPhotoSet].descriptionPhotoSession = data.descriptionPhotoSession ? data.descriptionPhotoSession : '';
        }
      });
    },


    mesError(text = '') {
      this.$notify.error({
        title: 'Error',
        message: text,
        offset: 100,
      });
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

    resetForm(formName) {
      // this.$refs.upload.clearFiles();
      this.dialogFormVisible = false;
      this.dialogDescriptionPhotoSession = false;
      this.dialogEditor = false;
      this.$refs[formName].resetFields();
      this.ruleForm.fileList = [];
      this.ruleForm.fileListPuppies = [];
      this.ruleForm.list = [];
      this.ruleForm.imageUrl = '';

    },
    load() {
      // this.loadingVideo = true;
      // setTimeout(() => {
      //   // this.countVideo += 2;
      //   this.loadingVideo = false;
      // }, 2000);
    },
    // Это кнопка вызывает модальное окно <modal> с <ajax-form> для удаления помёта
    clickDeleteLitter: function () {
      this.confirmDeleteLitterModalOpen = true;
      this.selectedLitter = this.litter;
    },
    // Это кнопка вызывает модальное окно <modal> с <ajax-form> для удаления презентации
    clickDeletePresentation(i) {
      this.confirmDeletePresentationModalOpen = true;
      this.selectedLitter = this.litter;
      this.deletePresentationIndex = i;
    },

    closeDeleteLitterModal: function () {
      this.selectedLitter = undefined;
      this.confirmDeleteLitterModalOpen = false;
    },
    closeDeletePresentationModal: function () {
      this.selectedLitter = undefined;
      this.confirmDeletePresentationModalOpen = false;
    },

    handleParsingDeleteLitterForm: function () {
      return {
        id: this.selectedLitter.id
      };
    },
    handleParsingDeletePresentationForm: function () {
      return {
        id: this.selectedLitter.id,
        // obj: this.deletePresentationIndex,
        index: this.deletePresentationIndex,
      };
    },

    submittedDeleteLitterForm: function () {
      // _.remove(this.litters, {id: this.selectedLitter.id});
      this.fullscreenLoading = true;

      this.$forceUpdate();
      this.confirmDeleteLitterModalOpen = false;
      this.selectedLitter = undefined;
      this.handlerSetActiveSlider();
      setTimeout(() => {
        this.goto('/litters');
      }, 1500);
    },

    submittedDeletePresentationForm: function () {
      // _.remove(this.litter.presentation,present);

      this.fullscreenLoading = true;

      this.$forceUpdate();
      this.confirmDeletePresentationModalOpen = false;
      this.selectedLitter = undefined;
      this.handlerSetActiveSlider();
      setTimeout(() => {
        this.goto(`http://localhost:1337/litter/${this.litter.letter}/presentation`);
      }, 1000);
    },

    clickTabName() {
      let activeName = this.virtualPageSlug;
      this.goto(`/litter/${this.litter.letter}/${activeName}`);
    },

    onSubmit() {
      console.log('FOP::', this.commentForm);
    },


    // Выбираем все комментарии
    async commentList() {
      await io.socket.get(`/api/v1/litters/list-comment/${this.litter.id}`, function gotResponse(body, response) {
        console.log('Сервис Comment List ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию list-*
      await io.socket.on('list-comment', (data) => {
        console.log('list-comment: ', data);
        // this.commentsLength=0;

        this.litter.puppies = data;
      });
    },

    // Обновляем массив комментариев
    async updateComment() {
      if (_.isEmpty(this.comment)) {return false;}
      let data = {
        id: this.litter.id,
        comment: this.comment,
        userName:this.me.fullName,
        indexPhotoSet:this.ruleForm.show
      };
      await io.socket.post('/api/v1/litters/add-comment', data, (dataRes, jwRes) => {
        // (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';


          if (jwRes.statusCode === 200) {
            this.comment = '';
            //  data.avatarUrl = this.me.defaultIcon === 'gravatar' ? this.me.gravatar : this.me.avatar;
            // _.isArray(this.litter.puppies[this.ruleForm.show].comments) ? this.litter.puppies[this.ruleForm.show].comments.push(data) : this.litter.puppies[this.ruleForm.show].comments = [data];
          }
      });

    },


    handleChange(val) {
      console.log(val);
    }

  },
});
//
