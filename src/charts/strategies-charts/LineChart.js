import * as d3 from 'd3';
import * as moment from 'moment';
import './LineChart.scss';

const LineChart = (data, redraw) => {
  console.log('data in line chart', data);
  var elem = document.querySelector('#Line_chart');

  if (redraw) {
    elem.parentNode.removeChild(document.querySelector('#focus'));
    elem.parentNode.removeChild(document.querySelector('#context'));
    elem.parentNode.removeChild(elem);
    removeElementsByClass('legend');
  }

  var graphDataOne = data[0].data;
  var graphDataTwo = data[1].data;
  var graphDataThree = data[2].data;
  var graphDataFour = data[3].data;
  var graphDataFive = data[4].data;

  var graphOneName = data[0].name;
  var graphTwoName = data[1].name;
  var graphThreeName = data[2].name;
  var graphFourName = data[3].name;
  var graphFiveName = data[4].name;

  var svg = d3.select('svg'),
    margin = { top: 40, right: 20, bottom: 110, left: 40 },
    margin2 = { top: 430, right: 20, bottom: 30, left: 40 },
    width = +svg.attr('width') - margin.left - margin.right,
    height = +svg.attr('height') - margin.top - margin.bottom,
    height2 = +svg.attr('height') - margin2.top - margin2.bottom;
  console.log('height2', height2);

  var transformYAxis = height / 5;

  var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([transformYAxis, 0]),
    x2 = d3.scaleTime().range([0, width]),
    y2 = d3.scaleLinear().range([height2, 0]),
    y3 = d3.scaleLinear().range([transformYAxis * 2, transformYAxis]),
    x3 = d3.scaleTime().range([0, width]),
    y4 = d3.scaleLinear().range([transformYAxis * 3, transformYAxis * 2]),
    x4 = d3.scaleTime().range([0, width]),
    y5 = d3.scaleLinear().range([transformYAxis * 4, transformYAxis * 3]),
    x5 = d3.scaleTime().range([0, width]),
    y6 = d3.scaleLinear().range([height, transformYAxis * 4]),
    x6 = d3.scaleTime().range([0, width]);

  var tickSizeToApplyY = 3;
  var xAxis = d3.axisBottom(x).tickSize(-height, 0, 0),
    yAxis = d3
      .axisLeft(y)
      .ticks(tickSizeToApplyY)
      .tickSize(-width, 0, 0),
    // xAxis2 = d3.axisBottom(x2),
    // yAxis2 = d3
    //   .axisLeft(2)
    //   .ticks(tickSizeToApplyY)
    //   .tickSize(-width, 0, 0),
    yAxis3 = d3
      .axisLeft(y3)
      .ticks(tickSizeToApplyY)
      .tickSize(-width, 0, 0),
    yAxis4 = d3
      .axisLeft(y4)
      .ticks(tickSizeToApplyY)
      .tickSize(-width, 0, 0),
    yAxis5 = d3
      .axisLeft(y5)
      .ticks(tickSizeToApplyY)
      .tickSize(-width, 0, 0),
    yAxis6 = d3
      .axisLeft(y6)
      .ticks(tickSizeToApplyY)
      .tickSize(-width, 0, 0);

  // var clip = svg

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
      return y(d.value);
    });

  var line2 = d3
    .line()
    .x(function(d) {
      return x2(d.date);
    })
    .y(function(d) {
      return y2(d.value);
    });

  var line3 = d3
    .line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y3(d.value);
    });

  var line4 = d3
    .line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y4(d.value);
    });

  var line5 = d3
    .line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y5(d.value);
    });

  var line6 = d3
    .line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y6(d.value);
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
    .attr('id', 'Line_chart')
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

  d3.select('svg')
    .append('text')
    .text(graphOneName)
    .attr('font-size', '15px')
    .attr('class', 'legend')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(' + width + ', 55 )');

  d3.select('svg')
    .append('text')
    .text(graphTwoName)
    .attr('font-size', '15px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(' + width + ', 125 )');
  d3.select('svg')
    .append('text')
    .text(graphThreeName)
    .attr('font-size', '15px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(' + width + ', 195 )');
  d3.select('svg')
    .append('text')
    .text(graphFourName)
    .attr('font-size', '15px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(' + width + ', 267 )');
  d3.select('svg')
    .append('text')
    .text(graphFiveName)
    .attr('font-size', '15px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(' + width + ', 335 )');

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
      return d.value;
    })
  );

  x2.domain(x.domain());
  y2.domain(
    d3.extent(graphDataOne, function(d) {
      return d.value;
    })
  );

  x3.domain(x.domain());
  y3.domain(
    d3.extent(graphDataTwo, function(d) {
      return d.value;
    })
  );

  x4.domain(x.domain());
  y4.domain(
    d3.extent(graphDataThree, function(d) {
      return d.value;
    })
  );

  x5.domain(x.domain());
  y5.domain(
    d3.extent(graphDataFour, function(d) {
      return d.value;
    })
  );

  x6.domain(x.domain());
  y6.domain(
    d3.extent(graphDataFive, function(d) {
      return d.value;
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

  focus
    .append('g')
    .attr('class', 'axis axis--y')
    .call(yAxis3);

  focus
    .append('g')
    .attr('class', 'axis axis--y')
    .call(yAxis4);

  focus
    .append('g')
    .attr('class', 'axis axis--y')
    .call(yAxis5);

  focus
    .append('g')
    .attr('class', 'axis axis--y')
    .call(yAxis6);

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
      return y(dd.value);
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
  // .on('mousemove', function(dd) {
  //   mousemove(dd);
  // });

  Line_chart.append('path')
    .datum(graphDataTwo)
    .attr('class', 'line line3')
    .attr('fill', 'none')
    .attr('stroke', ' #239d8c')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', line3);

  Line_chart.append('path')
    .datum(graphDataThree)
    .attr('class', 'line line4')
    .attr('fill', 'none')
    .attr('stroke', ' #239d8c')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', line4);

  Line_chart.append('path')
    .datum(graphDataFour)
    .attr('class', 'line line5')
    .attr('fill', 'none')
    .attr('stroke', ' #239d8c')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', line5);

  Line_chart.append('path')
    .datum(graphDataFive)
    .attr('class', 'line line6')
    .attr('fill', 'none')
    .attr('stroke', '#239d8c')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', line6);

  // context
  //   .append('g')
  //   .attr('class', 'axis axis--x')
  //   .attr('transform', 'translate(0,' + height2 + ')')
  //   .call(xAxis2);

  context
    .append('g')
    .attr('class', 'brush')
    .attr('fill', 'red')
    .call(brush)
    .call(brush.move, x.range());

  Line_chart.selectAll('#Line_chart')
    .data(graphDataTwo)
    .enter()
    .append('circle')
    .attr('class', 'circle circle1 circle2')
    .attr('r', '5')
    .attr('cx', function(dd) {
      return x(dd.date);
    })
    .attr('cy', function(dd) {
      return y3(dd.value);
    })
    .attr('fill', '#EF6C2F')
    .attr('stroke', 'white')
    .style('pointer-events', 'visiblePainted')
    .style('opacity', '0')
    .on('mouseover', function(d) {
      d3.select(this).style('opacity', '1');
      d3.select('.line3').attr('stroke', ' #ef6c2f');
      tooltipFocus.style('display', null);
      tooltipText.style('display', null);
      tooltipCloseText.style('display', null);
      mousemove(d);
    })
    .on('mouseout', function() {
      d3.select(this).style('opacity', '0');
      d3.select('.line3').attr('stroke', ' #239d8c');
      tooltipFocus.style('display', 'none');
      tooltipText.style('display', 'none');
      tooltipCloseText.style('display', 'none');
    });
  // .on('mousemove', function(dd) {
  //   mousemove(dd);
  // });

  Line_chart.selectAll('#Line_chart')
    .data(graphDataThree)
    .enter()
    .append('circle')
    .attr('class', 'circle circle1 circle3')
    .attr('r', '5')
    .attr('cx', function(dd) {
      return x(dd.date);
    })
    .attr('cy', function(dd) {
      return y4(dd.value);
    })
    .attr('fill', '#EF6C2F')
    .attr('stroke', 'white')
    .style('pointer-events', 'visiblePainted')
    .style('opacity', '0')
    .on('mouseover', function(d) {
      d3.select(this).style('opacity', '1');
      d3.select('.line4').attr('stroke', ' #ef6c2f');
      tooltipFocus.style('display', null);
      tooltipText.style('display', null);
      tooltipCloseText.style('display', null);
      mousemove(d);
    })
    .on('mouseout', function() {
      d3.select(this).style('opacity', '0');
      d3.select('.line4').attr('stroke', ' #239d8c');
      tooltipFocus.style('display', 'none');
      tooltipText.style('display', 'none');
      tooltipCloseText.style('display', 'none');
    });
  // .on('mousemove', function(dd) {
  //   mousemove(dd);
  // });

  Line_chart.selectAll('#Line_chart')
    .data(graphDataFour)
    .enter()
    .append('circle')
    .attr('class', 'circle circle1 circle4')
    .attr('r', '5')
    .attr('cx', function(dd) {
      return x(dd.date);
    })
    .attr('cy', function(dd) {
      return y5(dd.value);
    })
    .attr('fill', '#EF6C2F')
    .attr('stroke', 'white')
    .style('pointer-events', 'visiblePainted')
    .style('opacity', '0')
    .on('mouseover', function(d) {
      d3.select(this).style('opacity', '1');
      d3.select('.line5').attr('stroke', ' #ef6c2f');
      tooltipFocus.style('display', null);
      tooltipText.style('display', null);
      tooltipCloseText.style('display', null);
      mousemove(d);
    })
    .on('mouseout', function() {
      d3.select(this).style('opacity', '0');
      d3.select('.line5').attr('stroke', ' #239d8c');
      tooltipFocus.style('display', 'none');
      tooltipText.style('display', 'none');
      tooltipCloseText.style('display', 'none');
    });
  // .on('mousemove', function(dd) {
  //   mousemove(dd);
  // });

  Line_chart.selectAll('#Line_chart')
    .data(graphDataFive)
    .enter()
    .append('circle')
    .attr('class', 'circle circle1 circle5')
    .attr('r', '5')
    .attr('cx', function(dd) {
      return x(dd.date);
    })
    .attr('cy', function(dd) {
      return y6(dd.value);
    })
    .attr('fill', '#EF6C2F')
    .attr('stroke', 'white')
    .style('pointer-events', 'visiblePainted')
    .style('opacity', '0')
    .on('mouseover', function(d) {
      d3.select(this).style('opacity', '1');
      d3.select('.line6').attr('stroke', ' #ef6c2f');
      tooltipFocus.style('display', null);
      tooltipText.style('display', null);
      tooltipCloseText.style('display', null);
      mousemove(d);
    })
    .on('mouseout', function() {
      d3.select(this).style('opacity', '0');
      d3.select('.line6').attr('stroke', ' #239d8c');
      tooltipFocus.style('display', 'none');
      tooltipText.style('display', 'none');
      tooltipCloseText.style('display', 'none');
    });
  // .on('mousemove', function(dd) {
  //   mousemove(dd);
  // });

  function brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return; // ignore brush-by-zoom
    var s = d3.event.selection || x2.range();
    x.domain(s.map(x2.invert, x2));
    x3.domain(s.map(x2.invert, x2));
    x4.domain(s.map(x2.invert, x2));
    x5.domain(s.map(x2.invert, x2));
    x6.domain(s.map(x2.invert, x2));
    Line_chart.select('.line1').attr('d', line);
    Line_chart.select('.line3').attr('d', line3);
    Line_chart.select('.line4').attr('d', line4);
    Line_chart.select('.line5').attr('d', line5);
    Line_chart.select('.line6').attr('d', line6);
    Line_chart.selectAll('.circle1')
      .attr('cx', function(d) {
        return x(d.date);
      })
      .attr('cy', function(d) {
        return y(d.value);
      });
    Line_chart.selectAll('.circle2')
      .attr('cx', function(d) {
        return x(d.date);
      })
      .attr('cy', function(d) {
        return y3(d.value);
      });
    Line_chart.selectAll('.circle3')
      .attr('cx', function(d) {
        return x(d.date);
      })
      .attr('cy', function(d) {
        return y4(d.value);
      });
    Line_chart.selectAll('.circle4')
      .attr('cx', function(d) {
        return x(d.date);
      })
      .attr('cy', function(d) {
        return y5(d.value);
      });
    Line_chart.selectAll('.circle5')
      .attr('cx', function(d) {
        return x(d.date);
      })
      .attr('cy', function(d) {
        return y6(d.value);
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
    x3.domain(t.rescaleX(x2).domain());
    x4.domain(t.rescaleX(x2).domain());
    x5.domain(t.rescaleX(x2).domain());
    x6.domain(t.rescaleX(x2).domain());
    Line_chart.select('.line1').attr('d', line);
    Line_chart.select('.line3').attr('d', line3);
    Line_chart.select('.line4').attr('d', line4);
    Line_chart.select('.line5').attr('d', line5);
    Line_chart.select('.line6').attr('d', line6);
    Line_chart.selectAll('.circle1')
      .attr('cx', function(d) {
        return x(d.date);
      })
      .attr('cy', function(d) {
        return y(d.value);
      });
    Line_chart.selectAll('.circle2')
      .attr('cx', function(d) {
        return x3(d.date);
      })
      .attr('cy', function(d) {
        return y3(d.value);
      });
    Line_chart.selectAll('.circle3')
      .attr('cx', function(d) {
        return x(d.date);
      })
      .attr('cy', function(d) {
        return y4(d.value);
      });
    Line_chart.selectAll('.circle4')
      .attr('cx', function(d) {
        return x(d.date);
      })
      .attr('cy', function(d) {
        return y5(d.value);
      });
    Line_chart.selectAll('.circle5')
      .attr('cx', function(d) {
        return x(d.date);
      })
      .attr('cy', function(d) {
        return y6(d.value);
      });
    focus.select('.axis--x').call(xAxis);
    context.select('.brush').call(brush.move, x.range().map(t.invertX, t));
  }

  function mousemove(data) {
    var x = d3.event.offsetX - 40;
    var y = d3.event.offsetY - 40;
    var textX = x + 55;
    var textY = y + 15;
    tooltipFocus.attr('transform', 'translate(' + x + ',' + y + ')');
    var tooltipValue =
      moment(data.date).format('ddd, MMMM Do YYYY') ;
    tooltipText.attr('transform', 'translate(' + textX + ',' + textY + ')');
    tooltipText.text(tooltipValue);

    var textX1 = x + 40;
    var textY1 = y + 30;
    var tooltipCloseValue = 'Value  ' + Math.round(data.value * 1000) / 1000;

    tooltipCloseText.attr(
      'transform',
      'translate(' + textX1 + ',' + textY1 + ')'
    );
    tooltipCloseText.text(tooltipCloseValue);
  }

  function removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }
};

export default LineChart;
