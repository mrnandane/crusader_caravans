import React, { Component } from "react";
import BackTestModelGraph from "./../back-test-chart/BackTestModelGraph";
import * as moment from "moment";

const One_Weak = "1W";
const One_Month = "1M";
const Three_Month = "3M";
const Six_Month = "6M";
const One_Year = "1Y";
const Five_Year = "5Y";
const Max = "Max";

class BackTestModelGraphSVG extends Component {
  componentDidMount() {
    let header = document.getElementById("modelgraphButton");
    let btns = header.getElementsByClassName("model-graph-button");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName(
          "model-graph-button-active"
        );
        current[0].className = current[0].className.replace(
          " model-graph-button-active",
          ""
        );
        this.className += " model-graph-button-active";
      });
    }
    const data = this.parseData(this.props.graphData);
    BackTestModelGraph(data, false);
  }
  senddata = duration => {
    let updateGraphData = [];
    const fullGraphData = this.props.graphData;
    console.log("fullGraphData", fullGraphData, duration);
    console.log("duration", duration);
    switch (duration) {
      case One_Weak:
        let previousWeakDate = moment().subtract(7, "d");
        console.log("previousWeakDate", previousWeakDate);
        fullGraphData.forEach(data => {
          if (previousWeakDate < moment(data.date)) {
            updateGraphData.push(data);
          }
        });
        BackTestModelGraph(updateGraphData, true);
        break;

      case One_Month:
        let previousMonthDate = moment().subtract(1, "months");
        console.log("previousMonthDate", previousMonthDate);
        fullGraphData.forEach(data => {
          if (previousMonthDate < moment(data.date)) {
            updateGraphData.push(data);
          }
        });
        BackTestModelGraph(updateGraphData, true);
        break;

      case Three_Month:
        let previousThreeMonthDate = moment().subtract(3, "months");
        console.log("previousThreeMonthDate", previousThreeMonthDate);
        fullGraphData.forEach(data => {
          if (previousThreeMonthDate < moment(data.date)) {
            updateGraphData.push(data);
          }
        });
        BackTestModelGraph(updateGraphData, true);
        break;

      case Six_Month:
        let previousSixMonthDate = moment().subtract(6, "months");
        console.log("previousSixMonthDate", previousSixMonthDate);
        fullGraphData.forEach(data => {
          if (previousSixMonthDate < moment(data.date)) {
            updateGraphData.push(data);
          }
        });
        BackTestModelGraph(updateGraphData, true);
        break;

      case One_Year:
        let previousYearDate = moment().subtract(1, "years");
        console.log("previousYearDate", previousYearDate);
        fullGraphData.forEach(data => {
          if (previousYearDate < moment(data.date)) {
            updateGraphData.push(data);
          }
        });
        BackTestModelGraph(updateGraphData, true);
        break;

      case Five_Year:
        let previousFiveYearDate = moment().subtract(5, "years");
        console.log("previousFiveYearDate", previousFiveYearDate);
        fullGraphData.forEach(data => {
          if (previousFiveYearDate < moment(data.date)) {
            updateGraphData.push(data);
          }
        });
        BackTestModelGraph(updateGraphData, true);
        break;
      case Max:
        BackTestModelGraph(fullGraphData, true);
        break;
      default:
        BackTestModelGraph(fullGraphData, true);
    }
  };

  parseData(graphdata) {
    // console.log('graphdata123', graphdata);
    for (var i = 0; i < graphdata.length; i++) {
      graphdata[i].date = new Date(graphdata[i].date);
      // graphdata[i].close = +graphdata[i].close;
    }
    return graphdata;
  }
  render() {
    return (
      <div className="row mx-0 col-12">
        <div className="row mx-0 col-12" id="backTestModelGraphContainer">
          <span className="col-md-12 offset-md-5" id="modelgraphButton">
            <button
              className="model-graph-button"
              onClick={() => this.senddata(One_Weak)}
            >
              1W
            </button>
            <button
              className="model-graph-button"
              onClick={() => this.senddata(One_Month)}
            >
              1M
            </button>
            <button
              className="model-graph-button"
              onClick={() => this.senddata(Three_Month)}
            >
              3M
            </button>
            <button
              className="model-graph-button"
              onClick={() => this.senddata(Six_Month)}
            >
              6M
            </button>
            <button
              className="model-graph-button"
              onClick={() => this.senddata(One_Year)}
            >
              1YR
            </button>
            <button
              className="model-graph-button"
              onClick={() => this.senddata(Five_Year)}
            >
              5YR
            </button>
            <button
              className="model-graph-button model-graph-button-active"
              onClick={() => this.senddata(Max)}
            >
              Max
            </button>
          </span>
        </div>
        <div id="backTestModelChartContainer" className="col-12" />
        {/* <svg id="backTestModelChart" width="600" height="250" /> */}
      </div>
    );
  }
}
export default BackTestModelGraphSVG;
