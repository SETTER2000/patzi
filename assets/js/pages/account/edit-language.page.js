parasails.registerPage('edit-language', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    // Main syncing/loading state for this page.
    // Основное состояние синхронизации/загрузки для этой страницы.
    syncing: false,

    // Form data
    formData: {
      // language:'en'
      checked:''
    },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    // Для отслеживания ошибок проверки на стороне клиента в нашей форме.
    //> Имеет свойство, установленное в `true` для каждого недопустимого свойства в` formData`.
    formErrors: { /* … */ },

    // Server error state for the form
    // Состояние ошибки сервера для формы
    cloudError: '',
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.formData.language = this.me.preferredLocale;
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    submittedForm: async function() {
      // Redirect to a different web page on success.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
      // Перенаправление на другую веб-страницу в случае успеха.
      //> (Обратите внимание, что здесь мы снова включаем состояние синхронизации. Это специально
      //> чтобы убедиться, что спиннер остается там до завершения навигации по страницам.)
      this.syncing = true;
      window.location = '/account';
    },

    handleParsingForm: function() {
      // Clear out any pre-existing error messages.
      // Удалить все существующие сообщения об ошибках.
      this.formErrors = {};
      var argins = { language: this.formData.language };

      // Validate password:
      if(!argins.language) {
        this.formErrors.language = true;
      }

      // Validate password confirmation:
      // if(argins.password && argins.password !== this.formData.confirmPassword) {
      //   this.formErrors.confirmPassword = true;
      // }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
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
