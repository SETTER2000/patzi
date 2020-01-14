parasails.registerPage('chart-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    series: [
      Math.random() * 400,
      Math.random() * 400,
      Math.random() * 400,
      Math.random() * 400,
      Math.random() * 400
    ],
    duration:'1000',
    widthSvg:'800',
    heightSvg:'500',
    colorCharts:{
      dogsWorld:'#374721'
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
      this.generateData();
      // this.updateChart(this.$refs.$wrapper, this.d3Data);
    }, 5000);
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    generateData()
    {
      this.series = [
        Math.random() * 400,
        Math.random() * 400,
        Math.random() * 400,
        Math.random() * 400,
        Math.random() * 400
      ];
    }
    ,
  }
});
