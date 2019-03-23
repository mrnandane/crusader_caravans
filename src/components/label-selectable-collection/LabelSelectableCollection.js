import React, {Component} from 'react';
import LabelSelectable from '../label-selectable/LabelSelectable';
// import './DropDownCheckboxPanel.scss';

class LabelSelectableCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            labelsList: this.props.labelsList
        };
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.labelsList) {
            this.setState({ labelsList: nextProps.labelsList });
        }
    }

    onLabelSelectionModified = (modifiedItem, selectedStatus) => {
        let labelsList = this.state.labelsList.map((item) => {
            item.selected = item.label === modifiedItem.label ?  selectedStatus : item.selected;
            return item;
        })
        this.setState({
           labelsList
        })
        this.props.onLabelSelctionModified(labelsList)
    }
    render() {
        const selectableLabelsList = this.state.labelsList.map((item) => {
            return (
                <div key={item.label} className="d-inline">
                   <LabelSelectable displayLabel={item.label} selected={item.selected} 
                    onClick={(selectedStatus) => this.onLabelSelectionModified(item, selectedStatus)}/>
                </div>
            )
        })
        return (
            <div className='' >
                { selectableLabelsList }
            </div>
        );
    }
}

export default LabelSelectableCollection;
