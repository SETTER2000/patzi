parasails.registerPage('kennels-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    kennels: [],
    citys: [],
    links: [],
    mes:{
      text400Err:'Ошибка. Не смог создать!',
      text500Err:'Ошибка сервера! Невозможно создать.',
      success:'Поздравляем! Объект успешно сздан.',
    },
    cityId: undefined,
    state1: '',
    countryId: 0,
    url:"https://d3a1wbnh2r1l7y.cloudfront.net/Continents.jpg",
    fit:'cover',
    state2: '',
    options: [],
    continents: [],
    countrys: [],
    files: [],
    fileList: [],
    text: '',
    value: [],
    list: [],
    yourKennel: false,
    loading: false,
    centerDialogVisibleConfirm: false,
    uploadModalOpen: false,
    ruleForm: {
      file: undefined,
      phones: [{
        key: 1,
        value: '',
        fullName: '',
      }],
      email: '',
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
    outerVisible: false,
    innerVisible: false,
    centerDialogVisible: false,
    centerDialogAdded: false,
    rules: {
      label: [
        {required: true, message: 'Please input kennel name', trigger: 'blur'},
        {min: 3, max: 100, message: 'Length should be 3 to 100', trigger: 'blur'}
      ],
      registerNumber: [
        {required: true, message: 'Please input register number', trigger: 'blur'},
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
        { message: 'Please tell about the nurseries. It is very interesting.', trigger: 'change'},
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

    function vowels(string) {
      return _.filter(string, function (v) {
        return /[aeiou]/i.test(v);
      });
    }

    _.mixin({'vowels': vowels});


    // Использование .get('/user') извлечет список текущих пользовательских моделей,
    // подписываем этот сокет на эти модели, И подписываем этот сокет
    // для уведомлений о новых моделях пользователей при их создании.
    io.socket.get(`/api/v1/continents/list`, function gotResponse(body, response) {
      console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });

    io.socket.get(`/api/v1/country/list`, function gotResponse(body, response) {
      console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });

    io.socket.get(`/api/v1/kennels/list`, function gotResponse(body, response) {
      console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });

    // Принимаем данные по событию list-*
    io.socket.on('list-kennel', data => this.kennels = data);

    // Принимаем данные по событию list-*
    io.socket.on('list-continent', data => this.continents = data);

    // Получаем данные для селектов в форме
    io.socket.on('list-country', data => this.countrys = data);
  },


  mounted() {
    this.links = this.cityList();
  },

  computed: {
    langSearch:{
      get:function () {
      return  (this.preferredLocale === 'ru') ? 'На русском поиск' : 'English search';
      }
    }
  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    async getList() {
      await io.socket.get(`/api/v1/continents/list`, function gotResponse(body, response) {
        console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });

      await io.socket.get(`/api/v1/kennels/list`, function gotResponse(body, response) {
        console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });

      // Принимаем данные по событию list-*
      await io.socket.on('list-kennel', (data) => {
        this.kennels = data;
        console.log('this.kennels: ', this.kennels);
      });
      // Принимаем данные по событию list-*
      await  io.socket.on('list-continent', (data) => {
        this.continents = data;
        // this.count = _.get(data, 'count') ?  data.count : this.count;
      });

    },


    submittedUploadForm: function (result) {
      // Добавлем новые данные в уже имеющийся массив kennels
      this.kennels.push({
        label: this.ruleForm.label,
        id: result.id,
        imageSrc: result.imageSrc,
        title: this.ruleForm.title,
        // dateCreate: JSON.stringify(this.ruleForm.date1),
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
      this.ruleForm = {
        file: undefined,
        previewImageSrc: '',
        label: undefined,
      };
      // Clear error states
      this.formErrors = {};
      this.cloudError = '';
    },


    closeUploadModal: function () {
      this._clearUploadModal();
    },


    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addKennel();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


    removeDomain(item) {
      console.log('this.ruleForm.phones:', this.ruleForm.phones);
      console.log('item phones:', item);
      let index = this.ruleForm.phones.indexOf(item);
      if (index !== -1) {
        this.ruleForm.phones.splice(index, 1);
      }
    },


    addDomain() {
      this.ruleForm.phones.push({
        key: Date.now(),
        value: ''
      });
    },


    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.imageUrl = '';
    },

    async confirmCity() {
      this.centerDialogVisibleConfirm = true;
      this.text = 'Вы не правильно указали город. Город не будет сохранён. Продолжить?';
    },

    async addKennel() {
      let data = {
        file: this.ruleForm.file,
        label: this.ruleForm.label,
        dateCreate: JSON.stringify(this.ruleForm.dateCreate),
        continent: this.ruleForm.continent,
        country: this.ruleForm.country,
        city: this.cityId,
        rightName: this.ruleForm.rightName,
        site: this.ruleForm.site,
        registerNumber: this.ruleForm.registerNumber,
        subtitle: this.ruleForm.subtitle,
        yourKennel: this.ruleForm.yourKennel,
        address: this.ruleForm.address,
        phones: this.ruleForm.phones
      };


      await io.socket.post('/api/v1/kennels/create-kennel', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.mes.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.mes.text400Err) :
            (jwRes.statusCode >= 500) ? this.mesError(this.mes.text500Err) : '';

        console.log('Сервер ответил-2 кодом ' + jwRes.statusCode + ' и данными: ', data);
        this.centerDialogAdded = false;
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.ruleForm.file = [];
          this.ruleForm.imageUrl = '';
          this.ruleForm.phones[0].fullName = '';
          this.getList();
        }
      });
    },


    goToCard() {
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


    getPullCountry() {
      let t = this.continents.filter(continent => {
        return continent.id === this.ruleForm.continent;
      });
      let field = (this.me.preferredLocale === 'ru') ? 'labelRu' : 'label';
      return _.sortBy(t[0].countrys, field);
    },


    getPullCity() {
      let countrys = this.countrys.filter(country => {
        return country.id === this.ruleForm.country;
      });
      return countrys[0].citys;
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


    handleAvatarSuccess(res, file) {
      this.files.push(file.response);
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.file = file.response;
    },


    beforeAvatarUpload(file) {
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
      const isLt1M = file.size / 1024 / 1024 < 0.25;
      if (!isJPG) {
        this.$message.error('Logo picture must be JPG or PNG format!');
      }
      if (!isLt1M) {
        this.$message.error('Logo picture size can not exceed 250Kb!');
      }
      return isJPG && isLt1M;
    },





    async cityList() {

      await io.socket.get(`/api/v1/city/list/${this.countryId}`, function gotResponse(body, response) {
        console.log('Сервер City ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию list-*
      await io.socket.on('list-city', (data) => {
        this.citys = data;
      });
    },


    // Реагирует на событие change в поле города|city
    async changeCountry(countryId) {
      this.countryId = countryId;
      console.log('this.ruleForm.city:', this.ruleForm.city);
      await this.cityList();
    },


    async countryList() {
      await io.socket.get(`/api/v1/country/list`, function gotResponse(body, response) {
        // console.log('Сервер country ответил кодом ' + response.statusCode + ' и данными: ', body);
      });

      // Ждём данные от загрузки нового питомника
      await io.socket.on('list-country', (data) => {
        this.countrys = data;
      });
    },


    /* Авто поиск по городам */
    querySearch(queryString, cb) {
      let links = this.citys;
      let results = queryString ? links.filter(this.createFilter(queryString)) : links;
      cb(results);
    },


    createFilter(queryString) {
      return (link) => {
        return  (this.me.preferredLocale=== 'ru') ?  (link.labelRu.toLowerCase().indexOf(queryString.toLowerCase()) === 0) :
         (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },


    async handleSelect(e) {
      console.log('ВЫбор города: ', e);
      console.log('LODASH MIXIN', _.vowels('fred'));
      this.cityId = (_.isNumber(e.id)) ? e.id : undefined;
    },


    goBack() {
      console.log('go back');
    },





  }
});
