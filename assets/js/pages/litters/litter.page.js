parasails.registerPage('litter', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dialogTableVisible: false,
    autoplay: true,
    isAfterDate: false,
    dialogFormVisible: false,
    ruleForm: {
      sire: '',
      dam: '',
      label: '',
      data: [],
      fileList: [],
      fileListPuppies: [],
      file: []
    },
    rules: {
      // born: [
      //   {type: 'date', required: true, message: 'Please pick a date', trigger: 'change'}
      // ],
      // kennel: [
      //   {required: true, message: 'Please select kennel name', trigger: 'change'}
      // ],
      sessionName: [
        {required: true, message: 'Please enter the name of the photo session', trigger: 'blur'},
        {min: 1, max: 60, message: 'Length should be 1 to 60', trigger: 'blur'}
      ],
      // growth: [
      //   {required: true, message: 'Please input height dog', trigger: 'change'},
      //   // {min: 20, max: 40, message: 'Height should be 20 to 40 cm', trigger: 'change'}
      // ],
      // gender: [
      //   {required: true, message: 'Please select a dog gender.', trigger: 'change'}
      // ],
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
    url: null,
    activeIndex: '1',
    fit: 'cover',
    tabPosition: 'right',
    indexPhoto: 0,
    letters: [],
    dic: [
      ['en', {
        warnNoDogs: `There is no possibility to create a litter, while at least one pair of dogs is missing.`,
        warnNoKennel: `At the moment there is no nursery in the database.
         You should create at least one kennel to start with to add a dog.`,
        text400Err: 'Error. Could not update! ',
        text500Err: 'Server Error! Unable to update. ',
        text500ExistsErr: 'Looks like such an entry already exists. Cannot create two identical names. ',
        success: 'Congratulations! Object successfully updated. ',
        selectGender: 'Please select a dog gender.',
        limitExceededText: `The limit is: `,
        limitExceededText2: `you selected `,
        limitExceededText3: `Total: `,
        files: `files`,
        successUploadFiles: `Files uploaded successfully!`,
      }],
      ['ru', {
        warnNoDogs: `Нет возможности создать помёт, пока отсутствует хотя бы одна пара собак.`,
        warnNoKennel: `В данный момент не существует ни одного питомника в базе. 
        Вам следует создать для начала хотя бы один питомник, что бы добавить собаку.`,
        text400Err: 'Ошибка. Не смог создать!',
        text500Err: 'Ошибка сервера! Невозможно создать.',
        text500ExistsErr: 'Похоже такая запись уже существует. Невозможно создать два одинаковых имя.',
        success: 'Поздравляем! Объект успешно создан.',
        selectGender: 'Пожалуйста выберите пол собаки.',
        limitExceededText: `Лимит`,
        limitExceededText2: `вы выбрали`,
        limitExceededText3: `Всего`,
        files: `файлов`,
        successUploadFiles: `Файлы успешно загружены!`,
      }]
    ],
    fits: 'cover',
    // items: [
    //   {label: 'Poale Ell Adam', imageSrc: 'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2.jpg'},
    //   {label: 'Poale Ell Bell', imageSrc: 'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018-11.jpg'},
    //   {label: 'Poale Ell Bazhen', imageSrc: 'https://d3a1wbnh2r1l7y.cloudfront.net/Adam-10m.jpg'},
    //   {label: 'Poale Ell Barthalamew', imageSrc: 'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018.jpg'},
    // ],
    litters: [],
    ratio: null,
    ratios: [],
    colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    // ratioMeTestArr:[
    //   {litter:2, letter:'A'},
    //   {litter:4, letter:'A'},
    //   {litter:4, letter:'A'},
    //   {litter:5, letter:'A'},
    //   {litter:5, letter:'B'},
    //   {litter:2, letter:'B'},
    //   {litter:1, letter:'B'}
    // ]
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.isAfter();
    // this.ratio = _.last(_.pluck(this.me.ratio, 'litter'));
   // console.log('ratioTest: ', this.ratioMeTestArr.filter(rat=>rat.letter === this.litter.letter));
   // console.log('LAST:', _.last( this.ratioMeTestArr.filter(rat=>rat.letter === this.litter.letter)));
    // Выбираем значение рейтинга для этого помёта
    // this.ratio = _.last( this.ratioMeTestArr.filter(rat=>rat.letter === this.litter.letter)).litter;
    this.ratio = _.last( _.pluck(this.me.ratio.filter(rat=>rat.letter === this.litter.letter),'litter'));
    // console.log('this.ratio: ', this.ratio);
    // this.ratio = 1;
    // Кобели
    this.letterList();

    // Ratio Рейтинги


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
    // photoCover: function () {
    //   return this.keyRootPhotoAlbum - 1;
    // },

    photos: function () {
      // return _.pickBy(this.litters, function(u) {
      //   return u.active;
      // });
      return this.litter.puppies;
      // _.each(this.litters, async (litter) => {
      //
      // });
      // console.log('DXXX:', this.litters.filter(litter => litter.images[litter.cover]));
    },
    /* ratio: {
       get: function () {
         // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
         return _.last(this.ratios);
       },
       set: function (i) {
         // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
         this.ratios = [i];
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
      }
    }
    // isPhoto: function () {
    //   return  this.litters.filter(litter => {
    //     !_.isUndefined(litter.images);
    //     console.log('IMAGE: ',litter.images);
    //   });
    // }

  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    changeRatio: function (letter) {

      // console.log('LAST: ', _.last(_.pluck(this.me.ratio, 'letter')));
      /**
       * Выбираем все объекты со свойством litter,
       * т.е. по сути все объекты с оценками принадлежащие к данному помёту и данной коллекции.
       */
      // let ratArr = _.isObject(this.me.ratio) ? [this.me.ratio] : this.me.ratio;
      // let ratio = ratArr.filter(rat => {
      //   // return !_.isNull(rat.litter);
      //   return letter === rat.letter
      // });
      // console.log('RATIO: ', ratio);
      // // Выбираем всё остальное не касающиеся данной коллекции,
      // // для формирования нового массива всех оценок.
      // let ratioNew = ratArr.filter(rat => {
      //   // !_.isElement(rat.litter);
      //   return letter !== rat.letter
      // });

      /**
       * Если длинна массива больше 5 то убираем старую запись
       * Таким образом кол-во отметок поставленных данным пользователем всегда равно
       * последним пяти оценкам. Это скорее для статистики нежели для представления.
       * @type {Array}
       */
      // ratio = (!_.isArray(ratio)) ? [] : ratio.length > 6 ? ratio.slice(1) : ratio;
      // console.log('ratio x: ', ratio);
      // Добавляем новую оценку в формирующийся массив оценок данной коллекции
      // ratio.push({litter: this.ratio, letter: letter});
      // console.log('ratio PUSH: ', ratio);
      // Объединяем новый массив оценок данной коллекции с другими оценками по другим коллекциям
      // ratioNew.push(ratio);
      // console.log('ratioNew:' , ratioNew);
      // Обнуляем данные пользователя по всем рейтингам
      // this.ratios = '';
      // Вносим новые, обновлённые данные по рейтингам
      // this.ratios = ratioNew[1];

      // Отправляем на сервер для обновления свойства ratio у текущего пользователя
      // Все оценки поставленные пользователем, хранятся в коллекции User.ratio
      // let arr = this.me.ratio;
      // console.log('this.me.ratio: ', this.me.ratio);
       this.me.ratio.push({litter: this.ratio, letter: letter});
      // let ratArr = _.isObject(this.me.ratio) ? [this.me.ratio] : this.me.ratio;
      // this.ratios = ratArr;
      //   console.log('RATIO NEW: ', this.ratios);
      this.updateRatioList();
      //  Выводим благодарность на монитор

    },

    // Обновляем рейтинг
    async updateRatioList() {
      let data = {
        ratios:  this.me.ratio
      };
      let sel = this;
      console.log('Данные отправляемые на сервер: ', data);
      await io.socket.post(`/api/v1/users/update-ratio`, data, function gotResponse(body, response) {
        console.log('Сервис Letter List ответил кодом ' + response.statusCode + ' и данными: ', body);
       if(response.statusCode === 200){
         sel.$message({
           message: 'Спасибо за оценку. Ваш голос был учтён!',
           type: 'success'
         });
       } else{
         sel.$message({
           message: `Произошла ошибка ${response.statusCode}! Рейтинг не засчитан.`,
           type: 'error'
         });
       }

      });
      // Принимаем данные по событию list-*
      await io.socket.on('user-ratio', (data) => {
        console.log('server return ratios: ', data);
       // this.ratios = data;
        console.log('this.ratio: ', this.ratio);
      });
    },

    // Выбираем все буквы помётов
    async letterList() {
      await io.socket.get(`/api/v1/litters/list-letter`, function gotResponse(body, response) {
        console.log('Сервис Letter List ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию list-*
      await io.socket.on('list-letter', (data) => {
        console.log('letter: ', data);
        this.letters = data;
      });
    },

    isAfter() {
      // Проверка даты
      // Вернёт true, если this.litter.born  пока в будущем (не прошла)
      this.isAfterDate = moment(new Date()).isSameOrBefore(moment(this.litter.born, 'LL'));
    },

    goTo(path) {
      window.location = `${path}`;
    },

    // handlerCloseDialogSlider(){
    //   this.indexPhoto=0;
    //   this.autoplay=false;
    // },

    showSlider(litterId, indexPhoto) {
      this.dialogTableVisible = true;
      this.litterId = litterId;
      this.indexSlide = indexPhoto;
      this.handlerSetActiveSlider();
      console.log('this.litterId: ', this.litterId);
      console.log('this.indexPhoto: ', this.indexPhoto);
    },

    handlerCloseDialogSlider() {
      this.indexPhoto = 0;
      this.autoplay = false;
    },
    handlerSetActiveSlider() {
      return this.indexPhoto;
    },


    /* Открывает диалоговое окно редактирования*/
    handleCommand(command) {
      switch (command) {
        case 'a':
          this.dialogFormVisible = true;
          break;
      }
      // this.$message('Нажат элемент: ' + command);
    },


    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateLitter();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    async updateLitter() {
      // this.$refs.upload.submit();
      // console.log('this.ruleForm.fileList: ****||| ', this.ruleForm.fileList);
      // this.openFullScreen();
      let data = {
        // fileList: this.ruleForm.sessionName,
        // puppies: this.ruleForm.fileListPuppies,
        // letter: this.fixLetter(),
        // dam: this.getDamArr(),
        // sire: this.getSireArr(),
        // born: JSON.stringify(this.ruleForm.born),
        // description: this.ruleForm.description,
        id: this.litter.id,
        sessionName: this.ruleForm.sessionName,
      };
      console.log('DAEEE: ', data);
      io.socket.post('/api/v1/litters/update-session-name', data, (dataRes, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';

        this.centerDialogAdded = false;
        // this.loading.close();
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.litter.sessionName = data.sessionName;
          // this.ruleForm.fileList = [];
          //           // this.ruleForm.list = [];
          //           // this.ruleForm.imageUrl = '';
          // this.getList();
        }
      });
    },


    mesError(text = '') {
      this.$notify.error({
        title: 'Error',
        message: text,
        offset: 100,
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

    resetForm(formName) {
      // this.$refs.upload.clearFiles();
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
      this.ruleForm.fileList = [];
      this.ruleForm.fileListPuppies = [];
      this.ruleForm.list = [];
      this.ruleForm.imageUrl = '';

    },


  },
});
