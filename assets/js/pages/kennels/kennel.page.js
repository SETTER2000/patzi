parasails.registerPage('kennel', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dialogFormAwards: false,
    direction: 'ttb',
    comment: '',
    circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    sizeList: ["large", "medium", "small"],
    worldWinner: [ {
      year: '2013',
      address: 'Hungary, Budapest',
      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
    }],
    dic: [
      ['en', {
        textOneErr: `An error has occurred`,
        textTwoErr: `No comment added.`,
        warnNoDogs: `There is no possibility to create a litter, while at least one pair of kennels is missing.`,
        warnNoKennel: `At the moment there is no nursery in the database.
         You should create at least one kennel to start with to add a kennel.`,
        text400Err: 'Error. Could not update! ',
        text404Err: 'Mistake. Perhaps you do not have permission to delete this object!',
        text500Err: 'Server Error! Unable to update. ',
        text500ExistsErr: 'Looks like such an entry already exists. Cannot create two identical names. ',
        success: 'Congratulations! Object successfully updated. ',
        selectGender: 'Please select a kennel gender.',
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
        files: `файлов`,
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

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    moment().locale(this.me.preferredLocale);


    console.log('DOGGG ', this.kennel);


  },


  mounted: async function () {
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
     return (value/1000 * 2.20462).toFixed(1);
    },

    getAge: function (value, l, format) {
      if (!value) {
        return '';
      }
      moment.locale(l);
      let formatNew = (!format) ? 'LLL' : format;
      let now = moment.parseZone();
      /*  let event = moment.parseZone(value, ["DD.MM.YYYY"]);
         let a=moment.preciseDiff(now, event);
        console.log('now: ', now);
        console.log('EVENT: ', event);
        console.log('a: ', a);*/
      return moment(value).preciseDiff(now);
      // return moment.parseZone(value).toNow(true);
      // return moment(value).toNow(true);
      // (moment.parseZone(value).format(formatNew)) ? moment.parseZone(value).format(formatNew) : value;
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
        return this.kennel.winner;
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

    }
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    showSliderImages(indexPhoto) {
      this.fullscreenLoading = true;
      this.dialogTableVisible = true;
      this.litterId = this.kennel.id;
      this.photos = this.kennel.images;
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
    getAwards(command) {
      console.log('command::: ', command);
    },
    handlerSetActiveSlider(i) {
      // console.log('Нажали по слайду: ', i);
      // this.photos = _.pluck(this.litter.puppies, 'photos');
      return this.indexPhoto;
    },
    /* Открывает диалоговое окно редактирования*/
    handleCommand(command) {
      switch (command.com) {
        case 'a':
          this.getAwards(command);
          this.dialogFormAwards = true;
          break;
        case 'b':
          this.setValueEditPhotoSet(command);
          break;
        case 'c':
          this.goto('/kennels/chinese-crested');
          break;
        /* case 'f':
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
           break;*/
        //default:  this.setIndexPhotoSet(command);
      }
      // }
      // this.$message('Нажат элемент: ' + command);
    },


  }
});