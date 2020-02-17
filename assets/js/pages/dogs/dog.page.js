parasails.registerPage('dog', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dialogFormAwards: false,
    centerDialogAdded: false,
    dialogImageUrl: '',
    ranks: [{
      id: '1',
      label: 'Russian Junior Champion',
      abbr: 'RUSJCH',
      labelRu: 'Юный чемпион России',
      value: 1
    },
      {id: '2', label: 'Hungarian Junior Champion', abbr: 'HJCH', labelRu: 'Юный чемпион Болгарии', value: 2}
    ],
    direction: 'ttb',
    dialogVisible: false,
    comment: '',
    sizeLess: 5, // MB
    objOne: {},
    limit: 50,
    buttonUpdate: false,
    dialog: {},
    innerVisible: false,
    photoVisible: false,
    circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    sizeList: ["large", "medium", "small"],
    ruleForm: {
      //
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      resource: '',
      desc: '',
      addTitleDog: false,
      errInputDogName: false,
      sale: false,
      see: true,
      allowEdit: true,
      dateBirth: '',
      // dateBirthUpdate: '',
      dateDeath: '',
      // dateDeathUpdate: '',
      currency: '',
      price: 0,
      saleDescription: '',
      file: [],
      federations: [{
        key: 1,
        value: 'FCI',
        registerNumber: ''
      }],
      sire: '',
      fileList: [],
      color: '',
      dam: '',
      owner: '',
      gender: '',
      label: '',
      nickname: '',
      stamp: '',
      /*  canine: '',
        bite: '',
        letter: '',
        dogTests: this.ruleForm.dogTests,
        teethCountTop: this.ruleForm.teethCountTop,
        teethCountBottom: this.ruleForm.teethCountBottom,*/
      federation: '1',
      imageUrl: '',
      previewImageSrc: '',
      continent: null,
      dialogImageUrl: '',
      dialogVisible: false,
      kennel: null,
      registerNumber: '',
      subtitle: '',
      weight: 10,
      growth: 20,
      type: '',
    },
    rules: {
      kennel: [
        {required: true, message: 'Please select kennel name', trigger: 'change'}
      ],
      label: [
        {required: true, message: 'Please input dog name', trigger: 'blur'},
        {min: 3, max: 100, message: 'Length should be 3 to 100', trigger: 'blur'},
      ],
      gender: [
        {required: true, message: 'Please select a dog gender.', trigger: 'change'}
      ],
      dateBirth: [
        {type: 'date', required: true, message: 'Please pick a date', trigger: 'change'}
      ],
      // dateBirthUpdate: [
      //   { type:'string',required: true, message: 'Please pick a date', trigger: 'change'}
      // ],
      /*  registerNumber: [
         {required: true, message: 'Please input register number', trigger: 'blur'},
         {min: 3, max: 100, message: 'Length should be 3 to 100', trigger: 'blur'}
       ],
       region: [
         {required: true, message: 'Please select Activity zone', trigger: 'change'}
       ],
       continent: [
         {required: true, message: 'Please select your continent', trigger: 'change'}
       ],
      kennel: [
         {required: true, message: 'Please select your kennel', trigger: 'change'}
       ],
       */
      subtitle: [
        {message: 'Please tell about the nurseries. It is very interesting.', trigger: 'change'},
        {max: 700, message: 'Length should be 10 to 100', trigger: 'blur'}
      ]
    },
    worldWinner: [{
      year: '2013',
      address: 'Hungary, Budapest',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
    }],
    dic: [
      ['en', {
        textOneErr: `An error has occurred`,
        textTwoErr: `No comment added.`,
        warnNoDogs: `There is no possibility to create a litter, while at least one pair of dogs is missing.`,
        warnNoKennel: `At the moment there is no nursery in the database.
         You should create at least one kennel to start with to add a dog.`,
        text400Err: 'Error. Could not update! ',
        text404Err: 'Mistake. Perhaps you do not have permission to delete this object!',
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
        titlechilds: `childs`,
        areYouClose: 'Are you sure you want to close chat?',
        getFormatDateLocale: `yyyy-MM-dd`,
        getFormatDateTimeLocale: `yyyy-MM-dd HH:mm:ss`,
      }],
      ['ru', {
        textOneErr: `Произошла ошибка`,
        textTwoErr: `Комментарий не добавлен.`,
        warnNoDogs: `Нет возможности создать помёт, пока отсутствует хотя бы одна пара собак.`,
        warnNoKennel: `В данный момент не существует ни одного питомника в базе. 
        Вам следует создать для начала хотя бы один питомник, что бы добавить собаку.`,
        text400Err: 'Ошибка. Не смог создать!',
        text404Err: 'Ошибка. Возможно у вас нет прав на удаление данного объекта!',
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
        titlechilds: `Родители`,
        areYouClose: 'Вы уверены, что хотите закрыть чат?',
        getFormatDateLocale: `dd.MM.yyyy`,
        getFormatDateTimeLocale: `dd.MM.yyyy HH:mm:ss`,
      }]
    ],
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    moment().locale(this.me.preferredLocale);
  },


  mounted: async function () {
  },


  filters: {
    getCreate: function (value, l, format) {
      if (!value) {
        return '';
      }
      moment.locale(l);
      let formatNew = (!format) ? 'LLL' : format;
      return (moment.parseZone(value).format(formatNew)) ? moment.parseZone(value).format(formatNew) : value;
    },

    // Получить значёк валюты
    getCurrency: function (value) {
      if (!value) {
        return '';
      }
      return (value === 'dollar') ? '$' :
        (value === 'euro') ? '€' : '₽';
    },
    // Получить ссылку на аватар или граватар
    getFoto: function (value) {
      if (!value) {
        return '';
      }
      return (value.defaultIcon === 'gravatar') ? value.gravatar : value.avatar;
    },
    //Сантиметры в дюймы
    getDin: function (value, l, format) {
      if (!value) {
        return '';
      }
      return (value * 0.393700).toFixed(1);
    },
    //Киллограммы в фунты
    getFunt: function (value, l, format) {
      if (!value) {
        return '';
      }
      return (value / 1000 * 2.20462).toFixed(1);
    },

    /**
     * Показывает возраст с учётом смерти.
     * @param value дата рождения
     * @param l язык предпочтения (en|ru)
     * @param dateDeath
     * @returns {*}
     */
    getAge: function (value, l, dateDeath) {
      if (!value) {
        return '';
      }
      moment.locale(l);
      let start = moment(value);
      let end = !_.isEmpty(dateDeath) ? moment(dateDeath) : '';
      // return end ? end.from(start, true) : moment(value).fromNow(true);


      let now = moment.parseZone();
      /*  let event = moment.parseZone(value, ["DD.MM.YYYY"]);
         let a=moment.preciseDiff(now, event);
        console.log('now: ', now);
        console.log('EVENT: ', event);
        console.log('a: ', a);*/
      return end ? moment(value).preciseDiff(end) : moment(value).preciseDiff(now);
    },
  },


  computed: {
    i19p: {
      get: function () {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        return new Map(this.dic).get(this.me.preferredLocale);
      }
    },
    /*  winner: {
        get: function () {
          // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
          return this.dog.winner;
        }
      },*/

    indexSlide: {
      get: function () {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        return this.indexPhoto;
      },
      set: function (i) {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        this.indexPhoto = i;
      },
    },
    letters: {
      get: function () {
        let alphabet = [...new Set('ABCDEFGHIJKLMNOPQRSTUVWXYZ')]
          , ar = []
        ;
        alphabet.map(y => y === y ? ar.push({value: y, label: y}) : '');
        return ar;
      }
    },
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    showSliderImages(indexPhoto) {
      this.fullscreenLoading = true;
      this.dialogTableVisible = true;
      this.litterId = this.dog.id;
      this.photos = this.dog.images;
      this.title = this.i19p.titlechilds;
      this.indexSlide = indexPhoto;
      this.handlerSetActiveSlider();
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    },
    handleClose2(done) {
      this.$confirm(this.i19p.areYouClose)
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },

    // Получить все награды собаки
    getAwards(command) {
      // console.log('command::: ', command);
    },
    handlerSetActiveSlider(i) {
      // console.log('Нажали по слайду: ', i);
      // this.photos = _.pluck(this.litter.puppies, 'photos');
      return this.indexPhoto;
    },
    /* Открывает диалоговое окно редактирования*/
    handleCommand(command) {
      switch (command.com) {
        case 'a':
          this.getAwards(command);
          this.dialogFormAwards = true;
          break;
        case 'b':
          this.setValueEditPhotoSet(command);
          break;
        case 'c':
          this.goto('/dogs/chinese-crested');
          break;
        /* case 'f':
           window.location = '/litters/new';
           break;
         case 'g':
           this.setAddedPresentation(command);
           break;
         case 'dl':
           this.clickDeleteLitter();
           break;
         case 'allView':
           this.allViewed(command);
           break;
         case 'like':
           this.addLike(command);
           break;
         case 'super':
           this.addLike(command);
           break;
         case 'wow':
           this.addLike(command);
           break;
         case 'haha':
           this.addLike(command);
           break;
         case 'commentLike':
           this.commentLike(command);
           break;
         case 'commentSuper':
           this.commentLike(command);
           break;
         case 'commentWow':
           this.commentLike(command);
           break;
         case 'commentHaha':
           this.commentLike(command);
           break;
         case 'link':
           window.location = '/litters';
           break;
         case 'deleteComment':
           this.deleteComment(command);
           break;
         case 'changeComment':
           this.changeOpenComment(command);
           break;*/
        //default:  this.setIndexPhotoSet(command);
      }
      // }
      // this.$message('Нажат элемент: ' + command);
    },
    handleCloseDialog(done) {
      this.objOne = {};
      done();
      /* this.$confirm('Are you sure to close this dialog?')
         .then(_ => {
           done();
         })
         .catch(_ => {
         });*/
    },
    rootImg() {
      return _.isEmpty(this.dog.images) ? '' :
        _.isString(this.dog.images[this.dog.cover].imageSrc) ? this.dog.images[this.dog.cover].imageSrc : '';
    },
    goTo(path) {
      window.location = `/${path}`;
    },
    goTo2(path) {
      this.goto(path);
    },
    errorHandler() {
      return true
    },
    clickPedigree() {
      this.goto(`/litter/${this.dog.letter}/${moment(this.dog.dateBirth).format("YYYY")}/pedigree`);
    },
    clickShowPhoto(row) {

      this.photoVisible = true;
      // console.log('row:', row);
      // this.objOne = row;
      this.objOne = Object.assign({}, this.objOne, row);
      // console.log('this.objOne:', this.objOne);
    },

    open() {
      this.$alert('Клыки x Верхние резцы x Нижние резцы', '', {
        confirmButtonText: 'OK',
        /* callback: action => {
           this.$message({
             type: 'info',
             message: `action: ${ action }`
           });
         }*/
      });
    },

    getLinkKennel(kennelName) {
      return kennelName ? `/kennel/${kennelName.split(" ").join('-')}` : ''
    },

    // Если массив kennel пустой, выводим сообщение.
    clickAddButton() {
      this.centerDialogAdded = true;
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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

    beforeUpload(file) {
      // Проверка размера входящего файла картинки не более (MB)

      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < this.sizeLess;

      if (!isJPG) {
        this.$message.error('Picture must be JPG format!');
      }

      if (!isLt2M) {
        this.$message.error(`Picture size can not exceed ${this.sizeLess}MB!`);
      }

      return isJPG && isLt2M;
    }
    ,

    handleSuccess(res, file) {
      _.isArray(this.ruleForm.fileList) ? this.ruleForm.fileList.push(res) :
        this.ruleForm.fileList = [res];
    },
// функция перехвата при превышении лимита
    handleExceed(files, fileList) {
      this.$message.warning(`${this.i19p.limitExceededText} ${this.limit} ${this.i19p.files}, 
      ${this.i19p.limitExceededText2}  ${fileList.length} + ${files.length}. ${this.i19p.limitExceededText3}: 
      ${files.length + fileList.length} ${this.i19p.files}`);
    },

    // Срабатывает перед удалением одного файла
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    getPullKennel() {
      return this.kennels;
    },
    copyElement() {
      this.ruleForm.federations.push({
        key: Date.now(),
        value: ''
      });
    },
    getPullColor() {
      let field = (this.me.preferredLocale === 'ru') ? 'labelRu' : 'value';
      return _.sortBy(this.colors, field);
    },
    removeElement(item) {
      var index = this.ruleForm.federations.indexOf(item);
      if (index !== -1) {
        this.ruleForm.federations.splice(index, 1);
      }
    },
  }
});
