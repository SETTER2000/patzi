/**
 * <patzi-posts>
 * -----------------------------------------------------------------------------
 * Начальный пример возможного построения компонента.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('patziPosts', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'objData',
    'posts'
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      //...
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `<section class="u-align-center u-clearfix u-image u-image-tiles u-section-4" id="carousel_6b06" data-image-width="400"
             data-image-height="400">
  <!--    <div class="menu-between mb-1" v-if="_.pluck(filterDogs, 'label').length >0">
        <div><span class=" font-weight-bold">
            <%= __('Dogs') %>: {{filterName}}</span></div>

        <div class="grid-content">
          <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                              <i class="el-icon-more el-icon&#45;&#45;right pointer"></i>
                            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-female" :command="{com:'dam'}">
                <%= __('Dam') %>
              </el-dropdown-item>

              <el-dropdown-item icon="el-icon-male" :command="{com:'sire'}">
                <%= __('Sire') %>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-camera-solid" :command="{com:'all'}">
                <%= __('All') %>
              </el-dropdown-item>

              <el-dropdown-item v-if="_.some(dogs, 'sale', true)" icon="el-icon-money"
                                :command="{com:'c'}">
                <%= __('For Sale') %>
              </el-dropdown-item>

              <el-dropdown-item v-if="me.isSuperAdmin || me.isAdmin || isOwner" icon="el-icon-edit" :command="{com:'e'}">
                <%= __('Dog editor') %>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>-->
        <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
            <div class="u-clearfix u-expanded-width u-gutter-30 u-layout-wrap u-layout-wrap-1">
                <div class="u-gutter-0 u-layout">
                    <div class="u-layout-row">
                    <patzi-posts-item v-for="(post,ind) of posts" :obj-data="objData" @remove="removeItem"  :post="post" :key="post.id" ></patzi-posts-item>
                    
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
    //...
  },


  mounted: async function () {
    console.log('objData++::', this.objData);
    this.data = this.objData.data ? this.objData.data : this.data;
  },

  beforeDestroy: function () {
    //...
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    removeItem(id){
      // Генерируем событие, возможно с передаваемыми данными
      console.log('Отправляем событие', id);
      this.$emit('remove', id);
    } ,
  }
});
