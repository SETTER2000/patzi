parasails.registerPage('blog-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    topics: [],
    experts: [],
    posts: [],
    cashPosts: [],
    removePostId: '',
    centerDialogVisible: false,
    centerDialogAdded: false,
    limit: 150,
    postCount: 0,
    dialog: {},
     sizeLess: 20, // MB
    dialogVisible: false,
    dialogImageUrl: '',
    innerVisible: false,
    buttonUpdate: false,
    ruleForm: {
      see: true,
      rootPage: false
    },
    rules: {
      kennel: [
        {required: true, message: 'Please select kennel name', trigger: 'change'}
      ],
      label: [
        {required: true, message: 'Please input dog name', trigger: 'blur'},
        {min: 3, max: 100, message: 'Length should be 3 to 100', trigger: 'blur'},
      ],
      gender: [
        {required: true, message: 'Please select a dog gender.', trigger: 'change'}
      ],
      dateBirth: [
        {type: 'date', required: true, message: 'Please pick a date', trigger: 'change'}
      ],
      subtitle: [
        {message: 'Please tell about the nurseries. It is very interesting.', trigger: 'change'},
        {max: 2000, message: 'Length should be 10 to 2000', trigger: 'blur'}
      ]
    },
    dic: [
      ['en', {
        warnNoArr: `There are currently no topics in the database. You must first create at least one blog topic to add a post.`,
        warnRemove: 'This will permanently delete the object. Continue?',
        warning: 'Warning',
        delCancel: 'Delete canceled',
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
        warnNoArr: `В данный момент не существует ни одной темы в базе. Вам следует создать для начала хотя бы одну тему блога, чтобы добавить пост.`,
        warnRemove: 'Это навсегда удалит объект. Продолжить?',
        photoEditor: 'Редактор фотографий',
        warning: 'Внимание',
        delCancel: 'Удаление отменено',
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

    // Запрос для события list-*
    io.socket.get(`/api/v1/posts/list`, function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });

    // Запрос для события list-*
    io.socket.get(`/api/v1/topics/list`, function gotResponse(body, response) {
      // console.log('Сервер topics ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // Запрос для события list-*
    io.socket.get(`/api/v1/users/list-expert`, function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    // Принимаем данные по событию list-*
    io.socket.on('list-post', data => {
      // console.log('POSTS LIST:: ', data);
      this.postCount = data && data.length > 0 ? data.length : this.postCount;
      this.posts = this.cashPosts = data;
    });
    // Принимаем данные по событию list-*
    io.socket.on('list-expert', data => {
      this.experts = _.each(data.users, (t, ind) => {
        t.uSectionClass = `u-section-3-${ind + 1}`;
        t.active = (ind === 0);
        t.images = _.each(t.images, (im, ind) => {
          im.uContainerLayout = `u-container-layout-${ind + 1}`;
          im.uImage = `u-image-${ind + 1}`;
        });
      });
    });

    // Принимаем данные по событию list-*
    io.socket.on('list-topic', data => {
      // this.dataAll = this.seo;
      // console.log('TOPICS LIST:: ', data);
      this.topics = _.each(data, (t, ind) => {
        t.uSectionClass = `u-section-3-${ind + 1}`;
        t.active = (ind === 0);
        t.images = _.each(t.images, (im, ind) => {
          im.uContainerLayout = `u-container-layout-${ind + 1}`;
          im.uImage = `u-image-${ind + 1}`;
        });
      });
    });
  },

  filters: {
    trimString: function (value, count = 12) {
      if (!value) {
        return '';
      }
      value = _.trunc(value, count);
      return value;
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
  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
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

    // Если массив тем постов пустой, выводим сообщение.
    clickAddButton() {
      // console.log('CLICK');
      this.warning = this.i19p.warnNoArr;
      ((this.topics && this.topics.length > 0) || (this.experts && this.experts.length > 0)) ? this.centerDialogAdded = true : this.centerDialogVisible = true;
    },
    getPull() {
      return this.topics;
    },
    getPullExpert() {
      return this.experts;
    },

    goTo(path) {
      window.location = `/${path}`;
    },
    goTo2(path) {
      this.goto(path);
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
      this.$refs[formName].validate((valid) => {
        if (valid && !this.buttonUpdate) {
          this.add();
        } else if (valid && this.buttonUpdate) {
          this.update();
        } else {
          // console.log('error submit!!');
          return false;
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
    }
    ,
    // Create Post
    async add() {
      this.openFullScreen();
      let data = {
        fileList: this.ruleForm.fileList,
        topicId: this.ruleForm.topic,
        dateEvent: JSON.stringify(this.ruleForm.dateEvent),
        label: this.ruleForm.label,
        // backgroundPosition: this.ruleForm.backgroundPosition,
        labelRu: this.ruleForm.labelRu,
        subtitle: this.ruleForm.subtitle,
        subtitleRu: this.ruleForm.subtitleRu,
        see: this.ruleForm.see,
        rootPage: this.ruleForm.rootPage,
        videoUrl: this.ruleForm.videoUrl,
        videoShowinfo: this.ruleForm.videoShowinfo,
        videoStart: this.ruleForm.videoStart,
        videoControls: this.ruleForm.videoControls,
        videoMute: this.ruleForm.videoMute,
        videoHeader: this.ruleForm.videoHeader,
        experts: this.ruleForm.experts,
        videoDescription: this.ruleForm.videoDescription,
      };

      // console.log('DATA перед отправкой::: ', data);
      await io.socket.post('/api/v1/posts/create-post', data, (data, jwRes) => {
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
    /*    update() {
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
        },*/

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
    async getList() {
      await io.socket.get(`/api/v1/topics/list`, function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      await io.socket.get(`/api/v1/posts/list`, function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      await io.socket.get(`/api/v1/topics/topic-hidden`, function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      await io.socket.get(`/api/v1/topics/topic-count`, function gotResponse(body, response) {
        // console.log('Сервер topic-count ответил кодом ' + response.statusCode + ' и данными: ', body);
      });

      // Принимаем данные по событию list-*
      await io.socket.on('topic-hidden', (data) => {
        this.hidden = data;
      });
    },
    removeItem(id) {
      this.removePostId = id;
      this.posts = this.posts.filter(item => item.id !== id);
      this.deleteItem();
    },
    editPost(post) {
      this.goto(`/blog/post/${post.id}/edit`);
    },
    deleteItem: async function () {
      io.socket.delete('/api/v1/posts/destroy-one-post', {id: this.removePostId}, (dataRes, jwRes) => {
        this.mesSuccess('Объект успешно удалён.');
        this.dialogDeletePhotoSession = false;
        if (jwRes.statusCode === 200) {
          // this.$message({
          //   type: 'success',
          //   message: this.i19p.success
          // });
          // this.getList();
          // this.$forceUpdate();
        }
      });
    },

    filterPosts(data) {
      this.posts = this.cashPosts;
      let ft = _.filter(this.posts, {topic: data.id});
      this.posts = ft.length ? ft : this.posts;
      ft.length < 1 ? this.mesInfo('Нет на эту тему постов.') : '';
    },

  }
});
