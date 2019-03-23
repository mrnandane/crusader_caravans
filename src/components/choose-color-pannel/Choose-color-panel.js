import React, { Component } from "react";
import "./Choose-color-panel.scss";

class ChooseColorPanel extends Component {
  static defaultProps = {
    title: "",
    colorOptions: []
  };

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      colorOptions: this.props.colorOptions,
      selectedColor: this.props.selectedColor
    };
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.selectedDoorColor !== this.state.checked) {
    console.log("--next props-selectedDoorColor--", nextProps.selectedColor);
    this.setState({
      selectedColor: nextProps.selectedColor
    });
    // }
  }

  onColorSelected = cOption => {
    this.props.onColorSelected(cOption);
  };

  render() {
    const { title, colorOptions, keyVal, selectedColor } = this.state;

    // const checkBoxClassName = `checkbox mw-100 ${
    //   disabled ? " checkbox-disabled" : ""
    // }`;
    console.log("selectedColor --", selectedColor);
    const colorPalletOptions = colorOptions.map(cOption => {
      const tickMarkClassName = `selection-mark ${
        selectedColor && cOption.id === selectedColor.id
          ? "selection-mark icon icon-ok-3"
          : "transperent"
      }`;
      return (
        <div className="pr-3 mb-3" key={cOption.id + "__" + cOption.name}>
          <div
            className="color-palet-option"
            style={{ backgroundColor: `${cOption.code}` }}
            onClick={() => this.onColorSelected(cOption)}
          >
            <div className={tickMarkClassName} />
          </div>
        </div>
      );
    });
    return (
      <div key={title + "__" + keyVal} className="col p-0">
        <div className="row mx-0 p-0 pb-2 color-palet-title">{title}</div>
        <div className="row mx-0 p-0">{colorPalletOptions}</div>
      </div>
    );
  }
}

export default ChooseColorPanel;
