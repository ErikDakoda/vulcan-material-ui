import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, replaceComponent } from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';


const styles = theme => ({
  root: {
    minWidth: '320px',
  },
  divider: {
    marginLeft: theme.spacing.unit * -3,
    marginRight: theme.spacing.unit * -3,
  },
  head: {
    marginTop: theme.spacing.unit * 5,
    position: 'relative',
    cursor: 'pointer',
  },
  typography: {
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
    },
    '& > div:first-child': {
      ...theme.typography.subheading,
      flexGrow: 1,
    },
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  toggle: {
    color: theme.palette.action.active,
  },
  entered: {
    overflow: 'visible',
  },
});


class FormGroup extends PureComponent {
  
  constructor (props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.renderHeading = this.renderHeading.bind(this);
    
    this.state = {
      collapsed: props.startCollapsed || false
    };
  }
  
  toggle () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  
  renderHeading () {
    const { classes } = this.props;
    
    return (
      <div className={classes.head} onClick={this.toggle}>
        
        <Divider className={classes.divider}/>
        
        <Typography className={classes.typography} type="subheading" gutterBottom>
          <div>
            {this.props.label}
          </div>
          <div className={classes.toggle}>
            {
              this.state.collapsed
                ?
                <ExpandMoreIcon/>
                :
                <ExpandLessIcon/>
            }
          </div>
        </Typography>
      
      </div>
    );
  }
  
  render () {
    const { classes, fields } = this.props;
    
    const hasErrors = _.some(fields, field => field.errors && field.errors.length);
    const collapseIn = !this.state.collapsed || hasErrors;
    
    return (
      <div className={classes.root}>
        
        {
          this.props.name === 'default'
            ?
            null
            :
            this.renderHeading()
        }
  
        <Collapse classes={{entered: classes.entered}} in={collapseIn} transitionDuration="auto">
          {
            this.props.fields.map(field =>
              <Components.FormComponent key={field.name}
                                        {...field}
                                        updateCurrentValues={this.props.updateCurrentValues}
              />)
          }
        </Collapse>
      
      </div>
    );
  }
}


FormGroup.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  order: PropTypes.number,
  fields: PropTypes.array,
  startCollapsed: PropTypes.bool,
  updateCurrentValues: PropTypes.func,
};


replaceComponent('FormGroup', FormGroup, [withStyles, styles]);
