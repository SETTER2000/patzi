parasails.registerPage('litter', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dialogTableVisible: false,
    viewChangeComment: false,
    dialogPedigreeVisible: true,
    size: 20, // MB input img
    likeId: '',
    elWow: '',
    // титул:'',
    showLike: false,
    pathDogSale: '/dogs/chinese-crested/sale',
    pathDogs: '/dogs/chinese-crested',
    pathDog: '/chinese-crested',
    newCom: false,
    comId: '',
    instanceModuleId: '',
    like: '',
    openReplay: false,
    // com:{likes:[]},
    countCommentLike: 0,
    countCommentWow: 0,
    countCommentSuper: 0,
    countCommentHaha: 0,
    countCommentAll: [],
    nameModule: 'Litter',
    countSuper: 0,
    countLike: 0,
    countWow: 0,
    countHaha: 0,
    listWowUserName: [],
    listLikeUserName: [],
    listSuperUserName: [],
    listHahaUserName: [],
    listAllUsers: [],
    field: '',
    commentsLength: 0,
    activeNames: '1',
    likeLength: 0,
    lightClass: 'font-weight-light',
    boldClass: 'font-weight-bold',
    notViewed: true,
    commentsLengthNew: 0,
    comments: [],
    comment: '',
    commentChild: '',
    commentUpdate: '',
    commentId: '',
    indexPhotoSet: 0,
    forSale: false,
    confirmDeleteLitterModalOpen: false,
    confirmDeletePresentationModalOpen: false,
    editableTabsValue: 'photo',
    virtualPageSlug: '',
    deletePresentationIndex: '',
    activeName: 'first',
    photoSetDescriptionLength: 300,
    photoSetNameLength: 60,
    subtitleLength: 100,
    descriptionLitterLength: 500,
    presentationUrlLength: 280,
    cloudError: '',
    selectedLitter: undefined,
    syncing: false,
    title: '',
    loading: true,
    loadingVideo: false,
    fullscreenLoading: false,
    countVideo: 10,
    countComment: {},
    dialogImageUrl: '',
    nameSessionPhoto: '',
    count: 0,
    dialogVisible: false,
    circleUrl: 'https://d2e0ab19zxiehc.cloudfront.net/ava.png',
    limit: 50, // photos in slider
    letter: '',
    autoplay: true,
    isAfterDate: false,
    dialogFormVisible: false,
    dialogDescriptionPhotoSession: false,
    dialogEditor: false,
    dialogAddedPhotoSession: false,
    dialogDeletePhotoSession: false,
    dialogAddedPresentation: false,
    dialogDeletePresentation: false,

    photos: '',
    commentForm: {
      comment: '',
      commentChild: ''
    },
    ruleForm: {
      show: undefined,
      // indexPhotoSet:undefined,
      dateShooting: '',
      sire: '',
      dam: '',
      label: '',
      showShootingDate: true,
      data: [],
      fileList: [],
      fileListPuppies: [],
      file: []
    },
    ruleFormEdit: {
      showShootingDate: false,
      descriptionPhotoSession: '',
      dateShooting: '',
      sessionName: '',
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
      presentationUrl: [
        {required: true, message: 'Please enter the URL', trigger: 'blur'},
        {
          min: 15,
          max: 280,
          message: `Length should be 15 to 280`,
          trigger: 'blur'
        }
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
    tabPosition: 'top',
    indexPhoto: 0,
    letters: [],
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
        ratingNotCount: `Rating not counted`,
        thankRating: `Thank you for rating. Your vote has been counted!`,
        titlechilds: `childs`,
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
        files: `файлов`,
        textUrlErr: 'Не верно заполнено поле УРЛ. Не указан протокол передачи данных. Например:  http:// or https:// ',
        successUploadFiles: `Файлы успешно загружены!`,
        titlePuppies: `Щенки`,
        ratingNotCount: `Рейтинг не засчитан`,
        thankRating: `Спасибо за оценку. Ваш голос был учтён!`,
        titlechilds: `Родители`,
        getFormatDateLocale: `dd.MM.yyyy`,
        getFormatDateTimeLocale: `dd.MM.yyyy HH:mm:ss`,
      }]
    ],
    fits: 'cover',
    litters: [],
    ratio: null,
    ratios: [],
    colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
  },
  virtualPages: true,
  html5HistoryMode: 'history',
  virtualPagesRegExp: /^\/litter\/?[A-Z]+?\/[1|2][0-9]{3}\/?([^\/]+)?/,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    moment().locale(this.me.preferredLocale);
    this.isAfter();
    this.ratio = _.last(_.pluck(this.me.ratio.filter(rat => rat.letter === this.litter.letter), 'litter'));
    // Super SVG animation
    // this.superSvg();
