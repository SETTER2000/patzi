parasails.registerPage('dogs-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dogs: [],
    isCollapse: true,
    kennels: [],
    dams: [],
    show: false,
    limit: 50,
    removeDog: undefined,
    dogId: undefined,
    dialog: {},
    showDog: undefined,
    loading: {},
    fullscreenLoading: false,
    sires: [],
    colors: [],
    warning: '',
    titleDialog: '',
    value: 0,
    valueColor: '',

    // Состояние загрузки
    syncing: false,
    // Ограничение размера одного файла картинки при загрузки
    sizeLess: 1, // MB
    // Состояние ошибки сервера
    cloudError: '',
    subtitle: '',
    dialogFormVisible: false,
    // form: {
    //   name: '',
    //   region: '',
    //   date1: '',
    //   date2: '',
    //   delivery: false,
    //   type: [],
    //   resource: '',
    //   desc: ''
    // },
    formLabelWidth: '120px',
    centerDialogAdded: false,
    centerDialogVisible: false,
    dialogTableVisible: false,
    innerVisible: false,
    dialogImageUrl: '',
    dialogVisible: false,
    fit: 'cover',
    centerDialogVisibleWarnings: false,
    files: [],
    fileList: [],
    continents: [],
    formErrors: {},
    rules: {
      kennel: [
        {required: true, message: 'Please select kennel name', trigger: 'change'}
      ],
      label: [
        {required: true, message: 'Please input dog name', trigger: 'blur'},
        {min: 3, max: 100, message: 'Length should be 3 to 100', trigger: 'blur'}
      ],
      // growth: [
      //   {required: true, message: 'Please input height dog', trigger: 'change'},
      //   // {min: 20, max: 40, message: 'Height should be 20 to 40 cm', trigger: 'change'}
      // ],
      gender: [
        {required: true, message: 'Please select a dog gender.', trigger: 'change'}
      ],
      dateBirth: [
        {type: 'date', required: true, message: 'Please pick a date', trigger: 'change'}
      ],
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
    resetFederation: [{
      key: 1,
      value: '',
      registerNumber: ''
    }],
    ruleForm: {
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
      gender: '',
      label: '',
      federation: '1',
      imageUrl: '',
      previewImageSrc: '',
      continent: null,
      dialogImageUrl: '',
      dialogVisible: false,
      kennel: null,
      registerNumber: '',
      dateBirth: '',
      subtitle: '',
      weight: 10,
      growth: 20,
      type: '',
    },
    fits: 'cover',
    select: '',
    labelPosition: 'top',
    items: [
      {name: 'Poale Ell Adam', src: 'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2.jpg'},
      {name: 'Poale Ell Bell', src: 'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018-11.jpg'},
      {name: 'Poale Ell Bazhen', src: 'https://d3a1wbnh2r1l7y.cloudfront.net/Adam-10m.jpg'},
      {name: 'Poale Ell Barthalamew', src: 'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018.jpg'},
    ],
    litters: [],
    ratio: null,
    // colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }

    dic: [
      ['en', {
        warnNoKennel: `At the moment there is no nursery in the database.
         You should create at least one kennel to start with to add a dog.`,
        warnRemove: 'This will permanently delete the object. Continue?',
        warning: 'Warning',
        delCancel: 'Delete canceled',
        cancel: 'Cancel',
        text400Err: 'Error. Could not create! ',
        text500Err: 'Server Error! Unable to create. ',
        text500ExistsErr: 'Looks like such an entry already exists. Cannot create two identical names. ',
        success: 'Congratulations! Object successfully created. ',
        successDelete: 'Object deleted successfully. ',
        selectGender: 'Please select a dog gender.',
        growth: 'How to measure a dog\'s height?',
        hairless: 'What is a down or naked dog?',
        infoColor: 'Chinese Crested may have any combination of colors, as prescribed in the FCI 288 standard. <br/>This paragraph does not apply to the classification of dogs by color, but rather an attempt to provide more information on the appearance of the dog. People in their lives always have priorities, this also applies to color, the preference of one or another color often becomes decisive when buying or breeding dogs.',
        whyColor: 'Why determine the color.',
      }],
      ['ru', {
        warnNoKennel: `В данный момент не существует ни одного питомника в базе. 
        Вам следует создать для начала хотя бы один питомник, что бы добавить собаку.`,
        warnRemove: 'Это навсегда удалит объект. Продолжить?',
        warning: 'Внимание',
        delCancel: 'Удаление отменено',
        cancel: 'Отменить',
        text400Err: 'Ошибка. Не смог создать!',
        text500Err: 'Ошибка сервера! Невозможно создать.',
        text500ExistsErr: 'Похоже такая запись уже существует. Невозможно создать два одинаковых имя.',
        success: 'Поздравляем! Объект успешно создан.',
        successDelete: 'Объект успешно удалён.',
        selectGender: 'Пожалуйста выберите пол собаки.',
        growth: 'Как измерить рост собаки?',
        hairless: 'Что такое пуховая или голая собака?',
        infoColor: 'Китайская хохлатая может иметь любое сочетание цветов, как предписано в стандарте FCI 288. <br>Данный пункт не относится к классификации собаки по по цветовому признаку, это скорее попытка дать больше информации по внешнему виду собаки. Люди в своей жизни всегда имеют приоритеты, это касается и цвета, предпочтение того или иного цвета часто становится определяющим при покупке или вязки собак.',
        whyColor: 'Зачем определять цвет.',
      }]
    ],
    map: [
      ['growth', {
        src: 'https://d3a1wbnh2r1l7y.cloudfront.net/Izmerit_holku.svg',
      }],
      ['hairless', {
        src: 'https://d3a1wbnh2r1l7y.cloudfront.net/Hairless_OR_Powderpuff.jpg',
      }]],
  },


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);


    // Подключаемся к комнате kennel
    io.socket.get(`/api/v1/kennels/list`, function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });


    // Подключаемся к комнате color
    io.socket.get(`/api/v1/colors/list`, function gotResponse(body, response) {
      console.log('Сервер color ответил кодом ' + response.statusCode + ' и данными: ', body);
    });

    // Принимаем данные по событию list-*
    io.socket.on('list-kennel', data => {
      this.kennels = data;
    });


    // Получаем данные для селектов в форме
    io.socket.on('list-color', (data) => {
      this.colors = data.colors;
    });


    /* Весь список*/
    this.getList();


    // Кобели
    this.sireList();

    // Суки
    this.damList();
    // Подключаемся к комнате kennel
    // io.socket.get(`/api/v1/dogs/list`, function gotResponse(body, response) {
    //   console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    // });
    //
    // // Принимаем данные по событию list-*
    // io.socket.on('list-kennel', data => {this.kennels = data});
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

    // countAll: function (value, lakes) {
    //   if (!value) {
    //     return '';
    //   }
    //
    //   // console.log('value::::', this.countCommentAll.push(value).length);
    //   return lakes.length;
    //   value === 'like' ? this.countCommentLike++ :
    //     value === 'wow' ? this.countCommentWow++ :
    //       value === 'haha' ? this.countCommentHaha++ :
    //         value === 'super' ? this.countCommentSuper++ : 0;
    //
    //
    //   // this.countCommentLike = _.pluck(likes, 'like').length;
    //   // this.countCommentWow = _.pluck(likes, 'wow').length;
    //   // this.countCommentSuper = _.pluck(likes, 'super').length;
    //   // this.countCommentHaha = _.pluck(likes, 'haha').length;
    //   // this.likeId = _.last(_.uniq(_.pluck(likes, 'comment')));
    //   // console.log(' this.likeId:::', this.likeId);
    //   // this.countCommentAll = likes.length;
    //   // return (likes.length > 0);
    //
    // }
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
  },


  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    async getList() {
      await io.socket.get(`/api/v1/dogs/list`, function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });

      // Принимаем данные по событию list-*
      await io.socket.on('list-dog', (data) => {
        this.dogs = data;
        console.log('this.dogs: ', this.dogs);
      });
      // Принимаем данные по событию list-*
      await  io.socket.on('list-continent', (data) => {
        this.continents = data;
      });

    },


    handleAvatarSuccess(res, file) {
      this.files.push(file.response);
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.file = file.response;
    },


    submittedUploadForm: function (result) {
      // Добавлем новые данные в уже имеющийся массив dogs
      this.dogs.push({
        label: this.ruleForm.label,
        id: result.id,
        imageSrc: result.imageSrc,
        title: this.ruleForm.title,
        dateBirth: JSON.stringify(this.ruleForm.date1),
        owner: {
          id: this.me.id,
          fullName: this.me.fullName,
        },
      });
      this._clearUploadModal();
    },


    beforeAvatarUpload(file) {
      let sizeLess = this.sizeLess / 1000;
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
      const isLt1M = file.size / 1024 / 1024 < sizeLess;
      if (!isJPG) {
        this.$message.error(`Logo picture must be JPG or PNG format!`);
      }
      if (!isLt1M) {
        this.$message.error(`File ${file.name} picture size can not exceed ${this.sizeLess}Kb!`);
      }
      return isJPG && isLt1M;
    },


    // Срабатывает перед удалением одного файла
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },


    resetForm(formName) {
      this.$refs.upload.clearFiles();
      this.$refs[formName].resetFields();
      this.ruleForm.fileList = [];
      this.ruleForm.imageUrl = '';
      this.ruleForm.federations = this.resetFederation;
    },


    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addDog();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


    async addDog() {
      this.openFullScreen();
      let data = {
        fileList: this.ruleForm.fileList,
        label: this.ruleForm.label,
        dateBirth: JSON.stringify(this.ruleForm.dateBirth),
        gender: this.ruleForm.gender,
        kennel: this.ruleForm.kennel,
        nickname: this.ruleForm.nickname,
        federation: this.ruleForm.federation,
        weight: this.ruleForm.weight,
        growth: this.ruleForm.growth,
        type: this.ruleForm.type,
        color: this.ruleForm.color,
        stamp: this.ruleForm.stamp,
        registerNumber: this.ruleForm.registerNumber,
        subtitle: this.ruleForm.subtitle,
        yourKennel: this.ruleForm.yourKennel,
      };

      await io.socket.post('/api/v1/dogs/create-dog', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';

        this.centerDialogAdded = false;
        this.loading.close();
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.ruleForm.fileList = [];
          // this.ruleForm.file = [];
          this.ruleForm.imageUrl = '';
          this.ruleForm.federations = this.resetFederation;
          this.getList();
        }
      });
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


    // Реагирует на событие change в поле питомники|kennel
    async changeKennel(kennelId) {
      this.kennelId = kennelId;
      // console.log('this.ruleForm.city:', this.ruleForm.city);
      // await this.cityList();
    },


    getPullKennel() {
      return this.kennels;
    },

    showDialog(string) {
      this.innerVisible = true;
      this.dialog = new Map(this.map).get(string);
      this.dialog.header = this.i19p[string];


    },
    async handleSelect(e) {
      this.dogId = (_.isNumber(e.id)) ? e.id : undefined;
    },

    // Выбираем всех кобелей
    async sireList() {
      await io.socket.get(`/api/v1/dogs/list-sire`, function gotResponse(body, response) {
        console.log('Сервис Dogs sire ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию list-*
      await io.socket.on('list-sire', (data) => {
        this.sires = data;
      });
    },
    // Выбираем всех сук
    async damList() {
      await io.socket.get(`/api/v1/dogs/list-dam`, function gotResponse(body, response) {
        console.log('Сервис Dogs dam ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию list-*
      await io.socket.on('list-dam', (data) => {
        this.dams = data;
      });
    },

    /* Авто поиск по собакам. Кобели. */
    querySearchSires(queryString, cb) {
      this.sireList();
      let links = this.sires;
      console.log('LINKS querySearchSires: ', links);
      let results = queryString ? links.filter(this.createFilter(queryString)) : links;
      cb(results);
    },

    /* Авто поиск по собакам. Суки. */
    querySearchDams(queryString, cb) {
      this.damList();
      let links = this.dams;
      console.log('LINKS querySearchDams: ', links);
      let results = queryString ? links.filter(this.createFilter(queryString)) : links;
      cb(results);
    },


    createFilter: function (queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },

    // Если массив kennel пустой, выводим сообщение.
    clickAddButton() {
      this.warning = this.i19p.warnNoKennel;
      (this.kennels.length > 0) ? this.centerDialogAdded = true : this.centerDialogVisibleWarnings = true;
    },

    goTo(path) {
      window.location = `/${path}`;
    },
    goTo2(path) {
      this.goto(path);
    },
    feedback(e) {
      console.log('CLICK^ ', e);
      this.dialogFormVisible = true;
    },

    open() {
      this.$alert(`<p>${this.i19p.infoColor}</p>`, this.i19p.whyColor, {
        dangerouslyUseHTMLString: true
      });
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
      _.remove(this.things, {id: this.selectedThing.id});
      this.$forceUpdate();
      this.confirmDeleteThingModalOpen = false;
      this.selectedThing = undefined;
    },
    copyElement() {
      this.ruleForm.federations.push({
        key: Date.now(),
        value: ''
      });
    },


    removeElement(item) {
      var index = this.ruleForm.federations.indexOf(item);
      if (index !== -1) {
        this.ruleForm.federations.splice(index, 1);
      }
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


    getPullColor() {

      let field = (this.me.preferredLocale === 'ru') ? 'labelRu' : 'value';
      return _.sortBy(this.colors, field);
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
    },

    handleSuccess(res, file) {
      this.ruleForm.fileList.push(res);
    },

    // функция перехвата при превышении лимита
    handleExceed(files, fileList) {
      this.$message.warning(`${this.i19p.limitExceededText} ${this.limit} ${this.i19p.files}, 
      ${this.i19p.limitExceededText2}  ${fileList.length} + ${files.length}. ${this.i19p.limitExceededText3}: 
      ${files.length + fileList.length} ${this.i19p.files}`);
    },
    showMenu(id, e) {
      this.dogId = id;
      this.show = true;
      this.showDog = id;
    },

    showOut() {
      this.show = false;
    },
    /* Открывает диалоговое окно редактирования*/
    handleCommand(command) {
      switch (command.com) {
        case 'a':
          this.setIndexPhotoSet(command);
          this.dialogFormVisible = true;
          break;
        case 'b':
          this.setValueEditPhotoSet(command);
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
          break;
        //default:  this.setIndexPhotoSet(command);
      }
      // }
      // this.$message('Нажат элемент: ' + command);
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },


    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },


    errorMessages(jwRes, successText) {
      (jwRes.statusCode === 200) ? (this.mesSuccess(successText)) :
        (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
          (jwRes.statusCode === 404) ? this.mesError(this.i19p.text404Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';
    },


    deleteDog: async function () {
      let data = {
        id: this.removeDog,
      };
      // console.log('Перед отправкой data: ', data);
      io.socket.post('/api/v1/dogs/destroy-one-dog', data, (dataRes, jwRes) => {
        this.errorMessages(jwRes,this.i19p.successDelete);
        this.dialogDeletePhotoSession = false;
        if (jwRes.statusCode === 200) {
          // this.$message({
          //   type: 'success',
          //   message: this.i19p.success
          // });
          this.getList();
          this.$forceUpdate();
        }
      });


    },

    openRemoveDialog(id) {
      this.removeDog = id;
      this.$confirm(this.i19p.warnRemove, this.i19p.warning, {
        confirmButtonText: 'OK',
        cancelButtonText: this.i19p.cancel,
        type: 'warning'
      }).then(() => {
        this.deleteDog();

      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.i19p.delCancel
        });
      });
    },
  }
});
