/**
 * <patzi-post-services>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPostServices', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'objData',
    'experts',
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      vid: false
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
        <section class="service-area section-gap-top">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-title text-center">
            <h3>{{objData.preferredLocale === 'ru' ? 'Наши Услуги' : 'Our Services'}}</h3>
            <h2><span>{{objData.preferredLocale === 'ru' ? 'Мы Предлагаем' : 'Overexposure of Dogs'}}</span></h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-6">
          <div class="single-service wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.6s">
            <div class="d-flex align-items-center mb-3">
              <i class="flaticon-button"></i>
              <h4 class="ml-3">{{objData.preferredLocale === 'ru' ? 'Передержка собак' : 'Overexposure of Dogs'}}</h4>
            </div>
            <p>{{objData.preferredLocale === 'ru' ? 'Если вам нужно отправиться в короткое путешествие, мы с удовольствием возьмем нашу собаку на несколько дней бесплатно.' : 'If you need to go on a short trip, we will gladly take our dog for a few days for free.'}}</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-service wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s">
            <div class="d-flex align-items-center mb-3">
              <i class="flaticon-water"></i>
              <h4 class="ml-3">{{objData.preferredLocale === 'ru' ? 'Натуральное питание' : 'Natural Nutrition'}}</h4>
            </div>
            <p>{{objData.preferredLocale === 'ru' ? 'Все собаки питомника питаются только натуральной пищей. Мясо, овощи, фрукты. Индивидуальный подход.' : 'All dogs of the kennel eat only natural food. Meat, vegetables, fruits. Individual approach.'}}</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-service wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.6s">
            <div class="d-flex align-items-center mb-3">
              <i class="flaticon-ring"></i>
              <h4 class="ml-3">{{objData.preferredLocale === 'ru' ? 'Возврат собаки' : 'Return of the Dog'}}</h4>
            </div>
            <p>{{objData.preferredLocale === 'ru' ? 'Всегда готовы забрать нашу собаку, если по какой-то причине у вас нет возможности продолжать содержать домашнее животное.' : 'Always ready to take back our dog, if for some reason you do not have the opportunity to continue to contain a pet.'}}</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-service wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.6s">
            <div class="d-flex align-items-center mb-3">
              <i class="flaticon-art"></i>
              <h4 class="ml-3">{{objData.preferredLocale === 'ru' ? 'Выставка собак' : 'Dog Show'}}</h4>
            </div>
            <p>{{objData.preferredLocale === 'ru' ? 'Перспективные собаки, с согласия владельца - показ на выставках за счет питомника.' : 'Promising dogs, with the consent of the owner - display at exhibitions at the expense of the kennel.'}}</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-service wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.0s">
            <div class="d-flex align-items-center mb-3">
              <!--<i class="flaticon-shirt"></i>-->
              <i class="groom"></i>
              <h4 class="ml-3">{{objData.preferredLocale === 'ru' ? 'Стрижка собак' : 'Dog Grooming'}}</h4>
            </div>
            <p>{{objData.preferredLocale === 'ru' ? 'Модная, породная стрижка. Мытьё. Чистка ушей, когтей, эпиляция. Использование профессиональной косметики.' : 'Fashionable, haircut. The washing up. Cleaning the ears, claws, hair removal. Use of professional cosmetics.'}}</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-service wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.6s">
            <div class="d-flex align-items-center mb-3">
              <i class="flaticon-content"></i>
              <h4 class="ml-3">{{objData.preferredLocale === 'ru' ? 'Освещение событий' : 'Event Coverage'}}</h4>
            </div>
            <p>{{objData.preferredLocale === 'ru' ? 'Постоянная поддержка владельцев, скидки на закупку лекарств, расходных материалов, кормов и т.п.' : 'Permanent support of the owners, discounts on the purchase of medicines, consumables, feed, etc.'}}</p>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="single-service wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.6s">
            <div class="d-flex align-items-center mb-3">
              <i class="flaticon-content"></i>
              <h4 class="ml-3">{{objData.preferredLocale === 'ru' ? 'Фотограф для питомца' : 'Pet photographer'}}</h4>
            </div>
            <p>{{objData.preferredLocale === 'ru' ? 'Фотосессия вас и вашей собаки. По желанию на улице или дома. Оплата договорная, в среднем 3000 руб. за фотосессию. Это примерно 1-2 часа. В среднем от 10 до 30 фото, профессионального качества.' : 'Photo session of you and your dog. Optionally on the street or at home. Payment is negotiable, on average 1500 rubles. for the photo session. This is approximately 1-2 hours. On average, 10 to 30 photos, professional quality.'}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>


`,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    this.vid = (this.video && this.video.length > 0);
  },
  computed: {},

  mounted: async function () {
    this.data = this.objData.data ? this.objData.data : this.data;
  },

  beforeDestroy: function () {
    //...
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    classObject(index) {
      index = index + 1;
      var o = {
        'u-active': (index === 1)
      };
      o[`u-section-3-${index}`] = true;
      return o;
    },
    // removeItem(id) {
    //   // Генерируем событие, возможно с передаваемыми данными
    //   this.$emit('remove', id);
    // },
    // editPost(post) {
    //   // Генерируем событие, возможно с передаваемыми данными
    //   this.$emit('editpost', post);
    // },
  }
});
