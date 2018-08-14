import React from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, Utils } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';
import withStyles from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';


const styles = theme => ({
  root: {
    display: 'inline-block',
  },
  tooltip: {
    margin: '4px !important',
  },
  buttonWrap: {
    display: 'inline-block',
  },
  button: {},
});


const TooltipIntl = (props, { intl }) => {
  
  const {
    title,
    titleId,
    titleValues,
    placement,
    icon,
    className,
    classes,
    theme,
    enterDelay,
    buttonRef,
    variant,
    children,
    ...properties
  } = props;
  
  const tooltipEnterDelay = typeof enterDelay === 'number' ? enterDelay : theme.utils.tooltipEnterDelay;
  const titleText = props.title || intl.formatMessage({ id: titleId }, titleValues);
  const slug = Utils.slugify(titleId);
  
  return (
    <span className={classNames('tooltip-intl', classes.root, className)}>
      <Tooltip classes={{ tooltip: classes.tooltip }}
               id={`tooltip-${slug}`}
               title={titleText}
               placement={placement}
               enterDelay={tooltipEnterDelay}
      >
        <span className={classes.buttonWrap}>
          {
            variant === 'fab' && !!icon
      
              ?
      
              <Button className={classNames(classes.button, slug)}
                      variant="fab"
                      aria-label={title}
                      ref={buttonRef}
                      {...properties}
              >
                {icon}
              </Button>
      
              :
      
              !!icon
        
                ?
        
                <IconButton className={classNames(classes.button, slug)}
                            aria-label={title}
                            ref={buttonRef}
                            {...properties}
                >
                  {icon}
                </IconButton>
        
                :
        
                variant === 'button'
          
                  ?
                  <Button className={classNames(classes.button, slug)}
                          aria-label={title}
                          ref={buttonRef}
                          {...properties}
                  >
                    {children}
                  </Button>
          
                  :
          
                  children
          }
        </span>
      </Tooltip>
    </span>
  );
  
};


TooltipIntl.propTypes = {
  title: PropTypes.node,
  titleId: PropTypes.string,
  titleValues: PropTypes.object,
  placement: PropTypes.string,
  icon: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object,
  buttonRef: PropTypes.func,
  variant: PropTypes.string,
  theme: PropTypes.object,
  enterDelay: PropTypes.number,
  children: PropTypes.node,
};


TooltipIntl.defaultProps = {
  placement: 'bottom',
};


TooltipIntl.contextTypes = {
  intl: intlShape.isRequired,
};


TooltipIntl.displayName = 'TooltipIntl';


registerComponent('TooltipIntl', TooltipIntl, [withStyles, styles], [withTheme]);
