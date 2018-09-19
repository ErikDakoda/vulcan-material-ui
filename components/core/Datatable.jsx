import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components, registerComponent, replaceComponent, withCurrentUser, withMulti } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import { getFieldValue } from './Card';
import _assign from 'lodash/assign';
import classNames from 'classnames';


/*

Datatable Component

*/
const baseStyles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    top: '-8px',
    right: 0,
  },
  search: {
    marginBottom: theme.spacing.unit * 8,
  },
  table: {},
  denseTable: {},
  denserTable: {},
  flatTable: {},
  tableHead: {},
  tableBody: {},
  tableFooter: {},
  tableRow: {},
  tableCell: {},
  clickRow: {},
  editCell: {},
  editButton: {}
});


class Datatable extends PureComponent {

  constructor(props) {
    super(props);

    this.updateQuery = this.updateQuery.bind(this);

    this.state = {
      query: '',
    };
  }

  updateQuery(value) {
    this.setState({
      query: value,
    });
  }

  render() {
    if (this.props.data) {

      return <Components.DatatableContents columns={this.props.data.length ? Object.keys(this.props.data[0]) : undefined} {...this.props} results={this.props.data} showEdit={false} showNew={false} />;

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
<<<<<<< de50185e90810d98e3a23d98ed20df6a40ed2711
      
      const DatatableWithList = withMulti(listOptions)(Components.DatatableContents);
      
=======

      const DatatableWithList = withList(listOptions)(Components.DatatableContents);

>>>>>>> Fixed static datatable behaviour
      return (
        <div className={classNames('datatable', `datatable-${collection._name}`, classes.root,
          className)}>

          {
            showSearch &&

            <Components.SearchInput value={this.state.query}
              updateQuery={this.updateQuery}
              className={classes.search}
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
  editComponent: PropTypes.func,
  showNew: PropTypes.bool,
  showSearch: PropTypes.bool,
  emptyState: PropTypes.node,
  currentUser: PropTypes.object,
  classes: PropTypes.object,
  data: PropTypes.array,
  footerData: PropTypes.array,
  dense: PropTypes.string,
  queryDataRef: PropTypes.func,
  rowClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  handleRowClick: PropTypes.func,
  intlNamespace: PropTypes.string,
};


Datatable.defaultProps = {
  showEdit: true,
  showSearch: true,
};


replaceComponent('Datatable', Datatable, withCurrentUser, [withStyles, baseStyles]);


/*

DatatableContents Component

*/
const datatableContentsStyles = theme => (_assign({}, baseStyles(theme), {
  table: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  denseTable: theme.utils.denseTable,
  flatTable: theme.utils.flatTable,
  denserTable: theme.utils.denserTable,
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
  refetch,
  showEdit,
  editComponent,
  emptyState,
  currentUser,
  classes,
  footerData,
  dense,
  queryDataRef,
  rowClass,
  handleRowClick,
  intlNamespace,
}) => {

  if (loading) {
    return <Components.Loading />;
  } else if (!results.length) {
    return emptyState || null;
  }

  if (queryDataRef) queryDataRef(this.props);

  const denseClass = dense && classes[dense + 'Table'];

  return (
    <React.Fragment>
      <Table className={classNames(classes.table, denseClass)}>

        <TableHead className={classes.tableHead}>
          <TableRow className={classes.tableRow}>
            {
              _.sortBy(columns, column => column.order).map(
                (column, index) =>
                  <Components.DatatableHeader key={index}
                    collection={collection}
                    intlNamespace={intlNamespace}
                    column={column}
                    classes={classes}
                  />
              )
            }
            {
              (showEdit || editComponent) &&

              <TableCell className={classes.tableCell} />
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
                    refetch={refetch}
                    key={index}
                    showEdit={showEdit}
                    editComponent={editComponent}
                    currentUser={currentUser}
                    classes={classes}
                    rowClass={rowClass}
                    handleRowClick={handleRowClick}
                  />)
            }
          </TableBody>
        }

        {
          footerData &&

          <TableFooter className={classes.tableFooter}>
            <TableRow className={classes.tableRow}>
              {
                _.sortBy(columns, column => column.order).map(
                  (column, index) =>
                    <TableCell key={index} className={classNames(classes.tableCell, column.footerClass)}>
                      {footerData[index]}
                    </TableCell>
                )
              }
              {
                (showEdit || editComponent) &&

                <TableCell className={classes.tableCell} />
              }
            </TableRow>
          </TableFooter>

        }

      </Table>

      <Components.LoadMore className={classes.loadMore}
        count={count}
        totalCount={totalCount}
        loadMore={loadMore}
        networkStatus={networkStatus}
      />
    </React.Fragment>
  );
};


replaceComponent('DatatableContents', DatatableContents, [withStyles, datatableContentsStyles]);


/*

DatatableHeader Component

*/
const DatatableHeader = ({ collection, intlNamespace, column, classes }, { intl }) => {
  const columnName = typeof column === 'string' ? column : column.name;
  let formattedLabel = '';

  if (collection) {
    const schema = collection.simpleSchema()._schema;

    /*
    use either:

    1. the column name translation
    2. the column name label in the schema (if the column name matches a schema field)
    3. the raw column name.
    */
    formattedLabel = typeof columnName === 'string' ?
      intl.formatMessage({
        id: `${collection._name}.${columnName}`,
        defaultMessage: schema[columnName] ? schema[columnName].label : columnName
      }) :
      '';
  } else if (intlNamespace) {
    formattedLabel = typeof columnName === 'string' ?
      intl.formatMessage({
        id: `${intlNamespace}.${columnName}`,
        defaultMessage: columnName
      }) :
      '';
  } else {
    formattedLabel = intl.formatMessage({ id: columnName, defaultMessage: columnName });
  }

  return <TableCell className={classNames(classes.tableCell, column.headerClass)}>{formattedLabel}</TableCell>;
};


DatatableHeader.contextTypes = {
  intl: intlShape,
};


replaceComponent('DatatableHeader', DatatableHeader);


/*

DatatableRow Component

*/
const datatableRowStyles = theme => (_assign({}, baseStyles(theme), {
  clickRow: {
    cursor: 'pointer',
  },
  editCell: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    textAlign: 'right',
  },
}));


const DatatableRow = ({
  collection,
  columns,
  document,
  refetch,
  showEdit,
  editComponent,
  currentUser,
  rowClass,
  handleRowClick,
  classes,
}, { intl }) => {

  const EditComponent = editComponent;

  if (typeof rowClass === 'function') {
    rowClass = rowClass(document);
  }

  return (
    <TableRow
      className={classNames('datatable-item', classes.tableRow, rowClass, handleRowClick && classes.clickRow)}
      onClick={handleRowClick && (event => handleRowClick(event, document))}
      hover
    >

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
        (showEdit || editComponent) &&

        <TableCell className={classes.editCell}>
          {
            EditComponent &&

            <EditComponent collection={collection} document={document} refetch={refetch} />
          }
          {
            showEdit &&

            <Components.EditButton collection={collection}
              document={document}
              buttonClasses={{ button: classes.editButton }}
            />
          }
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

  const columnName = typeof column === 'string' ? column : column.name;
  const className = typeof columnName === 'string' ?
    `datatable-item-${columnName.toLowerCase()}` :
    '';

  return (
    <TableCell className={classNames(classes.tableCell, className)}>
      <Component column={column}
        document={document}
        currentUser={currentUser}
      />
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
