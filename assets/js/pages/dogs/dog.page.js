parasails.registerPage('dog', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dialogFormAwards: true,
    centerDialogAdded: false,
    dialogPedigreeVisible: true,
    dialogImageUrl: '',
    titles: [],
    federations: [],
    contPuppies: 0,
    childrens: [],
    urlYoutube: '',
    drawer: false,
    video: true,
    siblings: false,
    titlesDog: [],
    obj: {},
    direction: 'ttb',
    dialogVisible: false,
    comment: '',
     sizeLess: 2000, // MB
    objOne: {},
    limit: 2,
    buttonUpdate: false,
    dialog: {},
    innerVisible: false,
    photoVisible: false,
    circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    sizeList: ['large', 'medium', 'small'],
    ruleForm: {
      id: '',
      dateReceiving: '',
    },
    rules: {

      id: [
        {required: true, message: 'Please input dog name', trigger: 'blur'},
        {min: 3, max: 100, message: 'Length should be 3 to 100', trigger: 'blur'},
      ],
      dateReceiving: [
        {required: true, message: 'Please input date receiving.', trigger: 'change'}
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
        {max: 700, message: 'Length should be 10 to 700', trigger: 'blur'}
      ]
    },
    worldWinner: [{
      year: '2013',
      address: 'Hungary, Budapest',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
    }],
    dic: [
      ['en', {
        textOneErr: `An error has occurred`,
        textTwoErr: `No comment added.`,
        warnNoDogs: `There is no possibility to create a litter, while at least one pair of dogs is missing.`,
        warnNoKennel: `At the moment there is no nursery in the database.
         You should create at least one kennel to start with to add a dog.`,
        text400Err: 'Error. Could not update! ',
        text404Err: 'Mistake. Perhaps you do not have permission to delete this object!',
        text500Err: 'Server Error! Unable to update. ',
        text500ExistsErr: 'Looks like such an entry already exists. Cannot create two identical names. ',
        success: 'Congratulations! Object successfully updated. ',
        selectGender: 'Please select a dog gender.',
        limitExceededText: `The limit is: `,
        limitExceededText2: `you selected `,
        limitExceededText3: `Total: `,
        files: `files`,
        textUrlErr: 'Invalid URL field. Data transfer protocol not specified. For example: http:// or https:// ',
        successUploadFiles: `Files uploaded successfully!`,
        titlePuppies: `Puppies`,
        titlechilds: `childs`,
        areYouClose: 'Are you sure you want to close chat?',
        getFormatDateLocale: `yyyy-MM-dd`,
        getFormatDateTimeLocale: `yyyy-MM-dd HH:mm:ss`,
      }],
      ['ru', {
        textOneErr: `Произошла ошибка`,
        textTwoErr: `Комментарий не добавлен.`,
        warnNoDogs: `Нет возможности создать помёт, пока отсутствует хотя бы одна пара собак.`,
        warnNoKennel: `В данный момент не существует ни одного питомника в базе.
        Вам следует создать для начала хотя бы один питомник, что бы добавить собаку.`,
        text400Err: 'Ошибка. Не смог создать!',
        text404Err: 'Ошибка. Возможно у вас нет прав на удаление данного объекта!',
        text500Err: 'Ошибка сервера! Невозможно создать.',
        text500ExistsErr: 'Похоже такая запись уже существует. Невозможно создать два одинаковых имя.',
        success: 'Поздравляем! Объект успешно создан.',
        selectGender: 'Пожалуйста выберите пол собаки.',
        limitExceededText: `Лимит`,
        limitExceededText2: `вы выбрали`,
        limitExceededText3: `Всего`,
        files: `файла`,
        textUrlErr: 'Не верно заполнено поле УРЛ. Не указан протокол передачи данных. Например:  http:// or https:// ',
        successUploadFiles: `Файлы успешно загружены!`,
        titlePuppies: `Щенки`,
        titlechilds: `Родители`,
        areYouClose: 'Вы уверены, что хотите закрыть чат?',
        getFormatDateLocale: `dd.MM.yyyy`,
        getFormatDateTimeLocale: `dd.MM.yyyy HH:mm:ss`,
      }]
    ],
  },
  virtualPages: true,
  html5HistoryMode: 'history',
  virtualPagesRegExp: /\/chinese-crested\/?[-a-z]+\/?(\w+)([^\/]+)?/i,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    _.extend(this, SAILS_LOCALS);
    moment().locale(this.me.preferredLocale);
    this.urlYoutube = `https://www.youtube.com/embed/${this.dog.headerVideo}?playlist=${this.dog.headerVideo}&amp;loop=1&amp;mute=1&amp;showinfo=0&amp;controls=0&amp;start=0&amp;autoplay=1`;
    io.socket.put(`/api/v1/pdg`, this.dog, function gotResponse(body, response) {
      // console.log('Сервис Dogs dam ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // Принимаем данные по событию search-*
    io.socket.on('list-pedigree', (data) => {
      this.dog.pedigree = data.pedigree;
    });
    // Запрос для события list-*
    io.socket.get(`/api/v1/titles/list`, function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    this.getList();
    // Запрос для события list-*
    io.socket.get(`/api/v1/federations/list`, function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // Все
    io.socket.on('list-federation', (data) => {
      this.federations = data;
    });
    // Принимаем данные по событию list-*
    // получаем титулы собаки
    io.socket.on('list-titlesDog', (data) => {
      this.dog.titleDog = [...data.titleDog];
      this.$forceUpdate();
    });
    // Принимаем данные по событию list-*
    // получаем все титулы в системе
    io.socket.on('list-title', (data) => {
      this.titles = data;
    });
  },

  mounted: async function () {
    this.getChildren();
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

    /**
     * Показывает возраст с учётом смерти.
     * @param value дата рождения
     * @param l язык предпочтения (en|ru)
     * @param format
     * @param dateDeath
     * @returns {*}
     */
    getAge: function (value, l, dateDeath, format) {
      if (!value) {
        return '';
      }
      moment.locale(l);
      let formatNew = format ? format : 'LLL';
      let end = !_.isEmpty(dateDeath) ? moment(dateDeath) : '';
      let now = moment.parseZone();
      return end ? moment.parseZone(value).preciseDiff(end) : moment.parseZone(value).preciseDiff(now);

    },

    // Получить значёк валюты
    getCurrency: function (value) {
      if (!value) {
        return '';
      }
      return (value === 'dollar') ? '$' :
        (value === 'euro') ? '€' : '₽';
    },

    // Получить ссылку на аватар или граватар
    getFoto: function (value) {
      if (!value) {
        return '';
      }
      return (value.defaultIcon === 'gravatar') ? value.gravatar : value.avatar;
    },
    //Сантиметры в дюймы
    getDin: function (value, l, format) {
      if (!value) {
        return '';
      }
      return (value * 0.393700).toFixed(1);
    },
    //Киллограммы в фунты
    getFunt: function (value, l, format) {
      if (!value) {
        return '';
      }
      return (value / 1000 * 2.20462).toFixed(1);
    },

  },


  computed: {
    i19p: {
      get: function () {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        return new Map(this.dic).get(this.me.preferredLocale);
      }
    },
    /*  winner: {
        get: function () {
          // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
          return this.dog.winner;
        }
      },*/

    indexSlide: {
      get: function () {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        return this.indexPhoto;
      },
      set: function (i) {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        this.indexPhoto = i;
      },
    },
    letters: {
      get: function () {
        let alphabet = [...new Set('ABCDEFGHIJKLMNOPQRSTUVWXYZ')];


        let ar = [];
        alphabet.map(y => y === y ? ar.push({value: y, label: y}) : '');
        return ar;
      }
    },
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    showSliderImages(indexPhoto) {
      this.fullscreenLoading = true;
      this.dialogTableVisible = true;
      this.litterId = this.dog.id;
      this.photos = this.dog.images;
      this.title = this.i19p.titlechilds;
      this.indexSlide = indexPhoto;
      this.handlerSetActiveSlider();
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    },
    handleClose2(done) {
      this.$confirm(this.i19p.areYouClose)
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },

    // Получить все награды собаки
    getAwards(command) {},
    handlerSetActiveSlider(i) {
      return this.indexPhoto;
    },
    /* Открывает диалоговое окно редактирования*/
    handleCommand(command) {
      switch (command.com) {
        case 'a':
          this.virtualPageSlug = 'titles';
          break;
        case 'b':
          this.setValueEditPhotoSet(command);
          break;
        case 'c':
          this.goto('/dogs/chinese-crested');
          break;
      }
    },
    handleCloseDialog(done) {
      this.objOne = {};
      done();
    },
    rootImg() {
      return _.isEmpty(this.dog.images) ? '' :
        _.isString(this.dog.images[this.dog.cover].imageSrc) ? this.dog.images[this.dog.cover].imageSrc : '';
    },
    goTo(path) {
      window.location = `/${path}`;
    },
    goTo2(path) {
      this.goto(path);
    },
    errorHandler() {
      return true;
    },
    clickPedigree() {
      this.goto(`/litter/${this.dog.letter}/${moment(this.dog.dateBirth).format('YYYY')}/pedigree`);
    },
    clickShowPhoto(row) {
      this.photoVisible = true;
      this.objOne = Object.assign({}, this.objOne, row);
    },

    open() {
      this.$alert('Клыки x Верхние резцы x Нижние резцы', '', {
        confirmButtonText: 'OK',
      });
    },

    getLinkKennel(kennelName) {
      return kennelName ? `/kennel/${kennelName.split(' ').join('-')}` : '';
    },

    // Если массив kennel пустой, выводим сообщение.
    clickAddButton() {
      this.centerDialogAdded = true;
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
      _.isArray(this.ruleForm.fileList) ? this.ruleForm.fileList.push(res) :
        this.ruleForm.fileList = [res];
    },
    // функция перехвата при превышении лимита
    handleExceed(files, fileList) {
      this.$message.warning(`${this.i19p.limitExceededText} ${this.limit} ${this.i19p.files},
      ${this.i19p.limitExceededText2}  ${fileList.length} + ${files.length}. ${this.i19p.limitExceededText3}:
      ${files.length + fileList.length} ${this.i19p.files}`);
    },

    handleRemove(file, fileList) {
      io.socket.delete('/api/v1/files/remove-picture-from-s3', file.response, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.successUpdate)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400ErrUpdate) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500ErrUpdate) : '';
        if (jwRes.statusCode === 200) {}
      });
      this.ruleForm.fileList = Object.assign({}, this.ruleForm.fileList, fileList);
    },

    getPullKennel() {
      return this.kennels;
    },
    copyElement() {
      this.ruleForm.emptyObj.push({
        key: Date.now(),
        id: ''
      });
    },
    getPullColor() {
      let field = (this.me.preferredLocale === 'ru') ? 'labelRu' : 'value';
      return _.sortBy(this.colors, field);
    },
    removeElement(item) {
      var index = this.ruleForm.emptyObj.indexOf(item);
      if (index !== -1) {
        this.ruleForm.emptyObj.splice(index, 1);
      }
    },

    submitForm: async function (formName) {
      this.$refs[formName].validate((valid) => {
        if (_.isEmpty(this.ruleForm.id)) {
          this.mesError('Error. Не выбран титул.');
        } else if (!_.isObject(this.ruleForm.dateReceiving)) {
          this.mesError('Error. Не указана дата получения титула.');
        } else if (valid) {
          this.updateDog();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // Update
    async updateDog() {
      this.openFullScreen();
      let data = {
        id: this.dog.id,
        dateBirth: JSON.stringify(this.dog.dateBirth),
        label: this.dog.label,
        gender: this.dog.gender,
        titleDog: this.ruleForm, // добавляем титул
      };
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
          this.getList();}
      });
    },
    getList() {
      io.socket.get(`/api/v1/titles/${this.dog.id}`, function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
    },
    openFullScreen() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    resetForm(formName) {
      this.$refs.upload ? this.$refs.upload.clearFiles() : '';
      this.$refs[formName].resetFields();
      this.ruleForm.fileList = [];
      this.ruleForm.imageUrl = '';
      this.ruleForm.price = 0;
      this.ruleForm.federations = this.resetFederation;
    },
    // Обработчик события удаления титула. Всплывает изнутри компонента
    openTit(data) {
      this.$confirm('Это навсегда удалит файл. Продолжить?', 'Внимание', {
        confirmButtonText: 'Ok',
        cancelButtonText: 'Отмена',
        type: 'warning'
      }).then(() => {
        if (this.delTitle(data)) {
          this.$message({
            type: 'success',
            message: 'Delete completed'
          });
        } else {
          this.$message({
            type: 'error',
            message: 'Непредвиденная ошибка. Не могу удалить объект.'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        });
      });
    },
    delTitle: async function (data) {
      let dt = data;
      dt.dogId = this.dog.id;
      let r = false;
      await io.socket.delete('/api/v1/dogs/destroy-one-title', dt, (dataRes, jwRes) => {
        r = (jwRes.statusCode === 200);
        this.dog.titleDog = this.dog.titleDog.filter(item => ((dt.dateReceiving !== item.dateReceiving) || (dt.id !== item.id)));
        this.$forceUpdate();
      });
      return r;
    },
    handlerCloseDialogSlider() {
      this.photos = [];
      this.fullscreenLoading = false;
      this.goto(`/litter/${this.litter.letter}/${this.litter.year}/photo`);
    },

    name(name, hash) {
      return hash ? `${name.split(' ').join('-')}/${hash}` : `chinese-crested/${name.split(' ').join('-')}`;
    },

    getFullNameLink(name, b = '') {
      if (_.isEmpty(name)) {
        return '';
      }
      let link = this.name(name);
      return _.isEmpty(b) ? `/${link}` : this.goTo(link);
    },

    isWW() {
      return _.some(_.filter(this.dog.titleDog, {'title': {'label': 'WW'}}));
    },
    ww(titleId) {
      return _.last(_.pluck(_.filter(this.titles, {'id': titleId}), 'label')) === 'WW';
    },

    getChildren() {
      let gender = this.dog.gender === 'dam' ? 'sire' : 'dam';
      this.childrens = this.dog.children;
      let bdt = _.uniq(_.pluck(this.childrens, 'dateBirth')); //"2016-04-10T23:35:00+03:00"

      /*
       * Добавляем поле sire или dam (в зависимости от гендерной принадлежности первого родителя)
       * с именем второго родителя
       * */
      this.childrens.map(ch => {
        ch[gender] = _.last(ch.parents.filter(p => p.gender === gender));
      });

      bdt = _.map(bdt, dt => {
        moment.locale(this.me.preferredLocale);
        return moment.parseZone(dt).format('L');
      });
      this.childrens.map(child => {
        child.dBirth = moment(child.dateBirth).format('L');
        return child;
      });

      bdt = _.uniq(bdt);
      let u = [];
      _.each(bdt, dt => {
        let ltr = {};
        let lit = _.filter(this.childrens, {'dBirth': dt});
        ltr.fullName = lit[0][gender].fullName;
        ltr.oneParent = lit[0][gender];
        ltr.gender = gender;
        ltr.dateBirth = dt;
        ltr.detail = lit[0][gender].fullName ? `/chinese-crested/${lit[0][gender].fullName.split(' ').join('-')}` : '';
        ltr.litter = lit;
        u.push(ltr);
      });
      this.dog = Object.assign({}, this.dog, {litter: u});
    },
    getUrlShare() {
      return '';
    },
    countPuppies() {
      return this.dog.litter ? _.flatten(_.pluck(this.dog.litter, 'litter')).length : 0;
    },
    regNo() {
      let str = '';
      (this.dog.federations && this.dog.federations.length > 0 && this.federations.length > 0) ?
        this.dog.federations.map((fd, i) => {
          let y = _.last(_.pluck(_.filter(this.federations, {id: fd.federationId}), 'label'));
          fd.label = `${y} ${fd.registerNumber}`;
          str += i > 0 ? `, ${fd.label}` : fd.label;
          delete fd.key;
          delete fd.value;
        }) : '';
      return str;
    },
  }
});
