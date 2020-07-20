parasails.registerPage('blog', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    lines: true,
    dialogPedigreeVisible: true,
    virtualPageSlug: '',
    limit: 50,
    activeClass: 'scc',
    errorClass: 'text-danger',
    sizeLess: 5, // MB
    dialogVisible: false,
    succ: false,
    dialogImageUrl: '',
    eLabel: true,
    post: {},
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
      dateEvent: [
        {required: true, message: 'Please pick a date', trigger: 'blur'}
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
        {max: 700, message: 'Length should be 10 to 100', trigger: 'blur'}
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
        text400Err: 'Error. Could not update! ',
        text500Err: 'Server Error! Unable to update. ',
        text500ExistsErr: 'Looks like such an entry already exists. Cannot update two identical names. ',
        success: 'Congratulations! Object successfully update. ',
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
        text400Err: 'Ошибка. Не смог отредактировать!',
        text400ErrUpdate: 'Ошибка. Не смог обновить!',
        text500Err: 'Ошибка сервера! Невозможно отредактировать.',
        text500ErrUpdate: 'Ошибка сервера! Невозможно обновить.',
        text500ExistsErr: 'Похоже такая запись уже существует. Невозможно отредактировать два одинаковых имя.',
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
  virtualPages: true,
  html5HistoryMode: 'history',
  virtualPagesRegExp: /^\/blog\/post\/[a-z0-9]+\/?([^\/]+)?/,
  // virtualPagesRegExp: /^\/litter\/?[A-Z]+?\/[1|2][0-9]{3}\/?([^\/]+)?/,
  // virtualPagesRegExp: /^\/blog\/post\/\w\/?([^\/]+)?/,
  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    moment().locale(this.me.preferredLocale);
    console.log('POST::: ', this.post);
    this.post.isAdmin = this.me.isAdmin;
    this.post.isSuperAdmin = this.me.isSuperAdmin;
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

    filterPosts(data) {
      this.post = this.cashPost;
      /* let ft = _.filter(this.post, {topic: data.id});
       console.log('ft.length:: ', ft.length);
       this.post = ft.length ? ft : this.post;
       ft.length < 1 ? this.mesInfo('Нет на эту тему постов.') : '';*/
    },

    handlerCloseDialogSlider() {
      // this.photos = [];
      this.succ = false;
      this.eLabel = true;
      this.goto(`/blog/post/${this.post.id}`);
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
    resetForm(formName) {
      this.$refs.upload ? this.$refs.upload.clearFiles() : '';
      this.$refs[formName].resetFields();
      this.ruleForm.fileList = [];
      this.ruleForm.imageUrl = '';
      this.ruleForm.price = 0;
      this.ruleForm.federations = this.resetFederation;
    },
    // Update Post
    update(data) {
      this.openFullScreen();

      // data.fileList = this.ruleForm.fileList;
      // data.dateEvent = JSON.stringify(this.post.dateEvent);
      console.log('DATA UPDATE перед отправкой ::: ', data);
      let p = this;
      io.socket.put('/api/v1/posts/update-post', data, (data, jwRes) => {
        // (jwRes.statusCode === 200) ? this.mesSuccess(this.i19p.successUpdate) :
        (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
          (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
            // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
            (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500ErrUpdate) : '';
        this.loading.close();
        jwRes.statusCode === 200 ? p.succ = true : '';
        this.$forceUpdate();
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

    deleteItem: async function () {
      io.socket.delete('/api/v1/posts/destroy-one-post', {id: this.removePostId}, (dataRes, jwRes) => {

        if (jwRes.statusCode === 200) {
          this.mesSuccess('Объект успешно удалён.');
          setTimeout(() => {
            this.goto(`/blog/`);
          }, 2000);

          // this.$message({
          //   type: 'success',
          //   message: this.i19p.success
          // });
          // this.getList();
          // this.$forceUpdate();
        }
      });
    },
    open() {
      this.$confirm('Это навсегда удалит данный пост. Продолжать?', 'ВНИМАНИЕ!', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отменить',
        type: 'warning'
      }).then(() => {
        this.deleteItem();

      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Удаление отменено'
        });
      });
    },
    removeItem(id) {
      this.removePostId = id;
      this.open();
    },
    editPost(post) {
      this.goto(`/blog/post/${post.id}/edit`);
    },
    openNo(text='This is a message', title='Title') {
      this.$alert(text, title, {
        confirmButtonText: 'OK',
      });
    },

    editLabel() {
      !this.post.label || !this.post.labelRu ?  this.openNo("Заполните поля заголовка поста.", "ВНИМАНИЕ!"): '';
      this.update({
        id: this.post.id,
        label: this.post.label,
        labelRu: this.post.labelRu,
        topicId: this.post.topic.id
      });
    }
  },


});
