import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'meteor/vulcan:i18n';
import { replaceComponent } from 'meteor/vulcan:lib';
import Dialog, { DialogContent, DialogTitle, } from 'material-ui/Dialog';
import Button from 'material-ui/Button';


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
      labelId,
      component,
      titleId,
      type,
      children,
    } = this.props;
    
    const intl = this.context.intl;
    
    const label = labelId ? intl.formatMessage({ id: labelId }) : this.props.label;
    const title = titleId ? intl.formatMessage({ id: titleId }) : this.props.title;
    
    const triggerComponent = component
      ?
      React.cloneElement(component, { onClick: this.openModal })
      :
      type === 'button'
        ?
        <Button raised onClick={this.openModal}>{label}</Button>
        :
        <a href="#" onClick={this.openModal}>{label}</a>;
    
    const childrenComponent = React.cloneElement(children, { closeModal: this.closeModal });
    
    return (
      <div className="modal-trigger">
        
        {triggerComponent}
        
        <Dialog className={className}
                open={this.state.modalIsOpen}
                onClose={this.closeModal}
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
  labelId: PropTypes.string,
  component: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleId: PropTypes.string,
  type: PropTypes.oneOf(['link', 'button']),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};


ModalTrigger.contextTypes = {
  intl: intlShape,
};


replaceComponent('ModalTrigger', ModalTrigger);
