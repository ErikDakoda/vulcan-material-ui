import React from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, Utils } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';
import withStyles from 'material-ui/styles/withStyles';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';


const styles = theme => ({
  root: {},
  tooltip: {
    margin: '2px !important',
  },
  buttonWrap: {},
  button: {},
});


const TooltipIconButton = (props, { intl }) => {
  
  const {
    titleId,
    icon,
    classes,
    tooltipId,
    buttonRef,
    fab,
    ...properties
  } = props;
  
  const title = intl.formatMessage({ id: titleId });
  const id = tooltipId || 'tooltip-' + Utils.slugify(titleId);
  
  return (
    <Tooltip classes={{ tooltip: classes.tooltip }}
             id={id}
             title={title}
             placement="bottom"
             enterDelay={300}
    >
      <div className={classes.buttonWrap}>
        {
          fab
            
            ?
            
            <Button className={classes.button}
                    fab
                    aria-label={title}
                    ref={buttonRef}
                    {...properties}
            >
              {icon}
            </Button>
            
            :
            
            <IconButton className={classes.button}
                        aria-label={title}
                        ref={buttonRef}
                        {...properties}
            >
              {icon}
            </IconButton>
        }
      </div>
    </Tooltip>
  );
  
};


TooltipIconButton.propTypes = {
  titleId: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  classes: PropTypes.object,
  tooltipId: PropTypes.string,
  buttonRef: PropTypes.func,
  fab: PropTypes.bool,
};


TooltipIconButton.contextTypes = {
  intl: intlShape.isRequired,
};


TooltipIconButton.displayName = 'TooltipIconButton';


registerComponent('TooltipIconButton', TooltipIconButton, [withStyles, styles]);
