parasails.registerPage('dogs-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dogs: [],
    kennels: [],
    dams: [],
    sires: [],
    warning: '',
    value: 0,
    // Состояние загрузки
    syncing: false,
    // Ограничение размера одного файла картинки при загрузки
    sizeLess: 500,
    // Состояние ошибки сервера
    cloudError: '',

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
    url: 'https://d3a1wbnh2r1l7y.cloudfront.net/Continents.jpg',
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
        {min: 10, max: 100, message: 'Length should be 10 to 100', trigger: 'blur'}
      ]
    },
    resetFederation:[{
      key: 1,
      value: '',
      registerNumber:''
    }],
    ruleForm: {
      file: undefined,
      federations:[{
        key: 1,
        value: 'FCI',
        registerNumber:''
      }],
      sire:'',
      dam:'',
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
      subtitle: ''
    },
    fits: 'cover',
    select:'',
    labelPosition:'top',
    items: [
      {name: 'Poale Ell Adam', src: 'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2.jpg'},
      {name: 'Poale Ell Bell', src: 'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018-11.jpg'},
      {name: 'Poale Ell Bazhen', src: 'https://d3a1wbnh2r1l7y.cloudfront.net/Adam-10m.jpg'},
      {name: 'Poale Ell Barthalamew', src: 'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018.jpg'},
    ],
    litters: [],
    ratio: null,
    colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    dic: [
      ['en', {
        warnNoKennel: `At the moment there is no nursery in the database.
         You should create at least one kennel to start with to add a dog.`,
        text400Err: 'Error. Could not create! ',
        text500Err: 'Server Error! Unable to create. ',
        text500ExistsErr: 'Looks like such an entry already exists. Cannot create two identical names. ',
        success: 'Congratulations! Object successfully created. ',
        selectGender: 'Please select a dog gender.',
      }],
      ['ru', {
        warnNoKennel: `В данный момент не существует ни одного питомника в базе. 
        Вам следует создать для начала хотя бы один питомник, что бы добавить собаку.`,
        text400Err: 'Ошибка. Не смог создать!',
        text500Err: 'Ошибка сервера! Невозможно создать.',
        text500ExistsErr: 'Похоже такая запись уже существует. Невозможно создать два одинаковых имя.',
        success: 'Поздравляем! Объект успешно создан.',
        selectGender: 'Пожалуйста выберите пол собаки.',
      }]
    ],
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

    // Принимаем данные по событию list-*
    io.socket.on('list-kennel', data => {
      this.kennels = data;
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
      /*   await io.socket.get(`/api/v1/continents/list`, function gotResponse(body, response) {
           console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
         });*/

      await io.socket.get(`/api/v1/dogs/list`, function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });

      // Принимаем данные по событию list-*
      await io.socket.on('list-dog', (data) => {
        this.dogs = data;
        // console.log('this.dogs: ', this.dogs);
      });
      // Принимаем данные по событию list-*
      await  io.socket.on('list-continent', (data) => {
        this.continents = data;
        // this.count = _.get(data, 'count') ?  data.count : this.count;
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


    // handlePreview(file) {
    //   console.log('function handlePreview: ', file);
    // },


    // Срабатывает перед удалением одного файла
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },



    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.fileList = [];
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

      console.log('this.fileList: ', this.fileList);
      let data = {
        fileList: this.fileList,
        label: this.ruleForm.label,
        dateBirth: JSON.stringify(this.ruleForm.dateBirth),
        gender: this.ruleForm.gender,
        kennel: this.ruleForm.kennel,
        nickname: this.ruleForm.nickname,
        federation: this.ruleForm.federation,

        site: this.ruleForm.site,
        registerNumber: this.ruleForm.registerNumber,
        subtitle: this.ruleForm.subtitle,
        yourKennel: this.ruleForm.yourKennel,
        address: this.ruleForm.address,
        phones: this.ruleForm.phones
      };

      await io.socket.post('/api/v1/dogs/create-dog', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';

        this.centerDialogAdded = false;
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.ruleForm.file = [];
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
      // let t = this.continents.filter(continent => {
      //   return continent.id === this.ruleForm.continent;
      // });
      // let field = (this.me.preferredLocale === 'ru') ? 'labelRu' : 'label';
      // return _.sortBy(t[0].kennels, field);
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
        console.log('sires: ' , data);
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
        console.log('dams: ' , data);
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
        return  (link.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
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

    feedback(e) {
      console.log('CLICK^ ', e);
      this.dialogFormVisible = true;
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
  }
});
