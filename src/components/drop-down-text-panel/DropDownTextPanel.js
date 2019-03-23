import React, { Component } from "react";
import "./DropDownTextPanel.scss";

class DropDownTextPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropDownOptions: this.props.dropDownOptions,
      selectedOption: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dropDownOptions: nextProps.dropDownOptions,
      selectedOption: nextProps.optionSelected ? nextProps.optionSelected : null
    });
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  optionSelectionChanged = optionSelected => {
    const { displayProperty } = this.props;
    if (
      this.state.selectedOption === null ||
      (this.state.selectedOption.id !== optionSelected.id &&
        this.state.selectedOption[displayProperty] !==
        optionSelected[displayProperty])
    ) {
      this.setState({
        selectedOption: optionSelected,
        isOpen: !this.state.isOpen
      });
      this.props.onSelectionChanged(optionSelected);
    } else {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  };

  render() {
    const { isOpen, dropDownOptions } = this.state;
    const { keyVal, displayProperty, placeHolderText } = this.props;

    let dropDownOptionsList = dropDownOptions.map(item => {
      return (
        <div
          className="col-12 dropdown-option pl-4 p-2"
          key={keyVal + item.id + "-label"}
          onClick={() => this.optionSelectionChanged(item)}
        >
          {item[displayProperty]}
        </div>
      );
    });
    const menuClass = `dropdown-menu cursor-pointer position-absolute col${
      isOpen ? " show" : ""
      }`;
    const dropdownHeaderClass = `dropdown-header-panel cursor-pointer align-items-center col${
      isOpen ? " " : " dropdown-header-panel-closed"
      }`;
    const arrowClass = `${
      isOpen ? "triangle-up " : " triangle-down "
      }align-middle mt-2 float-right`;
    const placeHolderClass = `${
      this.props.optionSelected ? "place-holder-label-above" : "place-holder-label"
      }`;
    return (
      <div key={keyVal} className={"dropdown-text dropdown mx-0 p-0 col"}>
        <div
          className={dropdownHeaderClass}
          onClick={this.toggleOpen}
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div className="pt-3">
            <span className={arrowClass} />
            <div className={placeHolderClass}> {placeHolderText} </div>
            <div className={"d-block pb-1"}>
              {this.props.optionSelected ? this.props.optionSelected[displayProperty] : ""}
            </div>
          </div>
        </div>
        <div className={"p-0 " + menuClass}>
          <div className="dropdown-content row mx-0">{dropDownOptionsList}</div>
        </div>
      </div>
    );
  }
}

export default DropDownTextPanel;
