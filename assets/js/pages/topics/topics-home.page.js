parasails.registerPage('topics-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    topics: [],
    counts: 0,
    hidden: 0,
    imageUrl: '',
    searchObjects: '',
    search: '',
    checkAll: false,
    show: false,
    topicId: undefined,
    dialog: {},
    showTopic: undefined,
    checkedPhoto: [],
    photoVisible: false,
    centerDialogVisiblePhotos: false,
    photos: {},
    isIndeterminate: true,
    limit: 4,
     sizeLess: 20, // MB
    photoDesc: {
      innerVisiblePhotoDescription: false,
      photoId: '',
      description: '',
      dateTaken: '',
    },
    photoDescUpdate: false,
    objOne: {},
    centerDialogAdded: false,
    dialogEditorList: false,
    editorList: [],

    dialogVisiblePass: false,
    buttonUpdate: false,
    centerDialogVisible: false,
    centerDialogVisibleConfirm: false,
    dialogVisible: false,
    dialogImageUrl: '',
    editList: [],
    lang: '',
    ruleForm: {
      see: true,
      errInputLang: false,
      label: '',
      labelRu: '',
      subtitle: '',
      backgroundPosition: '',
      subtitleRu: '',
    },
    rules: {
      label: [
        {required: true, message: 'Пожалуйста введите название на английском', trigger: 'blur'},
        {min: 3, max: 200, message: 'Длинна от 3 до 200 знаков', trigger: 'blur'},
      ],
      labelRu: [
        {required: true, message: 'Пожалуйста введите название на русском', trigger: 'blur'},
        {min: 3, max: 200, message: 'Длинна от 3 до 200 знаков', trigger: 'blur'},
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
        {required: true, message: 'Please select a topic gender.', trigger: 'change'}
      ],
      description: [
        {message: 'Please tell about the nurseries. It is very interesting.', trigger: 'change'},
        {max: 1700, message: 'Length should be 10 to 1700', trigger: 'blur'}
      ]
    },
    dic: [
      ['en', {
        files: `files`,
        limitExceededText: `The limit is: `,
        limitExceededText2: `you selected `,
        limitExceededText3: `Total: `,
        warnNoKennel: `At the moment there is no nursery in the database.
         You should create at least one kennel to start with to add a topic.`,
        warnRemove: 'This will permanently delete the object. Continue?',
        warning: 'Warning',
        delCancel: 'Delete canceled',
        delCancelOverload: 'Delete canceled. Reload the page.',
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
        selectGender: 'Please select a topic gender.',
        growth: 'How to measure a topic\'s height?',
        hairless: 'What is a down or naked topic?',
        infoColor: 'Chinese Crested may have any combination of colors, as prescribed in the FCI 288 standard. <br/>This paragraph does not apply to the classification of topics by color, but rather an attempt to provide more information on the appearance of the topic. People in their lives always have priorities, this also applies to color, the preference of one or another color often becomes decisive when buying or breeding topics.',
        whyColor: 'Why determine the color.',
        priceTitle: 'Selling price.',
        priceText: 'You can set the price at any time, but until the price is set, the topic will not appear on the sales page. Remember to set the selling currency.',
        recommendationsSale: 'Recommendations for the sale of topics. Describe the main advantages and benefits of the topic. This information will be posted on the topic’s card on the sales page.',
        areYouClose: 'Are you sure you want to close chat?',
        startOfNegotiations: 'My name is Olga, I am a breeder and owner of the nursery Poale Ell. I see your choice fell on a puppy by name ',
        startOfNegotiations2: '. Ready to answer your questions.',
      }],
      ['ru', {
        files: `файлов`,
        limitExceededText: `Лимит`,
        limitExceededText2: `вы выбрали`,
        limitExceededText3: `Всего`,
        warnNoKennel: `В данный момент не существует ни одного питомника в базе.
        Вам следует создать для начала хотя бы один питомник, что бы добавить собаку.`,
        warnRemove: 'Это навсегда удалит объект. Продолжить?',
        photoEditor: 'Редактор фотографий',
        warning: 'Внимание',
        delCancel: 'Удаление отменено',
        delCancelOverload: 'Удаление отменено. Перегрузите страницу.',
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
    ],
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    io.socket.get('/api/v1/topics/topic-count', function gotResp(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // Запрос для события list-*
    io.socket.get(`/api/v1/topics/list`, function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // получаем кол-во скрытых элементов
    io.socket.get('/api/v1/topics/topic-hidden', function gotResp(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // Кол-во всех тем
    io.socket.on('topic-count', (data) => {
      this.counts = data;
    });
    // Кол-во всех тем
    io.socket.on('topic-hidden', (data) => {
      this.hidden = data;
    });
    // Обновление темы
    io.socket.on('update-topic', (data) => {
      console.log('UPDATEEE');
      // this.getList();
      this.$forceUpdate();
    });
    // Все темы
    io.socket.on('list-topic', (data) => {
      console.log('TOPICS all:: ', data);
      this.topics = this.editorList = data ? data : this.editorList;
    });
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


    abc(value, obj, field, lang) {
      if (!value) {
        return '';
      }
      let r = '';
      const regex = /[ a-z]+/i;
      const regexRu = /[ а-яё]+/i;

      obj['lang'] = lang ? lang : 'en';
      r = lang === 'ru' ? regexRu.exec(value) : regex.exec(value);
      if (!_.isArray(r)) {
        obj.errInputLang = true;
        obj[field] = '';
      }
    },
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
    letters: {
      get: function () {
        let alphabet = [...new Set('ABCDEFGHIJKLMNOPQRSTUVWXYZ')];
        let ar = [];
        alphabet.map(y => y === y ? ar.push({value: y, label: y}) : '');
        return ar;
      }
    },
    // Управление стилем заголовка
    classObject: function () {
      return {
        // 'actionH1': this.ruleForm.see ,
        'text-danger': !this.ruleForm.see
      };
    }
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    clear() {
      this.ruleForm.errInputLang = false;
    },

    clickAddButton() {
      this.centerDialogAdded = true;
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
      console.log('RWSPONNN::: ', res);
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
    // Срабатывает перед удалением одного файла
    handleRemoveFile(file, fileList) {
      console.log('FILLL::: ', file);
      //объект-картинка, который следует удалить из хранилища s3
      let data = {pictures: [file]};
      this.warningRemovePhotosS3(data, fileList);
      console.log('Массив после удаления ::: ', fileList);
      // массив объектов картинок, которые остались после удаления

      // this.ruleForm.topicBackground = this.ruleForm.topicBackground.length > 1 ? this.ruleForm.topicBackground.filter(file=>file.id !== fileList[0].id):[];
    },
    clickHandlerFirstTopic(id) {
      io.socket.put('/api/v1/topics/first-topic', {id: id}, (dataRes, jwRes) => {
        this.errorMessages(jwRes, this.i19p.successUpdate);
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


    resetForm(formName) {
      this.$refs.upload ? this.$refs.upload.clearFiles() : '';
      this.$refs[formName].resetFields();
      this.ruleForm.fileList = [];
      this.ruleForm.imageUrl = '';
      this.ruleForm.price = 0;
      this.ruleForm.federations = this.resetFederation;
      this.fuleForm = {
        label: '',
        backgroundPosition: '',
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

    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (_.isUndefined(this.ruleForm.topicBackground)) {
          this.mesWarning('ВНИМАНИЕ! Фон темы - обязателен для загрузки. Подберите нужное фото для фона и загрузите перед тем как отправлять.')
        } else {
          if (valid && !this.buttonUpdate) {
            this.add();
          } else if (valid && this.buttonUpdate) {
            this.update();
          } else {
            console.log('error submit!!');
            return false;
          }
        }

      });
    },

    async backgroundFon() {
      if (_.isUndefined(this.ruleForm.topicBackground)) {
        return this.mesWarning('ВНИМАНИЕ! Фон темы - обязателен для загрузки. Подберите нужное фото для фона и загрузите перед тем как отправлять.');
      }
      console.log('FON BACKGROUND::: ', this.ruleForm.topicBackground);
    },

    // Create Topic
    async add() {
      this.openFullScreen();
      let data = {
        fileList: this.ruleForm.fileList,
        topicBackground: this.ruleForm.topicBackground,
        label: this.ruleForm.label,
        backgroundPosition: this.ruleForm.backgroundPosition,
        labelRu: this.ruleForm.labelRu,
        subtitle: this.ruleForm.subtitle,
        subtitleRu: this.ruleForm.subtitleRu,
        see: this.ruleForm.see
      };

      console.log('DATA перед отправкой::: ', data);
      await io.socket.post('/api/v1/topics/create-topic', data, (data, jwRes) => {
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
    // Update Topic
    update() {
      this.openFullScreen();
      let data = {
        id: this.ruleForm.id,
        fileList: this.ruleForm.fileList,
        topicBackground: this.ruleForm.topicBackground,
        label: this.ruleForm.label,
        backgroundPosition: this.ruleForm.backgroundPosition,
        labelRu: this.ruleForm.labelRu,
        see: this.ruleForm.see,
        subtitle: this.ruleForm.subtitle,
        subtitleRu: this.ruleForm.subtitleRu,
        firstTopic: this.ruleForm.firstTopic
      };
      console.log('DATA UPDATE перед отправкой ::: ', data);

      io.socket.put('/api/v1/topics/update-topic', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? this.mesSuccess(this.i19p.successUpdate) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500ErrUpdate) : '';
        this.buttonUpdate = false;
        this.centerDialogAdded = false;
        this.loading.close();
        if (jwRes.statusCode === 200) {
          this.$refs['ruleForm'] ?  this.resetForm('ruleForm') : '';
          this.ruleForm.fileList = [];
          // this.ruleForm.file = [];
          this.ruleForm.imageUrl = '';
          this.ruleForm.federations = this.resetFederation;
          this.getList();
          this.$forceUpdate();
        }
      });
    },

    async getList() {
      await io.socket.get(`/api/v1/topics/list`, function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      await io.socket.get(`/api/v1/topics/topic-hidden`, function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      await io.socket.get(`/api/v1/topics/topic-count`, function gotResponse(body, response) {
        // console.log('Сервер topic-count ответил кодом ' + response.statusCode + ' и данными: ', body);
      });

      // // Принимаем данные по событию list-*
      // await io.socket.on('list-topic', (data) => {
      //   console.log('data TOPICS all:: ', data);
      //   this.topics = this.editList = this.filterDogs = _.isNull(data) ? [] : data;
      // });
      // Принимаем данные по событию list-*
      await io.socket.on('topic-hidden', (data) => {
        this.hidden = data;
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
      }
    },


    // Выбирает темы для редактирования
    dialogEditors() {
      this.editorList = (this.me.isAdmin || this.me.isSuperAdmin) ? this.topics : '';
      this.dialogEditorList = true;
    },

    errorHandler() {
      return true;
    },

    clearFilter() {
      this.$refs.filterTable.clearFilter();
      this.search = '';
    },

    clickShowPhoto(index, row) {
      this.photoVisible = true;
      this.objOne = Object.assign({}, this.objOne, row);
    },

    handleCloseDialog(done) {
      done();
      /*  this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });*/
    },

    async handleEdit(index, row) {
      row.topicBackground = _.isArray(row.topicBackground) ? await _.each(row.topicBackground, bg => {
        bg.url = bg.imageSrc;
        return bg;
      }) : [];
      this.ruleForm = row;
      console.log('this.ruleForm:::: ', this.ruleForm);

      // this.dateBirthUpdate = row.dateBirth;
      // this.dateDeathUpdate = row.dateDeath;
      // this.ruleForm.kennel = row.kennel.id;
      this.dialogEditor = true;
      this.centerDialogAdded = true;
      this.buttonUpdate = true;
    },

    handleEditPhotos(index, row) {
      this.photos = row;
      // console.log('Собака::: ', row);
      this.centerDialogVisiblePhotos = true;
    },

    async updateDescriptionPhoto() {
      this.photoDesc.id = this.photos.id;
      this.photoDesc.innerVisiblePhotoDescription = false;
      await io.socket.put('/api/v1/topics/update-description-img', this.photoDesc, (data, jwRes) => {
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

    handleCheckAllChange(val) {
      this.checkedPhoto = val ? _.pluck(this.photos.images, 'id') : [];
      this.isIndeterminate = false;
      // console.log('this.checkedPhoto:: ', this.checkedPhoto);
    },
    handleCheckedPhotosChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === _.pluck(this.photos.images, 'id').length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < _.pluck(this.photos.images, 'id').length;
    },
    async coverPhoto(id, index) {
      await io.socket.put(`/api/v1/files/update-cover-album`, {
        id: id,
        cover: index,
        field: 'images',
        collectionName: 'Topic'
      }, (body, response) => {
        this.topics.map(topic => {
          if (topic.id === id) {
            // console.log('INDEX: ', index);
            // let field = 'images';
            let cut = topic['images'].splice(index, 1);
            // console.log('Вырезали этот объект: ', cut);
            // topic['images'].unshift(cut);
            topic['images'] = [...cut, ...topic['images']];
            // topic['images'].splice( 0,0,cut);
            // console.log('Объеденённый массив::: ', topic['images']);
            topic.imagesArrUrl = _.pluck(topic['images'], 'imageSrc');
          }
          this.getList();
          this.$forceUpdate();
        });
      });

      // Принимаем данные по событию list-*
      await io.socket.on('update-cover', (data) => {
        // this.counts = data;
      });

    },

    removePhotos() {
      this.checkAll = false;
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

    warningRemovePhotosS3(d, fileList) {
      this.checkAll = false;
      this.$confirm(this.i19p.warnRemove, this.i19p.warning, {
        confirmButtonText: 'OK',
        cancelButtonText: this.i19p.cancel,
        type: 'warning'
      }).then(() => {
        this.deletePhotoS3(d);
        this.ruleForm.topicBackground = fileList;
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.i19p.delCancelOverload
        });
      });
    },

    async destroyManyPhotos() {
      let removeImage = _.remove(this.photos.images, img => _.indexOf(this.checkedPhoto, img.id) > -1);
      // console.log('Удалённые картинки: ', removeImage);
      let data = this.photos;
      data['removeImage'] = _.pluck(removeImage, 'id');
      // Если картинок нет закрываем окно редактора
      console.log('REMOVE DATA перед отправкой::', data);
      _.isEmpty(this.photos.images) ? this.centerDialogVisiblePhotos = false : '';
      io.socket.delete('/api/v1/topics/destroy-many-img', data, (data, jwRes) => {
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


    deletePhotoS3(data) {
      console.log('DATA remove picture перед отправкой: ', data);
      io.socket.delete('/api/v1/files/remove-picture-from-s3', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.successUpdate)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400ErrUpdate) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500ErrUpdate) : '';
        // this.buttonUpdate = false;
        // this.centerDialogAdded = false;
        // this.loading.close();
        if (jwRes.statusCode === 200) {
          // this.resetForm('ruleForm');
          // this.ruleForm.fileList = [];
          // this.checkedPhoto = [];
          // this.ruleForm.imageUrl = '';
          // this.ruleForm.federations = this.resetFederation;
          // this.getList();
        }
      });
    },


    // Вы можете выделить содержимое таблицы,
    // чтобы различать «успех, информация, предупреждение, опасность» и другие состояния.
    tableRowClassName({row, rowIndex}) {
      if (!row.see) {
        return 'warning-row';
      }
      // else if (rowIndex === 3) {
      //   return 'success-row';
      // }
      return '';
    },

    openRemoveDialog(id) {
      this.removeId = id;
      this.$confirm(this.i19p.warnRemove, this.i19p.warning, {
        confirmButtonText: 'OK',
        cancelButtonText: this.i19p.cancel,
        type: 'warning'
      }).then(() => {
        this.deleteObj();

      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.i19p.delCancel
        });
      });
    },

    deleteObj: async function () {
      let data = {
        id: this.removeId,
      };
      console.log('Перед удалением data Topic: ', data);
      io.socket.delete('/api/v1/topics/destroy-one-topic', data, (dataRes, jwRes) => {
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

    errorMessages(jwRes, successText) {
      (jwRes.statusCode === 200) ? (this.mesSuccess(successText)) :
        (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
          (jwRes.statusCode === 404) ? this.mesError(this.i19p.text404Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';
    },


    /**
     * Фильтр по свойству gender
     * @param command
     */
    // gender(command) {
    //   if (_.isEmpty(command.com)) return false;
    //   let newDogs = [];
    //   this.topics = this.filterDogs;
    //   this.filterName = this.i19p[command.com];
    //   this.topics = command.com !== 'all' ? this.topics.filter(d => d.gender === command.com) : this.filterDogs;
    //   this.$forceUpdate();
    //   // return this.topics ;
    // },
    objFilter() {
      // topics.filter(topic=>topic.see)
      return this.topics.filter(data => (!this.searchObjects || data.labelRu.toLowerCase().includes(this.searchObjects.toLowerCase())) & data.see & !_.isEmpty(data.images[data.cover]));
    },
    showMenu(id) {
      this.topicId = id;
      this.show = true;
      this.showTopic = id;
    },

    showOut() {
      this.show = false;
    },
    async handleSelect(e) {
      this.topicId = (_.isNumber(e.id)) ? e.id : undefined;
    },

    goTo(path) {
      window.location = `/${path}`;
    },
    goTo2(path) {
      this.goto(path);
    },


    handlePreview(file) {
      console.log(file);
    },


    handleBackgroundSuccess(res, file) {
      res.url = URL.createObjectURL(file.raw);
      console.log('RES topicBackground::: ', res);
      // this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      _.isArray(this.ruleForm.topicBackground) ? this.ruleForm.topicBackground.push(res) :
        this.ruleForm.topicBackground = [res];
    },


  }
});
