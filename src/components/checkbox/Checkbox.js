import React, {Component} from 'react';
import './Checkbox.scss';

class Checkbox extends Component {
  static defaultProps = {
    checked: false,
    disabled: false,
    checkBoxLabel: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked
    };
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  toggleCheck = () => {
    this.setState({
      checked: !this.state.checked,
    });
    setTimeout(()=>{
      this.props.onCheckChanged(this.state.checked);
    },0)
  };

  render() {
    const { disabled, id, checkBoxLabel, keyVal } = this.props;
    const { checked } = this.state;
    const checkBoxClassName = `checkbox mw-100 ${disabled ? " checkbox-disabled" : ""}`
    return (
      <div key={keyVal} className={checkBoxClassName} title={checkBoxLabel}>
        <input key={keyVal} type="checkbox" id={keyVal + id + checkBoxLabel} disabled={disabled} 
                checked={checked}
               onChange={this.toggleCheck}/>
        <label htmlFor={keyVal + id + checkBoxLabel}>{checkBoxLabel}</label>
      </div>
    );
  }
}

export default Checkbox;
