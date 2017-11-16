import { replaceComponent } from 'meteor/vulcan:lib';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogContent, DialogTitle, } from 'material-ui/Dialog';


class ModalTrigger extends PureComponent {
  
  constructor () {
    super();
    
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    
    this.state = { modalIsOpen: false };
  }
  
  openModal () {
    this.setState({ modalIsOpen: true });
  }
  
  closeModal () {
    this.setState({ modalIsOpen: false });
  }
  
  render () {
    const {
      className,
      label,
      component,
      title,
      children,
    } = this.props;
    
    const triggerComponent = component
      ?
      React.cloneElement(component, { onClick: this.openModal })
      :
      <a href="#" onClick={this.openModal}>{label}</a>;
    
    const childrenComponent = React.cloneElement(children, { closeModal: this.closeModal });
    
    return (
      <div className="modal-trigger">
        
        {triggerComponent}
        
        <Dialog className={className}
                open={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
        >
          
          {
            title &&
            
            <DialogTitle>{title}</DialogTitle>
          }
          
          <DialogContent>
            {childrenComponent}
          </DialogContent>
        
        </Dialog>
      
      </div>
    );
  }
}


ModalTrigger.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  component: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};


replaceComponent('ModalTrigger', ModalTrigger);
