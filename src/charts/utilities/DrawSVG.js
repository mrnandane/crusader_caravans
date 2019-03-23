import React, { Component } from 'react';
import LineChart from '../strategies-charts/LineChart';
import './../strategies-charts/LineChart.scss';
import * as moment from 'moment';


const One_Weak = '1W';
const One_Month = '1M';
const Three_Month = '3M';
const Six_Month = '6M';
const One_Year = '1Y';
const Five_Year = '5Y';
const Max = 'Max';

class DrawSVG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxData: ''
    };
  }
  componentDidMount() {
    let header = document.getElementById('graphButton');
    let btns = header.getElementsByClassName('graph-button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function() {
        var current = document.getElementsByClassName('graph-button-active');
        current[0].className = current[0].className.replace(' graph-button-active', '');
        this.className += ' graph-button-active';
      });
    }
    const data = this.parseData(this.props.graphData);
    this.setState({
      maxData: this.props.graphData
    });
    LineChart(data, false);
  }

  senddata = duration => {
    let updateGraphData = [];
    const fullGraphData = this.props.graphData;
    switch (duration) {
      case One_Weak:
        let previousWeakDate = moment().subtract(7, 'd');
        for (let i = 0; i < fullGraphData.length; i++) {
          var singleGraphDataOneMonth = {
            data: [],
            name: ''
          };
          for (let j = 0; j < fullGraphData[i].data.length; j++) {
            if (previousWeakDate < moment(fullGraphData[i].data[j].date)) {
              singleGraphDataOneMonth.data.push(fullGraphData[i].data[j]);
            }
          }
          singleGraphDataOneMonth.name = fullGraphData[i].name;
          updateGraphData.push(singleGraphDataOneMonth);
        }
        LineChart(updateGraphData, true);
        break;

      case One_Month:
        let previousMonthDate = moment().subtract(1, 'months');
        for (let i = 0; i < fullGraphData.length; i++) {
          let singleGraphData = {
            data: [],
            name: ''
          };
          for (let j = 0; j < fullGraphData[i].data.length; j++) {
            if (previousMonthDate < moment(fullGraphData[i].data[j].date)) {
              singleGraphData.data.push(fullGraphData[i].data[j]);
            }
          }
          singleGraphData.name = fullGraphData[i].name;
          updateGraphData.push(singleGraphData);
        }
        LineChart(updateGraphData, true);
        break;

      case Three_Month:
        let previousThreeMonthDate = moment().subtract(3, 'months');
        for (let i = 0; i < fullGraphData.length; i++) {
          var singleGraphData = {
            data: [],
            name: ''
          };
          for (let j = 0; j < fullGraphData[i].data.length; j++) {
            if (
              previousThreeMonthDate < moment(fullGraphData[i].data[j].date)
            ) {
              singleGraphData.data.push(fullGraphData[i].data[j]);
            }
          }
          singleGraphData.name = fullGraphData[i].name;
          updateGraphData.push(singleGraphData);
        }
        LineChart(updateGraphData, true);
        break;

      case Six_Month:
        let previousSixMonthDate = moment().subtract(6, 'months');
        for (let i = 0; i < fullGraphData.length; i++) {
          let singleGraphData = {
            data: [],
            name: ''
          };
          for (let j = 0; j < fullGraphData[i].data.length; j++) {
            if (previousSixMonthDate < moment(fullGraphData[i].data[j].date)) {
              singleGraphData.data.push(fullGraphData[i].data[j]);
            }
          }
          singleGraphData.name = fullGraphData[i].name;
          updateGraphData.push(singleGraphData);
        }
        LineChart(updateGraphData, true);
        break;

      case One_Year:
        let previousYearDate = moment().subtract(1, 'years');
        for (let i = 0; i < fullGraphData.length; i++) {
          let singleGraphData = {
            data: [],
            name: ''
          };
          for (let j = 0; j < fullGraphData[i].data.length; j++) {
            if (previousYearDate < moment(fullGraphData[i].data[j].date)) {
              singleGraphData.data.push(fullGraphData[i].data[j]);
            }
          }
          singleGraphData.name = fullGraphData[i].name;
          updateGraphData.push(singleGraphData);
        }
        LineChart(updateGraphData, true);
        break;

      case Five_Year:
        let previousFiveYearDate = moment().subtract(5, 'years');
        for (let i = 0; i < fullGraphData.length; i++) {
          let singleGraphData = {
            data: [],
            name: ''
          };
          for (let j = 0; j < fullGraphData[i].data.length; j++) {
            if (previousFiveYearDate < moment(fullGraphData[i].data[j].date)) {
              singleGraphData.data.push(fullGraphData[i].data[j]);
            }
          }
          singleGraphData.name = fullGraphData[i].name;
          updateGraphData.push(singleGraphData);
        }
        LineChart(updateGraphData, true);
        break;
      case Max:
        LineChart(fullGraphData, true);
        break;
      default:
        LineChart(fullGraphData, true);
    }
  };

  parseData(graphdata) {
    for (var i = 0; i < graphdata.length; i++) {
      for (var j = 0; j < graphdata[i].data.length; j++) {
        graphdata[i].data[j].date = new Date(graphdata[i].data[j].date);
        graphdata[i].data[j].value = +graphdata[i].data[j].value;
      }
    }
    return graphdata;
  }
  render() {
    return (
      <div className="row mx-0">
        <span className="col-md-6 offset-md-3" id="graphButton"> 
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
          <button
            className="graph-button graph-button-active"
            onClick={() => this.senddata(Max)}
          >
            Max
          </button>
        </span>
        <svg id="chart" width="800" height="500" />
      </div>
    );
  }
}
export default DrawSVG;
