import React from "react";
import { Modal } from "reactstrap";

class ChoiceDialogModal extends React.Component {
  render() {
    const { showModal } = this.props;

    return (
      <div className={showModal ? "" : "d-none"}>
        <Modal isOpen={showModal} className={this.props.className}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default ChoiceDialogModal;
