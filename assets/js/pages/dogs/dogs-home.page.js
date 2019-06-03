parasails.registerPage('dogs-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    centerDialogAdded:false,
    centerDialogVisible:false,
    dialogTableVisible: false,
    innerVisible:false,
    dialogImageUrl: '',
    dialogVisible: false,
    url:"https://d3a1wbnh2r1l7y.cloudfront.net/Continents.jpg",
    fit:'cover',
    files: [],
    fileList:[{name: 'Continents.jpg', url: 'https://d3a1wbnh2r1l7y.cloudfront.net/Continents.jpg'}],
    continents: [],
    formErrors: {},
    mes:{
      text400Err:'Ошибка. Не смог создать!',
      text500Err:'Ошибка сервера! Невозможно создать.',
      success:'Поздравляем! Объект успешно сздан.',
    },
    rules: {
      label: [
        {required: true, message: 'Please input dog name', trigger: 'blur'},
        {min: 3, max: 100, message: 'Length should be 3 to 100', trigger: 'blur'}
      ],
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
      country: [
         {required: true, message: 'Please select your country', trigger: 'change'}
       ],
       dateCreate: [
         {type: 'date', required: true, message: 'Please pick a date', trigger: 'change'}
       ],*/
      subtitle: [
        { message: 'Please tell about the nurseries. It is very interesting.', trigger: 'change'},
        {min: 10, max: 100, message: 'Length should be 10 to 100', trigger: 'blur'}
      ]
    },
    ruleForm: {
      file: undefined,
      phones: [{
        key: 1,
        value: '',
        fullName: '',
      }],
      email: '',
      label: '',
      website: '',
      imageUrl: '',
      previewImageSrc: '',
      continent: null,
      dialogImageUrl: '',
      dialogVisible: false,
      country: null,

      rightName: true,
      registerNumber: '',
      dateCreate: '',
      subtitle: ''
    },
    // fits:'contain',
    // fits:'scale-down',
    fits:'cover',
    items:[
      {name:'Poale Ell Adam',src:'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2.jpg'},
      {name:'Poale Ell Bell',src:'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018-11.jpg'},
      {name:'Poale Ell Bazhen',src:'https://d3a1wbnh2r1l7y.cloudfront.net/Adam-10m.jpg'},
      {name:'Poale Ell Barthalamew',src:'https://d3a1wbnh2r1l7y.cloudfront.net/Lux-2018.jpg'},
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
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    async getList() {
   /*   await io.socket.get(`/api/v1/continents/list`, function gotResponse(body, response) {
        console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });*/

      await io.socket.get(`/api/v1/dogs/list`, function gotResponse(body, response) {
        console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });

      // Принимаем данные по событию list-*
      await io.socket.on('list-dog', (data) => {
        this.dogs = data;
        console.log('this.dogs: ', this.dogs);
      });
      // Принимаем данные по событию list-*
      await  io.socket.on('list-continent', (data) => {
        this.continents = data;
        // this.count = _.get(data, 'count') ?  data.count : this.count;
      });

    },


    handleAvatarSuccess(res, file) {
      this.files.push(file.response);
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm.file = file.response;
    },


    submittedUploadForm: function (result) {
      // Добавлем новые данные в уже имеющийся массив dogs
      this.dogs.push({
        label: this.ruleForm.label,
        id: result.id,
        imageSrc: result.imageSrc,
        title: this.ruleForm.title,
        // dateCreate: JSON.stringify(this.ruleForm.date1),
        owner: {
          id: this.me.id,
          fullName: this.me.fullName,
        },
      });
      this._clearUploadModal();
    },


    beforeAvatarUpload(file) {
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png');
      const isLt1M = file.size / 1024 / 1024 < 0.25;
      if (!isJPG) {
        this.$message.error(`Logo picture must be JPG or PNG format!`);
      }
      if (!isLt1M) {
        this.$message.error(`File ${file.name} picture size can not exceed 250Kb!`);
      }
      return isJPG && isLt1M;
    },


    handlePreview(file){
      console.log(file);
    },

    handleRemove(file,fileList){
      console.log('FILE:',file);
      console.log('FILELIST: ',fileList);
      this.fileList=fileList;
    },

    addDomain() {
      this.ruleForm.phones.push({
        key: Date.now(),
        value: ''
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.fileList = [];
      this.dialogImageUrl='';
    },


    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addDog();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


    async addDog() {
      let data = {
        fileList: this.fileList,
        label: this.ruleForm.label,
        dateCreate: JSON.stringify(this.ruleForm.dateCreate),
        continent: this.ruleForm.continent,
        country: this.ruleForm.country,
        city: this.cityId,
        rightName: this.ruleForm.rightName,
        site: this.ruleForm.site,
        registerNumber: this.ruleForm.registerNumber,
        subtitle: this.ruleForm.subtitle,
        yourKennel: this.ruleForm.yourKennel,
        address: this.ruleForm.address,
        phones: this.ruleForm.phones
      };


      await io.socket.post('/api/v1/dogs/create-dog', data, (data, jwRes) => {
        (jwRes.statusCode === 200) ? (this.mesSuccess(this.mes.success)) :
          (jwRes.statusCode === 400) ? this.mesError(this.mes.text400Err) :
            (jwRes.statusCode >= 500) ? this.mesError(this.mes.text500Err) : '';

        console.log('Сервер ответил-2 кодом ' + jwRes.statusCode + ' и данными: ', data);
        this.centerDialogAdded = false;
        if (jwRes.statusCode === 200) {
          this.resetForm('ruleForm');
          this.ruleForm.file = [];
          this.ruleForm.imageUrl = '';
          this.ruleForm.phones[0].fullName = '';
          this.getList();
        }
      });
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
  }
});
