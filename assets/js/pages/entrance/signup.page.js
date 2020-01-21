parasails.registerPage('signup', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    // Form data
    formData: { /* … */ },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: { /* … */ },

    // Syncing / loading state
    syncing: false,

    // Server error state
    cloudError: '',

    // Success state when form has been submitted
    cloudSuccess: false,
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

    submittedForm: async function() {
      if(this.isEmailVerificationRequired) {
        // Если подтверждение по электронной почте включено, показать сообщение об успехе.
        this.cloudSuccess = true;
      }
      else {
        // В противном случае, перенаправить на панель входа в систему.
        //> (Обратите внимание, что здесь мы снова включаем состояние синхронизации. Это специально
        //> чтобы убедиться, что спиннер остается там до завершения навигации по страницам.)
        this.syncing = true;
        window.location = '/';
      }
    },

    handleParsingForm: function() {
      // Удалите все существующие сообщения об ошибках.
      this.formErrors = {};

      var argins = this.formData;

      // Validate full name:
      if(!argins.fullName) {
        this.formErrors.fullName = true;
        this.$message({
          showClose: true,
          message: 'Бумс! Пожалуйста введите Ваше ФИО.',
          type: 'error'
        });
      }

      // Validate email:
      if(!argins.emailAddress || !parasails.util.isValidEmailAddress(argins.emailAddress)) {
        this.formErrors.emailAddress = true;
        this.$message({
          showClose: true,
          message: 'Бумс! Пожалуйста введите правильный email.',
          type: 'error'
        });
      }

      // Validate password:
      if(!argins.password) {
        this.formErrors.password = true;

        this.$message({
          showClose: true,
          message: 'Ошибка. Вы не указали пароль.',
          type: 'error'
        });
      }

      // Length password:
      if(argins.password.length<7) {
        this.formErrors.password = true;

        this.$message({
          showClose: true,
          message: 'Ошибка. длина пароля не менее 7 знаков.',
          type: 'error'
        });
      }

      // Подтвердите подтверждение пароля:
      if(argins.password && argins.password !== argins.confirmPassword) {
        this.formErrors.confirmPassword = true;
        this.$message({
          showClose: true,
          message: 'Ошибка. Пороли не совпадают.',
          type: 'error'
        });
      }

      // Подтвердить соглашение ToS:
      if(!argins.agreed) {
        this.formErrors.agreed = true;
      }

      // Если были какие-либо проблемы, они уже были сообщены пользователю,
      // так просто вернуть undefined. (Это означает, что представление должно быть
      // отменено.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },

  }
});
