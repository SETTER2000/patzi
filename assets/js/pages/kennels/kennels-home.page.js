parasails.registerPage('kennels-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    kennels: [],
    test: '',
    kennelsEditList: [],
    citys: [],
    kennelId: '',
    continentId: '',
    countryId: '',
    regionId: '',
    breederId: '',
    coOwnerId: '',
    cowner: '',
    cityId: '',
    row: {},
    coownerId: '',
    city: '',
    address: '',
    isBreeder: false,
    centerDialogConfirmDeleteCoOwner: false,
    removeKennelId: undefined,
    // showKennel: undefined,
    yourKennel: false,
    links: [],
    see: true,
    searchObjects: '',
    rightName: '',
    subtitle: '',
    manufacturers: '',
    registerNumber: '',
    search: '',
    objOne: {},
    buttonUpdate: false,
    sr: '',
    continent: '',
    country: '',
    region: '',
    show: false,
    photoVisible: false,
    filterObjects: [],
    dialogEditorList: false,
    showObject: undefined,
    props: {multiple: true},
    website: null,
    coOwner: '',
    users: [],
    state1: '',
    selectedKennel: undefined,
    url: 'https://d1lyb0stb8az10.cloudfront.net/Continents.jpg',
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
    updateForm: {
      continent: {label: '', id: null},
      continentId: {},
      countryId: {},
      regionId: {},
      city: {},
      breeder: {},
      phones: [{
        key: 1,
        value: '',
        fullName: '',
      }],
    },
    ruleForm: {
      file: undefined,
      city: '',
      breeder: '',
      phones: [{
        key: 1,
        value: '',
        fullName: '',
      }],
      email: '',
      label: '',
      region: '',
      coOwner: '',
      website: '',
      imageUrl: '',
      previewImageSrc: '',
      continent: null,
      // coOwner: null,
      dialogImageUrl: '',
      dialogVisible: false,
      country: null,
      yourKennel: false,
      rightName: true,
      registerNumber: '',
      dateCreate: '',
      subtitle: '',
      manufacturers: ''
    },
    outerVisible: false,
    innerVisible: false,
    innerVisibleCo: false,
    centerDialogVisible: false,
    centerDialogAdded: false,
    centerDialogUpdate: false,
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
      ],
      manufacturers: [
        {message: 'Please tell us about the manufacturers of your nursery. It is very interesting', trigger: 'change'},
        {min: 10, max: 300, message: 'Length should be 10 to 100', trigger: 'blur'}
      ]
    },
    uprows: {
      label: [
        {required: true, message: 'Please input kennel name', trigger: 'blur'},
        {min: 3, max: 100, message: 'Length should be 3 to 100', trigger: 'blur'}
      ],
      registerNumber: [
        {required: true, message: 'Please input register number', trigger: 'blur'},
        {min: 3, max: 100, message: 'Length should be 3 to 100', trigger: 'blur'}
      ],
      continentId: [
        {required: true, message: 'Please select your continent', trigger: 'change'}
      ],
      countryId: [
        {required: true, message: 'Please select your country', trigger: 'blur'}
      ],
      // regionId: [
      //   {type:'string', required: true, message: 'Please select Activity zone', trigger: 'change'}
      // ],
      dateCreate: [
        {required: true, message: 'Please pick a date', trigger: 'change'}
      ],
      subtitle: [
        {message: 'Please tell about the nurseries. It is very interesting.', trigger: 'change'},
        {min: 10, max: 300, message: 'Length should be 10 to 100', trigger: 'blur'}
      ],
      manufacturers: [
        {message: 'Please tell us about the manufacturers of your nursery. It is very interesting', trigger: 'change'},
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
        all: 'All',
        warnRemove: 'This will permanently delete the object. Continue?',
        delCancel: 'Delete canceled',
        warnNoKennel: `At the moment there is no nursery in the database.
         You should create at least one kennel to start with to add a dog.`,
        warnNotRecover: 'After deletion, the object cannot be restored. Delete object',
        text400Err: 'Could not create! ',
        text400ErrDel: 'Could not delete! ',
        badRequestDog: 'Cannot be deleted! You have associated files: cattery. You should remove all dogs associated with this kennel.',
        text403ErrForbd: 'Mistake! Could not remove. You may not have permission to delete this object. ',
        text404Err: 'Not found object! ',
        text500Err: 'Server Error! Unable to create. ',
        text500ExistsErr: 'Looks like such an entry already exists. Cannot create two identical object. ',
        successUpdate: 'Object updated successfully.',
        successDelete: 'Object deleted successfully. ',
        selectGender: 'Please select a dog gender.',
        success: 'Congratulations! Object successfully created. ',
        successDel: 'Object successfully delete. ',
      }],
      ['ru', {
        all: 'Все',
        warnRemove: 'Это навсегда удалит объект. Продолжить?',
        delCancel: 'Удаление отменено',
        warnNoKennel: `В данный момент не существует ни одного питомника в базе.
        Вам следует создать для начала хотя бы один питомник, что бы добавить собаку.`,
        warnNotRecover: 'После удаления объект невозможно будет восстановить. Удалить объект',
        text400Err: 'Не смог создать!',
        text400ErrDel: 'Не удалось удалить!',
        badRequestDog: 'Не возможно удалить! У вас есть связанные файлы: собака. Вам следует удалить всех собак связанны с данным питомником.',
        text403ErrForbd: 'Не смог удалить. Возможно у вас нет прав на удаление данного объекта. ',
        text404Err: 'Не могу найти объект! ',
        text500Err: 'Ошибка сервера! Невозможно создать.',
        text500ExistsErr: 'Похоже такая запись уже существует. Невозможно создать два одинаковых объекта.',
        successUpdate: 'Объект успешно обновлён.',
        successDelete: 'Объект успешно удалён.',
        selectGender: 'Пожалуйста выберите пол собаки.',
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

    // Устанавливает перевод названия фильтра
    this.filterName = this.i19p.all;
    // Подписываемся на комнату continent  и событие list-continent
    io.socket.get(`/api/v1/continents/list`, function gotResponse(body, response) {
      // console.log('Сервер continents ответил кодом ' + response.statusCode + ' и данными: ', body);
    });

    // Подписываемся на комнату country  и событие list-country
    io.socket.get(`/api/v1/country/list`, function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });

    // Подписываемся на комнату kennel  и событие list-kennel
    io.socket.get(`/api/v1/kennels/list`, function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });

    io.socket.get(`/sockets/users/list-form`, function gotResponse(body, response) {
      // console.log('Сервер User-Form ответил кодом ' + response.statusCode + ' и данными: ', body);
    });

    // Принимаем данные по событию list
    io.socket.on('list-form', (data) => {
      this.users = data.users;
    });

    // Принимаем данные по событию list-*
    io.socket.on('list-kennel', (data) => {
      this.kennels = this.kennelsEditList = this.filterObjects = _.isNull(data.kennels) ? [] : data;
    });

    // Принимаем данные по событию list-*
    io.socket.on('list-continent', (data) => {
      this.continents = data.continents;
    });

    // Получаем данные для селектов в форме
    io.socket.on('list-country', (data) => {
      this.countrys = data.countrys;
    });

    // Получаем данные для селектов в форме
    io.socket.on('list-region', (data) => {
      this.regions = data.regions;
    });

    this.isBreederCheck();
  },

  filters: {
    getCreate: function (value, l, format) {
      if (!value) {
        return '';
      }
      // console.log('format::: ', format);
      moment.locale(l);
      let formatNew = _.isEmpty(format) ? 'LLL' : format;
      return (moment(value).format(formatNew)) ? moment(value).format(formatNew) : value;
      // return (moment.parseZone(value).format(formatNew)) ? moment.parseZone(value).format(formatNew) : value;
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
      let now = moment.parseZone();
      return end ? moment(value).preciseDiff(end) : moment(value).fromNow(true);
    },
  },

  mounted() {
    this.links = this.cityList();
    // this.users = this.userList();
  },

  computed: {
    // Управление стилем заголовка
    classObject: function () {
      return {
        // 'actionH1': this.ruleForm.see ,
        'text-danger': !this.ruleForm.see
      }
    },
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
    getNameContinent() {
      return this.ruleForm.continent ? _.last(_.pluck(_.filter(this.continents, 'id', +this.ruleForm.continent), 'label')) : false;
    },


    async getList() {
      await io.socket.get(`/api/v1/continents/list`, function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });

      await io.socket.get(`/api/v1/kennels/list`, function gotResponse(body, response) {
        // console.log('Сервер 1 ответил кодом ' + response.statusCode + ' и данными: ', body);
      });

      // Принимаем данные по событию list-*
      await io.socket.on('list-kennel', (data) => {
        // console.log('DATA обновлённые данные: ', data);
        this.kennels = this.kennelsEditList = this.filterObjects = _.isNull(data.kennels) ? [] : data;
        // Ограничевает видимость только собственным питомником владельца
        this.$forceUpdate();
        this.dialogEditors();
      });

      // Принимаем данные по событию list-*
      await  io.socket.on('list-continent', (data) => {
        this.continents = data.continents;
      });

      // Принимаем данные по событию list-*
      await  io.socket.on('list-country', (data) => {
        this.continents = data.continents;
      });

    },


    submittedUploadForm: function (result) {
      // Добавлем новые данные в уже имеющийся массив kennels
      this.kennels.push({
        label: this.ruleForm.label,
        id: result.id,
        imageSrc: result.imageSrc,
        title: this.ruleForm.title,
        owner: {
          id: this.me.id,
          fullName: this.me.fullName,
        },
      });
      this._clearUploadModal();
    },


    // Обнуляет данные формы загрузки объекта, очищает поля формы
    _clearUploadModal: function () {
      this.uploadModalOpen = false;
      this.ruleForm = {
        file: undefined,
        previewImageSrc: '',
        label: undefined,
      };
      this.formErrors = {};
      this.cloudError = '';
    },


    closeUploadModal: function () {
      this._clearUploadModal();
    },


    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && !this.buttonUpdate) {
          this.addKennel();
        } else if (valid && this.buttonUpdate) {
          this.updateKennel();
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },


    removeDomain(item) {
      let index = this.ruleForm.phones.indexOf(item);
      if (index !== -1) {
        this.ruleForm.phones.splice(index, 1);
      }
    },


    removePhone(item) {
      let index = this.updateForm.phones.indexOf(item);
      if (index !== -1) {
        this.updateForm.phones.splice(index, 1);
      }
    },

    addDomain() {
      this.ruleForm.phones.push({
        key: Date.now(),
        value: ''
      });
    },

    addPhone() {
      this.updateForm.phones.push({
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
        action: this.ruleForm.action,
        city: this.cityId ? this.cityId : '',
        coOwner: this.coOwnerId,
        breeder: this.breederId,
        rightName: this.ruleForm.rightName,
        site: this.ruleForm.site,
        registerNumber: this.ruleForm.registerNumber,
        subtitle: this.ruleForm.subtitle,
        manufacturers: this.ruleForm.manufacturers,
        yourKennel: this.ruleForm.yourKennel,
        address: this.ruleForm.address,
        phones: this.ruleForm.phones
      };
      await io.socket.post('/api/v1/kennels/create-kennel', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode >= 500 && data.code === 'E_UNIQUE') ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';
        this.centerDialogAdded = false;
        this.loading.close();
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.ruleForm.file = [];
          this.ruleForm.imageUrl = '';
          this.ruleForm.phones[0].fullName = '';
        }
      });
    },

    async continentReject() {
      this.updateForm.continent = this.updateForm.continent.id ? _.find(this.kennelsEditList, {id: this.updateForm.continent.id}) : '';
      // console.log(' XXX this.updateForm.continent::::: ', this.updateForm.continent);
    },

    async updateKennel() {
      this.openFullScreen();
      let data = this.updateForm;
      data.phones = _.isNull(data.phones) ? [{
        key: 1,
        value: '',
        fullName: '',
      }] : data.phones;
      data.continentId = this.updateForm.continent.id;
      data.countryId = this.updateForm.country.id;
      data.regionId = this.updateForm.region.id;
      data.breederId = this.breederId ? this.breederId :
        this.updateForm.breeder ? this.updateForm.breeder.id : null;
      data.coOwnerId = this.coOwnerId ? this.coOwnerId :
        this.updateForm.coOwner ? this.updateForm.coOwner.id : {};
      data.cityId = this.cityId ? this.cityId :
        this.updateForm.city ? this.updateForm.city.id : null;

      data.coOwner = this.coOwnerId;
      data.dateCreate = this.updateForm.dateCreate;

      await io.socket.put('/api/v1/kennels/update-kennel', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? this.mesSuccess(this.i19p.successUpdate) :
          (jwRes.statusCode === 400) ? this.mesError(`${this.i19p.text400Err} Ошибка обновления.`) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500ErrUpdate) : '';
        this.centerDialogUpdate = false;
        this.loading.close();
        if (jwRes.statusCode === 200) {
          this.getList();
          this.$forceUpdate();
        }
      });
    },

    // Обработчик события нажатия на кнопку|иконку Delete|ведро в карточке товара
    // Это кнопка вызывает модальное окно <modal> с <ajax-form>
    // для удаления объекта
    clickDeleteObject: function (id) {
      this.centerDialogVisibleConfirm = true;
      this.selectedKennel = _.find(this.kennels, {id: id});
      this.text = `${this.i19p.warnNotRecover} ${this.selectedKennel.label}?`;
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
    async changeSelectContinent() {
      this.updateForm.country = {};
      this.updateForm.region = {};
      this.updateForm.city = {};
      this.ruleForm.country = null;
      this.ruleForm.region = null;
      this.ruleForm.city = null;
    },
    changeSelectCountry() {
      this.updateForm.region = {};
      this.updateForm.city = {};
      this.ruleForm.region = null;
      this.ruleForm.city = null;
    },

    // Реагирует на событие change в поле города|city
    changeSelectRegion(regionId) {
      this.regionId = regionId;
      this.cityList();
      this.cityListAdd();
      this.updateForm.city = {};
      this.ruleForm.city = null;
    },


    changeSelectCity() {
      // console.log('changeSelectCity: ');
    },

    getPullCountry() {
      let t = this.continents.filter(continent => {
        return continent.id === this.ruleForm.continent || continent.id === this.updateForm.continent.id;
      });
      let field = (this.me.preferredLocale === 'ru') ? 'labelRu' : 'label';
      let o = !_.isEmpty(t) ? _.sortBy(t[0].countrys, field) : '';
      return o;
    },


    getPullRegion() {
      let t = this.countrys.filter(country => {
        return country.id === this.ruleForm.country || country.id === this.updateForm.country.id;
      });
      let field = (this.me.preferredLocale === 'ru') ? 'labelRu' : 'label';
      let o = !_.isEmpty(t) ? _.sortBy(t[0].regions, field) : '';
      // console.log('REGION NEW:::: ', o);
      return o;
    },


    getPullCity() {

      let regions = this.regions.filter(region => {
        return region.id === this.ruleForm.country;
      });
      let o = regions[0].citys;
      // console.log('CITYS NEW:::: ', o);
      return o;
    },


    querySearchFoo(queryString, cb) {
      if (_.isUndefined(this.users) || _.isUndefined(queryString)) return;
      let results = queryString ? this.users.filter(this.createFilterOwner(queryString)) : this.users;
      cb(results);
    },

    createFilterOwner(queryString) {
      return (user) => {
        return (user.fullName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

    async handleBreederSelected(e) {
      this.breederId = e.id ? e.id : undefined;
    },

    async handleCoOwnerSelected(e) {
      this.coOwnerId = e.id ? e.id : null;
    },

    /**
     * Отвязать владельца от питомника
     * @returns {Promise<void>}
     */
    async clearInputBreeder() {
      this.updateForm.breeder = '';
      io.socket.post('/api/v1/kennels/destroy-one-breeder', {'id': this.updateForm.id}, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.successDel)) :
          (jwRes.statusCode === 400 && jwRes.headers['x-exit'] === 'badRequestDog') ? this.mesError(this.i19p.badRequestDog) :
            (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400ErrDel) :
              (jwRes.statusCode === 403) ? this.mesError(this.i19p.text403ErrForbd) :
                (jwRes.statusCode === 404) ? this.mesError(this.i19p.text404Err) :
                  (jwRes.statusCode >= 500 && data.code === 'E_UNIQUE') ? this.mesError(this.i19p.text500ExistsErr) :
                    (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';
      });
    },
    /**
     * Отвязать город питомника
     * @returns {Promise<void>}
     */
    async clearInputCity() {
      this.updateForm.city = {};
      io.socket.post('/api/v1/kennels/destroy-one-city', {'id': this.updateForm.id}, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.successDel)) :
          (jwRes.statusCode === 400 && jwRes.headers['x-exit'] === 'badRequestDog') ? this.mesError(this.i19p.badRequestDog) :
            (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400ErrDel) :
              (jwRes.statusCode === 403) ? this.mesError(this.i19p.text403ErrForbd) :
                (jwRes.statusCode === 404) ? this.mesError(this.i19p.text404Err) :
                  (jwRes.statusCode >= 500 && data.code === 'E_UNIQUE') ? this.mesError(this.i19p.text500ExistsErr) :
                    (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';
      });
    },


    async clearInputCountry() {
      this.updateForm.country = '';
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
      // console.log(file, fileList);
    },


    handlePictureCardPreview(file) {
      this.ruleForm.dialogImageUrl = file.url;
      this.ruleForm.dialogVisible = true;
    },


    submitUpload() {
      this.$refs.upload.submit();
    },


    handleAvatarSuccess(res, file) {
      this.files.push(file.response);
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      this.updateForm.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.file = file.response;
      this.updateForm.file = file.response;
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
      if (!this.regionId && !this.updateForm.regionId) return this.citys = [];
      let region = this.regionId ? this.regionId : this.updateForm.regionId;
      await io.socket.get(`/api/v1/city/list/${region}`, function gotResponse(body, response) {
        // console.log('Сервер City ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию list-*
      await io.socket.on('list-city', (data) => {
        this.citys = data;
      });
    },

    async cityListAdd() {
      let region = this.regionId ? this.regionId : this.updateForm.regionId;
      await io.socket.get(`/api/v1/city/list/${region}`, function gotResponse(body, response) {
        // console.log('Сервер City ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию list-*
      await io.socket.on('list-city', (data) => {
        this.citys = data;
      });
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
      });

      // Ждём данные от загрузки нового питомника
      await io.socket.on('list-region', (data) => {
        this.regions = data;
      });
    },

    showMenu(id, e) {
      this.kennelId = id;
      this.show = true;
      this.showObject = id;
    },

    showOut() {
      this.show = false;
    },

    goTo(path) {
      window.location = `/${path}`;
    },

    goTo2(path) {
      this.goto(path);
    },

    /* Авто поиск по городам */
    async querySearch(queryString, cb) {
      this.cityListAdd();
      let links = this.citys;
      let results = queryString ? links.filter(this.createFilter(queryString)) : links;
      cb(results);
    },

    /* Авто поиск по городам */
    querySearchUpdate(queryString, cb) {
      this.cityList();
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
      this.cityId = _.isNumber(e.id) ? e.id : {};
      this.city = _.isString(e.value) ? e.value : '';
    },


    async handleSelectRegion(e) {
      this.regionId = _.isNumber(e.id) ? e.id : null;
      this.region = _.isString(e.value) ? e.value : '';
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
            (jwRes.statusCode === 400 && jwRes.headers['x-exit'] === 'badRequestDog') ? this.mesError(this.i19p.badRequestDog) :
              (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400ErrDel) :
                (jwRes.statusCode === 403) ? this.mesError(this.i19p.text403ErrForbd) :
                  (jwRes.statusCode === 404) ? this.mesError(this.i19p.text404Err) :
                    (jwRes.statusCode >= 500 && data.code === 'E_UNIQUE') ? this.mesError(this.i19p.text500ExistsErr) :
                      (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';
        });
        /**
         * TODO WEBSOCKET: End
         */
        this.rowTable = '';
        this.confirm = false;
      }
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
      this.search = '';
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
    dialogEditors() {
      this.kennelsEditList = (this.me.isAdmin || this.me.isSuperAdmin) ? this.kennels :
        this.isBreeder ? this.kennels.filter(data => _.isObject(data.breeder) ? (data.breeder.id === this.me.id) : false) : [];
      // console.log('kennelsEditList:::: ' , this.kennelsEditList);
      this.dialogEditorList = true;
    },

    /* Открывает диалоговое окно редактирования*/
    handleCommand(command) {
      switch (command.com) {
        case 'c':
          this.goDogSale();
          break;
        case 'e':
          this.dialogEditors();
          break;
        case 'dam':
          this.gender(command);
          break;
        case 'sire':
          this.gender(command);
          break;
        case 'all':
          this.gender(command);
          break;
        //default:  this.setIndexPhotoSet(command);
      }
    },

    objFilter() {
      let res;
      // console.log('objFilter kennels:::: ' , this.kennels);
      let nameKennel = !_.isEmpty(res = _.filter(this.continents, 'id', +this.ruleForm.continent)) ? _.last(_.pluck(res, 'label')) : '';
      this.sr = this.searchObjects ? this.searchObjects : nameKennel;
      let y = this.kennels.filter(data => (!this.sr || data.continent.label.toLowerCase().includes(this.sr.toLowerCase()) || data.label.toLowerCase().includes(this.sr.toLowerCase())) & data.action & !_.isEmpty(data.imageSrc));
      return y;
    },


    handleEdit(index, row) {
      row.coOwnerId = '';
      row.cowner = '';
      row.breeder = _.isNull(row.breeder) ? {} : row.breeder;
      row.city = _.isNull(row.city) ? {} : row.city;
      row.continentId = row.continent ? row.continent.id : row.continentId;
      row.countryId = row.country ? row.country.id : row.countryId;
      row.regionId = row.region ? row.region.id : row.regionId;
      this.updateForm = row;
      this.updateForm.dateCreate = moment(row.dateCreate);
      this.centerDialogAdded = false;
      this.centerDialogUpdate = true;
      this.buttonUpdate = true;
    },


    errorHandler(e) {
      return true;
    },
    clickShowPhoto(index, row) {
      this.photoVisible = true;
      this.objOne = Object.assign({}, this.objOne, row);
    },

    handleCloseDialog(done) {
      this.centerDialogUpdate = false;
      this.centerDialogAdded = false;
      this.getList();
      this.$forceUpdate();
      done();
    },

    handleCloseDialogListKennel(done) {
      this.dialogEditorList = false;
      this.buttonUpdate = false;
      done();
    },


    clickCloseDialog() {
      this.centerDialogAdded = false;
      this.dialogEditorList = false;
    },

    clickCloseDialogEditorKennel() {
      this.centerDialogUpdate = false;
      this.getList();
      this.$forceUpdate();
    },

    deleteKennel: async function () {
      let data = {
        id: this.removeKennelId,
      };
      // console.log('Перед отправкой data DOG: ', data);
      io.socket.post('/api/v1/kennels/destroy-one-kennel', data, (dataRes, jwRes) => {
        this.errorMessages(jwRes, this.i19p.successDelete);
        this.dialogDeletePhotoSession = false;
        if (jwRes.statusCode === 200) {
          this.getList();
          this.$forceUpdate();
        }
      });
    },

    openRemoveDialog(id) {
      this.removeKennelId = id;
      this.$confirm(this.i19p.warnRemove, this.i19p.warning, {
        confirmButtonText: 'OK',
        cancelButtonText: this.i19p.cancel,
        type: 'warning'
      }).then(() => {
        this.deleteKennel();

      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.i19p.delCancel
        });
      });
    },

    errorMessages(jwRes, successText) {
      (jwRes.statusCode === 200) ? (this.mesSuccess(successText)) :
        (jwRes.statusCode === 400) ? this.mesError(jwRes.headers['x-exit-description']) :
          // (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
          (jwRes.statusCode === 404) ? this.mesError(this.i19p.text404Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';
    },

    async isBreederCheck() {
      await io.socket.get(`/api/v1/groups/is-breeder`, (body, response) => {
        // console.log('Сервер (is-breeder) ответил кодом  ' + response.statusCode + ' и данными: ', body);
        this.isBreeder = (response.statusCode === 200);
      });
    },

    add() {
      this.centerDialogAdded = true;
      this.buttonUpdate = false;
    },
// Удаляем совладельца
    async deleteCoOwner() {
      let data = {
        id: this.updateForm.id,
        coownerId: this.coownerId,
      };
      await io.socket.post('/api/v1/kennels/destroy-one-coowner', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? this.mesSuccess(this.i19p.successUpdate) :
          (jwRes.statusCode === 400) ? this.mesError(`${this.i19p.text400Err} Ошибка обновления.`) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500ErrUpdate) : '';

        if (jwRes.statusCode === 200) {
          this.updateForm.owners = this.updateForm.owners.filter(owner => owner.id !== this.coownerId);
          this.cowner = '';
          this.getList();
          this.$forceUpdate();
          this.centerDialogConfirmDeleteCoOwner = false;
        }
      });
    },

    // Имя удаляемого совладельца
    nameDeleteCoOwner() {
      if (!this.coownerId) return;
      return _.last(_.filter(this.updateForm.owners, 'id', this.coownerId)) ? _.last(_.filter(this.updateForm.owners, 'id', this.coownerId)).fullName : '';
    }

  }
});



