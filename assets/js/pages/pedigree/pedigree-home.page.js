parasails.registerPage('pedigree-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    timeout:  null,
    resultSearch:'',
    ruleForm: {
      search: ''
    },
    rules: {
      // search: [
      //   {required: true, message: 'Please input name dog', trigger: 'blur'},
      //   {min: 1, max: 5, message: 'Length should be 1 to 5', trigger: 'blur'}
      // ]
    },
    dogs: [],
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },


  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    // querySearch(queryString, cb) {
    //   let links = this.links;
    //   let results = queryString ? links.filter(this.createFilter(queryString)) : links;
    //   // вызвать функцию обратного вызова для возврата предложений
    //   cb(results);
    // },

    /**
     * Выбираем всех собак соответствующих запросу.
     * Поиск соответствующей подстроки в полном имени собаки.
     */
    async dogsList(queryString) {
      let data = {queryString:queryString};
      await io.socket.post(`/api/v1/dogs/search-dog`, data, function gotResponse(body, response) {
        // console.log('Сервис Dogs dam ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию search-*
      await io.socket.on('search-dog', (data) => {
        console.log('dams: ', data);
        this.dogs = data;
      });
    },


    async querySearchAsync(queryString, cb) {
       queryString ? await this.dogsList(queryString) : this.dogs;
      clearTimeout(this.timeout);
      // cb(this.dogs);
      this.timeout = setTimeout(() => {
        cb(this.dogs);
      }, 1000 * Math.random());
    },


    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },


    resetForm(formName) {
      this.$refs[formName].resetFields();
    },


    handleSelect(item) {
      console.log('Получено значение ввода: ', item);
      this.resultSearch = item;

    },

    focus(item) {
      // console.log('focus:: ', item);
    },

    change(item) {
      // console.log('change:: ', item);
    },

    blur(item) {
      // console.log('blur:: ', item);
    }


  }
});
