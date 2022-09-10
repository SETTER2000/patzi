parasails.registerPage('users-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    users: [],
    value: '',
    value1: '',
    value2: '',
    minCount:100,
    stepCount:50,
    files: [],
    cityId: undefined,
    continent: '',
    country: '',
    region: '',
    continents: [],
    countrys: [],
    regions: [],
    value3: '',
    plain: false,
    dialogVisiblePass: false,
    dialogVisibleEmail: false,
    dialogVisibleGroup: false,
    dialog: {},
    limit: 150,
    groups: [],
    dialogImageUrl: '',
    dialogVisible: false,
    buttonUpdate: false,
    centerDialogAdded: false,
    value5: [],
     sizeLess: 2000, // MB
    fileList: [],
    count: 5,
    query: 5,
    search: '',
    arrSearch: [],
    collapse: false,
    text: '',
    confirm: false,
    rowTable: '',
    sizeForm: {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
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
    loadingSearch: false,
    loading: {},
    options: [],
    counts: 0,
    fits: 'cover',
    formErrors: {},
    objOne: '',
    dialogFormVisible: false,
    dialogTableVisible: false,
    centerDialogVisible: false,
    centerDialogVisibleConfirm: false,
    pickerOptions: {
      shortcuts: [{
        text: 'Today',
        onClick(picker) {
          picker.$emit('pick', new Date());
        }
      },
        {
          text: 'Yesterday',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        },
        {
          text: 'A week ago',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
    },
    ruleForm: {
      fullName: '',
      groups: [],
      region: '',
      country: null,
      see: true,
      activeType: [],
      emailStatus: 'confirmed',
      sendCodEmail: 'unconfirmed'
    },
    rules: {
      label: [
        {required: true, message: 'Please input you name', trigger: 'blur'},
        {min: 3, max: 100, message: 'Length should be 3 to 100', trigger: 'blur'},
      ],
      continent: [
        {required: true, message: 'Please select your continent', trigger: 'change'}
      ],
      country: [
        {required: true, message: 'Please select your country', trigger: 'change'}
      ],
      region: [
        {required: true, message: 'Please select Activity zone', trigger: 'change'}
      ],
      gender: [
        {required: true, message: 'Please select a dog gender.', trigger: 'change'}
      ],
      description: [
        {message: 'Please tell about the nurseries. It is very interesting.', trigger: 'change'},
        {max: 1700, message: 'Length should be 10 to 1700', trigger: 'blur'}
      ]
    },
    multipleSelection: [],
    selectOptions: [
      {
        value: 'Option1',
        label: 'Option1'
      }, {
        value: 'Option2',
        label: 'Option2'
      }, {
        value: 'Option3',
        label: 'Option3'
      }, {
        value: 'Option4',
        label: 'Option4'
      }, {
        value: 'Option5',
        label: 'Option5'
      }
    ],
    dic: [
      ['en', {
        warnNoKennel: `At the moment there is no nursery in the database.
         You should create at least one kennel to start with to add a dog.`,
        warnRemove: 'This will permanently delete the object. Continue?',
        warning: 'Warning',
        delCancel: 'Delete canceled',
        errorPasswordConfirm: 'Passwords do not match.',
        all: 'All',
        sire: 'Sire',
        dam: 'Dam',
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
        errorPasswordConfirm: 'Пароли не совпадают.',
        all: 'Все',
        sire: 'Sire',
        dam: 'Dam',
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
    ]
  },


  watch: {
    // эта функция запускается при любом изменении count
    count: async  function (newUsers) {
      this.count = newUsers;
     await io.socket.get(`/sockets/user/list/${this.count}`, function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
    }
  },
  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    moment().locale(this.me.preferredLocale);
    io.socket.get(`/sockets/user/list/${this.count}`, function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // запрос групп имеющихся в системе
    io.socket.get(`/sockets/groups/group-form`, function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    io.socket.get('/sockets/user/count-all', function gotResp(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });


    // Подписываемся на комнату continent
    io.socket.get(`/api/v1/continents/list`, function gotResponse(body, response) {
      // console.log('Сервер continents ответил кодом ' + response.statusCode + ' и данными: ', body);
    });

    // Подписываемся на комнату country
    io.socket.get(`/api/v1/country/list`, function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });


    io.socket.on('list', (data) => {
      this.users = _.get(data, 'users') ?
         _.each(data.users, user=>{ user.groups = _.pluck(user.groups, 'id');}) : this.users;
    });

    // Принимаем данные по событию list-*
    io.socket.on('list-continent', (data) => {
      this.continents = data.continents;
    });

    // Получаем данные для селектов в форме
    io.socket.on('list-country', (data) => {
      this.countrys = data.countrys;
    });


    io.socket.on('count-all', (data) => {
      this.counts = data;
    });

    io.socket.on('group-form', (data) => {
      this.groups = data;
      this.groupAction();
    });
    // Получаем данные для селектов в форме
    io.socket.on('list-region', (data) => {
      this.regions = data.regions;
    });
  },


  // зарегистрировать директиву локально
  directives: {
    focus: {
      // определение директивы
      inserted: function (el) {
        el.focus();
      }
    }
  },


  filters: {
    getCreate: function (value, format) {
      if (!value) {
        return '';
      }
      let formatNew = (!format) ? 'LLL' : format;
      return (moment(value).format(formatNew)) ? moment(value).format(formatNew) : value;
    },
    abc(value, ruleForm) {
      if (!value) {
        return '';
      }
      this.ruleForm = ruleForm;
      const regex = /[ a-z]+/i;
      let r = regex.exec(value);
      _.isArray(r) ? this.ruleForm.label = r[0] : '';
      this.ruleForm.errInputDogName = (!_.isArray(r));
      r = [];
    },
  },

  mounted: function () {
    this.$emit('valChanged', this.value);
    this.links = this.cityList();
  },


  computed: {
    i19p: {
      get: function () {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        return new Map(this.dic).get(this.me.preferredLocale);
      }
    },
    getUsers: {
      get: function () {
        if (_.isArray(this.users)) {
          return this.users.filter((user) => {
            return (user.fullName);
          });
        }
        return [];
      },
      set: function (newValue) {
        if (_.isArray(newValue)) {
          return newValue.filter((user) => {
            return (user.fullName);
          });
        }

        return [];
      },
    },
    tableDateFilter: {
      cache: false,
      get: function () {
        // console.log('dateFilter: ', this.dateFilter);
        return this.dateFilter;
      }
    }

  },


  // created() {
  //
  // },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    async handleCellClick(row) {
      try {
        // 1) Copy text
        await navigator.clipboard.writeText(row.emailAddress);
        this.$message({
          message: 'Email скопирован.',
          type: 'success'
        });
        // 2) Catch errors
      } catch (err) {
        console.error('Failed to copy: ', err);
        this.$message.error('Oops, this is a error message.');
      }

    },
    async getList() {
      // await io.socket.get(`/sockets/user/list/${this.count}`, function gotResponse(body, response) {
      //   // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      // });
      await io.socket.get('/sockets/user/count-all', function gotResp(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // await io.socket.on('list', (data) => {
      //   this.users = _.get(data, 'users') ? data.users : this.users;
      //
      //   console.log('USERS1: ', this.users);
      //   // this.count = _.get(data, 'count') ?  data.count : this.count;
      // });
      // Кол-во всего пользователей в системе
      await io.socket.on('count-all', (data) => {
        this.counts = data;
      });
    },

    async remoteMethod(query) {
      if (query !== '') {
        this.arrSearch = query;
        this.loadingSearch = true;
        await io.socket.get(`/sockets/user/list/${this.count}/${this.arrSearch}`, function gotResp(body, response) {
          // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
        });
        setTimeout(() => {
          this.loadingSearch = false;
          this.options = this.users.filter(item => {
            // console.log(item);
            return item.fullName.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },

    async changeSelectSearch(e) {
      this.arrSearch = e;
      await io.socket.put('/api/v1/users/update-search', {
        'count': this.count,
        'query': this.arrSearch
      }, (data, response) => {
        console.log('Сервер ответил-2 кодом ' + response.statusCode + ' и данными: ', data);
      });
    },

    confirmDeletion() {
      this.centerDialogVisibleConfirm = false;
      this.confirm = true;
      if (this.confirm) {
        /**
         * TODO WEBSOCKET: Удаление объекта
         */
        io.socket.delete('/sockets/user/destroy-one-user', {'id': this.rowTable.id}, (data, jwRes) => {
          if (jwRes.statusCode === 404) {
            this.text = 'Этого пользователя нельзя удалить. Это системная запись, возможно isSuperAdmin.';
            this.centerDialogVisible = true;
          } else {
            this.plain = true;
            this.mesSuccess('Учётная запись успешно удалена.');
            this.getList();
          }
          console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
        });
        /**
         * TODO WEBSOCKET: End
         */
        this.rowTable = '';
        this.confirm = false;
      }
    },

    handleDelete(index, row) {
      this.text = `Вы действительно хотите удалить этого пользователя?
        Учётную запись невозможно будет восстановить.`;
      this.centerDialogVisibleConfirm = true;
      this.rowTable = row;
    },

    handleSelect(index, row) {
      let data = {'id': row.id, 'groupId': row.groups};
      // console.log('DATA update-user-group перед отправкой::: ', data);
      io.socket.put('/sockets/user/update-user-group', data, (data, jwRes) => {
        // console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
      });
    },

    async handleSelectCity(e) {
      this.cityId = (_.isNumber(e.id)) ? e.id : undefined;
    },

    handleDeleteGroup(e, index, row) {
      io.socket.delete('/users/destroy-user-group', {'id': row.id, 'groupId': [e]}, (data, jwRes) => {
        // console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
        this.mesSuccess('Группа успешно удалена.');
      });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    filterHandler(value, row, column) {
      // this.arrSearch.push(value);
      io.socket.put('/api/v1/users/update-filter-date', {'count': 100, 'query': value}, (data, response) => {
        // console.log('Сервер ответил-2 кодом ' + response.statusCode + ' и данными: ', data);
      });


      const property = column['property'];
      return row[property] === value;
    },


    /*  handleEdit(index, row) {
        console.log(index, row);
      },
  */
    handleClick() {
      // console.log('click');
    },

    clickShowPhoto(index, row) {
      this.dialogTableVisible = true;
      this.objOne = row;
    },


    mesSuccess(text) {
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

    handleMessage(index, row) {
      this.dialogFormVisible = true;
    },
    onSubmit() {
    },


    clickAddButton() {
      this.warning = this.i19p.warnNoKennel;
      this.centerDialogAdded = true;
      // this.centerDialogVisibleWarnings = true;
    },


    showDialog(string) {
      this.innerVisible = true;
      this.dialog = new Map(this.map).get(string);
      this.dialog.header = this.i19p[string];
    },


    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
      // this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
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

    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && !this.buttonUpdate) {
          this.add();
        } else if (valid && this.buttonUpdate) {
          this.update();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


    // Create User
    async add() {
      this.openFullScreen();
      let data = {
        fullName: this.ruleForm.label,
        fileList: this.ruleForm.fileList,
        dateBirth: this.ruleForm.dateBirth,
        dateDeath: this.ruleForm.dateDeath,
        emailAddress: this.ruleForm.emailAddress,
        emailStatus: this.ruleForm.emailStatus,
        see: this.ruleForm.see,
        region: this.ruleForm.region,
        city: this.cityId,
        continent: this.ruleForm.continent,
        country: this.ruleForm.country,
        sendCodEmail: this.ruleForm.sendCodEmail,
        password: this.ruleForm.password,
        checkPass: this.ruleForm.checkPass,
        groups: this.ruleForm.groups,
        description: this.ruleForm.description
      };

      console.log('DATA create перед отправкой::: ', data);
      await io.socket.post('/api/v1/users/create-user', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
          (jwRes.statusCode === 400) ? this.mesError(`${this.i19p.text400Err} ${jwRes.headers['x-exit-description']}`) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              (jwRes.statusCode === 401) ? this.mesError(jwRes.headers['x-exit-description']) :
                // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
                (jwRes.statusCode >= 500) ? this.mesError(`${this.i19p.text500Err} ${jwRes.headers['x-exit-description']}`) : '';
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

    async update() {
      this.openFullScreen();
      let data = {
        id: this.ruleForm.id,
        fileList: this.ruleForm.fileList,
        label: this.ruleForm.label,
        dateBirth: JSON.stringify(this.dateBirthUpdate),
        dateDeath: JSON.stringify(this.dateDeathUpdate),
        gender: this.ruleForm.gender,
        continent: this.ruleForm.continent,
        country: this.ruleForm.country,
        kennel: this.ruleForm.kennel,
        dam: this.dam,
        region: this.region,
        city: this.city,
        sire: this.sire,
        see: this.ruleForm.see,
        description: this.ruleForm.description,
      };

      // console.log('DATA update перед отправкой::: ', data);
      await io.socket.put('/api/v1/dogs/update-dog', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? this.mesSuccess(this.i19p.successUpdate) :
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


    handleEdit(index, row) {
      this.dam = _.last(_.pluck(_.filter(row.parents, 'gender', 'dam'), 'fullName'));
      this.sire = _.last(_.pluck(_.filter(row.parents, 'gender', 'sire'), 'fullName'));
      this.ruleForm = row;
      this.dateBirthUpdate = row.dateBirth;
      this.dateDeathUpdate = row.dateDeath;
      this.ruleForm.kennel = row.kennel.id;
      this.dialogEditor = true;
      this.centerDialogAdded = true;
      this.buttonUpdate = true;
    },

    resetForm(formName) {
      this.$refs.upload ? this.$refs.upload.clearFiles() : '';
      this.$refs[formName].resetFields();
      this.ruleForm.fileList = [];
      this.ruleForm.imageUrl = '';
      this.ruleForm.price = 0;
      this.ruleForm.federations = this.resetFederation;
      this.fuleForm = {
        label: '',
        registerNumber: '',
        dateCreate: undefined,
        site: '',
        phones: undefined,
        continent: undefined,
        region: undefined,
        country: undefined,
        city: undefined,
      };
    },

    groupAction() {
      this.ruleForm.groups = this.ruleForm.emailStatus === 'confirmed' ? [_.pluck(this.groups, 'id')[0]] : [];
    },
    handleClose(done) {
      done();
      /*  this.$confirm('Вы уверены, что хотите закрыть диалог?')
          .then(_ => {
            done();
          })
          .catch(_ => {});*/
    },


    changeSelectRegion() {
      // console.log('changeSelectRegion: ');
      // this.ruleForm.city = null;
    },

    changeSelectCountry() {
      // console.log('changeSelectCountry: ');
      // this.ruleForm.city = null;
    },

    getPullCountry() {
      let t = this.continents.filter(continent => {
        return continent.id === this.ruleForm.continent;
      });
      let field = (this.me.preferredLocale === 'ru') ? 'labelRu' : 'label';
      return _.sortBy(t[0].countrys, field);
    },


    changeSelectContinent() {
      this.ruleForm.country = null;
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


    // Реагирует на событие change в поле города|city
    async changeRegion(regionId) {
      this.regionId = regionId;
      await this.cityList();
    },


    async cityList() {
      await io.socket.get(`/api/v1/city/list/${this.regionId}`, function gotResponse(body, response) {
        // console.log('Сервер City ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию list-*
      await io.socket.on('list-city', (data) => {
        this.citys = data;
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

    getPullRegion() {
      let t = this.countrys.filter(country => {
        return country.id === this.ruleForm.country || country.id === this.country;
      });
      let field = (this.me.preferredLocale === 'ru') ? 'labelRu' : 'label';
      return !_.isEmpty(t) ? _.sortBy(t[0].regions, field) : '';

    },

    checkIp(ip) {
      this.goto( `https://awebanalysis.com/ru/ip-lookup/${ip}/`);
    },

    getPullCity() {
      let regions = this.regions.filter(region => {
        return region.id === this.ruleForm.country;
      });
      return regions[0].citys;
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


  },
});


