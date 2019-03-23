import React, { Component } from "react";
import Checkbox from "../checkbox/Checkbox";
import "./DropDownCheckboxPanel.scss";
import LabelCancelable from "../label-cancelable/LabelCancelable";

class DropDownCheckboxPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      labels: this.props.labelsObj,
      isAllChecked: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      labels: nextProps.labelsObj
    });
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  checkStatusChanged = (status, itemChecked) => {
    const labels = this.state.labels ? this.state.labels : [];
    let totalLabelsChecked = 0;
    labels.map(item => {
      if (item.label === itemChecked.label) {
        item.selected = status;
      }
      totalLabelsChecked = item.selected
        ? totalLabelsChecked + 1
        : totalLabelsChecked;
      return item;
    });

    this.setState({
      labels,
      isAllChecked: labels.length === totalLabelsChecked
    });
    this.props.onSelectionChanged(labels);
  };
  checkAllStatusChanged = status => {
    const labels = this.state.labels ? this.state.labels : [];
    labels.map(item => {
      item.selected = !item.default_value ? status : item.default_value;
      return item;
    });
    this.setState({
      labels,
      isAllChecked: status
    });
    this.props.onSelectionChanged(labels);
  };
  clearAllClicked = () => {
    this.checkAllStatusChanged(false);
  };
  onRemoveLabelClicked = itemToBeRemoved => {
    this.checkStatusChanged(false, itemToBeRemoved);
  };
  render() {
    const { isOpen, labels, isAllChecked } = this.state;
    const { keyVal, isIndicator } = this.props;
    const checkBoxAndLabelsList = labels.map(item => {
      return (
        <div
          key={keyVal + item.id}
          className="col-md-4 pt-2 pb-2 fs-12 text-truncate"
        >
          <Checkbox
            keyVal={keyVal + item.id}
            id={item.id}
            checkBoxLabel={item.label}
            disabled={item.default_value}
            checked={item.selected}
            onCheckChanged={status => this.checkStatusChanged(status, item)}
          />
        </div>
      );
    });
    let checkedLabelsList = labels
      .filter(item => item.selected)
      .map(item => {
        if (item.selected) {
          return (
            <div key={keyVal + item.id + "-label"} className="d-inline">
              <LabelCancelable
                displayLabel={item.label}
                disabled={item.default_value}
                onCloseClicked={() => this.onRemoveLabelClicked(item)}
              />
            </div>
          );
        }
        return null;
      });

    const menuClass = `dropdown-menu position-relative col${
      isOpen ? " show" : ""
    }`;
    const dropdownHeaderClass = `dropdown-header-panel align-items-center cursor-pointer col${
      isOpen ? " " : " dropdown-header-panel-closed"
    }`;
    const colWidthClass = `${
      isOpen || checkedLabelsList.length > 0 ? " col-md-12" : " col-md-6"
    }`;
    const arrowClass = `${
      isOpen ? "triangle-up " : " triangle-down "
    }align-middle mt-2 float-right`;
    const placeHolderClass = `${
      isOpen || checkedLabelsList.length > 0
        ? "place-holder-label-above"
        : "place-holder-label"
    }`;
    const showCheckBoxAndLabelListClass = `${
      isIndicator ? "hide-checkbox-label-list" : "d-block pt-2 pb-1"
    }`;
    const indicatorColWidthClass = `${
      isIndicator ? " col-md-12 " : colWidthClass
    }`;
    const indicatorDropDownContentClass = `${
      isIndicator ? " dropdown-content-indicator " : " dropdown-content "
    }`;
    const showSeparator = `${isIndicator ? "dropdown-divider" : "  "}`;
    const showBoxShadow = `${
      isIndicator
        ? " dropdown-box-shadow " + dropdownHeaderClass
        : dropdownHeaderClass
    }`;
    const placeHolderIndicatorClass = `${
      isIndicator ? "place-holder-label" : placeHolderClass
    }`;

    return (
      <div
        key={keyVal}
        className={"dropdown mx-0 p-0" + indicatorColWidthClass}
      >
        <div
          className={showBoxShadow}
          onClick={this.toggleOpen}
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div className="pt-3">
            <span className={arrowClass} />
            <div className={placeHolderIndicatorClass}>
              {" "}
              {this.props.placeHolderText}{" "}
            </div>
            <div className={showCheckBoxAndLabelListClass}>
              {checkedLabelsList}
            </div>
          </div>
        </div>
        <div className={"p-0 " + menuClass}>
          <div className="dropdown-header-row p-2 pl-3">
            <Checkbox
              keyVal={keyVal + "__all"}
              checkBoxLabel="All"
              checked={isAllChecked}
              onCheckChanged={status => this.checkAllStatusChanged(status)}
            />
            <span
              className="clear-all-btn ml-4 cursor-pointer"
              onClick={this.clearAllClicked}
            >
              {"Clear All"}
            </span>
          </div>
          <div className={showSeparator} />
          <div className={indicatorDropDownContentClass + "row mx-0"}>
            {checkBoxAndLabelsList}
          </div>
        </div>
      </div>
    );
  }
}

export default DropDownCheckboxPanel;
