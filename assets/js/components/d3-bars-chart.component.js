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
    'd3Data'
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      styleObjType: Object,

      // В основном все значения действуют поумолчанию, если нет таких же входящих данных
      width: 500, // ширина svg
      height: 500, // высота svg
      duration: 1000, // длительность перехода роста столбцов
      innerWidth: 400,
      innerHeight: 400,
      rightTitle:false, // отображение значений справа на графике
      strokeDashColor: '#8b9c8d', // цвет пунктирных горизонтальных линий
      color: ['#8ab200', '#8ab200'], // диапазон цветов столбцов от...до
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `<div :style="styleObj" ref="$wrapper"></div>`,


  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    this.updateChart(this.$refs.$wrapper, _.sortBy(this.d3Data.data,'label'));
    this.color = this.d3Data.colorChart ? this.d3Data.colorChart : this.color;
    this.strokeDashColor = this.d3Data.strokeDashColor ? this.d3Data.strokeDashColor : this.strokeDashColor;
    this.duration = this.d3Data.durationChart ? this.d3Data.durationChart : this.duration;
    this.width = this.d3Data.widthSvg ? this.d3Data.widthSvg : this.width;
    this.rightTitle = this.d3Data.rightTitle ? this.d3Data.rightTitle : this.rightTitle;
    this.height = this.d3Data.heightSvg ? this.d3Data.heightSvg : this.height;
    this.innerWidth = this.width - 100;
    this.innerHeight = this.height - 100;
  },
  mounted: async function () {
    if (this.d3Data.data === undefined) {
      throw new Error('Neither `:d3-data`  was passed in to <d3-bars-chart>, but one or the other must be provided.');
    }


    // this.generateData();
    // this.updateChart(this.$refs.$wrapper, this.d3Data, this.colorChart);
    this.intervalId = setInterval(() => {
      // this.generateData();
      this.updateChart(this.$refs.$wrapper, _.sortBy(this.d3Data.data,'label'));
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

    /*  async fill(index) {
        let y = `#8a${Number(255 / this.d3Data.data.length * (index + 1)).toString(16)}00`;
        return y;
      },*/

    updateChart(wrapper, curData) {
      if (!wrapper) {
        return;
      }
      const total = _.pluck(curData, 'total');
      const minValue = _.min(total);
      const maxValue = _.max(total);
      const margin = {top: 50, right: 50, bottom: 50, left: 50};
      const innerWidth = this.width - margin.left - margin.right;
      const innerHeight = this.height - margin.top - margin.bottom;
      const svgData = d3.select(wrapper).selectAll('svg')
        .data(['dummy data']);
      // enter
      const svgEnter = svgData.enter()
        .append('svg')
        .attr('class', 'bars-chart')
        .attr('width', this.width)
        .attr('height', this.height)
      ;

      const gEnter = svgEnter.append('g')
        .attr('class', 'bars-chart')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const svgMerge = svgData.merge(svgEnter); // указатель на элемент svg
      // const gMerge = svgMerge.select('g');
      const gMerge = svgMerge.select('g.bars-chart');

      const indexes = Array.from({length: curData.length}, (d, index) => index);

      const x = d3.scaleBand()
          .domain(curData.map(d=>d.label))
          // .domain(curData.map(d=>`${d.label}(${d.total})`))
          // .domain(indexes)
        .rangeRound([0, innerWidth])
        // .range([0, innerWidth])
        //   .padding(0.1)
        ;

      const y = d3.scaleLinear()
        .range([innerHeight, 0])
        .domain([minValue, maxValue]);

      const xColor = d3.scaleLinear().domain([indexes[0], indexes[indexes.length - 1]])
        .interpolate(d3.interpolateRgb)
        .range(this.color);

      gEnter.append('g')
        .attr('class', 'y-right')
        .call(d3.axisRight(y).tickSizeOuter(0).tickSizeInner(innerWidth))
      ;
      const gY = gMerge.select('g.y-right');
      gY.transition()
        .duration(this.duration)
        .call(d3.axisRight(y).tickSizeOuter(0).tickSizeInner(innerWidth))
      ;

      // удаляем текст справа паралельных линий}
      if (!this.rightTitle){gY.selectAll('text').remove();}


      const rectData = gMerge.selectAll('rect')
        .data(curData);
      // const rectData = gMerge.selectAll('rect').data(total);
      // console.log('total::: ' , curData);
// enter
      const rectEnter = rectData.enter()
        .append('rect')
        .attr('fill', (d, index) => xColor(index))
        // .attr('fill', this.color)
        .attr('x', (d, index) => x(d.label))
        // .attr('x', (d, index) => x(`${d.label}(${d.total})`))
        // .attr('x', (d, index) => x(index))
        // .attr('x', (d, index) => index * innerWidth / curData.length)
        .attr('y', (d) => y(d.total))
        // .attr('y', (d) => innerHeight - d)
        .attr('width', innerWidth / curData.length)
        .attr('height', (d) => innerHeight - y(d.total));

      const rectMerge = rectData.merge(rectEnter); // указатель на элемент rect
      rectMerge
        .transition()
        .duration(this.duration)
        .attr('y', (d) => y(d.total))
        // .attr('y', (d) => innerHeight - d)
        .attr('height', (d) => innerHeight - y(d.total));


      gY.selectAll('line')
        .attr('stroke', this.strokeDashColor)
        .attr('stroke-dasharray', '1,3');

      gEnter.append('g')
        .attr('class', 'y-left')
        .call(d3.axisLeft(y));

      gMerge.select('g.y-left')
        .transition()
        .duration(this.duration)
        .call(d3.axisLeft(y));

      gEnter.append('g')
        .attr('class', 'x')
        .call(d3.axisBottom(x));

      gMerge.select('g.x')
        .attr('transform', `translate(0,${innerHeight})`)
        .transition()
        .duration(this.duration)
        .call(d3.axisBottom(x));



    }

  }
});
