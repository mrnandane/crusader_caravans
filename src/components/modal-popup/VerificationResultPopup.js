import React, { Component } from 'react';
import './VerificationResultPopup.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class VerificationResultPopup extends Component {

  closeVerifyModal = () => {
    this.props.toggle()
  }
  addToFeatureList = () => {
    this.props.addFeature()
  }
  render() {
    return (
      <Modal isOpen={this.props.showModal} size="xl">
        <ModalHeader className="verify-modal-header" >{this.props.title}

        <p className="verify-modal-close text-right float-right" onClick={this.closeVerifyModal}> 
          Close 
        </p>
        
        </ModalHeader>
        <ModalBody className = "verify-modal-body " >
          {this.props.children}
        </ModalBody>
        <ModalFooter className = "verify-modal-footer" >
          <Button className="btn-orange-rounded" onClick={this.addToFeatureList}>{this.props.buttonText}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default VerificationResultPopup;
