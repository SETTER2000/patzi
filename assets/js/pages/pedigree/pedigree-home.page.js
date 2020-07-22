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
    gDate: function (value, opt) {
      if (!value) {
        return '';
      }
      switch (opt) {
        case 'y':
          opt = 'year';
          break;
        case 'd':
          opt = 'date';
          break;
        case 'm':
          opt = 'month';
          break;
        case 'h':
          opt = 'hour';
          break;
        case 's':
          opt = 'second';
          break;
        case 'ml':
          opt = 'millisecond';
          break;
        default:
          opt = 'date';
      }
      let r = moment(value).get(opt);
      return opt === 'month' ? r + 1 : r;
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

    abc(value, ruleForm) {
      if (!value) {
        return '';
      }
      this.ruleForm = ruleForm;
      const regex = /[ a-z]+/i;
      let r = regex.exec(value);
      _.isArray(r) ? this.ruleForm.label = r[0] : '';
      this.ruleForm.errInputDogName = (!_.isArray(r));
      r = [];
      // return (moment.parseZone(value).format(formatNew)) ? moment.parseZone(value).format(formatNew) : value;
    },

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
          // console.log('error submit!!');
          return false;
        }
      });

    },


    resetForm(formName) {
      this.$refs[formName].resetFields();
    },


    async  handleSelect(item) {
      console.log('Получено значение ввода: ', item);
      await io.socket.put(`/api/v1/pdg`, item, function gotResponse(body, response) {
        // console.log('Сервис Dogs dam ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      // Принимаем данные по событию search-*
      await io.socket.on('list-pedigree', (data) => {
        console.log('PEDIGRRR: ', data);
        item.pedigree = data;
        this.resultSearch = item;
      });


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
