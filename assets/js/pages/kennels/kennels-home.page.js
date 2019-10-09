parasails.registerPage('kennels-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    kennels: [],
    citys: [],
    links: [],
    props: {multiple: true},
    website:null,
    optionsTest: [
      {
        value: 1,
        label: 'Asia',
        children: [{
          value: 2,
          label: 'China',
          children: [
            {value: 3, label: 'Beijing'},
            {value: 4, label: 'Shanghai'},
            {value: 5, label: 'Hangzhou'}
          ]
        }, {
          value: 6,
          label: 'Japan',
          children: [
            {value: 7, label: 'Tokyo'},
            {value: 8, label: 'Osaka'},
            {value: 9, label: 'Kyoto'}
          ]
        }, {
          value: 10,
          label: 'Korea',
          children: [
            {value: 11, label: 'Seoul'},
            {value: 12, label: 'Busan'},
            {value: 13, label: 'Taegu'}
          ]
        }]
      },
      {
        value: 14,
        label: 'Europe',
        children: [{
          value: 15,
          label: 'France',
          children: [
            {value: 16, label: 'Paris'},
            {value: 17, label: 'Marseille'},
            {value: 18, label: 'Lyon'}
          ]
        }, {
          value: 19,
          label: 'UK',
          children: [
            {value: 20, label: 'London'},
            {value: 21, label: 'Birmingham'},
            {value: 22, label: 'Manchester'}
          ]
        }]
      },
      {
        value: 23,
        label: 'North America',
        children: [{
          value: 24,
          label: 'US',
          children: [
            {value: 25, label: 'New York'},
            {value: 26, label: 'Los Angeles'},
            {value: 27, label: 'Washington'}
          ]
        }, {
          value: 28,
          label: 'Canada',
          children: [
            {value: 29, label: 'Toronto'},
            {value: 30, label: 'Montreal'},
            {value: 31, label: 'Ottawa'}
          ]
        }]
      }
    ],
    cityId: undefined,
    state1: '',
    selectedKennel: undefined,
    // countryId: 0,
    regionId: 0,
    url: 'https://d3a1wbnh2r1l7y.cloudfront.net/Continents.jpg',
    fit: 'cover',
    state2: '',
    options: [],
    continents: [],
    countrys: [],
    regions: [],
    files: [],
    fileList: [],
    text: '',
    value: [],
    list: [],
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
      yourKennel: false,
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
        {message: 'Please tell about the nurseries. It is very interesting.', trigger: 'change'},
        {min: 10, max: 300, message: 'Length should be 10 to 100', trigger: 'blur'}
      ]
    },
    // Состояние загрузки
    syncing: false,
    // Validation errors:
    formErrors: {},
    // Состояние ошибки сервера
    cloudError: '',
    // Переводы
    dic: [
      ['en', {
        warnNoKennel: `At the moment there is no nursery in the database.
         You should create at least one kennel to start with to add a dog.`,
        warnNotRecover:'After deletion, the object cannot be restored. Delete object?',
        text400Err: 'Could not create! ',
        text400ErrDel: 'Could not delete! ',
        badRequestDog: 'Cannot be deleted! You have associated files: cattery. You should remove all dogs associated with this kennel.',
        text403ErrForbd: 'Mistake! Could not remove. You may not have permission to delete this object. ',
        text404Err: 'Not found object! ',
        text500Err: 'Server Error! Unable to create. ',
        text500ExistsErr: 'Looks like such an entry already exists. Cannot create two identical names. ',
        success: 'Congratulations! Object successfully created. ',
        successDel: 'Object successfully delete. ',
      }],
      ['ru', {
        warnNoKennel: `В данный момент не существует ни одного питомника в базе. 
        Вам следует создать для начала хотя бы один питомник, что бы добавить собаку.`,
        warnNotRecover:'После удаления объект невозможно будет восстановить. Удалить объект?',
        text400Err: 'Не смог создать!',
        text400ErrDel: 'Не удалось удалить!',
        badRequestDog: 'Не возможно удалить! У вас есть связанные файлы: собака. Вам следует удалить всех собак связанны с данным питомником.',
        text403ErrForbd: 'Не смог удалить. Возможно у вас нет прав на удаление данного объекта. ',
        text404Err: 'Не могу найти объект! ',
        text500Err: 'Ошибка сервера! Невозможно создать.',
        text500ExistsErr: 'Похоже такая запись уже существует. Невозможно создать два одинаковых имя.',
        success: 'Поздравляем! Объект успешно создан.',
        successDel: 'Объект успешно удален. ',
      }]
    ],
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);


    // Подписываемся на комнату continent  и событие list-continent
    io.socket.get(`/api/v1/continents/list`, function gotResponse(body, response) {
      console.log('Сервер continents ответил кодом ' + response.statusCode + ' и данными: ', body);
    });

    // Подписываемся на комнату country  и событие list-country
    io.socket.get(`/api/v1/country/list`, function gotResponse(body, response) {
      console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });

    // Подписываемся на комнату kennel  и событие list-kennel
    io.socket.get(`/api/v1/kennels/list`, function gotResponse(body, response) {
      console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });



    // Принимаем данные по событию list-*
    io.socket.on('list-kennel', (data) => {
      console.log('data KENNELS:', data);
      this.kennels = data;});

    // Принимаем данные по событию list-*
    io.socket.on('list-continent', (data) => {this.continents = data.continents;});

    // Получаем данные для селектов в форме
    io.socket.on('list-country', (data ) => {this.countrys = data.countrys;});

    // Получаем данные для селектов в форме
    io.socket.on('list-region', (data ) => {this.regions = data.regions;});
  },


  mounted() {
    this.links = this.cityList();
  },

  computed: {

    langSearch: {
      get: function () {
        return (this.me.preferredLocale === 'ru') ? 'На русском поиск' : 'English search';
      }
    },
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
      await io.socket.get(`/api/v1/continents/list`, function gotResponse(body, response) {
        console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });

      await io.socket.get(`/api/v1/kennels/list`, function gotResponse(body, response) {
        console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });

      // Принимаем данные по событию list-*
      await io.socket.on('list-kennel', (data) => {
        this.kennels = data.kennels;
      });
      // Принимаем данные по событию list-*
      await  io.socket.on('list-continent', (data) => {
        this.continents = data.continents;
        // this.count = _.get(data, 'count') ?  data.count : this.count;
      });
      // Принимаем данные по событию list-*
      await  io.socket.on('list-country', (data) => {
        this.continents = data.continents;
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
      console.log(formName);
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

    addKennel: async function () {
      this.openFullScreen();
      let data = {
        file: this.ruleForm.file,
        label: this.ruleForm.label,
        dateCreate: JSON.stringify(this.ruleForm.dateCreate),
        continent: this.ruleForm.continent,
        country: this.ruleForm.country,
        region: this.ruleForm.region,
        city: this.cityId,
        rightName: this.ruleForm.rightName,
        site: this.ruleForm.website,
        registerNumber: this.ruleForm.registerNumber,
        subtitle: this.ruleForm.subtitle,
        yourKennel: this.ruleForm.yourKennel,
        address: this.ruleForm.address,
        phones: this.ruleForm.phones
      };

console.log('KENNEL after added::: ' ,data);
      await io.socket.post('/api/v1/kennels/create-kennel', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode >= 500 && data.code === 'E_UNIQUE') ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';

        console.log('Сервер create-kennel ответил кодом ' + jwRes.statusCode + ' и данными: ', data);

        this.centerDialogAdded = false;
        this.loading.close();

        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.ruleForm.file = [];
          this.ruleForm.imageUrl = '';
          this.ruleForm.phones[0].fullName = '';
          // this.getList();

          // // Подписываемся на комнату kennel  и событие list-kennel
          // io.socket.get(`/api/v1/kennels/list`, function gotResponse(body, response) {
          //   console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
          // });
          //
          // // Принимаем данные по событию list-*
          // io.socket.on('list-kennel', (data) => {this.kennels = data;});
        }
      });
    },

    // Обработчик события нажатия на кнопку|иконку Delete|ведро в карточке товара
    // Это кнопка вызывает модальное окно <modal> с <ajax-form>
    // для удаления объекта
    clickDeleteObject: function (id) {
      this.text = this.i19p.warnNotRecover;
      this.centerDialogVisibleConfirm = true;
      this.selectedKennel = _.find(this.kennels, {id: id});
    },

    // Закрывает модальное окно для удаления объекта
    closeDeleteKennelModal: function () {
      this.selectedKennel = undefined;
      this.centerDialogVisibleConfirm = false;
    },

    handleParsingDeleteKennelForm: function () {
      return {
        id: this.selectedKennel.id
      };
    },

    submittedDeleteKennelForm: function () {
      _.remove(this.things, {id: this.selectedKennel.id});
      this.$forceUpdate();
      this.centerDialogVisibleConfirm = false;
      this.selectedKennel = undefined;
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

    changeSelectCountry() {
      console.log('changeSelectCountry: ');
      // this.ruleForm.city = null;
    },

    changeSelectRegion() {
      console.log('changeSelectRegion: ');
      // this.ruleForm.city = null;
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


    getPullRegion() {
      let t = this.countrys.filter(country => {
        return country.id === this.ruleForm.country;
      });
      let field = (this.me.preferredLocale === 'ru') ? 'labelRu' : 'label';
      return _.sortBy(t[0].regions, field);
    },


    getPullCity() {
      let regions = this.regions.filter(region => {
        return region.id === this.ruleForm.country;
      });
      return regions[0].citys;
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
      const isIMG = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/svg+xml');
      const isLt1M = file.size / 1024 / 1024 < 0.25;
      if (!isIMG) {
        this.$message.error('Logo picture must be JPG, PNG or SVG format!');
      }
      if (!isLt1M) {
        this.$message.error('Logo picture size can not exceed 250Kb!');
      }
      return isIMG && isLt1M;
    },


    async cityList() {

      await io.socket.get(`/api/v1/city/list/${this.regionId}`, function gotResponse(body, response) {
        console.log('Сервер City ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию list-*
      await io.socket.on('list-city', (data) => {
        this.citys = data;
      });
    },


    // Реагирует на событие change в поле города|city
    // async changeCountry(countryId) {
    //   this.countryId = countryId;
    //   console.log('this.ruleForm.city:', this.ruleForm.city);
    //   await this.cityList();
    // },

    // Реагирует на событие change в поле города|city
    async changeRegion(regionId) {
      this.regionId = regionId;
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



    async regionList() {
      await io.socket.get(`/api/v1/region/list`, function gotResponse(body, response) {
        // console.log('Сервер country ответил кодом ' + response.statusCode + ' и данными: ', body);
      });

      // Ждём данные от загрузки нового питомника
      await io.socket.on('list-region', (data) => {
        this.regions = data;
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
        return (this.me.preferredLocale === 'ru') ? (link.labelRu.toLowerCase().indexOf(queryString.toLowerCase()) === 0) :
          (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },


    async handleSelect(e) {
      this.cityId = (_.isNumber(e.id)) ? e.id : undefined;
    },


    goBack() {
      console.log('go back');
    },

    confirmDeletion() {

      this.centerDialogVisibleConfirm = false;
      this.confirm = true;
      let self = this;
      if (this.confirm) {


        /**
         * TODO WEBSOCKET: Удаление объекта
         */
        io.socket.delete('/api/v1/kennels/destroy-one-kennel', {'id': this.selectedKennel.id}, (data, jwRes) => {

            (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.successDel)) :
              (jwRes.statusCode === 400 && jwRes.headers['x-exit'] === 'badRequestDog') ? this.mesError(this.i19p.badRequestDog):
              (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400ErrDel) :
              (jwRes.statusCode === 403) ? this.mesError(this.i19p.text403ErrForbd) :
              (jwRes.statusCode === 404) ? this.mesError(this.i19p.text404Err) :
                (jwRes.statusCode >= 500 && data.code === 'E_UNIQUE') ? this.mesError(this.i19p.text500ExistsErr) :
                  (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';

console.log('jwRes.headers: ',jwRes.headers['x-exit']);
console.log('jwRes.headers: ', jwRes.headers);
/*
* jwRes.headers:  {X-Exit: "badRequestDog", X-Exit-Description: "Cannot be deleted! You have associated files: dog.", cache-control: "no-cache, no-store", x-exit: "badRequestDog", x-exit-description: "Cannot be deleted! You have associated files: dog."}:  {X-Exit: "badRequestDog", X-Exit-Description: "Cannot be deleted! You have associated files: dog.", cache-control: "no-cache, no-store", x-exit: "badRequestDog", x-exit-description: "Cannot be deleted! You have associated files: dog."}
* */

          console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
        });
        /**
         * TODO WEBSOCKET: End
         */
        this.rowTable = '';
        this.confirm = false;
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

  }
});
