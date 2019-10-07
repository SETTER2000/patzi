parasails.registerPage('dogs-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dogs: [],
    isCollapse: true,
    dialogEditor: false,
    photoDescUpdate: false,
    dogFullName:'',
    cloudFrontUrl: 'https://d17pkle29f0gkk.cloudfront.net',
    photoDesc: {
      innerVisiblePhotoDescription: false,
      photoId: '',
      description: '',
      dateTaken:''
    },

    innerVisible: false,
    dialogEditorList: false,
    photoVisible: false,
    centerDialogVisiblePhotos: false,
    checkAll: false,
    checkedPhoto: [],
    // cities: cityOptions,
    isIndeterminate: true,
    sire: '',
    photos: {},
    cheker: false,
    dam: '',
    buttonUpdate: false,
    objOne: {},
    kennels: [],
    comment: '',
    subtitleLength: 100,
    descriptionLitterLength: 500,
    dialogPedigreeVisible: true,
    pathDogSale: '/dogs/chinese-crested/sale',
    pathDogs: '/dogs/chinese-crested',
    fullNameDogNegotiations: '',
    dams: [],
    dateTakenUpdate: '',
    dateBirthUpdate: '',
    dateDeathUpdate: '',
    search: '',
    nameModule: 'Dog',
    drawer: false,
    direction: 'rtl',
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
    sizeLess: 5, // MB
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
    resetFederation: [{
      key: 1,
      value: '',
      registerNumber: ''
    }],
    ruleForm: {
      sale: false,
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
      gender: '',
      label: '',
      nickname: '',
      stamp: '',
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
    //  fits: 'cover',
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
        photoEditor: 'Photo editor',
        cancel: 'Cancel',
        text400Err: 'Error. Could not create! ',
        text500Err: 'Server Error! Unable to create. ',
        text500ExistsErr: 'Looks like such an entry already exists. Cannot create two identical names. ',
        success: 'Congratulations! Object successfully created. ',
        successUpdate: 'Object updated successfully.',
        successDelete: 'Object deleted successfully. ',
        selectGender: 'Please select a dog gender.',
        growth: 'How to measure a dog\'s height?',
        hairless: 'What is a down or naked dog?',
        infoColor: 'Chinese Crested may have any combination of colors, as prescribed in the FCI 288 standard. <br/>This paragraph does not apply to the classification of dogs by color, but rather an attempt to provide more information on the appearance of the dog. People in their lives always have priorities, this also applies to color, the preference of one or another color often becomes decisive when buying or breeding dogs.',
        whyColor: 'Why determine the color.',
        priceTitle: 'Selling price.',
        priceText: 'You can set the price at any time, but until the price is set, the dog will not appear on the sales page. Remember to set the selling currency.',
        recommendationsSale: 'Recommendations for the sale of dogs. Describe the main advantages and benefits of the dog. This information will be posted on the dog’s card on the sales page.',
        areYouClose: 'Are you sure you want to close chat?',
        startOfNegotiations: 'My name is Olga, I am a breeder and owner of the nursery Poale Ell. I see your choice fell on a puppy by name ',
        startOfNegotiations2: '. Ready to answer your questions.',
      }],
      ['ru', {
        warnNoKennel: `В данный момент не существует ни одного питомника в базе. 
        Вам следует создать для начала хотя бы один питомник, что бы добавить собаку.`,
        warnRemove: 'Это навсегда удалит объект. Продолжить?',
        photoEditor: 'Редактор фотографий',
        warning: 'Внимание',
        delCancel: 'Удаление отменено',
        cancel: 'Отменить',
        text400Err: 'Ошибка. Не смог создать!',
        text400ErrUpdate: 'Ошибка. Не смог обновить!',
        text500Err: 'Ошибка сервера! Невозможно создать.',
        text500ErrUpdate: 'Ошибка сервера! Невозможно обновить.',
        text500ExistsErr: 'Похоже такая запись уже существует. Невозможно создать два одинаковых имя.',
        success: 'Поздравляем! Объект успешно создан.',
        successUpdate: 'Объект успешно обновлён.',
        successDelete: 'Объект успешно удалён.',
        selectGender: 'Пожалуйста выберите пол собаки.',
        growth: 'Как измерить рост собаки?',
        hairless: 'Что такое пуховая или голая собака?',
        infoColor: 'Китайская хохлатая может иметь любое сочетание цветов, как предписано в стандарте FCI 288. <br>Данный пункт не относится к классификации собаки по по цветовому признаку, это скорее попытка дать больше информации по внешнему виду собаки. Люди в своей жизни всегда имеют приоритеты, это касается и цвета, предпочтение того или иного цвета часто становится определяющим при покупке или вязки собак.',
        whyColor: 'Зачем определять цвет.',
        priceTitle: 'Цена продажи.',
        priceText: 'Установить цену продажи можно в любое время, но пока не установена цена собака не появится на странице продаж. Не забудьте установить валюту продажи.',
        recommendationsSale: 'Рекомендации для продажи собаки. Опишите главные достоинства и преимущества собаки. Эта информация будет размещена в карточке собаки на странице продаж.',
        areYouClose: 'Вы уверены, что хотите закрыть чат?',
        startOfNegotiations: 'Меня зовут Ольга, я заводчик и владелец питомника Poale Ell. Я вижу ваш выбор пал на щенка по имени ',
        startOfNegotiations2: 'Готова ответить на Ваши вопросы.',
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
  virtualPages: true,
  html5HistoryMode: 'history',
  virtualPagesRegExp: /^\/dogs\/[a-z-]+\/?([^/]+)?/,
  // `/^/foo/bar/?([^/]+)?/`
  // virtualPagesRegExp: /^\/dogs\/?[A-Z]+?\/[1|2][0-9]{3}\/?([^\/]+)?/,

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
      return (moment(value).format(formatNew)) ? moment(value).format(formatNew) : value;
      // return (moment.parseZone(value).format(formatNew)) ? moment.parseZone(value).format(formatNew) : value;
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
        this.dogs = _.isNull(data) ? [] : data;
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


    // submittedUploadForm: function (result) {
    //   // Добавлем новые данные в уже имеющийся массив dogs
    //   this.dogs.push({
    //     label: this.ruleForm.label,
    //     id: result.id,
    //     imageSrc: result.imageSrc,
    //     title: this.ruleForm.title,
    //     // dateBirth: this.ruleForm.date1,
    //     owner: {
    //       id: this.me.id,
    //       fullName: this.me.fullName,
    //     },
    //   });
    //   this._clearUploadModal();
    // },


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
      this.$refs.upload ? this.$refs.upload.clearFiles() : '';
      this.$refs[formName].resetFields();
      this.ruleForm.fileList = [];
      this.ruleForm.imageUrl = '';
      this.ruleForm.price = 0;
      this.ruleForm.federations = this.resetFederation;
    },


    async submitForm(formName) {
      console.log('this.buttonUpdate::: ', this.buttonUpdate);
      this.$refs[formName].validate((valid) => {
        console.log('valid::: ', valid);
        if (valid && !this.buttonUpdate) {

          this.addDog();
        } else if (valid && this.buttonUpdate) {
          this.updateDog();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


    async addDog() {
      this.openFullScreen();

      console.log('this.ruleForm.fileList:::: ' , this.ruleForm.fileList);
      let data = {
        fileList: this.ruleForm.fileList,
        label: this.ruleForm.label,
        dateBirth: JSON.stringify(this.ruleForm.dateBirth),
        dateDeath: this.ruleForm.dateDeath,
        gender: this.ruleForm.gender,
        kennel: this.ruleForm.kennel,
        nickname: this.ruleForm.nickname,
        federation: this.ruleForm.federation,
        weight: this.ruleForm.weight,
        growth: this.ruleForm.growth,
        type: this.ruleForm.type,
        dam: this.ruleForm.dam,
        sire: this.ruleForm.sire,
        sale: this.ruleForm.sale,
        price: +this.ruleForm.price,
        saleDescription: this.ruleForm.saleDescription,
        currency: this.ruleForm.currency,
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


    async updateDog() {
      this.openFullScreen();
      console.log('IMG::: ', this.ruleForm.fileList);
      // console.log('DATE R::; ' , this.dateDeathUpdate);
      let data = {
        id: this.ruleForm.id,
        fileList: this.ruleForm.fileList,
        label: this.ruleForm.label,
        dateBirth: JSON.stringify(this.dateBirthUpdate),
        dateDeath: JSON.stringify(this.dateDeathUpdate),
        gender: this.ruleForm.gender,
        kennel: this.ruleForm.kennel,
        dam: this.dam,
        sire: this.sire,
        nickname: this.ruleForm.nickname,
        federation: this.ruleForm.federation,
        weight: this.ruleForm.weight,
        growth: this.ruleForm.growth,
        type: this.ruleForm.type,
        sale: this.ruleForm.sale,
        price: +this.ruleForm.price,
        saleDescription: this.ruleForm.saleDescription,
        currency: this.ruleForm.currency,
        color: this.ruleForm.color,
        stamp: this.ruleForm.stamp,
        registerNumber: this.ruleForm.registerNumber,
        subtitle: this.ruleForm.subtitle,
        yourKennel: this.ruleForm.yourKennel,
      };
      console.log('DATA перед отправкой::: ', data);

      await io.socket.put('/api/v1/dogs/update-dog', data, (data, jwRes) => {
        console.log('jwResjwResjwRes::: ', this);
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.successUpdate)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500ErrUpdate) : '';
        this.buttonUpdate = false;
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

    handlerCloseDialogSlider() {
      this.fullscreenLoading = false;
      this.goto(this.pathDogs);
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
    goDogSale() {
      this.goTo2(this.pathDogSale);
    },


    feedback(e) {
      console.log('CLICK^ ', e);
      this.dialogFormVisible = true;
    }
    ,

    open(text, title) {
      this.$alert(`<p>${text}</p>`, title, {
        dangerouslyUseHTMLString: true
      });
    },

// Закрывает модальное окно для удаления объекта
    closeDeleteThingModal: function () {
      this.selectedThing = undefined;
      this.confirmDeleteThingModalOpen = false;
    }
    ,

    handleParsingDeleteThingForm: function () {
      return {
        id: this.selectedThing.id
      };
    }
    ,

    submittedDeleteThingForm: function () {
      _.remove(this.things, {id: this.selectedThing.id});
      this.$forceUpdate();
      this.confirmDeleteThingModalOpen = false;
      this.selectedThing = undefined;
    }
    ,
    copyElement() {
      this.ruleForm.federations.push({
        key: Date.now(),
        value: ''
      });
    }
    ,


    removeElement(item) {
      var index = this.ruleForm.federations.indexOf(item);
      if (index !== -1) {
        this.ruleForm.federations.splice(index, 1);
      }
    }
    ,

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
    }
    ,


    getPullColor() {

      let field = (this.me.preferredLocale === 'ru') ? 'labelRu' : 'value';
      return _.sortBy(this.colors, field);
    }
    ,


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
      console.log('RWSPONNN::: ' , res);
      _.isArray(this.ruleForm.fileList) ? this.ruleForm.fileList.push(res) :
        this.ruleForm.fileList = [res];
    },

// функция перехвата при превышении лимита
    handleExceed(files, fileList) {
      this.$message.warning(`${this.i19p.limitExceededText} ${this.limit} ${this.i19p.files}, 
      ${this.i19p.limitExceededText2}  ${fileList.length} + ${files.length}. ${this.i19p.limitExceededText3}: 
      ${files.length + fileList.length} ${this.i19p.files}`);
    }
    ,
    showMenu(id, e) {
      this.dogId = id;
      this.show = true;
      this.showDog = id;
    }
    ,

    showOut() {
      this.show = false;
    }
    ,
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
          this.goDogSale();
          break;
        case 'd':
          this.setIndexPhotoSet(command);
          this.dialogDeletePhotoSession = true;
          this.nameSessionPhoto = command.name;
          // this.ruleForm.description =  this.litter.description;
          break;
        case 'e':
          this.dialogEditorList = true;
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
    }
    ,

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCloseDialog(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
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
    }
    ,


    deleteDog: async function () {
      let data = {
        id: this.removeDog,
      };
      console.log('Перед отправкой data DOG: ', data);
      io.socket.post('/api/v1/dogs/destroy-one-dog', data, (dataRes, jwRes) => {
        this.errorMessages(jwRes, this.i19p.successDelete);
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

    openDialogNegotiations(fullNameDog) {
      this.drawer = true;
      this.fullNameDogNegotiations = fullNameDog;
      console.log('fullNameDog::: ', fullNameDog);
      console.log('fullNameUser::: ', this.me.fullName);

    },


    handleClose2(done) {
      this.$confirm(this.i19p.areYouClose)
        .then(_ => {
          done();
        })
        .catch(_ => {
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
    async destroyManyPhotos() {
      let removeImage = _.remove(this.photos.images, img => _.indexOf(this.checkedPhoto, img.id) > -1);
      console.log('Удалённые картинки: ', removeImage);
      let data = this.photos;
      data['removeImage'] = _.pluck(removeImage, 'id');

      io.socket.delete('/api/v1/dogs/destroy-many-img', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.successUpdate)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400ErrUpdate) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500ErrUpdate) : '';
        this.buttonUpdate = false;
        this.centerDialogAdded = false;
        // this.loading.close();
        if (jwRes.statusCode === 200) {
          // this.resetForm('ruleForm');
          this.ruleForm.fileList = [];
          this.checkedPhoto = [];
          this.ruleForm.imageUrl = '';
          this.ruleForm.federations = this.resetFederation;
          this.getList();
        }
      });
    },
    async fixPhotos() {
      // let newArrPhotos = _.difference(this.photos.imagesArrUrl, this.checkedPhoto);


      let data = this.photos;
      // data['removeImage'] = removeImage;
      // data['imagesArrUrl'] = newArrPhotos;
      // data['kennel'] = data.kennel.id;
      data['fileList'] = '';
      console.log('this.photos ПЕРЕД ОТПРАВКОЙ fixPhotos:::: ', data);
      await io.socket.put('/api/v1/dogs/update-dog', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.successUpdate)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400ErrUpdate) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500ErrUpdate) : '';
        this.buttonUpdate = false;
        this.centerDialogAdded = false;
        // this.loading.close();
        if (jwRes.statusCode === 200) {
          // this.resetForm('ruleForm');
          this.ruleForm.fileList = [];
          this.checkedPhoto = [];
          this.ruleForm.imageUrl = '';
          this.ruleForm.federations = this.resetFederation;
          this.getList();
        }
      });
      // console.log(' this.ruleForm::: ', this.ruleForm);
      // console.log('newPhotos::: ' , newPhotos);
    },

    removePhotos() {
      this.checkAll=false;
      this.$confirm(this.i19p.warnRemove, this.i19p.warning, {
        confirmButtonText: 'OK',
        cancelButtonText: this.i19p.cancel,
        type: 'warning'
      }).then(() => {
        this.destroyManyPhotos();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.i19p.delCancel
        });
      });
    },


    // Добавить комментарий
    async addComment(field, parentId) {
      this.field = field;
      if (_.isEmpty(this.comment) && _.isEmpty(this.commentChild)) {
        return false;
      }
      let sel = this;
      let idDog = this.dogs.filter(dog => dog.fullName === this.fullNameDogNegotiations);
      console.log('fullNameDogNegotiations:::: ', _.last(idDog).id);
      let data = {
        instanceModuleId: _.last(idDog).id,
        comment: this.comment ? this.comment : this.commentChild,
        nameModule: this.nameModule,
        userName: this.me.fullName,
        field: field,
        // letter: this.litter.letter,
        indexPhotoSet: 0,
        parent: parentId
      };
      console.log('Перед отправкой data: ', data);
      await io.socket.post('/api/v1/comments/add-comment', data, (dataRes, response) => {
        // (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
        (response.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
          (response.statusCode === 409) ? this.mesError(response.headers['x-exit-description']) :
            (response.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';


        if (response.statusCode === 200) {
          this.comment = '';
          this.commentChild = '';
          this.openReplay = false;

          //  data.avatarUrl = this.me.defaultIcon === 'gravatar' ? this.me.gravatar : this.me.avatar;
          // _.isArray(this.litter.puppies[this.ruleForm.show].comments) ? this.litter.puppies[this.ruleForm.show].comments.push(data) : this.litter.puppies[this.ruleForm.show].comments = [data];
        } else {
          sel.$message({
            message: `${this.i19p.textOneErr} ${response.statusCode}! ${this.i19p.textTwoErr}`,
            type: 'error'
          });
        }
      });
    },


    handleEdit(index, row) {
      this.dam = _.last(_.pluck(_.filter(row.parents, 'gender', 'dam'), 'fullName'));
      this.sire = _.last(_.pluck(_.filter(row.parents, 'gender', 'sire'), 'fullName'));
      this.ruleForm = row;
      // console.log('row.dateBirth:::', moment(row.dateBirth));

      console.log('born isObject? :::', _.isObject(row.dateBirth));
      // this.ruleForm.dateBirthUpdate = _.isObject(row.dateBirth) ? row.dateBirth : JSON.parse(row.dateBirth);
      this.dateBirthUpdate = row.dateBirth;
      this.dateDeathUpdate = row.dateDeath;
      console.log('this.dateDeathUpdate :::', this.dateDeathUpdate);
      // console.log(index, row);
      // console.log('this.$refs.upload::: ', this.$refs.upload);
      // this.ruleForm.fileList = row.imagesArrUrl;

      this.ruleForm.kennel = row.kennel.id;

      this.dialogEditor = true;
      this.centerDialogAdded = true;
      this.buttonUpdate = true;
    },


    handleEditPhotos(index, row) {
      // this.dam = _.last(_.pluck(_.filter(row.parents, 'gender', 'dam'), 'fullName'));
      // this.sire = _.last(_.pluck(_.filter(row.parents, 'gender', 'sire'), 'fullName'));
      // this.ruleForm = row;
      // this.dateBirth = row.dateBirth;
      // this.dateDeath = row.dateDeath;
      this.photos = row;
      // console.log(index, row);
      // console.log('row::: ', row);
      // this.ruleForm.fileList = row.imagesArrUrl;
      //
      // this.ruleForm.kennel = row.kennel.id;
      //
      this.centerDialogVisiblePhotos = true;
      // this.centerDialogAdded = true;
      // this.buttonUpdate = true;
    },

    handleDelete(index, row) {
      this.innerVisible = true;
      console.log(index, row);
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
      this.search = '';
    },
    errorHandler() {
      return true;
    },

    clickShowPhoto(index, row) {
      this.photoVisible = true;
      console.log('row:', row);
      this.objOne = row;
    },


    handleCheckAllChange(val) {
      this.checkedPhoto = val ? _.pluck(this.photos.images, 'id') : [];
      this.isIndeterminate = false;
      // console.log('this.checkedPhoto:: ', this.checkedPhoto);
    },
    handleCheckedPhotosChange(value) {
      console.log('VAAAAAAAAA222:: ', value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === _.pluck(this.photos.images, 'id').length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < _.pluck(this.photos.images, 'id').length;
      console.log('this.checkedPhoto-22:: ', this.checkedPhoto);
    },

    async updateDescriptionPhoto() {
      console.log('photoDesc:::: ', this.photoDesc);
      console.log('PHOTOSS:::: ', this.photos);
      this.photoDesc.id = this.photos.id;
      this.photoDesc.innerVisiblePhotoDescription = false;
      await io.socket.put('/api/v1/dogs/update-description-img', this.photoDesc, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.successUpdate)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400ErrUpdate) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500ErrUpdate) : '';
        this.buttonUpdate = false;
        this.centerDialogAdded = false;
        // this.loading.close();
        if (jwRes.statusCode === 200) {
          // this.resetForm('ruleForm');
          this.ruleForm.fileList = [];
          this.checkedPhoto = [];
          this.ruleForm.imageUrl = '';
          this.ruleForm.federations = this.resetFederation;
          this.getList();
          this.$forceUpdate();
        }
      });
    },


    // Resize images
    urlB(imgName) {
      const imageRequest = JSON.stringify({
        bucket: 'paltos',
        key: imgName,
        edits: {
          grayscale: true,
          resize: {
            // width: 200,
            // height: 200
          }
        }
      });
      return `${this.cloudFrontUrl}/${btoa(imageRequest)}`;
    },


  }
})
;
