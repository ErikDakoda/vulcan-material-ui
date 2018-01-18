import React from 'react';
import PropTypes from 'prop-types';
import { Components, replaceComponent } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';
import AddIcon from 'material-ui-icons/Add';


const NewButton = ({
                     className,
                     collection,
                     color = 'default',
                     fab,
                   }, { intl }) => (
  
  <Components.ModalTrigger
    className={className}
    component={<Components.TooltipIconButton titleId="datatable.new"
                                             icon={<AddIcon/>}
                                             color={color}
                                             fab={fab}
    />}
  >
    <Components.DatatableEditForm collection={collection}/>
  </Components.ModalTrigger>
);


NewButton.propTypes = {
  className: PropTypes.string,
  collection: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'contrast', 'accent']),
  fab: PropTypes.bool,
};


NewButton.contextTypes = {
  intl: intlShape
};


NewButton.displayName = 'NewButton';


replaceComponent('NewButton', NewButton);
