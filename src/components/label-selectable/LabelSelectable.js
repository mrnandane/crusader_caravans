import React, {Component} from 'react';
import './LabelSelectable.scss';

class LabelSelectable extends Component {
  static defaultProps = {
    selected: false,
    displayLabel: ''
  };
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected
    };
  };

  toggleSelected = () => {
    this.setState({
      selected: !this.state.selected,
    });
    setTimeout(() => {
      this.props.onClick(this.state.selected);
    },0)
  };

  render() {
    const { displayLabel } = this.props;
    const selectableLabelClassName = this.state.selected ? ' selected' : '';
    return (
      <span className={ "selectable-label d-inline-block cursor-pointer pl-4 pr-4 p-1 mr-2 mb-2" + selectableLabelClassName } 
           onClick={ this.toggleSelected }>
        <span className="selectable-label-text fs-12">
          { displayLabel }
        </span>
      </span>
    );
  }
}

export default LabelSelectable;
