parasails.registerPage('litter', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dialogTableVisible: false,
    autoplay:true,
    isAfterDate:false,
    url:null,
    dic: [
      ['en', {
        warnNoDogs: `There is no possibility to create a litter, while at least one pair of dogs is missing.`,
        warnNoKennel: `At the moment there is no nursery in the database.
         You should create at least one kennel to start with to add a dog.`,
        text400Err: 'Error. Could not create! ',
        text500Err: 'Server Error! Unable to create. ',
        text500ExistsErr: 'Looks like such an entry already exists. Cannot create two identical names. ',
        success: 'Congratulations! Object successfully created. ',
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
    fits:'cover',
    items:[
      {label:'Poale Ell Adam',       imageSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2.jpg'},
      {label:'Poale Ell Bell',       imageSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018-11.jpg'},
      {label:'Poale Ell Bazhen',     imageSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/Adam-10m.jpg'},
      {label:'Poale Ell Barthalamew',imageSrc:'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018.jpg'},
    ],
    litters:[],
    ratio:null,
    colors: ['#99A9BF', '#F7BA2A', '#FF9900'] // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.isAfter();
  },
  mounted: async function() {
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
    // Вытаскивает фото для обложки альбома
    photos: function () {
      // return _.pickBy(this.litters, function(u) {
      //   return u.active;
      // });
      return this.litter.images;
      // _.each(this.litters, async (litter) => {
      //
      // });
      // console.log('DXXX:', this.litters.filter(litter => litter.images[litter.cover]));
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

    changeRatio() {
      this.$message({
        message: 'Спасибо за оценку. Ваш голос был учтён!',
        type: 'success'
      });
    },
    showSlider(){
      this.dialogTableVisible= true;
    },
    isAfter(){
      // Проверка даты
      // Вернёт true, если this.litter.born  пока в будущем (не прошла)
      this.isAfterDate = moment(new Date()).isSameOrBefore(moment(this.litter.born, "LL"));
    },

    goTo(path) {
      window.location = `${path}`;
    },
  },
});
