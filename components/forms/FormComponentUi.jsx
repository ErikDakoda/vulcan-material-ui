import React from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography';
import classNames from 'classnames';


const styles = theme => ({
  formInput: {
    position: 'relative',
    marginBottom: theme.spacing.unit * 2,
  },
  counterWithHelper: {
    position: 'absolute',
    bottom: 0,
    right: '5px',
    padding: '5px',
  },
  counterWithoutHelper: {
    position: 'absolute',
    bottom: -theme.spacing.unit * 3,
    right: '5px',
    padding: '5px',
  },
  halfWidthLeft: {
    display: 'inline-block',
    width: '48%',
    verticalAlign: 'top',
    marginRight: '4%',
  },
  halfWidthRight: {
    display: 'inline-block',
    width: '48%',
    verticalAlign: 'top',
  },
});


const FormComponentUi = (props) => {
  const {
    classes,
    inputClassName,
    name,
    input,
    beforeComponent,
    afterComponent,
    renderExtraComponent,
    renderComponent,
    getErrors,
    help,
    showCharsRemaining,
    charsRemaining,
    charsCount,
    charsMax,
  } = props;
  
  const hasErrors = !!(getErrors() && getErrors().length);

  const inputClass = classNames(
    classes.formInput,
    inputClassName && classes[inputClassName],
    `input-${name}`,
    `form-component-${input || 'default'}`
  );
  
  return (
    <div className={inputClass}>
      {renderExtraComponent(beforeComponent)}
      {renderComponent()}
      {
        showCharsRemaining() &&
        <div className={
          hasErrors || help
            ? classes.counterWithHelper
            : classes.counterWithoutHelper
        }>
          <Typography variant="caption" color={charsRemaining >= 0 ? 'default' : 'error'}>
            {charsCount} / {charsMax}
          </Typography>
        </div>
      }
      {renderExtraComponent(afterComponent)}
    </div>
  );
};


FormComponentUi.propTypes = {
  classes: PropTypes.object.isRequired,
  inputClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  input: PropTypes.any,
  beforeComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  afterComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  renderExtraComponent: PropTypes.func.isRequired,
  renderComponent: PropTypes.func.isRequired,
  renderClear: PropTypes.func.isRequired,
  getErrors: PropTypes.func.isRequired,
  help: PropTypes.any,
  showCharsRemaining: PropTypes.func.isRequired,
  charsRemaining: PropTypes.number,
  charsCount: PropTypes.number,
  charsMax: PropTypes.number,
};


FormComponentUi.displayName = 'FormComponentUi';


registerComponent('FormComponentUi', FormComponentUi, [withStyles, styles]);
