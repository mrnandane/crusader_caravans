import * as d3 from 'd3';
import * as moment from 'moment';
import './../utilities/GraphCommonCss.scss';

const BackTestModelGraph = (data, redraw) => {
  if (redraw) {
    var elem = document.querySelector('#backTestModelChart');
    elem.remove();
  }
  var backTestModelChart = document.getElementById(
    'backTestModelChartContainer'
  );
  var svgbackTestModel = d3
    .select(backTestModelChart)
    .append('svg')
    .attr('id', 'backTestModelChart');
  var widthNew = backTestModelChart.clientWidth;
  var heightNew = 300;
  svgbackTestModel.attr('width', widthNew).attr('height', heightNew);

  var margin = { top: 40, right: 20, bottom: 20, left: 40 },
    width = +svgbackTestModel.attr('width') - margin.left - margin.right,
    height = +svgbackTestModel.attr('height') - margin.top - margin.bottom;
  var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]);

  var tickSizeToApplyY = 3;
  var tickSizeToApplyX = 6;
  var xAxis = d3
      .axisBottom(x)
      .ticks(tickSizeToApplyX)
      .tickSize(-height, 0, 0),
    yAxis = d3
      .axisLeft(y)
      .ticks(tickSizeToApplyY)
      .tickSize(-width, 0, 0);

  var line = d3
    .line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.close);
    });

  var focus = svgbackTestModel
    .append('g')
    .attr('class', 'focus')
    .attr('id', 'focusbackTestModel')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .style('pointer-events', 'all');

  x.domain(
    d3.extent(data, function(d) {
      return d.date;
    })
  );
  y.domain(
    d3.extent(data, function(d) {
      return d.close;
    })
  );

  var tooltipFocus = d3
    // .select('svg')
    .select('#backTestModelChart')
    .append('rect')
    .attr('class', 'tooltipFocus')
    .attr('id', 'tooltipFocus')
    .style('display', 'none')
    .style('position', 'absolute')
    .style('z-index', '10');

  var tooltipText = d3
    //.select('svg')
    .select('#backTestModelChart')
    .append('text')
    .attr('font-size', '10px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .style('display', 'none');

  var tooltipCloseText = d3
    //.select('svg')
    .select('#backTestModelChart')
    .append('text')
    .attr('font-size', '10px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .style('display', 'none');

  focus
    .append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  focus
    .append('g')
    .attr('class', 'axis axis--y')
    .call(yAxis);

  focus
    .append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('fill', 'none')
    .attr('stroke', ' #239d8c')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', line);

  focus
    .selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')

    .attr('cx', function(d) {
      return x(d.date);
    })
    .attr('cy', function(d) {
      return y(d.close);
    })
    .attr('r', 5)
    .attr('fill', '#EF6C2F')
    .attr('stroke', 'white')
    .style('opacity', '0')
    .on('mouseover', function(d) {
      d3.select(this).style('opacity', '1');
      tooltipFocus.style('display', null);
      tooltipText.style('display', null);
      tooltipCloseText.style('display', null);
      mousemove(d);
    })
    .on('mouseout', function() {
      d3.select(this).style('opacity', '0');
      tooltipFocus.style('display', 'none');
      tooltipText.style('display', 'none');
      tooltipCloseText.style('display', 'none');
    });

  function mousemove(data) {
    var x = d3.event.offsetX - 40;
    var y = d3.event.offsetY - 40;
    var textX = x + 57;
    var textY = y + 10;

    tooltipFocus.attr('transform', 'translate(' + x + ',' + y + ')');
    var tooltipDateValue = moment(data.date).format('ddd, MMMM Do YYYY');
    tooltipText.attr('transform', 'translate(' + textX + ',' + textY + ')');
    tooltipText.text(tooltipDateValue);

    var textX1 = x + 30;
    var textY1 = y + 30;
    var tooltipCloseValue = 'Close  ' + Math.round(data.close * 1000) / 1000;

    tooltipCloseText.attr(
      'transform',
      'translate(' + textX1 + ',' + textY1 + ')'
    );
    tooltipCloseText.text(tooltipCloseValue);
  }
};

export default BackTestModelGraph;
