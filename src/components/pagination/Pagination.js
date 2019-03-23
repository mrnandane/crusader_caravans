import React, { Component } from "react";
import "./Pagination.scss";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageCnt: this.props.currentPageCnt ? this.props.currentPageCnt : 1,
      maxPageCnt: this.props.maxPageCnt ? this.props.maxPageCnt : 1
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPageCnt: nextProps.currentPageCnt
    });
  }
  onNextPageClicked = () => {
    const currentPageCnt = this.state.currentPageCnt;
    this.onPageChangeClicked(currentPageCnt + 1);
  };

  onPrevPageClicked = () => {
    const currentPageCnt = this.state.currentPageCnt;
    this.onPageChangeClicked(
      currentPageCnt > 1 ? currentPageCnt - 1 : currentPageCnt
    );
  };

  onPageChangeClicked = currentPageCnt => {
    if (currentPageCnt < this.state.maxPageCnt + 1) {
      this.setState({
        currentPageCnt: currentPageCnt
      });
      this.props.onPageChangeClicked(currentPageCnt);
    }
  };

  changeOptimiseValueClicked = () => {
    this.props.changeOptimiseValueClicked();
  };
  render() {
    return (
      <div className="row">
        <span
          className="icon icon-to-start"
          onClick={() => this.onPageChangeClicked(1)}
        />
        <span
          className="icon icon-play fa-rotate-180"
          onClick={() => this.onPrevPageClicked()}
        />
        <span className="pl-4 pr-4">{this.state.currentPageCnt}</span>
        <span
          className="icon icon-play"
          onClick={() => this.onNextPageClicked()}
        />
        <span
          className="icon icon-to-end"
          onClick={() => this.onPageChangeClicked(this.state.maxPageCnt)}
        />
      </div>
    );
  }
}

export default Pagination;
