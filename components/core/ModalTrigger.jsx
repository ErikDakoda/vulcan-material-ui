import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'meteor/vulcan:i18n';
import { replaceComponent } from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';
import Dialog, { DialogContent, DialogTitle, } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import classNames from 'classnames';


const styles = theme => ({
  root: {
    display: 'inline-block',
  },
  button: {},
  anchor: {},
  dialog: {},
  dialogTitle: {},
  dialogContent: {
    paddingTop: '4px',
  },
});


class ModalTrigger extends PureComponent {
  
  constructor (props) {
    super(props);
    
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
      dialogClassName,
      labelId,
      component,
      titleId,
      type,
      children,
      classes,
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
        <Button className={classes.button} variant="raised" onClick={this.openModal}>{label}</Button>
        :
        <a className={classes.anchor} href="#" onClick={this.openModal}>{label}</a>;
    
    const childrenComponent = React.cloneElement(children, { closeModal: this.closeModal });
    
    return (
      <span className={classNames('modal-trigger', classes.root, className)}>
        
        {triggerComponent}
        
        <Dialog className={classNames(dialogClassName)}
                open={this.state.modalIsOpen}
                onClose={this.closeModal}
                fullWidth={true}
        >
          
          {
            title &&
            
            <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
          }
          
          <DialogContent className={classes.dialogContent}>
            {childrenComponent}
          </DialogContent>
        
        </Dialog>
      
      </span>
    );
  }
}


ModalTrigger.propTypes = {
  className: PropTypes.string,
  dialogClassName: PropTypes.string,
  label: PropTypes.string,
  labelId: PropTypes.string,
  component: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleId: PropTypes.string,
  type: PropTypes.oneOf(['link', 'button']),
  children: PropTypes.node,
  classes: PropTypes.object,
};


ModalTrigger.contextTypes = {
  intl: intlShape,
};


replaceComponent('ModalTrigger', ModalTrigger, [withStyles, styles]);
