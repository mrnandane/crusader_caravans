import * as d3 from 'd3';
import * as moment from 'moment';
import './../utilities/GraphCommonCss.scss';

const PredictionGraph = (data, accuracy, redraw) => {
  let strokeColor = accuracy < 55? '#EA053B': '#B5EB45';;
  if (redraw) {
    var elem = document.querySelector('#predictionChart');
    elem.remove();
  }
  var predictionGraphContainer = document.getElementById(
    'predictionGraphContainer'
  );
  var svgPrediction = d3
    .select(predictionGraphContainer)
    .append('svg')
    .attr('id', 'predictionChart');

  var widthNew = predictionGraphContainer.clientWidth;
  var heightNew = 300;
  svgPrediction.attr('width', widthNew).attr('height', heightNew);

  var margin = { top: 40, right: 50, bottom: 20, left: 50 },
    width = +svgPrediction.attr('width') - margin.left - margin.right,
    height = +svgPrediction.attr('height') - margin.top - margin.bottom;

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
      return x(d.tx_date);
    })
    .y(function(d) {
      return y(d.actual_return);
    });

  var line2 = d3
    .line()
    .x(function(d) {
      return x(d.tx_date);
    })
    .y(function(d) {
      return y(d.predicted_return);
    });

  var focus = svgPrediction
    .append('g')
    .attr('class', 'focus')
    //.attr('id', 'focusbackTestModel')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .style('pointer-events', 'all');

  x.domain(
    d3.extent(data, function(d) {
      return d.tx_date;
    })
  );
  y.domain(
    d3.extent(data, function(d) {
      if (d.actual_return > d.predicted_return) {
        return d.actual_return;
      } else {
        return d.predicted_return;
      }
    })
  );

  var tooltipFocus = d3  
    .select('#predictionChart')
    .append('rect')
    .attr('class', 'tooltipFocus')
    .attr('id', 'tooltipFocus')
    .style('display', 'none')
    .style('position', 'absolute')
    .style('z-index', '10');

  var tooltipText = d3
    //.select('svg')
    .select('#predictionChart')
    .append('text')
    .attr('font-size', '10px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .style('display', 'none');

  var tooltipCloseText = d3
    //.select('svg')
    .select('#predictionChart')
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
    .attr('id', "actualLine")
    .attr('fill', 'none')
    .attr('stroke', ' white')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', line);

    focus
    .append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('id', "PredictedLine")
    .attr('fill', 'none')
    .attr('stroke', strokeColor)
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', line2);

  focus
    .selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot actualLineDot')

    .attr('cx', function(d) {
      return x(d.tx_date);
    })
    .attr('cy', function(d) {
      return y(d.actual_return);
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


    focus
    .selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot predictedLineDot')
    .attr('cx', function(d) {
      return x(d.tx_date);
    })
    .attr('cy', function(d) {
      return y(d.predicted_return);
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
    //   d3.select(this).style('opacity', '0');
    //   tooltipFocus.style('display', 'none');
    //   tooltipText.style('display', 'none');
    //   tooltipCloseText.style('display', 'none');
    });

    focus
    .selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot predictedLineDot')
    .attr('cx', function(d) {
      return x(d.tx_date);
    })
    .attr('cy', function(d) {
      return y(d.predicted_return);
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
      mousemovePrediction(d);
    })
    .on('mouseout', function() {
    //   d3.select(this).style('opacity', '0');
    //   tooltipFocus.style('display', 'none');
    //   tooltipText.style('display', 'none');
    //   tooltipCloseText.style('display', 'none');
    });


  function mousemove(data) {
    var x = d3.event.offsetX - 40;
    var y = d3.event.offsetY - 40;
    var textX = x + 57;
    var textY = y + 10;

    tooltipFocus.attr('transform', 'translate(' + x + ',' + y + ')');
    var tooltipDateValue = moment(data.tx_date).format('ddd, MMMM Do YYYY');
    tooltipText.attr('transform', 'translate(' + textX + ',' + textY + ')');
    tooltipText.text(tooltipDateValue);

    var textX1 = x + 30;
    var textY1 = y + 30;
    var tooltipCloseValue = 'Close  ' + Math.round(data.actual_return * 1000) / 1000;

    tooltipCloseText.attr(
      'transform',
      'translate(' + textX1 + ',' + textY1 + ')'
    );
    tooltipCloseText.text(tooltipCloseValue);
  }

  function mousemovePrediction(data) {
    var x = d3.event.offsetX - 40;
    var y = d3.event.offsetY - 40;
    var textX = x + 57;
    var textY = y + 10;

    tooltipFocus.attr('transform', 'translate(' + x + ',' + y + ')');
    var tooltipDateValue = moment(data.tx_date).format('ddd, MMMM Do YYYY');
    tooltipText.attr('transform', 'translate(' + textX + ',' + textY + ')');
    tooltipText.text(tooltipDateValue);

    var textX1 = x + 30;
    var textY1 = y + 30;
    var tooltipCloseValue = 'Close  ' + Math.round(data.predicted_return * 1000) / 1000;

    tooltipCloseText.attr(
      'transform',
      'translate(' + textX1 + ',' + textY1 + ')'
    );
    tooltipCloseText.text(tooltipCloseValue);
  }
};

export default PredictionGraph;
