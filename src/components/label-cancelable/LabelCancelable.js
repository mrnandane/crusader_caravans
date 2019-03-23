import React, {Component} from 'react';
import './LabelCancelable.scss';

class LabelCancelable extends Component {

  handleChildClick(e) {
    e.stopPropagation()
  }
  closeClicked(e, props) {
    e.stopPropagation();
    props.onCloseClicked()
  }
  
  render() {
    const {displayLabel, keyVal, disabled} = this.props;
    return (
      <span className={ "label-wrapper d-inline-block pr-2 pl-2 mr-2 mb-2" } onClick={ this.handleChildClick }>
          <button key={keyVal} type="button" className="close cursor-pointer ml-2 float-right" aria-label="Close"
              disabled={disabled} onClick={(e) => this.closeClicked(e, this.props) }>
              <span aria-hidden="true">&times;</span>
          </button>
          <span className="label-text fs-12">
            { displayLabel }
          </span>
      </span>
    );
  }
}

export default LabelCancelable;
