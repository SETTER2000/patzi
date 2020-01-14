/**
 * <d3-bars-chart>
 * -----------------------------------------------------------------------------
 * A button with a built-in loading spinner.
 * Кнопка со встроенным загрузчиком.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('d3BarsChart', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'styleObj',
    'd3Data',
    'colorChart',
    'd3Width',
    'd3Height',
    'd3Duration'
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      styleObjType: Object,
      width: 500,
      height: 500,
      duration: 1000,
      innerWidth: 400,
      innerHeight: 400,
      color: '#8ab200',
      // fill: `#8a${Number(255 / this.series.length * (index + 1)).toString(16)}00`,
      // series: []
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <div :style="styleObj" ref="$wrapper">
   <!-- <svg :width="width" :height="height">
    <g transform="translate(50,50)">
      <rect v-for="(s, index) in series" 
      style="transition: all 1s ease;"
      :x="index * innerWidth / series.length" 
      :y="innerHeight - s" 
      :fill="fill(index)" 
      :height="s" 
      :width="innerWidth / series.length"
      ></rect>
      </g>
    </svg>-->
  </div>
  `,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    this.updateChart(this.$refs.$wrapper, this.d3Data);
    this.color = this.colorChart ? this.colorChart : this.color ;
    this.duration = this.d3Duration ? this.d3Duration : this.duration ;
    this.width = this.d3Width ? this.d3Width : this.width;
    this.height = this.d3Height ? this.d3Height : this.height;
  },
  mounted: async function () {
    if (this.d3Data === undefined) {
      throw new Error('Neither `:d3-data`  was passed in to <d3-bars-chart>, but one or the other must be provided.');
    }


    // this.generateData();
    // this.updateChart(this.$refs.$wrapper, this.d3Data, this.colorChart);
    this.intervalId = setInterval(() => {
      // this.generateData();
      this.updateChart(this.$refs.$wrapper, this.d3Data, this.colorChart);
    }, 1000);
    // console.log('DDD#:: ', d3.selectAll('p'));
  },
  beforeDestroy: function () {
    clearInterval(this.intervalId)
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    /*    generateData() {
          this.series = [
            Math.random() * 400,
            Math.random() * 400,
            Math.random() * 400,
            Math.random() * 400,
            Math.random() * 400
          ];
        },*/

    async fill(index) {
      let y = `#8a${Number(255 / this.d3Data.length * (index + 1)).toString(16)}00`;
      return y;
    },

    updateChart(wrapper, curData, colorChart) {
      if (!wrapper) {
        return;
      }
      const margin = {top: 50, right: 50, bottom: 50, left: 50};
      const innerWidth = this.width - margin.left - margin.right;
      const innerHeight = this.height - margin.top - margin.bottom;
      const svgData = d3.select(wrapper).selectAll('svg')
        .data(['dummy data']);
      // enter
      const svgEnter = svgData.enter()
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
      const svgMerge = svgData.merge(svgEnter); // указатель на элемент svg

      const gMerge = svgMerge.select('g');


      const rectData = gMerge.selectAll('rect').data(curData);
// enter
      const rectEnter = rectData.enter()
        .append('rect')
        .attr('fill', this.color)
        .attr('x', (d, index) => index * innerWidth / curData.length)
        .attr('y', (d) => innerHeight - d)
        .attr('width', innerWidth / curData.length)
        .attr('height', (d) => d);

      const rectMerge = rectData.merge(rectEnter); // указатель на элемент rect
      rectMerge
        .transition()
        .duration(this.duration)
        .attr('y', (d) => innerHeight - d)
        .attr('height', (d) => d);

    }

  }
});
