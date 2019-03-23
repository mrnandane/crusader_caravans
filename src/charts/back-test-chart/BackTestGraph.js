import * as d3 from 'd3';
import * as moment from 'moment';
import './../utilities/GraphCommonCss.scss';

const BackTestGraph = (data, redraw) => {
  if (redraw) { 
    var elem = document.querySelector('#backTestChart');
    elem.remove();
  }
  var chartDiv = document.getElementById("backTestParentChart");
  var svg = d3.select(chartDiv).append("svg").attr('id', 'backTestChart');
  var widthNew = chartDiv.clientWidth;
  var heightNew = 500;
  svg
  .attr("width", widthNew)
  .attr("height", heightNew);
  var graphDataOne = data;
  //var svg = d3.select('#backTestChart'),
  var  margin = { top: 40, right: 20, bottom: 150, left: 40 },
    margin2 = { top: 400, right: 20, bottom: 30, left: 40 },
    width = +svg.attr('width') - margin.left - margin.right,
    height = +svg.attr('height') - margin.top - margin.bottom,
    height2 = +svg.attr('height') - margin2.top - margin2.bottom;

    console.log('width', width , height)

  var transformYAxis = height;

  var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([transformYAxis, 0]),
    x2 = d3.scaleTime().range([0, width]),
    y2 = d3.scaleLinear().range([height2, 0]);

  var tickSizeToApplyY = 3;
  var xAxis = d3.axisBottom(x).tickSize(-height, 0, 0),
    yAxis = d3
      .axisLeft(y)
      .ticks(tickSizeToApplyY)
      .tickSize(-width, 0, 0);

  svg
    .append('defs')
    .append('svg:clipPath')
    .attr('id', 'clip')
    .append('svg:rect')
    .attr('id', 'zoom-brush')
    .attr('width', width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0);

  var brush = d3
    .brushX()
    .extent([[0, 0], [width, height2]])
    .on('brush end', brushed);

  var line = d3
    .line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.close);
    });

  var line2 = d3
    .line()
    .x(function(d) {
      return x2(d.date);
    })
    .y(function(d) {
      return y2(d.close);
    });

  var focus = svg
    .append('g')
    .attr('class', 'focus')
    .attr('id', 'focus')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .style('pointer-events', 'all');

  var zoom = d3
    .zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on('zoom', zoomed);
  svg
    .append('rect')
    .attr('class', 'zoom')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .call(zoom);

  var Line_chart = svg
    .append('g')
    .attr('class', 'context')
    .attr('id', 'Line_chart_backtest')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('clip-path', 'url(#clip)')
    .style('pointer-events', 'all');

  var tooltipFocus = d3
    .select('svg')
    .append('rect')
    .attr('class', 'tooltipFocus')
    .attr('id', 'tooltipFocus')
    .style('display', 'none')
    .style('position', 'absolute')
    .style('z-index', '10');

  var tooltipText = d3
    .select('svg')
    .append('text')
    .attr('font-size', '10px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .style('display', 'none');

    var tooltipCloseText = d3
    //.select('svg')
    .select('svg')
    .append('text')
    .attr('font-size', '10px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .style('display', 'none');

  var context = svg
    .append('g')
    .attr('class', 'context')
    .attr('id', 'context')
    .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')');

  x.domain(
    d3.extent(graphDataOne, function(d) {
      return d.date;
    })
  );
  y.domain(
    d3.extent(graphDataOne, function(d) {
      return d.close;
    })
  );

  x2.domain(x.domain());
  y2.domain(
    d3.extent(graphDataOne, function(d) {
      return d.close;
    })
  );

  focus
    .append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  focus
    .append('g')
    .attr('class', 'axis axis--y')
    .call(yAxis);

  Line_chart.append('path')
    .datum(graphDataOne)
    .attr('class', 'line line1')
    .attr('fill', 'none')
    .attr('stroke', ' #239d8c')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', line);

  context
    .append('path')
    .datum(graphDataOne)
    .attr('class', 'line')
    .attr('fill', 'none')
    .attr('stroke', ' #239d8c')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', line2);

  Line_chart.selectAll('#Line_chart')
    .data(graphDataOne)
    .enter()
    .append('circle')
    .attr('class', 'circle circle1')
    .attr('r', '5')
    .attr('cx', function(dd) {
      return x(dd.date);
    })
    .attr('cy', function(dd) {
      return y(dd.close);
    })
    .attr('fill', '#EF6C2F')
    .attr('stroke', 'white')
    .style('pointer-events', 'visiblePainted')
    .style('opacity', '0')
    .on('mouseover', function(d) {
      d3.select(this).style('opacity', '1');
      d3.select('.line1').attr('stroke', ' #ef6c2f');
      tooltipFocus.style('display', null);
      tooltipText.style('display', null);
      tooltipCloseText.style('display', null);
      mousemove(d);
    })
    .on('mouseout', function() {
      d3.select(this).style('opacity', '0');
      d3.select('.line1').attr('stroke', ' #239d8c');
      tooltipFocus.style('display', 'none');
      tooltipText.style('display', 'none');
      tooltipCloseText.style('display', 'none');
    });

  context
    .append('g')
    .attr('class', 'brush')
    .attr('fill', 'red')
    .call(brush)
    .call(brush.move, x.range());

  function brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return; // ignore brush-by-zoom
    var s = d3.event.selection || x2.range();
    x.domain(s.map(x2.invert, x2));
    Line_chart.select('.line1').attr('d', line);
    Line_chart.selectAll('.circle1')
      .attr('cx', function(d) {
        return x(d.date);
      })
      .attr('cy', function(d) {
        return y(d.close);
      });

    focus.select('.axis--x').call(xAxis);

    svg
      .select('.zoom')
      .call(
        zoom.transform,
        d3.zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0)
      );
  }

  function zoomed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return; // ignore zoom-by-brush
    var t = d3.event.transform;
    x.domain(t.rescaleX(x2).domain());
    Line_chart.select('.line1').attr('d', line);
    Line_chart.selectAll('.circle1')
      .attr('cx', function(d) {
        return x(d.date);
      })
      .attr('cy', function(d) {
        return y(d.close);
      });
    focus.select('.axis--x').call(xAxis);
    context.select('.brush').call(brush.move, x.range().map(t.invertX, t));
  }

  function mousemove(data) {
    var x = d3.event.offsetX - 40;
    var y = d3.event.offsetY - 40;
    var textX = x + 55;
    var textY = y + 10;
    tooltipFocus.attr('transform', 'translate(' + x + ',' + y + ')');
    var tooltipValue =
      moment(data.date).format('ddd, MMMM Do YYYY');
    tooltipText.attr('transform', 'translate(' + textX + ',' + textY + ')');
    tooltipText.text(tooltipValue);

    var textX1 = x + 30;
    var textY1 = y + 30;
    var tooltipCloseValue = 
      'Close  ' +
      Math.round(data.close * 1000) / 1000;

      tooltipCloseText.attr('transform', 'translate(' + textX1 + ',' + textY1 + ')');
      tooltipCloseText.text(tooltipCloseValue);
  }
};

export default BackTestGraph;
