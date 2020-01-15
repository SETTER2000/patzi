parasails.registerPage('chart-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dogsWorld: {
      colorChart: ['#03c4b2', '#d308d1'], // градация цвета столбцов от...до
      strokeDashColor: '#ee22ee', // цвет пунктирных параллелей
      durationChart: '1000',
      widthSvg: window.innerWidth,
      rightTitle:true,
      heightSvg: '500',
      data: [
        {label: 'USA',        total: 1560},
        {label: 'Russia',     total: 1303},
        {label: 'Poland',     total: 1110},
        {label: 'Austria',    total: 606},
        {label: 'Germany',    total: 1040},
        {label: 'Belgium',    total: 365},
        {label: 'Croatia',    total: 480},
        {label: 'Danmark',    total: 633},
        {label: 'England',    total: 251},
        {label: 'Estonia',    total: 466},
        {label: 'Finland',    total: 788},
        {label: 'Iceland',    total: 98},
        {label: 'Latvia',     total: 201},
        {label: 'Lithuania',  total: 189},
        {label: 'Italy',      total: 324},
        {label: 'Hungary',    total: 200},
        {label: 'Romania',    total: 742},
        {label: 'Czech',      total: 1020},
        {label: 'Brazil',     total: 881},
        {label: 'China',      total: 631},
        {label: 'Ukraine',    total: 920},
        {label: 'Belarus',    total: 800},
        {label: 'Thailand',   total: 20},
        {label: 'Armenia',    total: 180},
        {label: 'Cyprus',     total: 322}
      ],
      generateData() {
        this.data = [
          {label: 'USA',  total: (Math.random() * 400)},
          {label: 'Russia', total: (Math.random() * 400)},
          {label: 'Poland', total: (Math.random() * 400)},
          {label: 'Austria',  total: (Math.random() * 400)},
          {label: 'Germany',  total: (Math.random() * 400)},
          {label: 'Belgium',  total: (Math.random() * 400)},
          {label: 'Croatia',  total: (Math.random() * 400)},
          {label: 'Danmark',  total: (Math.random() * 400)},
          {label: 'England',  total: (Math.random() * 400)},
          {label: 'Estonia',  total: (Math.random() * 400)},
          {label: 'Finland',  total: (Math.random() * 400)},
          {label: 'Iceland',  total: (Math.random() * 400)},
          {label: 'Latvia', total: (Math.random() * 400)},
          {label: 'Lithuania',  total: (Math.random() * 400)},
          {label: 'Italy',  total: (Math.random() * 400)},
          {label: 'Hungary',  total: (Math.random() * 400)},
          {label: 'Romania',  total: (Math.random() * 400)},
          {label: 'Czech',  total: (Math.random() * 400)},
          {label: 'Brazil', total: (Math.random() * 400)},
          {label: 'China',  total: (Math.random() * 400)},
          {label: 'Ukraine',  total: (Math.random() * 400)},
          {label: 'Belarus',  total: (Math.random() * 400)},
          {label: 'Thailand', total: (Math.random() * 400)},
          {label: 'Armenia',  total: (Math.random() * 400)},
          {label: 'Cyprus', total: (Math.random() * 400)},
        ];
      }
    },

    dogsWorld2: {
      colorChart: ['#8a0000', '#8ab200'],
      durationChart: '1000',
      widthSvg: window.innerWidth,
      heightSvg: '500',
      data: [
        {label: 'USA',        total: 1560},
        {label: 'Russia',     total: 1303},
        {label: 'Poland',     total: 1110},
        {label: 'Austria',    total: 606},
        {label: 'Germany',    total: 1040},
        {label: 'Belgium',    total: 365},
        {label: 'Croatia',    total: 480},
        {label: 'Danmark',    total: 633},
        {label: 'England',    total: 251},
        {label: 'Estonia',    total: 466},
        {label: 'Finland',    total: 788},
        {label: 'Iceland',    total: 98},
        {label: 'Latvia',     total: 201},
      ],
      generateData() {
        this.data = [
          {label: 'USA',  total: (Math.random() * 400)},
          {label: 'Russia', total: (Math.random() * 400)},
          {label: 'Poland', total: (Math.random() * 400)},
          {label: 'Austria',  total: (Math.random() * 400)},
          {label: 'Germany',  total: (Math.random() * 400)},
          {label: 'Belgium',  total: (Math.random() * 400)},
          {label: 'Croatia',  total: (Math.random() * 400)},
          {label: 'Danmark',  total: (Math.random() * 400)},
          {label: 'England',  total: (Math.random() * 400)},
          {label: 'Estonia',  total: (Math.random() * 400)},
          {label: 'Finland',  total: (Math.random() * 400)},
          {label: 'Iceland',  total: (Math.random() * 400)},
          {label: 'Latvia', total: (Math.random() * 400)},
        ];
      }
    }
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);


  },
  mounted: async function () {
      this.intervalId = setInterval(() => {
        this.dogsWorld.generateData();
        // this.updateChart(this.$refs.$wrapper, this.d3Data);
      }, 5000);

    this.intervalId2 = setInterval(() => {
      this.dogsWorld2.generateData();
      // this.updateChart(this.$refs.$wrapper, this.d3Data);
    }, 8000);
  },
  beforeDestroy: function () {
    clearInterval(this.intervalId);
    clearInterval(this.intervalId2);
  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    // generateData() {
    //   this.data = [
    //     Math.random() * 400,
    //     Math.random() * 400,
    //     Math.random() * 400,
    //     Math.random() * 400,
    //     Math.random() * 400
    //   ];
    // }
    // ,
  }
});
