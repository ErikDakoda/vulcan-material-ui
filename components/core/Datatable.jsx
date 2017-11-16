import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, replaceComponent, withCurrentUser, withList } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';
import withStyles from 'material-ui/styles/withStyles';
import Table, { TableBody, TableHead, TableRow, TableCell } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/Edit';
import { getFieldValue } from './Card';
import _assign from 'lodash/assign';
import classNames from 'classnames';


/*

Datatable Component

*/
const stylesBase = {
  table: {},
  tableHead: {},
  tableBody: {},
  tableRow: {},
  tableCell: {},
  editCell: {},
  editButton: {}
};


class Datatable extends PureComponent {
  
  constructor () {
    super();
    
    this.state = {
      query: '',
    };
    
    this.updateQuery = this.updateQuery.bind(this);
  }
  
  updateQuery (value) {
    this.setState({
      query: value,
    });
  }
  
  render () {
    
    const listOptions = {
      collection: this.props.collection,
      ...this.props.options,
    };
    
    const DatatableWithList = withList(listOptions)(Components.DatatableContents);
    
    return (
      <div className={`datatable datatable-${this.props.collection._name}`}>
        
        {
          this.props.showSearch &&
          
          <Components.SearchInput value={this.state.query}
                                  updateQuery={this.updateQuery}
          />
        }
        
        <DatatableWithList {...this.props}
                           terms={{ query: this.state.query }}
                           currentUser={this.props.currentUser}
        />
      
      </div>
    );
  }
}


Datatable.propTypes = {
  collection: PropTypes.object,
  options: PropTypes.object,
  columns: PropTypes.array,
  showEdit: PropTypes.bool,
  showSearch: PropTypes.bool,
  classes: PropTypes.object,
};


Datatable.defaultProps = {
  showEdit: true,
  showSearch: true,
  classes: {},
};


replaceComponent('Datatable', Datatable, withCurrentUser);


/*

DatatableContents Component

*/
const datatableContentsStyles = theme => (_assign({}, stylesBase, {
  table: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
}));


const DatatableContents = ({
                             collection,
                             columns,
                             results,
                             loading,
                             loadMore,
                             count,
                             totalCount,
                             networkStatus,
                             showEdit,
                             currentUser,
                             classes,
                           }) => {
  
  return (
    <Components.ListWrap className="datatable-list"
                         loading={loading}
                         listItems={results}
                         notAuthorized={false}
    >
      
      <Table className={classes.table}>
        
        <TableHead className={classes.tableHead}>
          <TableRow className={classes.tableRow}>
            {
              _.sortBy(columns, column => column.order).map(
                (column, index) =>
                  <Components.DatatableHeader key={index}
                                              collection={collection}
                                              column={column}
                                              classes={classes}
                  />)
            }
            {
              showEdit &&
              
              <TableCell className={classes.tableCell}/>
            }
          </TableRow>
        </TableHead>
        
        <TableBody className={classes.tableBody}>
          {
            results && results.map(
              (document, index) =>
                <Components.DatatableRow collection={collection}
                                         columns={columns}
                                         document={document}
                                         key={index}
                                         showEdit={showEdit}
                                         currentUser={currentUser}
                                         classes={classes}
                />)
          }
        </TableBody>
      
      </Table>
      
      <Components.LoadMore className={classes.loadMore}
                           count={count}
                           totalCount={totalCount}
                           loadMore={loadMore}
                           networkStatus={networkStatus}
      />
    
    </Components.ListWrap>
  );
};


replaceComponent('DatatableContents', DatatableContents, [withStyles, datatableContentsStyles]);


/*

DatatableHeader Component

*/
const DatatableHeader = ({ collection, column, classes }, { intl }) => {
  const schema = collection.simpleSchema()._schema;
  const columnName = typeof column === 'string' ? column : column.name;
  
  /*
  use either:
  
  1. the column name translation
  2. the column name label in the schema (if the column name matches a schema field)
  3. the raw column name.
  */
  const formattedLabel = intl.formatMessage({
    id: `${collection._name}.${columnName}`,
    defaultMessage: schema[columnName] ? schema[columnName].label : columnName
  });
  
  return <TableCell className={classes.tableCell}>{formattedLabel}</TableCell>;
};


DatatableHeader.contextTypes = {
  intl: intlShape,
};


replaceComponent('DatatableHeader', DatatableHeader);


/*

DatatableRow Component

*/
const datatableRowStyles = theme => (_assign({}, stylesBase, {
  editCell: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    textAlign: 'right',
  },
  editButton: {
    width: '40px',
    height: '40px',
  }
}));


const DatatableRow = ({
                        collection,
                        columns,
                        document,
                        showEdit,
                        currentUser,
                        classes
                      }, { intl }) => {
  
  const editTitle = intl.formatMessage({ id: 'datatable.edit' });
  
  return (
    <TableRow className={classNames('datatable-item', classes.tableRow)}>
      
      {
        _.sortBy(columns, column => column.order).map(
          (column, index) =>
            <Components.DatatableCell key={index}
                                      column={column}
                                      document={document}
                                      currentUser={currentUser}
                                      classes={classes}
            />)
      }
      
      {
        showEdit &&
        
        <TableCell className={classes.editCell}>
          <Components.ModalTrigger
            label={intl.formatMessage({ id: 'datatable.edit' })}
            component={<IconButton className={classes.editButton} aria-label={editTitle}>
              <EditIcon/>
            </IconButton>}
          >
            <Components.DatatableEditForm collection={collection} document={document}/>
          </Components.ModalTrigger>
        </TableCell>
      }
    
    </TableRow>
  );
};


replaceComponent('DatatableRow', DatatableRow, [withStyles, datatableRowStyles]);


DatatableRow.contextTypes = {
  intl: intlShape
};


/*

DatatableEditForm Component

*/
const DatatableEditForm = ({ collection, document, closeModal }) =>
  <Components.SmartForm
    collection={collection}
    documentId={document && document._id}
    showRemove={true}
    successCallback={document => {closeModal();}}
  />;


replaceComponent('DatatableEditForm', DatatableEditForm);


/*

DatatableCell Component

*/
const DatatableCell = ({ column, document, currentUser, classes }) => {
  const Component = column.component ||
    Components[column.componentName] ||
    Components.DatatableDefaultCell;
  
  const columnName = column.name || column;
  
  return (
    <TableCell
      className={classNames(classes.tableCell, `datatable-item-${columnName.toLowerCase()}`)}>
      <Component column={column}
                 document={document}
                 currentUser={currentUser}/>
    </TableCell>
  );
};


replaceComponent('DatatableCell', DatatableCell);


/*

DatatableDefaultCell Component

*/
const DatatableDefaultCell = ({ column, document }) =>
  <div>
    {
      typeof column === 'string'
        ?
        getFieldValue(document[column])
        :
        getFieldValue(document[column.name])
    }
  </div>;


replaceComponent('DatatableDefaultCell', DatatableDefaultCell);
