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
    search: '',
    collapse:false,
    text: '',
    confirm: false,
    rowTable: '',
    users: [],
    fits: 'cover',
    objOne: '',
    dialogTableVisible: false,
    centerDialogVisible: false,
    centerDialogVisibleConfirm: false,
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
  // watch: {
  //   // эта функция запускается при любом изменении users
  //   users: function (newUsers, oldUsers) {
  //     this.getUsers = newUsers;
  //     console.log('watcher: ', this.getUsers);
  //   }
  // },
  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    // Использование .get('/user') извлечет список текущих пользовательских моделей,
    // подписываем этот сокет на эти модели, И подписываем этот сокет
    // для уведомлений о новых моделях пользователей при их создании.
    io.socket.get('/sockets/user/list', function gotResponse(body, response) {
      // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
    });
    io.socket.on('list', (data) => this.users = data);
    console.log('this.users', this.users);
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
        if (_.isArray(this.users)) {
          return this.users.filter((user) => {
            return (user.fullName);
          });
        }
        return [];
      },
      set: function (newValue) {
        console.log('newValue:', newValue);
        if (_.isArray(newValue)) {
          return newValue.filter((user) => {
            return (user.fullName);
          });
        }

        return [];
      },
    },
    getTableData() {
      this.tableData = this.users.filter((user) => {
        return !_.isEmpty(user.fullName);
      });
    },
  },


  // created() {
  //
  // },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    async getList() {
      await  io.socket.get('/sockets/user/list', function gotResponse(body, response) {
        // console.log('Сервер ответил кодом ' + response.statusCode + ' и данными: ', body);
      });
      await  io.socket.on('list', (data) => this.users = data);
    },

    confirmDeletion() {

      this.centerDialogVisibleConfirm = false;
      this.confirm = true;
      let self = this;
      if (this.confirm) {


        /**
         * TODO WEBSOCKET: Удаление объекта
         */
        io.socket.delete('/users/destroy-one-user', {'id': self.rowTable.id}, (data, jwRes) => {
          if (jwRes.statusCode === 404) {
            self.text = 'Этого пользователя нельзя удалить. Это системная запись, возможно isSuperAdmin.';
            self.centerDialogVisible = true;
          } else {
            self.getList();
            console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
          }

        });
        /**
         * TODO WEBSOCKET: End
         */
        self.rowTable = '';
        self.confirm = false;
      }
    },

    handleDelete(index, row) {
      console.log('index', index);
      console.log('row', row);
      this.text = `Вы действительно хотите удалить этого пользователя? 
        Учётную запись невозможно будет восстановить.`;
      this.centerDialogVisibleConfirm = true;
      this.rowTable = row;
    },

    handleSelect(index, row) {
      console.log('Function handleSelect');
      io.socket.put('/users/update-user-group', {'id': row.id, 'groupId': row.groups}, (data, jwRes) => {
        this.getList();
        console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
      });
      // console.log('selectedGroup', this.selectedGroup);
      // console.log('index', index);
      // console.log('row', row.id);
    },


    handleDeleteGroup(e, index, row) {
      io.socket.delete('/users/destroy-user-group', {'id': row.id, 'groupId': [e]}, (data, jwRes) => {
        this.getList();
        console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
      });
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

    handleClick() {
      console.log('click');
    },

    clickShowPhoto(index, row) {
      this.dialogTableVisible = true;
      console.log('row:', row);
      this.objOne = row;
    }


    /**************** SOCKET.IO ****************/
    // sayHello: function () {
    //   // And use `io.socket.get()` to send a request to the server:
    //   io.socket.get('/sockets/user/list', function gotResponse(data, jwRes) {
    //     console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
    //   });
    // }
  }
});

