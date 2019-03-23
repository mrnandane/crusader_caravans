import React, { Component } from "react";
import "./DropDownSimple.scss";

class DropDownSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropDownOptions: this.props.dropDownOptions,
      selectedOption: this.props.optionSelected
        ? this.props.optionSelected
        : this.props.dropDownOptions[0]
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
      this.state.selectedOption[displayProperty] !==
        optionSelected[displayProperty]
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
    const { isOpen, dropDownOptions, selectedOption } = this.state;
    const { keyVal, displayProperty, placeHolderText } = this.props;

    let dropDownOptionsList = dropDownOptions.map(item => {
      return (
        <div
          className="col-12 dropdown-option p-2 fs-12"
          key={keyVal + item[displayProperty] + "-label"}
          onClick={() => this.optionSelectionChanged(item)}
        >
          {item[displayProperty]}
        </div>
      );
    });
    const menuClass = `dropdown-menu col${isOpen ? " show" : ""}`;
    const dropdownHeaderClass = `dropdown-header-panel align-items-center mx-0 p-0 col${
      isOpen ? " " : " dropdown-header-panel-closed"
    }`;
    const arrowClass = `${
      isOpen ? "triangle-up " : " triangle-down "
    }align-middle mt-2 float-right`;
    const placeHolderClass = `${
      selectedOption ? "place-holder-label-above d-none" : "place-holder-label"
    }`;
    return (
      <div key={keyVal} className={"dropdown-simple mx-0 p-0 col"}>
        <div
          className={dropdownHeaderClass}
          onClick={this.toggleOpen}
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div className="p-2">
            <span className={arrowClass} />
            <div className={placeHolderClass}> {placeHolderText} </div>
            <div className={"d-block"}>
              {selectedOption ? selectedOption[displayProperty] : ""}
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

export default DropDownSimple;
