import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerComponent.scss";

class DatePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ""
    };
  }

  handleChange = date => {
    this.setState({
      date: date
    });
    this.props.onDateChange(date);
  };

  render() {
    const { keyVal } = this.props;

    const placeHolderClass = `${
      this.props.value ? "place-holder-label-above" : "place-holder-label"
      }`;
    const placeholdertext = "Backtest duration";

    const datePickerTopPadding = `${
      this.props.value ? "pt-3" : "pt-2"
      }`

    return (
      <div key={keyVal} className="date-picker-component" onClick={this.props.onClick}>
        <div className="date-picker">
          <div className="date-picker-header-panel cursor-pointer align-items-center col date-picker-header-panel-closed" aria-haspopup="true" aria-expanded="false">
            <div className={datePickerTopPadding}>
              <span className="calendar-font icon icon-calendar-empty-1 align-middle float-right" />
              <div className={placeHolderClass}> {placeholdertext} </div>
              <div className={"d-block pb-1"}>
                {this.props.value ? this.props.value : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DatePickerComponent;
