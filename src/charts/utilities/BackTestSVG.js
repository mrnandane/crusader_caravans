import React, { Component } from 'react';
import BackTestGraph from './../back-test-chart/BackTestGraph';
import * as moment from 'moment';

const One_Weak = '1W';
const One_Month = '1M';
const Three_Month = '3M';
const Six_Month = '6M';
const One_Year = '1Y';
const Five_Year = '5Y';
const Max = 'Max';

class BackTestGraphSVG extends Component {
  componentDidMount() {
    let header = document.getElementById('backtestgraphButton');
    let btns = header.getElementsByClassName('graph-button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var current = document.getElementsByClassName('graph-button-active');
        current[0].className = current[0].className.replace(' graph-button-active', '');
        this.className += ' graph-button-active';
      });
    }
    const data = this.parseData(JSON.parse(this.props.graphData.graph_data));
    BackTestGraph(data, false);
  }
  senddata = duration => {
    let updateGraphData = [];
    const fullGraphData = this.parseData(JSON.parse(this.props.graphData.graph_data));
    switch (duration) {
      case One_Weak:
        let previousWeakDate = moment().subtract(7, 'd');
        fullGraphData.forEach(data => {
          if (previousWeakDate < moment(data.date)) {
            updateGraphData.push(data);
          }
        });
        BackTestGraph(updateGraphData, true);
        break;

      case One_Month:
        let previousMonthDate = moment().subtract(1, 'months');
        fullGraphData.forEach(data => {
          if (previousMonthDate < moment(data.date)) {
            updateGraphData.push(data);
          }
        });
        BackTestGraph(updateGraphData, true);
        break;

      case Three_Month:
        let previousThreeMonthDate = moment().subtract(3, 'months');
        fullGraphData.forEach(data => {
          if (previousThreeMonthDate < moment(data.date)) {
            updateGraphData.push(data);
          }
        });
        BackTestGraph(updateGraphData, true);
        break;

      case Six_Month:
        let previousSixMonthDate = moment().subtract(6, 'months');
        fullGraphData.forEach(data => {
          if (previousSixMonthDate < moment(data.date)) {
            updateGraphData.push(data);
          }
        });
        BackTestGraph(updateGraphData, true);
        break;

      case One_Year:
        let previousYearDate = moment().subtract(1, 'years');
        fullGraphData.forEach(data => {
          if (previousYearDate < moment(data.date)) {
            updateGraphData.push(data);
          }
        });
        BackTestGraph(updateGraphData, true);
        break;

      case Five_Year:
        let previousFiveYearDate = moment().subtract(5, 'years');
        fullGraphData.forEach(data => {
          if (previousFiveYearDate < moment(data.date)) {
            updateGraphData.push(data);
          }
        });
        BackTestGraph(updateGraphData, true);
        break;
      case Max:
        BackTestGraph(fullGraphData, true);
        break;
      default:
        BackTestGraph(fullGraphData, true);
    }
  };

  parseData(graphdata) {
    for (var i = 0; i < graphdata.length; i++) {
      graphdata[i].date = new Date(graphdata[i].date);
      // graphdata[i].close = +graphdata[i].close;
    }
    return graphdata;
  }
  render() {
    return (
      <div className="row mx-0 col-12">
        <div className="row col-6 offset-5" id="backtestgraphButton">
          {/* <span className="col-md-12 offset-md-5" id="backtestgraphButton"> */}
          <button
            className="graph-button"
            onClick={() => this.senddata(One_Weak)}
          >
            1W
          </button>
          <button
            className="graph-button"
            onClick={() => this.senddata(One_Month)}
          >
            1M
          </button>
          <button
            className="graph-button"
            onClick={() => this.senddata(Three_Month)}
          >
            3M
          </button>
          <button
            className="graph-button"
            onClick={() => this.senddata(Six_Month)}
          >
            6M
          </button>
          <button
            className="graph-button"
            onClick={() => this.senddata(One_Year)}
          >
            1YR
          </button>
          <button
            className="graph-button"
            onClick={() => this.senddata(Five_Year)}
          >
            5YR
          </button>
          <button className="graph-button graph-button-active" onClick={() => this.senddata(Max)}>
            Max
          </button>
          {/* </span> */}

        </div>
        <div id="backTestParentChart" className="col-12"></div>
        {/* <svg id="backTestChart" width="1240" height="480" /> */}
      </div>
    );
  }
}
export default BackTestGraphSVG;
