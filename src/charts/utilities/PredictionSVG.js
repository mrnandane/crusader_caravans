import React, { Component } from 'react';
import PredictionGraph from './../prediction-chart/PredictionGraph';
import * as moment from 'moment';
import './PredictionSVG.scss';

const One_Weak = '1W';
const Two_Weak = '2W';
const Three_Weak = '3W';
const Four_Weak = '4W';

class PredictionGraphSVG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      actualData: [],
      predictedData: []
    };
  }
  componentDidMount() {
    console.log('this.props', this.props);
    const data = this.parseData(this.props.graphData);
    this.addListenersToGraphButtons();
    this.setState({
      allData: data
    });
    setTimeout(() => {
      let accuracy = this.getAccuracyPercentage();
      PredictionGraph(data, accuracy, false);
    }, 0);
  }
  addListenersToGraphButtons = () => {
    let header = document.getElementById('predictionGraphButton');
    let btns = header.getElementsByClassName('model-graph-button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function() {
        var current = document.getElementsByClassName(
          'model-graph-button-active'
        );
        current[0].className = current[0].className.replace(
          ' model-graph-button-active',
          ''
        );
        this.className += ' model-graph-button-active';
      });
    }
  };
  senddata = duration => {
    let updateGraphData = [];
    const fullGraphData = this.parseData(this.props.graphData);
    let accuracy = this.getAccuracyPercentage();
    switch (duration) {
      case One_Weak:
        let previousWeakDate = moment().subtract(7, 'd');
        fullGraphData.forEach(data => {
          if (previousWeakDate < moment(data.tx_date)) {
            updateGraphData.push(data);
          }
        });
        PredictionGraph(updateGraphData,accuracy, true);
        break;

      case Two_Weak:
        let previousMonthDate = moment().subtract(14, 'months');
        fullGraphData.forEach(data => {
          if (previousMonthDate < moment(data.tx_date)) {
            updateGraphData.push(data);
          }
        });
        PredictionGraph(updateGraphData,accuracy, true);
        break;

      case Three_Weak:
        let previousThreeMonthDate = moment().subtract(21, 'months');
        fullGraphData.forEach(data => {
          if (previousThreeMonthDate < moment(data.tx_date)) {
            updateGraphData.push(data);
          }
        });
        PredictionGraph(updateGraphData,accuracy, true);
        break;

      case Four_Weak:
        let previousSixMonthDate = moment().subtract(1, 'months');
        fullGraphData.forEach(data => {
          if (previousSixMonthDate < moment(data.tx_date)) {
            updateGraphData.push(data);
          }
        });
        PredictionGraph(updateGraphData, accuracy, true);
        break;

      default:
        PredictionGraph(fullGraphData, accuracy, true);
    }
  };

  parseData = graphdata => {
    for (var i = 0; i < graphdata.length; i++) {
      //graphdata[i].tx_date = new Date(graphdata[i].tx_date);
      graphdata[i].tx_date = moment(graphdata[i].tx_date);
    }
    return graphdata;
  };
  getAccuracyPercentage = () => {
    const allDataRef = this.state.allData;
    const correctPredicted = allDataRef.filter(item => {
      return item.actual_position === item.predicted_position;
    });
    return Math.round((correctPredicted.length / allDataRef.length) * 100);
  };
  render() {
    let accuracyPercantage = this.getAccuracyPercentage();
    const iconClassName = `${
      accuracyPercantage < 55 ? "prediction-label-icon-red " : " prediction-label-icon-green "
    }icon icon-blank`;

    return (
      <div className="row mx-0 col-12">
        <div className="row mx-0 col-12 p-0" id="backTestModelGraphContainer">
          <div className="col-md-6 text-right pt-1" id="predictionGraphButton">
            <button
              className="model-graph-button"
              onClick={() => this.senddata(One_Weak)}
            >
              1W
            </button>
            <button
              className="model-graph-button"
              onClick={() => this.senddata(Two_Weak)}
            >
              2W
            </button>
            <button
              className="model-graph-button"
              onClick={() => this.senddata(Three_Weak)}
            >
              3W
            </button>
            <button
              className="model-graph-button model-graph-button-active"
              onClick={() => this.senddata(Four_Weak)}
            >
              4W
            </button>
          </div>
          <div className="col-md-3 fs-12 pt-2">
            <span className="icon icon-blank actual-label-icon">
              <span className="actual-label-text">{'Actual'}</span>{' '}
            </span>
            {/* <span className="icon icon-blank prediction-label-icon" id={this.props.predictionDetails}>  */}
            <span className={iconClassName}id={this.props.predictionDetails}>
              <span className="prediction-label-text">{'Prediction'}</span>
            </span>
          </div>
          <div className="col-md-3 overall-accuracy-text pb-2 pt-2">
            <div>
              {'Overall Acccuracy: ' + this.getAccuracyPercentage() + '%'}
            </div>
          </div>
        </div>
        <div id="predictionGraphContainer" className="col-12" />
        {/* <svg id="backTestModelChart" width="600" height="250" /> */}
      </div>
    );
  }
}
export default PredictionGraphSVG;
