parasails.registerPage('titles-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    titles: [],
    counts: 0,
    hidden: 0,
    limit: 4,
    objOne: {},
    countrys: [],
    label:'',
    labelRu:'',
    show: false,
    id: undefined,
    dialog: {},
    showTitle: undefined,
    photoVisible: false,
    checkAll: false,
    searchObjects: '',
    photos: {},
    checkedPhoto: [],
    isIndeterminate: true,
    centerDialogVisiblePhotos: false,
    search: '',
    editorList: [],
    photoDesc: {
      innerVisiblePhotoDescription: false,
      photoId: '',
      description: '',
      dateTaken: '',
    },
    photoDescUpdate: false,
     sizeLess: 2000, // MB
    buttonUpdate: false,
    centerDialogAdded: false,
    centerDialogVisibleConfirm: false,
    dialogVisible: false,
    dialogEditorList: false,
    dialogImageUrl: '',
    editList: [],
    lang: '',
    ruleForm: {
      see: true,
      errInputLang: false,
      label: '',
      flag: '',
      labelRu: '',
      subtitle: '',
      country:'',
      // gender: '',
      subtitleRu: '',
    },
    rules: {
      label: [
        {required: true, message: 'Пожалуйста введите название на английском', trigger: 'blur'},
        {min: 2, max: 200, message: 'Длинна от 3 до 200 знаков', trigger: 'blur'},
      ],
      // labelRu: [
      //   {required: true, message: 'Пожалуйста введите название на русском', trigger: 'blur'},
      //   {min: 3, max: 200, message: 'Длинна от 3 до 200 знаков', trigger: 'blur'},
      // ],
      // continent: [
      //   {required: true, message: 'Please select your continent', trigger: 'change'}
      // ],
      // // country: [
      // //   {required: true, message: 'Please select your country', trigger: 'change'}
      // // ],
      // region: [
      //   {required: true, message: 'Please select Activity zone', trigger: 'change'}
      // ],
      // gender: [
      //   {required: true, message: 'Please select a title gender.', trigger: 'change'}
      // ],
      // description: [
      //   {message: 'Please tell about the nurseries. It is very interesting.', trigger: 'change'},
      //   {max: 1700, message: 'Length should be 10 to 1700', trigger: 'blur'}
      // ]
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
        infoColor: 'Chinese Crested may have any combination of colors, as prescribed in the FCI 288 standard. <br/>This paragraph does not apply to the classification of titles by color, but rather an attempt to provide more information on the appearance of the title. People in their lives always have priorities, this also applies to color, the preference of one or another color often becomes decisive when buying or breeding titles.',
        whyColor: 'Why determine the color.',
        priceTitle: 'Selling price.',
        priceText: 'You can set the price at any time, but until the price is set, the title will not appear on the sales page. Remember to set the selling currency.',
        recommendationsSale: 'Recommendations for the sale of titles. Describe the main advantages and benefits of the title. This information will be posted on the title’s card on the sales page.',
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
    io.socket.get('/api/v1/titles/count-title', function gotResp(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // Кол-во всех тем
    io.socket.on('count-title', (data) => {
      this.counts = data;
    });
    io.socket.get('/api/v1/country/list', function gotResp(body, response) {
      console.log('Сервер country/list ответил кодом ' + response.statusCode + ' и данными: ', body);
    });

    // Запрос для события list-*
    io.socket.get(`/api/v1/titles/list`, function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // Все темы
    io.socket.on('list-title', (data) => {
      console.log('Titles all:: ', data);
      this.titles = this.editorList = data ? data : this.editorList;
    });
    // получаем кол-во скрытых элементов
    io.socket.get('/api/v1/titles/title-hidden', function gotResp(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // All country
    io.socket.on('list-country', (data) => {
      this.countrys = data.countrys;
      this.countrys.unshift({labelRu:'Нет страны', label:''});
      console.log('ALL COUNTRYS::: ', this.countrys);
    });

    // Кол-во всех тем
    io.socket.on('title-hidden', (data) => {
      this.hidden = data;
    });
    // Обновление темы
    io.socket.on('update-title', (data) => {
      // this.getList();
      this.$forceUpdate();
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
    clickAddButton() {
      this.centerDialogAdded = true;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handlePreview(file) {
      console.log(file);
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

      // this.ruleForm.titleBackground = this.ruleForm.titleBackground.length > 1 ? this.ruleForm.titleBackground.filter(file=>file.id !== fileList[0].id):[];
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
      console.log('RES titleBackground::: ', res);
      // this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      _.isArray(this.ruleForm.titleBackground) ? this.ruleForm.titleBackground.push(res) :
        this.ruleForm.titleBackground = [res];
    },

    clear() {
      this.ruleForm.errInputLang = false;
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

    getLinkFlag(country){
       return `https://d2e0ab19zxiehc.cloudfront.net/flags/${country}.jpg`;
    } ,

    // Create Title
    async add() {
      this.openFullScreen();
      let data = {
        fileList: this.ruleForm.fileList,
        titleBackground: this.ruleForm.titleBackground,
        label: this.ruleForm.label,
        flag: this.ruleForm.flag,
        labelRu: this.ruleForm.labelRu,
        subtitle: this.ruleForm.subtitle,
        subtitleRu: this.ruleForm.subtitleRu,
        see: this.ruleForm.see
      };

      console.log('DATA перед отправкой::: ', data);
      await io.socket.post('/api/v1/titles/create-title', data, (data, jwRes) => {
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
    // Update
    update() {
      this.openFullScreen();
      let data = {
        id: this.ruleForm.id,
        fileList: this.ruleForm.fileList,
        titleBackground: this.ruleForm.titleBackground,
        label: this.ruleForm.label,
        // flag: this.getLinkFlag(),
        flag: this.ruleForm.flag,
        labelRu: this.ruleForm.labelRu,
        see: this.ruleForm.see,
        subtitle: this.ruleForm.subtitle,
        subtitleRu: this.ruleForm.subtitleRu,
      };
      console.log('DATA UPDATE перед отправкой ::: ', data);

      io.socket.put('/api/v1/titles/update-title', data, (data, jwRes) => {
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
          this.$forceUpdate();
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

    async getList() {
      await io.socket.get(`/api/v1/titles/list`, function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      await io.socket.get(`/api/v1/titles/title-hidden`, function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      await io.socket.get(`/api/v1/titles/count-title`, function gotResponse(body, response) {
        // console.log('Сервер count-title ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию list-*
      await io.socket.on('title-hidden', (data) => {
        this.hidden = data;
      });

    },

    // Выбирает темы для редактирования
    dialogEditors() {
      this.editorList = (this.me.isAdmin || this.me.isSuperAdmin) ? this.titles : '';
      this.dialogEditorList = true;
    },

    errorHandler() {
      return true;
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
    objFilter() {
      // titles.filter(title=>title.see)
      return this.titles.filter(data => (!this.searchObjects || data.label.toLowerCase().includes(this.searchObjects.toLowerCase())) & data.see & (!_.isEmpty(data.images) || !_.isEmpty(data.flag)));
      // return this.titles.filter(data => (!this.searchObjects || data.label.toLowerCase().includes(this.searchObjects.toLowerCase())) & data.see & !_.isEmpty(data.images[data.cover]));
    },
    deleteObj: async function () {
      let data = {
        id: this.removeId,
      };
      console.log('Перед удалением data Title: ', data);
      io.socket.delete('/api/v1/titles/destroy-one', data, (dataRes, jwRes) => {
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

    async coverPhoto(id, index) {
      await io.socket.put(`/api/v1/files/update-cover-album`, {
        id: id,
        cover: index,
        field: 'images',
        collectionName: 'Title'
      }, (body, response) => {
        this.titles.map(title => {
          if (title.id === id) {
            // console.log('INDEX: ', index);
            // let field = 'images';
            let cut = title['images'].splice(index, 1);
            // console.log('Вырезали этот объект: ', cut);
            // title['images'].unshift(cut);
            title['images'] = [...cut, ...title['images']];
            // title['images'].splice( 0,0,cut);
            // console.log('Объеденённый массив::: ', title['images']);
            title.imagesArrUrl = _.pluck(title['images'], 'imageSrc');
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

    async handleEdit(index, row) {
      row.titleBackground = _.isArray(row.titleBackground) ? await _.each(row.titleBackground, bg => {
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
      await io.socket.put('/api/v1/titles/update-description-img', this.photoDesc, (data, jwRes) => {
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
    clickShowPhoto(index, row) {
      this.photoVisible = true;
      this.objOne = Object.assign({}, this.objOne, row);
    },

    async destroyManyPhotos() {
      let removeImage = _.remove(this.photos.images, img => _.indexOf(this.checkedPhoto, img.id) > -1);
      // console.log('Удалённые картинки: ', removeImage);
      let data = this.photos;
      data['removeImage'] = _.pluck(removeImage, 'id');
      // Если картинок нет закрываем окно редактора
      console.log('REMOVE DATA перед отправкой::', data);
      _.isEmpty(this.photos.images) ? this.centerDialogVisiblePhotos = false : '';
      io.socket.delete('/api/v1/titles/destroy-many-img', data, (data, jwRes) => {
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
    showMenu(id) {
      this.id = id;
      this.show = true;
      this.showTitle = id;
    },

    showOut() {
      this.show = false;
    },
    warningRemovePhotosS3(d, fileList) {
      this.checkAll = false;
      this.$confirm(this.i19p.warnRemove, this.i19p.warning, {
        confirmButtonText: 'OK',
        cancelButtonText: this.i19p.cancel,
        type: 'warning'
      }).then(() => {
        this.deletePhotoS3(d);
        this.ruleForm.titleBackground = fileList;
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.i19p.delCancelOverload
        });
      });
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

  }
});