console.log('LITTER::: ', this.litter);
    // // Haha SVG animation
    // this.countHaha > 0 ?  this.hahaSvg():'';
    //
    // // Wow SVG animation
    // this.countWow > 0 ? this.wowSvg() : '';

    // Like SVG animation
    // console.log('this.countWow::: ', this.countWow);
    // this.countLike > 0 ? this.likeSvg():'';
    // Буквы помёта
    this.letterList();
    this.commentList('puppies');
    this.listLike('puppies');

    // Принимаем данные по событию list-*
    io.socket.on('list-like', (data) => {
      // console.log('LIST LIKE::: ', data);
      if (data.length > 0 && _.isArray(this.litter['puppies'])) {
        _.each(this.litter['puppies'],puppyPhotoSet => {
          console.log('puppyPhotoSet::: ', puppyPhotoSet);
          puppyPhotoSet.likes = _.isArray(puppyPhotoSet.likes) ? puppyPhotoSet.likes : [];
          puppyPhotoSet.likes = data.filter(like => like.indexPhotoSet === puppyPhotoSet.indexPhotoSet);
          puppyPhotoSet.countRatLike = this.countLike = _.pluck(_.filter(puppyPhotoSet.likes, {like: 'like'}), 'like').length;
          puppyPhotoSet.listLikeUserName= this.listLikeUserName = _.uniq(_.pluck(_.filter(puppyPhotoSet.likes, {like: 'like'}), 'userName'));
          puppyPhotoSet.countWow = this.countWow = _.pluck(_.filter(puppyPhotoSet.likes, {like: 'wow'}), 'like').length;
          puppyPhotoSet.listWowUserName= this.listWowUserName = _.uniq(_.pluck(_.filter(puppyPhotoSet.likes, {like: 'wow'}), 'userName'));
          puppyPhotoSet.listAllUsers =this.listAllUsers = _.uniq(_.pluck(puppyPhotoSet.likes, 'userName'));
          puppyPhotoSet.countSuper = this.countSuper = _.pluck(_.filter(puppyPhotoSet.likes, {like: 'super'}), 'like').length;
          puppyPhotoSet.listSuperUserName= this.listSuperUserName = _.uniq(_.pluck(_.filter(puppyPhotoSet.likes, {like: 'super'}), 'userName'));
          puppyPhotoSet.countHaha = this.countHaha = _.pluck(_.filter(puppyPhotoSet.likes, {like: 'haha'}), 'like').length;
          puppyPhotoSet.listHahaUserName=this.listHahaUserName = _.uniq(_.pluck(_.filter(puppyPhotoSet.likes, {like: 'haha'}), 'userName'));
          this.$forceUpdate();
        });

        console.log('ALL DATA event list-like:::: ', data);
        console.log('ALL DATA event this.litter[\'puppies\']:::: ', this.litter['puppies']);
      }


    });

    // Принимаем данные по событию list-*
    io.socket.on('delete-PhotoSet', (response) => {
      this.litter.puppies = this.litter.puppies.filter(puppy => puppy.indexPhotoSet !== response);
      this.clearLocalStorage(response);
      // let a;
      // let all = JSON.parse(localStorage.getItem('__c'));
      // a = _.reject(all, response);
      // localStorage.clear();
      // localStorage.setItem('__c', JSON.stringify(a));
      // // console.log('AAAAAAAAA:::' , a);
      // this.$forceUpdate();
    });


    // Принимаем данные по событию list-*
    io.socket.on('delete-comment', (response) => {
      this.clearLocalStorage(response);
      // let a;
      // let all = JSON.parse(localStorage.getItem('__c'));
      // a = _.reject(all, response);
      // localStorage.clear();
      // localStorage.setItem('__c', JSON.stringify(a));
      // this.$forceUpdate();
    });


    // Принимаем данные по событию list-*
    io.socket.on('add-PhotoSet', (response) => {
      console.log('response::: ', response);
      this.ruleForm.fileListPuppies = [];
      this.uploadPuppies = [];
      this.litter.puppies = response;
      this.$forceUpdate();
    });

    // Принимаем данные по событию add-*
    io.socket.on('add-comment', (data) => {
      console.log('Пришли обновлённые данные CoMMENT::: ', data);
      if (data) {
        this.litter[data.comments.field].map(puppyPhotoSet => {
          if (puppyPhotoSet.indexPhotoSet === data.comments.indexPhotoSet) {
            puppyPhotoSet.comments = _.isArray(puppyPhotoSet.comments) ? puppyPhotoSet.comments : [];
            puppyPhotoSet.countComment = data.countComment;
            puppyPhotoSet.comments.push(data.comments);
          }
        });
        this.commentList('puppies');
        // this.$forceUpdate();
      }
    });

    // Принимаем данные по событию add-*
    io.socket.on('add-like', (data) => {
      console.log('Пришли обновлённые данные LIKE::: ', data);
      if (data) {
        _.each(this.litter[data.likes.field], puppyPhotoSet => {
          if (puppyPhotoSet.indexPhotoSet === data.likes.indexPhotoSet) {
            puppyPhotoSet.likes = _.isArray(puppyPhotoSet.likes) ? puppyPhotoSet.likes : [];
            puppyPhotoSet.countLike = data.countLike;
            puppyPhotoSet.likes.push(data.likes);
            data.likes.like === 'super' ? (`${puppyPhotoSet.countSuper++} ${_.isArray(puppyPhotoSet.listSuperUserName) ? ((puppyPhotoSet.listSuperUserName.indexOf(data.likes.userName)>=0) ? '':puppyPhotoSet.listSuperUserName.push(data.likes.userName)): puppyPhotoSet.listSuperUserName=[data.likes.userName]}`)  :
              data.likes.like === 'like' ? (`${puppyPhotoSet.countRatLike++} ${_.isArray(puppyPhotoSet.listLikeUserName) ? ((puppyPhotoSet.listLikeUserName.indexOf(data.likes.userName)>=0) ? '':puppyPhotoSet.listLikeUserName.push(data.likes.userName)) : puppyPhotoSet.listLikeUserName=[data.likes.userName]}`) :
                data.likes.like === 'wow' ? (`${ puppyPhotoSet.countWow++} ${_.isArray(puppyPhotoSet.listWowUserName) ? ((puppyPhotoSet.listWowUserName.indexOf(data.likes.userName)>=0) ? '':puppyPhotoSet.listWowUserName.push(data.likes.userName)) : puppyPhotoSet.listWowUserName=[data.likes.userName]}`)  :
                  data.likes.like === 'haha' ? (`${puppyPhotoSet.countHaha++}${_.isArray(puppyPhotoSet.listHahaUserName) ? ((puppyPhotoSet.listHahaUserName.indexOf(data.likes.userName)>=0) ? '':puppyPhotoSet.listHahaUserName.push(data.likes.userName)) : puppyPhotoSet.listHahaUserName=[data.likes.userName]}`)  : '';
            this.$forceUpdate();
          }
        });
        console.log(' LITTER added new data::::: ', this.litter[data.likes.field]);
        this.$forceUpdate();
      }

    });

    // Принимаем данные по событию comment-like
    io.socket.on('comment-like', (data) => {
      console.log('Пришли обновлённые данные comment-like::: ', data);
      if (data) {
        this.commentList('puppies');
        // this.litter[data.likes.field].map(puppyPhotoSet => {
        //   if (puppyPhotoSet.indexPhotoSet === data.likes.indexPhotoSet) {
        //     puppyPhotoSet.likes = _.isArray(puppyPhotoSet.likes) ? puppyPhotoSet.likes : [];
        //     puppyPhotoSet.countLike = data.countLike;
        //     puppyPhotoSet.likes.push(data.likes);
        //     data.likes.like === 'super' ? (`${this.superSvg()} ${this.$forceUpdate()}`) :
        //       data.likes.like === 'like' ? (`${this.likeSvg()} ${this.$forceUpdate()}`) :
        //         data.likes.like === 'wow' ? (`${this.wowSvg()} ${this.$forceUpdate()}`) :
        //           data.likes.like === 'haha' ? (`${this.hahaSvg()} ${this.$forceUpdate()}`) : '';
        //   }
        // });
      }
    });

    // Получить информацию о наличие щенков в продаже
    this.getForSale();
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

    countAll: function (value, lakes) {
      if (!value) {
        return '';
      }

      // console.log('value::::', this.countCommentAll.push(value).length);
      // return lakes.length;
      value === 'like' ? this.countCommentLike++ :
        value === 'wow' ? this.countCommentWow++ :
          value === 'haha' ? this.countCommentHaha++ :
            value === 'super' ? this.countCommentSuper++ : 0;


      // this.countCommentLike = _.pluck(likes, 'like').length;
      // this.countCommentWow = _.pluck(likes, 'wow').length;
      // this.countCommentSuper = _.pluck(likes, 'super').length;
      // this.countCommentHaha = _.pluck(likes, 'haha').length;
      // this.likeId = _.last(_.uniq(_.pluck(likes, 'comment')));
      // console.log(' this.likeId:::', this.likeId);
      // this.countCommentAll = likes.length;
      // return (likes.length > 0);

    }
  },

  mounted: async function () {
  },

  computed: {
    i19p: {
      get: function () {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        return new Map(this.dic).get(this.me.preferredLocale);
      }
    },

    /* forSale:{
       get:function () {
         io.socket.get(`/dogs/for-sale`, function gotResponse(body, response) {
           console.log('Сервис Dog forSale ответил кодом ' + response.statusCode + ' и данными: ', body);
           return (response.statusCode === 200)? 1:0;
         });
       }
     },*/
    // listWowUserName: {
    //   get: function () {
    //     // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
    //     return _.uniq(_.pluck(_.filter(puppyPhotoSet.likes, {like: 'wow'}), 'userName'));
    //   },
    //   set:function (i) {
    //
    //   }
    // },

    srcAvatar() {

      return this.me.defaultIcon === 'gravatar' ? this.me.gravatar : this.me.avatar;
    },

    noMore() {
      return this.count >= 20;
    },
    disabled() {
      return this.loadingVideo || this.noMore;
    },

    indexSlide: {
      get: function () {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        return this.indexPhoto;
      },
      set: function (i) {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        this.indexPhoto = i;
      },

    }


  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    openReplayFun(commentId) {
      this.openReplay = true;
      this.commentId = commentId;
    },


    clearLocalStor() {
      localStorage.clear();
    },
    // Очистка localStorage
    clearLocalStorage(response) {
      let a;
      let all = JSON.parse(localStorage.getItem('__c'));
      a = _.reject(all, response);
      localStorage.clear();
      localStorage.setItem('__c', JSON.stringify(a));
      this.$forceUpdate();
    },

    // Super SVG animation
    superSvg() {
      let el = document.querySelector('#super');
      console.log('ELLL super::; ', el);
      let myAnimation = new LazyLinePainter(el, {
        'ease': 'easeInOutSine',
        'strokeWidth': 19.0,
        'strokeOpacity': 0.9,
        'strokeColor': '#E84B3C',
        'strokeCap': 'square'
      });
      myAnimation.paint();
    },
    // Like SVG animation
    likeSvg() {
      this.countLike = _.pluck(_.filter(puppyPhotoSet.likes, {like: 'like'}), 'like').length;
      // this.showLike = false;
      /* let like = document.querySelector('#like');
       let likeAnimation = new LazyLinePainter(like, {
         'ease': 'easeOutBounce',
         'strokeWidth': 19,
         'strokeOpacity': 1,
         'strokeColor': '#2980B9',
         'strokeCap': 'square'
       });
       likeAnimation.paint();*/
    },
    // Wow SVG animation
    /*  wowSvg() {
       this.elWow = this.$el.querySelector('#wow');
       console.log('ELLL elWow::; ', this.elWow);
       let myAnimation = new LazyLinePainter(this.elWow, {
         "ease": "easeInOutQuad",
         "strokeWidth": 19,
         "strokeOpacity": 1,
         "strokeColor": "#F2C511",
         "strokeCap": "square"
       });
       myAnimation.paint();
       /!*    let myAnimation = new LazyLinePainter(el, {
             'ease': 'easeOutSine',
             'strokeWidth': 19.0,
             'strokeOpacity': 0.9,
             'strokeColor': '#ffb007',
             'strokeCap': 'square'
           });
           myAnimation.paint();*!/
     },
     // Haha SVG animation
     hahaSvg() {
       let el = this.$el.querySelector('#haha');
       console.log('ELLL haha::; ', el);
       let myAnimation = new LazyLinePainter(el, {
         "ease": "easeInOutQuart",
         "strokeWidth": 16,
         "strokeOpacity": 1,
         "strokeColor": "#8acab0",
         "strokeCap": "square"
       });
       myAnimation.paint();
       /!* let myAnimation = new LazyLinePainter(el, {
          'ease': 'easeInOutBounce',
          'strokeWidth': 19,
          'strokeOpacity': .7,
          'strokeColor': '#9274a6',
          'strokeCap': 'square'
        });
        myAnimation.paint();*!/
     },
 */

    changeRatio: function (letter) {
      this.me.ratio.push({litter: this.ratio, letter: letter});
      this.updateRatioList();
    },

    // Обновляем рейтинг
    async updateRatioList() {
      let data = {
        ratios: this.me.ratio
      };
      let sel = this;
      console.log('Данные отправляемые на сервер: ', data);
      await io.socket.post(`/api/v1/users/update-ratio`, data, function gotResponse(body, response) {
        // console.log('Сервис Letter List ответил кодом ' + response.statusCode + ' и данными: ', body);
        if (response.statusCode === 200) {
          sel.$message({
            message: sel.i19p.thankRating,
            type: 'success'
          });
        } else {
          sel.$message({
            message: `${sel.i19p.textOneErr} ${response.statusCode}! ${sel.i19p.ratingNotCount}.`,
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


    beforeUpload(file) {
      // Проверка размера входящего файла картинки не более (MB)
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < this.size;

      if (!isJPG) {
        this.$message.error('Picture must be JPG format!');
      }

      if (!isLt2M) {
        this.$message.error(`Picture size can not exceed ${this.size}MB!`);
      }

      // else{
      //   this.$message.info(this.i19p.successUploadFiles);
      // }
      // // setTimeout(()=>{  }, 3000);

      // console.log('xxx file xxx: ', file);
      // console.log('xxx fileList xxx: ', fileList);

      return isJPG && isLt2M;

    },


    isAfter() {
      // Проверка даты
      // Вернёт true, если this.litter.born  пока в будущем (не прошла)
      this.isAfterDate = moment(new Date()).isSameOrBefore(moment(this.litter.born, 'LL'));
    },


    handleSuccessPuppies(res, file) {
      this.ruleForm.fileListPuppies.push(res);
    },

    handleExceedPuppies(files, fileList) {
      console.log('handleExceedPuppies:: ', fileList);
      this.$message.warning(`${this.i19p.limitExceededText} ${this.limit} ${this.i19p.files},
      ${this.i19p.limitExceededText2}  ${fileList.length} + ${files.length}. ${this.i19p.limitExceededText3}:
      ${files.length + fileList.length} ${this.i19p.files}`);
    },

    handleRemovePuppies(file, fileList) {
      // console.log('file:: ** :');
      // console.log(file);
      // console.log('fileList:: ** :');
      // console.log(fileList);
      this.ruleForm.fileListPuppies = [];
      this.ruleForm.fileListPuppies = _.pluck(fileList, 'response');
      // this.ruleForm.fileList = _.remove(this.ruleForm.fileList, file);
      console.log(' Remove this.ruleForm.fileListPuppies: ', this.ruleForm.fileListPuppies);

      // this.ruleForm.fileList.push(fileList);
      // this.ruleForm.fileList = fileList;
    },

    setActiveItem() {
      return this.indexSlide;
    },

    //Показывает слайдер картинок родителей
    showSliderImages(indexPhoto) {
      this.fullscreenLoading = true;
      this.dialogTableVisible = true;
      this.litterId = this.litter.id;
      this.photos = this.litter.images;

      console.log('photos:::: ' , this.photos);
      this.title = this.i19p.titlechilds;
      this.indexSlide = indexPhoto;
      this.handlerSetActiveSlider();
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },

    // Показывает слайдер картинок щенков
    showSlider: async function (indexPhoto, indexPhotoSet) {
      this.fullscreenLoading = true;
      this.indexSlide = indexPhoto;
      this.indexPhotoSet = indexPhotoSet;
      // console.log('indexPhoto:: ', indexPhoto);
      // console.log('indexPhotoSet:: ', this.indexPhotoSet);
      this.title = this.i19p.titlePuppies;
      this.dialogTableVisible = true;
      let photoSession = await this.litter.puppies.filter((phSes, i) => i === this.indexPhotoSet);
      this.photos = photoSession[0].imagesSlider;
      // this.photos = photoSession[0].photos;
      this.litterId = this.litter.id;
      this.handlerSetActiveSlider();
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    },


    clickPedigree() {
      // this.dialogPedigreeVisible = true;
      this.goto(`/litter/${this.litter.letter}/${this.litter.year}/pedigree`);
      // this.litterId = litterId;
      // this.indexSlide = indexPhoto;
      // this.handlerSetActiveSlider();
      // console.log('this.litterId: ', this.litterId);
      // console.log('this.indexPhoto: ', this.indexPhoto);
    },


    handlerCloseDialogSlider() {
      this.photos = [];
      this.fullscreenLoading = false;
      this.goto(`/litter/${this.litter.letter}/${this.litter.year}/photo`);
    },


    handlerSetActiveSlider(i) {
      // console.log('Нажали по слайду: ', i);
      // this.photos = _.pluck(this.litter.puppies, 'photos');
      return this.indexPhoto;
    },

    handlerSetActivePresentation(i) {
      console.log('Нажали по презентации: ', i);
      // this.photos = _.pluck(this.litter.puppies, 'photos');
      return this.deletePresentationIndex;
    },

    // Установить инбокс фотосессии
    setIndexPhotoSet: function (command) {
      this.indexPhotoSet = command.i;
    },


    // Установить переменных для редактирования
    setValueEditPhotoSet: function (command) {
      this.setIndexPhotoSet(command);
      // console.log('this.indexPhotoSet', _.last(this.litter.puppies.filter(photoSet=>photoSet.indexPhotoSet===this.indexPhotoSet)).showShootingDate);
      this.ruleFormEdit.showShootingDate = _.last(this.litter.puppies.filter(photoSet => photoSet.indexPhotoSet === this.indexPhotoSet)).showShootingDate;
      this.ruleFormEdit.dateShooting = _.last(this.litter.puppies.filter(photoSet => photoSet.indexPhotoSet === this.indexPhotoSet)).dateShooting;
      this.ruleFormEdit.descriptionPhotoSession = _.last(this.litter.puppies.filter(photoSet => photoSet.indexPhotoSet === this.indexPhotoSet)).descriptionPhotoSession;
      this.ruleFormEdit.sessionName = _.last(this.litter.puppies.filter(photoSet => photoSet.indexPhotoSet === this.indexPhotoSet)).sessionName;
      this.dialogDescriptionPhotoSession = true;
    },


    // Открыть диалоговое окно "Добавить фотосессию"
    setAddedPhotoSet: function (command) {
      this.dialogAddedPhotoSession = true;
    },

    // Открыть диалоговое окно "Добавить фотосессию"
    setAddedPresentation: function (command) {
      this.dialogAddedPresentation = true;
    },


    /* Открывает диалоговое окно редактирования*/
    handleCommand(command) {
      switch (command.com) {
        case 'a':
          this.setIndexPhotoSet(command);
          this.dialogFormVisible = true;
          break;
        case 'b':
          this.setValueEditPhotoSet(command);
          break;
        case 'c':
          this.setAddedPhotoSet(command);
          break;
        case 'd':
          this.setIndexPhotoSet(command);
          this.dialogDeletePhotoSession = true;
          this.nameSessionPhoto = command.name;
          // this.ruleForm.description =  this.litter.description;
          break;
        case 'e':
          this.dialogEditor = true;
          // this.ruleForm.description =  this.litter.description;
          break;
        case 'f':
          window.location = '/litters/new';
          break;
        case 'g':
          this.setAddedPresentation(command);
          break;
        case 'dl':
          this.clickDeleteLitter();
          break;
        case 'allView':
          this.allViewed(command);
          break;
        case 'like':
          this.addLike(command);
          break;
        case 'super':
          this.addLike(command);
          break;
        case 'wow':
          this.addLike(command);
          break;
        case 'haha':
          this.addLike(command);
          break;
        case 'commentLike':
          this.commentLike(command);
          break;
        case 'commentSuper':
          this.commentLike(command);
          break;
        case 'commentWow':
          this.commentLike(command);
          break;
        case 'commentHaha':
          this.commentLike(command);
          break;
        case 'link':
          window.location = '/litters';
          break;
        case 'deleteComment':
          this.deleteComment(command);
          break;
        case 'changeComment':
          this.changeOpenComment(command);
          break;
        //default:  this.setIndexPhotoSet(command);
      }
      // }
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

    async updateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addPhotoSet();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    async addedPresentForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addedPresent();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    async getNameSession(indexPhotoSet) {
      return this.litter.puppies[0].hasOwnProperty('sessionName') ? this.litter.puppies[0].sessionName : '';
    },
    async deleteForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.deletePhotoSet();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


    _clearAddFriendsModal: function () {
      this.goto(`/litter/${this.litter.letter}/${this.litter.year}/photo`);
      this.formErrors = {};
      this.cloudError = '';
    },


    closeAddFriendsModal: function () {
      this._clearAddFriendsModal();
    },

    closeModal: function () {
      this._clearAddFriendsModal();
    },

    fixDescription(i) {
      this.ruleForm.description > i ? this.mesError('Много текста!') : '';
    },

    async addPhotoSet() {
      this.fixDescription();
      let data = {
        puppies: this.ruleForm.fileListPuppies,
        letter: this.litter.letter,
        year: this.litter.year,
        id: this.litter.id,
        sessionName: this.ruleForm.sessionName,
        descriptionPhotoSession: this.ruleForm.descriptionPhotoSession,
        dateShooting: this.ruleForm.dateShooting,
        showShootingDate: this.ruleForm.showShootingDate
      };
      this.dialogAddedPhotoSession = false;
      io.socket.post('/api/v1/litters/add-session-photo', data, (dataRes, jwRes) => {
        this.errorMessages(jwRes);
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.ruleForm.fileListPuppies = [];
          data.puppies = [];
          this.uploadPuppies = [];
          this.$forceUpdate();
          // _.isArray(this.litter.puppies) ? this.litter.puppies.push(data) : this.litter.puppies = [data];
          // setTimeout(() => {
          //   window.location = `/litter/${this.litter.letter}/photo`;
          // }, 1500);


        }
      });
    },

    async addedPresent() {
      this.fixDescription(this.presentationUrlLength);
      if (_.isNull(this.ruleForm.presentationUrl.match(/^http:\/\/|^https:\/\//))) {
        this.mesError(this.i19p.textUrlErr);
        return false;
      }

      let data = {
        id: this.litter.id,
        presentationName: this.ruleForm.presentationName,
        presentationUrl: this.ruleForm.presentationUrl,
        descriptionPresentation: this.ruleForm.descriptionPresentation,
        // born: JSON.stringify(this.ruleForm.born),
      };

      io.socket.post('/api/v1/litters/add-presentation', data, (dataRes, jwRes) => {
        this.errorMessages(jwRes);

        this.dialogAddedPresentation = false;

        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          _.isArray(this.litter.presentation) ? this.litter.presentation.push(data) : this.litter.presentation = [data];
          this.goto(`/litter/${this.litter.letter}/${this.litter.year}/presentation`);
          // setTimeout(() => {
          //   window.location = `/litter/${this.litter.letter}`;
          // }, 1500);
        }
      });
    },


    /**
     * Функция выполняет сверку входящих данных о комментариях данной фотосессии с данными о просмотренных комментариях находящихся в
     * localStorage. На основе этих данных выводится число не просмотренных комментариев (подсвечены жирным шрифтом).
     * Кликнув по комментарию он добавляется в хранилище и считает просмотренным.
     * @param photoSet
     * @returns {number}
     */
    getCountComment(photoSet) {
      let viewedCommentId = _.remove(_.uniq(_.pluck(JSON.parse(localStorage.getItem('__c')), photoSet.indexPhotoSet)), n => n !== undefined);
      let viewedComment = _.isArray(JSON.parse(localStorage.getItem('__c'))) ? viewedCommentId.length : 0;
      this.boldComment(photoSet);
      // console.log('photoSet.countComment (всего комментов)::: ', photoSet.countComment);
      // console.log('viewedComment (просмотренно)::: ', viewedComment);
      return photoSet.comments.length - viewedComment;
    },

    /**
     * Устанавливает жирный шрифт на комментарии, которые не были отмечены как просмотренные
     * @param photoSet
     */
    boldComment: function (photoSet) {
      let viewedCommentId = _.remove(_.uniq(_.pluck(JSON.parse(localStorage.getItem('__c')), photoSet.indexPhotoSet)), n => n !== undefined);
      let difference = _.difference(_.pluck(photoSet.comments, 'id'), viewedCommentId);
      _.each(photoSet.comments, comment => {
        comment.notViewed = !(_.indexOf(difference, comment.id) < 0);
      });
      // [...document.querySelectorAll(".comment-text")].map(el => {
      //   el.className = 'comment-text font-weight-bold';
      //   console.log('CLASS NAME::: ', el.className);
      //   // return el;
      // });
      //
    },

    // Открывает форму для записи комментариев
    async openCommentsForm(photoSet) {
      this.ruleForm.show = photoSet.indexPhotoSet;
      photoSet.countComment = 0;
      this.boldComment(photoSet);
      this.$forceUpdate();
    },

    /**
     * Функция устанавливает все элементы данной фотосесси просмотренными
     * @param photoSet
     */
    allViewed(command) {
      let commentsId = _.pluck(command.photoSet.comments, 'id');
      let options = JSON.parse(localStorage.getItem('__c'));
      commentsId.map(id => {
        let o = _.zipObject([command.photoSet.indexPhotoSet], [id]);
        !_.isArray(options) ? options = [o] :
          !_.some(options, o) ? options.push(o) : '';
      });
      localStorage.setItem('__c', JSON.stringify(options));
      this.getCountComment(command.photoSet);
      this.$forceUpdate();
    },


    // Отмечает один комментарий как просмотренный
    viewed(id, photoSet, e) {
      let o = {};
      // localStorage.clear();
      e.target.className = e.target.classList.contains('comment-text font-weight-bold') ? 'comment-text font-weight-light' :
        'comment-text font-weight-light';

      let options = JSON.parse(localStorage.getItem('__c'));
      o = _.zipObject([this.ruleForm.show], [id]);

      !_.isArray(options) ? options = [o] :
        !_.some(options, o) ? options.push(o) : '';

      localStorage.setItem('__c', JSON.stringify(options));
      this.getCountComment(photoSet);
      this.$forceUpdate();
    },


    async deletePhotoSet() {
      let data = {
        id: this.litter.id,
        indexPhotoSet: this.indexPhotoSet,
        nameModule: this.nameModule
      };

      io.socket.post('/api/v1/litters/destroy-session-photo', data, (dataRes, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';
        this.dialogDeletePhotoSession = false;
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.$forceUpdate();
        }
      });


    },

    errorMessages(jwRes) {
      (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
        (jwRes.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
          (jwRes.statusCode === 404) ? this.mesError(this.i19p.text404Err) :
            (jwRes.statusCode === 409) ? this.mesError(jwRes.headers['x-exit-description']) :
              // (jwRes.statusCode === 500 && data.message.indexOf("record already exists with conflicting")) ? this.mesError(this.i19p.text500ExistsErr) :
              (jwRes.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';
    },


    deleteComment: async function (command) {
      let data = {
        id: command.comment.id,
        field: command.comment.field,
        instanceModuleId: this.litter.id,
        nameModule: this.nameModule,
        indexPhotoSet: command.comment.indexPhotoSet
      };
      // console.log('Перед отправкой data: ', data);
      io.socket.post('/api/v1/comments/destroy-one-comment', data, (dataRes, jwRes) => {
        this.errorMessages(jwRes);
        this.dialogDeletePhotoSession = false;
        if (jwRes.statusCode === 200) {
          this.$forceUpdate();
        }
      });


    },
    changeCloseComment(command) {
      this.viewChangeComment = false;
    },

    changeOpenComment(command) {
      this.viewChangeComment = true;
      this.commentId = command.comment.id;
      this.commentUpdate = command.comment.comment;
      this.instanceModuleId = command.comment.instanceModuleId;
      this.field = command.comment.field;

    },


    changeComment: async function () {

      if (_.isEmpty(this.commentUpdate)) {
        return false;
      }
      let data = {
        id: this.commentId,
        comment: this.commentUpdate,
        instanceModuleId: this.instanceModuleId,
        field: this.field,

      };
      console.log('data::: ', data);
      io.socket.post('/api/v1/comments/update-one-comment', data, (dataRes, jwRes) => {
        this.errorMessages(jwRes);
        this.viewChangeComment = false;
        if (jwRes.statusCode === 200) {
          this.$forceUpdate();
        }
      });
    },


    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    async updateLitter() {
      this.fixDescription(this.descriptionLitterLength);
      let data = {
        id: this.litter.id,
        description: this.ruleForm.description,
        subtitle: this.ruleForm.subtitle,
        born: this.ruleForm.born ? this.ruleForm.born : this.litter.born,
        sessionName: this.ruleForm.sessionName,
        descriptionPhotoSession: this.ruleForm.descriptionPhotoSession,
      };

      io.socket.post('/api/v1/litters/update-litter', data, (dataRes, jwRes) => {
        this.errorMessages(jwRes);

        this.centerDialogAdded = false;

        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.litter.sessionName = data.sessionName ? data.sessionName : this.litter.sessionName;
          this.litter.description = data.description ? data.description : this.litter.description;
          this.litter.subtitle = data.subtitle ? data.subtitle : this.litter.subtitle;
          this.litter.descriptionPhotoSession = data.descriptionPhotoSession ? data.descriptionPhotoSession : '';
          this.litter.bornNt = data.born ? moment.parseZone(data.born).format('LL') : this.litter.bornNt;
        }
      });
    },


    async updatePhotoSetName(form) {
      console.log('this[form].sessionName::: ', this[form].sessionName);
      let data = {
        id: this.litter.id,
        indexPhotoSet: this.indexPhotoSet,
        sessionName: this[form].sessionName,
      };
      console.log('NAME after upload:::: ', data);
      io.socket.post('/api/v1/litters/update-session-name', data, (dataRes, jwRes) => {
        this.errorMessages(jwRes);
        this.dialogFormVisible = false;
        if (jwRes.statusCode === 200) {
          this.resetForm(form);
          // this.litter.puppies[data.indexPhotoSet].sessionName = data.sessionName ? data.sessionName : '';
          _.last(this.litter.puppies.filter(photoSet => photoSet.indexPhotoSet === data.indexPhotoSet)).sessionName = data.sessionName ? data.sessionName : '';
        }
      });
    },

    async updatePhotoSetDescription() {
      this.fixDescription(this.photoSetDescriptionLength);
      console.log('this.ruleFormEdit:::', this.ruleFormEdit.dateShooting);
      let data = {
        id: this.litter.id,
        indexPhotoSet: this.indexPhotoSet,
        sessionName: this.ruleFormEdit.sessionName,
        descriptionPhotoSession: this.ruleFormEdit.descriptionPhotoSession,
        dateShooting: _.isNull(this.ruleFormEdit.dateShooting) ? '' : this.ruleFormEdit.dateShooting,
        // JSON.stringify(this.ruleFormEdit.dateShooting),
        showShootingDate: this.ruleFormEdit.showShootingDate
      };

      io.socket.post('/api/v1/litters/update-session-description', data, (dataRes, jwRes) => {
        this.errorMessages(jwRes);

        this.dialogDescriptionPhotoSession = false;
        if (jwRes.statusCode === 200) {
          console.log('data.showShootingDate:: ', data.showShootingDate);
          this.resetForm('ruleFormEdit');
          this.ruleFormEdit.sessionName = '';
          this.ruleFormEdit.descriptionPhotoSession = '';
          // this.ruleFormEdit.dateShooting = '';
          // this.ruleFormEdit.showShootingDate = false;

          _.last(this.litter.puppies.filter(photoSet => photoSet.indexPhotoSet === data.indexPhotoSet)).descriptionPhotoSession = data.descriptionPhotoSession ? data.descriptionPhotoSession : '';
          _.last(this.litter.puppies.filter(photoSet => photoSet.indexPhotoSet === data.indexPhotoSet)).sessionName = data.sessionName ? data.sessionName : '';
          _.last(this.litter.puppies.filter(photoSet => photoSet.indexPhotoSet === data.indexPhotoSet)).dateShooting = data.dateShooting ? data.dateShooting : '';
          _.last(this.litter.puppies.filter(photoSet => photoSet.indexPhotoSet === data.indexPhotoSet)).showShootingDate = data.showShootingDate ? data.showShootingDate : false;
          // this.$forceUpdate();
          // console.log('AS::D', _.last(this.litter.puppies.filter(photoSet => photoSet.indexPhotoSet === data.indexPhotoSet)).dateShooting);
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
      this.$refs.uploadPuppies ? this.$refs.uploadPuppies.clearFiles() : '';
      // this.$refs.uploadPuppies.resetFields();
      this.dialogFormVisible = false;
      this.dialogDescriptionPhotoSession = false;
      this.dialogEditor = false;
      this.$refs[formName].resetFields();
      this.ruleForm.fileList = [];
      this.ruleForm.fileListPuppies = [];
      this.ruleForm.list = [];
      this.ruleForm.imageUrl = '';

    },
    load() {
      this.loadingVideo = true;
      setTimeout(() => {
        this.countVideo += 2;
        this.loadingVideo = false;
      }, 2000);
    },
    // Это кнопка вызывает модальное окно <modal> с <ajax-form> для удаления помёта
    clickDeleteLitter: function () {
      this.confirmDeleteLitterModalOpen = true;
      this.selectedLitter = this.litter;
    },
    // Это кнопка вызывает модальное окно <modal> с <ajax-form> для удаления презентации
    clickDeletePresentation(i) {
      this.confirmDeletePresentationModalOpen = true;
      this.selectedLitter = this.litter;
      this.deletePresentationIndex = i;
    },

    closeDeleteLitterModal: function () {
      this.selectedLitter = undefined;
      this.confirmDeleteLitterModalOpen = false;
    },
    closeDeletePresentationModal: function () {
      this.selectedLitter = undefined;
      this.confirmDeletePresentationModalOpen = false;
    },

    handleParsingDeleteLitterForm: function () {
      return {
        id: this.selectedLitter.id
      };
    },
    handleParsingDeletePresentationForm: function () {
      return {
        id: this.selectedLitter.id,
        // obj: this.deletePresentationIndex,
        index: this.deletePresentationIndex,
      };
    },

    submittedDeleteLitterForm: function () {
      // _.remove(this.litters, {id: this.selectedLitter.id});
      this.fullscreenLoading = true;

      this.$forceUpdate();
      this.confirmDeleteLitterModalOpen = false;
      this.selectedLitter = undefined;
      this.handlerSetActiveSlider();
      setTimeout(() => {
        this.goto('/litters');
      }, 1500);
    },

    submittedDeletePresentationForm: function () {
      // _.remove(this.litter.presentation,present);

      this.fullscreenLoading = true;

      this.$forceUpdate();
      this.confirmDeletePresentationModalOpen = false;
      this.selectedLitter = undefined;
      this.handlerSetActiveSlider();
      setTimeout(() => {
        this.goto(`http://localhost:1337/litter/${this.litter.letter}/${this.litter.year}/presentation`);
      }, 1000);
    },

    clickTabName() {
      let activeName = this.virtualPageSlug;
      this.goto(`/litter/${this.litter.letter}/${this.litter.year}/${activeName}`);
    },

    onSubmit() {
      console.log('FOP::', this.commentForm);
    },


    // Выбираем все буквы помётов
    async letterList() {
      await
        io.socket.get(`/api/v1/litters/list-letter`, function gotResponse(body, response) {
          // console.log('Сервис Letter List ответил кодом ' + response.statusCode + ' и данными: ', body);
        });
      // Принимаем данные по событию list-*
      await
        io.socket.on('list-letter', (data) => {

          // console.log('data letters::', data);
          this.letters = data;
        });
    },

    //
    async getForSale() {
      await io.socket.on('forSale-dog', (data) => {
        console.log('Пришли обновлённые данные forSale-dog::: ', data);
        // console.log('DATA :::: ' , data);
        (data.letter === this.litter.letter && data.year === this.litter.born.split('-')[0]) ? this.forSale = data.forSale : '';
      });
      await  io.socket.get(`/dogs/for-sale/${this.litter.letter}/${this.litter.born.split('-')[0]}`, function gotResponse(body, response) {
        console.log('Сервис Dog forSale ответил кодом ' + response.statusCode + ' и данными: ', body);
        // this.forSale =  (body === 'Ok');
      });
    },
    getLikes: function (likes) {
      console.log('likes::: ', likes.length);
      this.countCommentLike = _.pluck(likes, 'like').length;
      this.countCommentWow = _.pluck(likes, 'wow').length;
      this.countCommentSuper = _.pluck(likes, 'super').length;
      this.countCommentHaha = _.pluck(likes, 'haha').length;
      this.likeId = _.last(_.uniq(_.pluck(likes, 'comment')));
      console.log(' this.likeId:::', this.likeId);
      this.countCommentAll = likes.length;
      return (likes.length > 0);

    },

    // Выбираем все комментарии
    commentList: async function (field) {
      await io.socket.get(`/api/v1/comments/list-comment/${this.litter.id}/${field}`, function gotResponse(body, response) {
        // console.log('Сервис Comment List ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию list-*
      io.socket.on('list-comment', (data) => {
        if (data.length > 0 && _.isArray(this.litter[field])) {
          this.litter[field].map(puppyPhotoSet => {
            // puppyPhotoSet.countComment= data.length;
            puppyPhotoSet.comments = _.isArray(puppyPhotoSet.comments) ? puppyPhotoSet.comments : [];
            puppyPhotoSet.comments = data.filter(comment => comment.indexPhotoSet === puppyPhotoSet.indexPhotoSet);
            // this.deleteViewed2(puppyPhotoSet);
            // console.log(`Все комменты event list-comment ID-photoset ${puppyPhotoSet.indexPhotoSet}::: `, puppyPhotoSet.comments);
            this.$forceUpdate();
          });
        }
      });
    },


    // Выбираем все лайки
    listLike: async function (field) {
      await io.socket.get(`/api/v1/likes/list-like/${this.litter.id}/${field}`, function gotResponse(body, response) {
        console.log('Сервис Like List ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
    },


    // Добавить комментарий
    async addComment(field, parentId) {
      this.field = field;
      if (_.isEmpty(this.comment) && _.isEmpty(this.commentChild)) {
        return false;
      }
      let sel = this;
      let data = {
        instanceModuleId: this.litter.id,
        comment: this.comment ? this.comment : this.commentChild,
        nameModule: this.nameModule,
        userName: this.me.fullName,
        field: field,
        letter: this.litter.letter,
        indexPhotoSet: this.ruleForm.show,
        parent: parentId
      };
      console.log('Перед отправкой data: ', data);
      await io.socket.post('/api/v1/comments/add-comment', data, (dataRes, response) => {
        // (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
        (response.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
          (response.statusCode === 409) ? this.mesError(response.headers['x-exit-description']) :
            (response.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';


        if (response.statusCode === 200) {
          this.comment = '';
          this.commentChild = '';
          this.openReplay = false;

          //  data.avatarUrl = this.me.defaultIcon === 'gravatar' ? this.me.gravatar : this.me.avatar;
          // _.isArray(this.litter.puppies[this.ruleForm.show].comments) ? this.litter.puppies[this.ruleForm.show].comments.push(data) : this.litter.puppies[this.ruleForm.show].comments = [data];
        } else {
          sel.$message({
            message: `${this.i19p.textOneErr} ${response.statusCode}! ${this.i19p.textTwoErr}`,
            type: 'error'
          });
        }
      });

    },

    // Добавить Like
    async addLike(command) {
      let data = {
        instanceModuleId: this.litter.id,
        like: command.com,
        nameModule: this.nameModule,
        userName: this.me.fullName,
        field: command.field,
        letter: this.litter.letter,
        indexPhotoSet: command.photoSet.indexPhotoSet
      };
      console.log('POST photoSet data:: ', data);
      let sel = this;
      await io.socket.post('/api/v1/likes/add-like', data, (dataRes, response) => {
        // (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
        (response.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
          (response.statusCode === 409) ? this.mesError(response.headers['x-exit-description']) :
            (response.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';
        if (response.statusCode === 200) {
          this.comment = '';

          //  data.avatarUrl = this.me.defaultIcon === 'gravatar' ? this.me.gravatar : this.me.avatar;
          // _.isArray(this.litter.puppies[this.ruleForm.show].comments) ? this.litter.puppies[this.ruleForm.show].comments.push(data) : this.litter.puppies[this.ruleForm.show].comments = [data];
        } else {
          sel.$message({
            message: `${this.i19p.textOneErr} ${response.statusCode}! ${this.i19p.textTwoErr}`,
            type: 'error'
          });
        }
      });
    },


    // Добавить лайк к комментарию
    async commentLike(command) {
      let data = {
        instanceModuleId: this.litter.id,
        like: command.like,
        commentId: command.commentId,
        nameModule: this.nameModule,
        userName: this.me.fullName,
        field: command.field,
        letter: this.litter.letter,
        indexPhotoSet: command.photoSet.indexPhotoSet
      };

      let sel = this;
      await io.socket.post('/api/v1/likes/comment-like', data, (dataRes, response) => {
        // (jwRes.statusCode === 200) ? (this.mesSuccess(this.i19p.success)) :
        (response.statusCode === 400) ? this.mesError(this.i19p.text400Err) :
          (response.statusCode === 409) ? this.mesError(response.headers['x-exit-description']) :
            (response.statusCode >= 500) ? this.mesError(this.i19p.text500Err) : '';


        if (response.statusCode === 200) {
          this.comment = '';

          //  data.avatarUrl = this.me.defaultIcon === 'gravatar' ? this.me.gravatar : this.me.avatar;
          // _.isArray(this.litter.puppies[this.ruleForm.show].comments) ? this.litter.puppies[this.ruleForm.show].comments.push(data) : this.litter.puppies[this.ruleForm.show].comments = [data];
        } else {
          sel.$message({
            message: `${this.i19p.textOneErr} ${response.statusCode}! ${this.i19p.textTwoErr}`,
            type: 'error'
          });
        }
      });
    },

    dateFrom(t) {
      let a = moment(t);
      let b = moment();
      return a.from(b);

    },

    handleChange(val) {
      console.log(val);
    },
    newComOpen(id) {
      this.newCom = !this.newCom;
      this.comId = id;
    },

    goTo(path) {
      window.location = path;
    },

    goTo2(path) {
      this.goto(path);
    },
    goDog(dogName) {
      let dog = `${this.pathDog}/${dogName.split(" ").join('-')}`;
      this.goTo2(dog);
    },
    goDogsSale() {
      this.goTo2(this.pathDogSale);
    },
  },
});
