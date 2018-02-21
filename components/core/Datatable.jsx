import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, replaceComponent, withCurrentUser, withList } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';
import withStyles from 'material-ui/styles/withStyles';
import Table, { TableBody, TableHead, TableRow, TableCell } from 'material-ui/Table';
import { getFieldValue } from './Card';
import _assign from 'lodash/assign';
import classNames from 'classnames';


/*

Datatable Component

*/
const baseStyles = {
  root: {
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    top: '-8px',
    right: 0,
  },
  table: {},
  tableHead: {},
  tableBody: {},
  tableRow: {},
  tableCell: {},
  editCell: {},
  editButton: {}
};


class Datatable extends PureComponent {
  
  constructor (props) {
    super(props);
    
    this.updateQuery = this.updateQuery.bind(this);
    
    this.state = {
      query: '',
    };
  }
  
  updateQuery (value) {
    this.setState({
      query: value,
    });
  }
  
  render () {
    if (this.props.data) {
      
      return <Components.DatatableContents {...this.props} results={this.props.data}/>;
      
    } else {
      
      const {
        className,
        collection,
        options,
        showSearch,
        showNew,
        currentUser,
        classes,
      } = this.props;
      
      const listOptions = {
        collection: collection,
        ...options,
      };
      
      const DatatableWithList = withList(listOptions)(Components.DatatableContents);
      
      return (
        <div className={classNames('datatable', `datatable-${collection._name}`, classes.root,
          className)}>
          
          {
            showSearch &&
            
            <Components.SearchInput value={this.state.query}
                                    updateQuery={this.updateQuery}
            />
          }
          {
            showNew &&
            
            <Components.NewButton collection={collection}
                                  variant="fab"
                                  color="primary"
                                  className={classes.addButton}
            />
          }
          
          
          <DatatableWithList {...this.props}
                             terms={{ query: this.state.query }}
                             currentUser={currentUser}
          />
        
        </div>
      );
    }
  }
}


Datatable.propTypes = {
  className: PropTypes.string,
  collection: PropTypes.object,
  options: PropTypes.object,
  columns: PropTypes.array,
  showEdit: PropTypes.bool,
  showNew: PropTypes.bool,
  showSearch: PropTypes.bool,
  emptyState: PropTypes.node,
  currentUser: PropTypes.object,
  classes: PropTypes.object,
  data: PropTypes.array,
};


Datatable.defaultProps = {
  showEdit: true,
  showSearch: true,
  classes: {},
};


replaceComponent('Datatable', Datatable, withCurrentUser, [withStyles, baseStyles]);


/*

DatatableContents Component

*/
const datatableContentsStyles = theme => (_assign({}, baseStyles, {
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
                             emptyState,
                             currentUser,
                             classes,
                           }) => {
  
  if (loading) {
    return <Components.Loading/>;
  } else if (!results.length) {
    return emptyState || null;
  }
  
  return (
    <div className="datatable-list">
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
        
        {
          results &&
          
          <TableBody className={classes.tableBody}>
            {
              results.map(
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
        }
      
      </Table>
      
      <Components.LoadMore className={classes.loadMore}
                           count={count}
                           totalCount={totalCount}
                           loadMore={loadMore}
                           networkStatus={networkStatus}
      />
    </div>
  );
};


replaceComponent('DatatableContents', DatatableContents, [withStyles, datatableContentsStyles]);


/*

DatatableHeader Component

*/
const DatatableHeader = ({ collection, column, classes }, { intl }) => {
  const columnName = typeof column === 'string' ? column : column.name;
  if (collection) {
    const schema = collection.simpleSchema()._schema;
    
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
  } else {
    const formattedLabel = intl.formatMessage({ id: columnName, defaultMessage: columnName });
    return <TableCell className={classes.tableCell}>{formattedLabel}</TableCell>;
  }
};


DatatableHeader.contextTypes = {
  intl: intlShape,
};


replaceComponent('DatatableHeader', DatatableHeader);


/*

DatatableRow Component

*/
const datatableRowStyles = theme => (_assign({}, baseStyles, {
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
          <Components.EditButton collection={collection}
                                 document={document}
                                 buttonClasses={{ button: classes.editButton }}
          />
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
