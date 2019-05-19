// Регистрируем глобальную пользовательскую директиву `v-focus`
/*parasails.directive('focus', {
  // Когда привязанный элемент вставлен в DOM...
  inserted: function (el) {
    // Переключаем фокус на элемент
    el.focus();
  }
});*/
parasails.registerPage('users-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    value: '',
    value1: '',
    value2: '',
    value3: '',
    value5: [],
    value11: [],
    search: '',
    users: [],
    // options: '',
    pickerOptions: {
      shortcuts: [{
        text: 'Today',
        onClick(picker) {
          picker.$emit('pick', new Date());
        }
      },
      {
        text: 'Yesterday',
        onClick(picker) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          picker.$emit('pick', date);
        }
      },
      {
        text: 'A week ago',
        onClick(picker) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', date);
        }
      }]
    },
    tableData: [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ],
    multipleSelection: [],
    selectOptions: [
      {
        value: 'Option1',
        label: 'Option1'
      }, {
        value: 'Option2',
        label: 'Option2'
      }, {
        value: 'Option3',
        label: 'Option3'
      }, {
        value: 'Option4',
        label: 'Option4'
      }, {
        value: 'Option5',
        label: 'Option5'
      }
    ],
  },
  watch: {
    // эта функция запускается при любом изменении вопроса
    users: function (newUsers, oldUsers) {
      this.getUsers = newUsers;
      console.log('watcher: ', this.getUsers);
    }
  },
  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);

    // Использование .get('/user') извлечет список текущих пользовательских моделей,
    // подписываем этот сокет на эти модели, И подписываем этот сокет
    // для уведомлений о новых моделях пользователей при их создании.
    io.socket.get('/sockets/user/hello', function gotResponse(body, response) {
      // _.extend(this.users, body);
      console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
  },
  // зарегистрировать директиву локально
  directives: {
    focus: {
      // определение директивы
      inserted: function (el) {
        el.focus();
      }
    }
  },
  filters: {
    /*date: function (value) {
      // return value.toLocaleString();
      if (!value) return '';
      let date, year, month, dt;
      date = new Date(value);
      year = date.getFullYear();
      month = date.getMonth() + 1;
      dt = date.getDate();
      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }
      return  (this.me.preferredLocale ==='ru') ? `${dt}.${month}.${year}`:`${year}.${month}.${dt}`;
    }*/
  },

  mounted: function () {
    this.$emit('valChanged', this.value);
  },
  computed: {
    getUsers: {
      get: function () {
        return this.users.filter((user) => {
          return (user.fullName);
        });
      },
      set: function (newValue) {
        console.log('newValue:', newValue);
        return newValue.filter((user) => {
          return (user.fullName);
        });
      },
    },
    getTableData() {
      this.tableData = this.users.filter((user) => {
        return !_.isEmpty(user.fullName);
      });
    },
  },


  // created() {
  //   emitEvent.$on('valChanged', (e) => {
  //     this.val = e;
  //   })
  // },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    updateMessage: async function () {
      /**
       * TODO WEBSOCKET: Подключаемся к сокету обработка события user
       */
      // Автоматически созданный сокет отображается как io.socket.
      // Используйте .on (), чтобы подписаться на событие 'user' на клиенте.
      // Это событие отправлено Sails "create", "update",
      // "удалить", "добавить" и "удалить" чертежи к любому сокету, который
      // подписан на один или несколько экземпляров модели User.
      await io.socket.on('hello', function (data) {

        this.users = Object.assign({}, this.users, data);
        console.log('this.users-1: ', this.users);
      });
      console.log('this.users-2: ', this.users);
      /**
       * TODO WEBSOCKET: End
       */
      // console.log(this.$el.textContent);// => 'не обновлено'
      // await this.$nextTick();
      // console.log(this.$el.textContent); // => 'обновлено'

    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete: async function (index, row) {
      // console.log(index, row);
      // /users/destroy-one-user
      io.socket.delete('/users/destroy-one-user', {'id': row.id}, function gotResponse(data, jwRes) {
        console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
      });
      await this.updateMessage();
    },
    handleClick() {
      console.log('click');
    },


    /**************** SOCKET.IO ****************/
    sayHello: function () {
      // And use `io.socket.get()` to send a request to the server:
      io.socket.get('/sockets/user/hello', function gotResponse(data, jwRes) {
        console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
      });
    }
  }
});
