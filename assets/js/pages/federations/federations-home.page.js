parasails.registerPage('federations-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    counts: 0,
    hidden: 0,
    centerDialogAdded: false,
    countrys: [],
    dialogEditor:false,
    search: '',
    federations:[],
    editorList: [],
    dateBirthUpdate: '',
    show: false,
    id: undefined,
    dialog: {},
    checkAll: false,
    checkedPhoto: [],
    objOne: {},
    isIndeterminate: true,
    limit: 4,
    showTitle: undefined,
    photoVisible: false,
    photos: {},
    photoDescUpdate: false,
    photoDesc: {
      innerVisiblePhotoDescription: false,
      photoId: '',
      description: '',
      dateTaken: '',
    },
    centerDialogVisiblePhotos: false,
    sizeLess: 20, // MB
    buttonUpdate: false,
    dialogVisible: false,
    dialogImageUrl: '',
    searchObjects: '',
    dialogEditorList: false,
    ruleForm: {
      see: true,
      errInputLang: false,
      label: '',
      flag: '',
      labelRu: '',
      dateBirth: '',
      subtitle: '',
      country:'',
      subtitleRu: '',
    },
    rules: {
      label: [
        {required: true, message: 'Пожалуйста введите название на английском', trigger: 'blur'},
        {min: 2, max: 200, message: 'Длинна от 3 до 200 знаков', trigger: 'blur'},
      ],
      dateBirth: [
        {type: 'date', required: true, message: 'Please pick a date', trigger: 'change'}
      ],
    },
    dic: [
      ['en', {
        files: `files`,
        limitExceededText: `The limit is: `,
        limitExceededText2: `you selected `,
        limitExceededText3: `Total: `,
        warnNoKennel: `At the moment there is no nursery in the database.
         You should create at least one kennel to start with to add a title.`,
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
        selectGender: 'Please select a title gender.',
        growth: 'How to measure a title\'s height?',
        hairless: 'What is a down or naked title?',
        infoColor: 'Chinese Crested may have any combination of colors, as prescribed in the FCI 288 standard. <br/>This paragraph does not apply to the classification of federations by color, but rather an attempt to provide more information on the appearance of the title. People in their lives always have priorities, this also applies to color, the preference of one or another color often becomes decisive when buying or breeding federations.',
        whyColor: 'Why determine the color.',
        priceTitle: 'Selling price.',
        priceText: 'You can set the price at any time, but until the price is set, the title will not appear on the sales page. Remember to set the selling currency.',
        recommendationsSale: 'Recommendations for the sale of federations. Describe the main advantages and benefits of the title. This information will be posted on the title’s card on the sales page.',
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
    _.extend(this, SAILS_LOCALS);
    io.socket.get('/api/v1/federations/count-federation', function gotResp(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // Кол-во всех тем
    io.socket.on('count-federation', (data) => {
      this.counts = data;
    });
    io.socket.get('/api/v1/country/list', function gotResp(body, response) {
      // console.log('Сервер country/list ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // All country
    io.socket.on('list-country', (data) => {
      this.countrys = data.countrys;
      this.countrys.unshift({labelRu:'Нет страны', label:''});
    });
    // Запрос для события list-*
    io.socket.get(`/api/v1/federations/list`, function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // Все
    io.socket.on('list-federation', (data) => {
      this.federations = this.editorList = data ? data : this.editorList;
    });
  },
  filters: {
    getCreate: function (value, l, format) {
      if (!value) {
        return '';
      }
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
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    async add() {
      this.openFullScreen();
      let data = {
        fileList: this.ruleForm.fileList,
        titleBackground: this.ruleForm.titleBackground,
        label: this.ruleForm.label,
        flag: this.ruleForm.flag,
        dateBirth: JSON.stringify(this.ruleForm.dateBirth),
        site: this.ruleForm.site,
        labelRu: this.ruleForm.labelRu,
        subtitle: this.ruleForm.subtitle,
        subtitleRu: this.ruleForm.subtitleRu,
        see: this.ruleForm.see
      };

      await io.socket.post('/api/v1/federations/create-federation', data, (data, jwRes) => {
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
    clickAddButton() {
      this.centerDialogAdded = true;
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
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      // Проверка размера входящего файла картинки не более (MB)
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < this.sizeLess;

      if (!isJPG && !isPNG) {
        this.$message.error('Picture must be JPG or PNG format!');
      }

      if (!isLt2M) {
        this.$message.error(`Picture size can not exceed ${this.sizeLess}MB!`);
      }

      return (isJPG || isPNG) && isLt2M;
    },
    handleSuccess(res, file) {
      _.isArray(this.ruleForm.fileList) ? this.ruleForm.fileList.push(res) :
        this.ruleForm.fileList = [res];
    },

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
      let data = {pictures: [file]};
      this.warningRemovePhotosS3(data, fileList);
    },

    openFullScreen() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
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

    resetForm(formName) {
      this.$refs.upload ? this.$refs.upload.clearFiles() : '';
      this.$refs[formName].resetFields();
      this.ruleForm.fileList = [];
      this.ruleForm.imageUrl = '';
      this.ruleForm.price = 0;
      this.ruleForm.federations = this.resetFederation;
      this.fuleForm = {
        label: '',
        flag: '',
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

    handleBackgroundSuccess(res, file) {
      res.url = URL.createObjectURL(file.raw);
      _.isArray(this.ruleForm.titleBackground) ? this.ruleForm.titleBackground.push(res) :
        this.ruleForm.titleBackground = [res];
    },

    clear() {
      this.ruleForm.errInputLang = false;
    },
    async getList() {
      await io.socket.get(`/api/v1/federations/list`, function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      await io.socket.get(`/api/v1/federations/hidden-federation`, function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      await io.socket.get(`/api/v1/federations/count-federation`, function gotResponse(body, response) {
        // console.log('Сервер count-title ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию list-*
      await io.socket.on('hidden-federation', (data) => {
        this.hidden = data;
      });
    },
    objFilter() {
      return this.federations && this.federations.length>0 ? this.federations.filter(data => (!this.searchObjects || data.label.toLowerCase().includes(this.searchObjects.toLowerCase())) & data.see & (!_.isEmpty(data.images) || !_.isEmpty(data.flag))):[];
    },
    deleteObj: async function () {
      let data = {
        id: this.removeId,
      };
      io.socket.delete('/api/v1/federations/destroy-one', data, (dataRes, jwRes) => {
        this.errorMessages(jwRes, this.i19p.successDelete);
        this.dialogDeletePhotoSession = false;
        if (jwRes.statusCode === 200) {
          this.getList();
          this.$forceUpdate();
        }
      });
    },
    async updateDescriptionPhoto() {
      this.photoDesc.id = this.photos.id;
      this.photoDesc.innerVisiblePhotoDescription = false;
      await io.socket.put('/api/v1/federations/update-description-img', this.photoDesc, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.successUpdate)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400ErrUpdate) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500ErrUpdate) : '';
        this.buttonUpdate = false;
        this.centerDialogAdded = false;
        if (jwRes.statusCode === 200) {
          this.ruleForm.fileList = [];
          this.checkedPhoto = [];
          this.ruleForm.imageUrl = '';
          this.ruleForm.federations = this.resetFederation;
          this.getList();
          this.$forceUpdate();
        }
      });
    },
    // Выбирает темы для редактирования
    dialogEditors() {
      this.editorList = (this.me.isAdmin || this.me.isSuperAdmin) ? this.federations : '';
      this.dialogEditorList = true;
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
      this.search = '';
    },
    // Вы можете выделить содержимое таблицы,
    // чтобы различать «успех, информация, предупреждение, опасность» и другие состояния.
    tableRowClassName({row, rowIndex}) {
      if (!row.see) {
        return 'warning-row';
      }
      return '';
    },
    handleEditPhotos(index, row) {
      this.photos = row;
      this.centerDialogVisiblePhotos = true;
    },
    handleCheckAllChange(val) {
      this.checkedPhoto = val ? _.pluck(this.photos.images, 'id') : [];
      this.isIndeterminate = false;
    },
    handleCheckedPhotosChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === _.pluck(this.photos.images, 'id').length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < _.pluck(this.photos.images, 'id').length;
    },
    clickShowPhoto(index, row) {
      this.photoVisible = true;
      this.objOne = Object.assign({}, this.objOne, row);
    },
    handleCloseDialog(done) {
      done();
    },

    showMenu(id) {
      this.id = id;
      this.show = true;
      this.showTitle = id;
    },
    errorHandler() {
      return true;
    },
    showOut() {
      this.show = false;
    },
    getLinkFlag(country){
      return `https://d1lyb0stb8az10.cloudfront.net/flags/${country}.jpg`;
    } ,
    async handleEdit(index, row) {
      row.titleBackground = _.isArray(row.titleBackground) ? await _.each(row.titleBackground, bg => {
        bg.url = bg.imageSrc;
        return bg;
      }) : [];
      this.dateBirthUpdate = row.dateBirth;
      this.ruleForm = row;
      this.dateBirthUpdate = row.dateBirth;
      this.dialogEditor = true;
      this.centerDialogAdded = true;
      this.buttonUpdate = true;
    },
    // Update
    update() {
      this.openFullScreen();
      let data = {
        id: this.ruleForm.id,
        fileList: this.ruleForm.fileList,
        titleBackground: this.ruleForm.titleBackground,
        label: this.ruleForm.label,
        site: this.ruleForm.site,
        dateBirth: JSON.stringify(this.dateBirthUpdate),
        flag: this.ruleForm.flag,
        labelRu: this.ruleForm.labelRu,
        see: this.ruleForm.see,
        subtitle: this.ruleForm.subtitle,
        subtitleRu: this.ruleForm.subtitleRu,
      };

      io.socket.put('/api/v1/federations/update-federation', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? this.mesSuccess(this.i19p.successUpdate) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500ErrUpdate) : '';
        this.buttonUpdate = false;
        this.centerDialogAdded = false;
        this.loading.close();
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.ruleForm.fileList = [];
          this.ruleForm.imageUrl = '';
          this.ruleForm.federations = this.resetFederation;
          this.getList();
          this.$forceUpdate();
        }
      });
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
    async destroyManyPhotos() {
      let removeImage = _.remove(this.photos.images, img => _.indexOf(this.checkedPhoto, img.id) > -1);
      let data = this.photos;
      data['removeImage'] = _.pluck(removeImage, 'id');
      // Если картинок нет закрываем окно редактора
      _.isEmpty(this.photos.images) ? this.centerDialogVisiblePhotos = false : '';
      io.socket.delete('/api/v1/federations/destroy-many-img', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.successUpdate)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400ErrUpdate) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500ErrUpdate) : '';
        this.buttonUpdate = false;
        this.centerDialogAdded = false;
        if (jwRes.statusCode === 200) {
          this.ruleForm.fileList = [];
          this.checkedPhoto = [];
          this.ruleForm.imageUrl = '';
          this.ruleForm.federations = this.resetFederation;
          this.getList();
        }
      });
    },
  }
});
