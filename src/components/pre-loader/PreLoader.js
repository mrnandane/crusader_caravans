import React, { Component } from "react";
import "./PreLoader.scss";
class PreLoader extends Component {
  render() {
    const { loadingText } = this.props;

    return (
      <div className="loader-container text-center">
        <div className="loading-wrapper p-3">
          <div className="row mx-0 p-4">
            <span className="loading-icon mx-auto icon icon-spinner" />
          </div>
          <div className="row mx-0 p-3 text-center">
            <div className="col-md-12 fs-16 loading-text">
              {loadingText ? loadingText : "Loading..."}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PreLoader;
