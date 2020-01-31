/**
 * <patzi-post-topics>
 * -----------------------------------------------------------------------------
 * Компонент для представления тем постов в слайдере.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPostTopics', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'objData',
    'topics'
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: ` 
 <section  class="u-carousel  u-slide u-valign-middle u-block-fbe7-1" src="" id="carousel_c5ca" data-interval="5000" data-u-ride="carousel">
    <ol class="u-absolute-hcenter u-carousel-indicators u-block-fbe7-5">
    <template v-for="(i) in topics.length">
      <li data-u-target="#carousel_c5ca" class="u-grey-30"  :data-u-slide-to="i"></li>
      </template>
    </ol>
    <div ref="$wrapper" class="u-carousel-inner" role="listbox">

      <div  v-for="(d,ind) in topics" :key="d.id"  class="-lg -sm -xl -xs u-align-center u-carousel-item u-clearfix u-image u-shading" :class="[{'u-active':d.active},d.uSectionClass]" src="" data-image-widatah="1148" data-image-height="678">
        <div class="u-clearfix u-sheet u-sheet-1">
          <div class="u-align-left u-container-style u-expanded-widatah u-group u-group-1">
            <div class="u-container-layout u-container-layout-1">
              <h1 class="u-text u-title u-text-1">{{objData.preferredLocale === 'ru' ? d.labelRu : d.label}}</h1>
              <p class="u-large-text u-text u-text-variant u-text-2">{{objData.preferredLocale === 'ru' ? d.subtitleRu : d.subtitle}}</p>
              <a href="#" class="u-border-radius-0 u-btn u-btn-rectangle u-button-style u-palette-1-base u-btn-1">{{objData.preferredLocale === 'ru' ? 'Выбрать' : 'Select'}}</a>
            </div>
          </div>
          <div class="u-clearfix u-expanded-widatah u-gutter-30 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
              <div class="u-layout-row">
                <div v-for="(im,ind) in d.images" :key="im.id" class="u-align-left u-container-style u-image u-layout-cell u-left-cell u-size-15 u-size-30-md " :class="im.uImage" src="">
                  <div class="u-container-layout " :class="im.uContainerLayout" src=""></div>
                </div>   
                <!-- <div class="u-align-left u-container-style u-image u-layout-cell u-left-cell u-size-15 u-size-30-md u-image-1" src="">
                  <div class="u-container-layout u-container-layout-2" src=""></div>
                </div>
                <div class="u-align-center u-container-style u-image u-layout-cell u-size-15 u-size-30-md u-image-2" src="" data-image-widatah="1600" data-image-height="1067">
                  <div class="u-container-layout u-container-layout-3" src=""></div>
                </div>
                <div class="u-align-left u-container-style u-hidden-sm u-hidden-xs u-image u-layout-cell u-size-15 u-size-30-md u-image-3" src="">
                  <div class="u-container-layout u-container-layout-4" src=""></div>
                </div>
                <div class="u-align-left u-container-style u-hidden-sm u-hidden-xs u-image u-layout-cell u-right-cell u-size-15 u-size-30-md u-image-4" src="">
                  <div class="u-container-layout u-container-layout-5" src=""></div>
                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>

     <!-- <div class="-lg -sm -xl -xs u-carousel-item u-clearfix u-image u-shading u-section-3-2" src="" data-image-widatah="1200" data-image-height="799">
        <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <div class="u-align-left u-container-style u-group u-group-1">
            <div class="u-container-layout u-container-layout-1">
              <h1 class="u-text u-title u-text-1"><%= __('Show') %></h1>
              <p class="u-large-text u-text u-text-variant u-text-2"><%= __('Puppies that have already grown up often realize that an exhibition is not just a lot of tasty smells, but also 5, 6, 7, etc. pieces of delicious, fragrant goodies') %>.</p>
              <a href="#" class="u-border-radius-0 u-btn u-btn-rectangle u-button-style u-palette-1-base u-btn-1">Выбрать</a>
            </div>
          </div>
          <div class="u-clearfix u-gutter-30 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
              <div class="u-layout-row">
                <div class="u-align-left u-container-style u-image u-layout-cell u-left-cell u-size-15 u-size-30-md u-image-1" src="" data-image-widatah="690" data-image-height="460">
                  <div class="u-container-layout u-container-layout-2" src=""></div>
                </div>
                <div class="u-align-left u-container-style u-image u-layout-cell u-size-15 u-size-30-md u-image-2" src="" data-image-widatah="690" data-image-height="460">
                  <div class="u-container-layout u-container-layout-3" src=""></div>
                </div>
                <div class="u-align-left u-container-style u-hidden-sm u-hidden-xs u-image u-layout-cell u-size-15 u-size-30-md u-image-3" src="" data-image-widatah="1600" data-image-height="1067">
                  <div class="u-container-layout u-container-layout-4" src=""></div>
                </div>
                <div class="u-align-left u-container-style u-hidden-sm u-hidden-xs u-image u-layout-cell u-right-cell u-size-15 u-size-30-md u-image-4" src="" data-image-widatah="1600" data-image-height="1067">
                  <div class="u-container-layout u-valign-middle u-container-layout-5" src=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="-lg -sm -xl -xs u-align-left u-carousel-item u-clearfix u-image u-shading u-section-3-3" src="" data-image-widatah="1600" data-image-height="1067">
        <div class="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xl u-sheet-1">
          <div class="u-align-left u-container-style u-group u-group-1">
            <div class="u-container-layout u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-container-layout-1">
              <h1 class="u-text u-title u-text-1">У природы нет плохой погоды</h1>
              <p class="u-large-text u-text u-text-variant u-text-2">Улица... какое волнующее слово с детства для каждого ребёнка. Собаки в данном случае не исключение, они как дети, всегда готовы на прогулку.</p>
              <a href="#" class="u-border-radius-0 u-btn u-btn-rectangle u-button-style u-palette-1-base u-btn-1">Выбрать</a>
            </div>
          </div>
          <div class="u-clearfix u-expanded-widatah-md u-gutter-30 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
              <div class="u-layout-row">
                <div class="u-align-left u-container-style u-image u-layout-cell u-left-cell u-size-15 u-size-30-md u-image-1" src="" data-image-widatah="1600" data-image-height="900">
                  <div class="u-container-layout u-container-layout-2" src=""></div>
                </div>
                <div class="u-align-center u-container-style u-image u-layout-cell u-size-15 u-size-30-md u-image-2" src="" data-image-widatah="1000" data-image-height="684">
                  <div class="u-container-layout u-container-layout-3" src=""></div>
                </div>
                <div class="u-align-left u-container-style u-hidden-sm u-hidden-xs u-image u-layout-cell u-size-15 u-size-30-md u-image-3" src="" data-image-widatah="1198" data-image-height="1191">
                  <div class="u-container-layout u-container-layout-4" src=""></div>
                </div>
                <div class="u-align-left u-container-style u-hidden-sm u-hidden-xs u-image u-layout-cell u-right-cell u-size-15 u-size-30-md u-image-4" src="">
                  <div class="u-container-layout u-valign-middle u-container-layout-5" src=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="-lg -sm -xl -xs u-carousel-item u-clearfix u-image u-shading u-section-3-4" src="" data-image-widatah="731" data-image-height="1024">
        <div class="u-clearfix u-sheet u-sheet-1">
          <div class="u-align-left u-container-style u-group u-group-1">
            <div class="u-container-layout u-container-layout-1">
              <h1 class="u-text u-title u-text-1">Хендлинг</h1>
              <p class="u-large-text u-text u-text-variant u-text-2">Школа - это не очень нужное слово в детстве, а учёба вообще крайне бессмысленное понятие, но что поделать когда так хочется награды и признания. Приходится идти на жертвы и тратить своё драгоценное время на обучение с незнакомыми
                людьми в незнакомом месте, поначалу это ужасно страшно.</p>
              <a href="#sec-c504" class="u-border-radius-0 u-btn u-btn-rectangle u-button-style u-palette-1-base u-btn-1">Выбрать</a>
            </div>
          </div>
          <div class="u-clearfix u-expanded-widatah-md u-expanded-widatah-sm u-expanded-widatah-xs u-gutter-30 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
              <div class="u-layout-row">
                <div class="u-align-left u-container-style u-image u-layout-cell u-left-cell u-size-15 u-size-30-md u-image-1" src="" data-image-widatah="1600" data-image-height="1067">
                  <div class="u-container-layout u-valign-middle-sm u-valign-middle-xs u-container-layout-2" src=""></div>
                </div>
                <div class="u-align-center u-container-style u-image u-layout-cell u-size-15 u-size-30-md u-image-2" src="" data-image-widatah="1600" data-image-height="1067">
                  <div class="u-container-layout u-container-layout-3" src=""></div>
                </div>
                <div class="u-align-left u-container-style u-hidden-sm u-hidden-xs u-image u-layout-cell u-size-15 u-size-30-md u-image-3" src="" data-image-widatah="1423" data-image-height="800">
                  <div class="u-container-layout u-container-layout-4" src=""></div>
                </div>
                <div class="u-align-left u-container-style u-hidden-sm u-hidden-xs u-image u-layout-cell u-right-cell u-size-15 u-size-30-md u-image-4" src="" data-image-widatah="1600" data-image-height="900">
                  <div class="u-container-layout u-container-layout-5" src=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="-lg -sm -xl -xs u-carousel-item u-clearfix u-image u-shading u-section-3-5" src="" data-image-widatah="1600" data-image-height="1067">
        <div class="u-clearfix u-sheet u-sheet-1">
          <div class="u-align-left u-container-style u-group u-group-1">
            <div class="u-container-layout u-valign-middle u-container-layout-1">
              <h1 class="u-text u-title u-text-1"><%= __('Grooming') %></h1>
              <p class="u-large-text u-text u-text-variant u-text-2"><%= __('No hairstyle - nowhere') %>!&nbsp;
                <br>- <%= __('Mommy, make me beautiful everywhere') %>.
              </p>
              <a href="#sec-c504" class="u-border-radius-0 u-btn u-btn-rectangle u-button-style u-palette-1-base u-btn-1">Выбрать</a>
            </div>
          </div>
          <div class="u-clearfix u-expanded-widatah-md u-expanded-widatah-sm u-expanded-widatah-xs u-gutter-30 u-layout-wrap u-layout-wrap-1">
            <div class="u-layout">
              <div class="u-layout-row">
                <div class="u-align-left u-container-style u-image u-layout-cell u-left-cell u-size-15 u-size-30-md u-image-1" src="">
                  <div class="u-container-layout u-container-layout-2" src=""></div>
                </div>
                <div class="u-align-center u-container-style u-image u-layout-cell u-size-15 u-size-30-md u-image-2" src="">
                  <div class="u-container-layout u-container-layout-3" src=""></div>
                </div>
                <div class="u-align-left u-container-style u-hidden-sm u-hidden-xs u-image u-layout-cell u-size-15 u-size-30-md u-image-3" src="" data-image-widatah="1600" data-image-height="1066">
                  <div class="u-container-layout u-container-layout-4" src=""></div>
                </div>
                <div class="u-align-left u-container-style u-hidden-sm u-hidden-xs u-image u-layout-cell u-right-cell u-size-15 u-size-30-md u-image-4" src="" data-image-widatah="1067" data-image-height="1600">
                  <div class="u-container-layout u-valign-middle u-container-layout-5" src=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>-->
    </div>
    <a class="u-absolute-vcenter u-carousel-control u-carousel-control-prev u-text-grey-30 u-block-fbe7-3" href="#carousel_c5ca" role="button" data-u-slide="prev">
        <span aria-hidden="true">
          <svg viewBox="0 0 477.175 477.175"><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
                    c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"></path></svg>
        </span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="u-absolute-vcenter u-carousel-control u-carousel-control-next u-text-grey-30 u-block-fbe7-4" href="#carousel_c5ca" role="button" data-u-slide="next">
        <span aria-hidden="true">
          <svg viewBox="0 0 477.175 477.175"><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
                    c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"></path></svg>
        </span>
      <span class="sr-only">Next</span>
    </a>
  </section>
`,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    console.log('this.objData888::: ', this.objData);
    console.log('this.topics ***::: ', this);
    // this.updateChart(this.$refs.$wrapper, _.sortBy(this.objData.data,'label'));
    this.data = this.objData.data ? this.objData.data : this.data;

  },


  mounted: async function () {
    // if (this.objData.data === undefined) {
    //   throw new Error('Neither `:data`  was passed in to <patzi-post-topics>, but one or the other must be provided.');
    // }

    if (this.topics === undefined) {
      throw new Error('Neither `:topics`  was passed in to <patzi-post-topics>, but one or the other must be provided.');
    }

    this.updateStyle(this.$refs.img, this.topics.topicBackground);

  },

  beforeDestroy: function () {
    //...
  },
  computed: {
    gop: {
      get: function () {
        // Возвращаем объект языка, соответствующий значению: this.me.preferredLocale
        return this.topics;
      }
    },

  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    updateStyle(wrapper, objData) {
      console.log('wrapper::: ', wrapper);

      if (!wrapper) {
        return;
      }
      console.log('objData -- 9999 :: ', objData);
      let img = _.last(_.pluck(objData, 'imageSrc'));
      console.log('imm:', img);

      (img && img.length) > 0 ? $(wrapper).css('backgroundImage', 'url(' + img + ')') : '';

    }
  }
});
