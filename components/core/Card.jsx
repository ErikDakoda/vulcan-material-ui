import { replaceComponent, Components } from "meteor/vulcan:core";
import { intlShape } from "meteor/vulcan:i18n";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import EditIcon from "mdi-material-ui/Pencil";

const getLabel = (field, fieldName, collection, intl) => {
  const schema = collection.simpleSchema()._schema;
  const fieldSchema = schema[fieldName];
  if (fieldSchema) {
    return intl.formatMessage({
      id: `${collection._name}.${fieldName}`,
      defaultMessage: fieldSchema.label
    });
  } else {
    return fieldName;
  }
};

const getTypeName = (field, fieldName, collection) => {
  const schema = collection.simpleSchema()._schema;
  const fieldSchema = schema[fieldName];
  if (fieldSchema) {
    const type = fieldSchema.type.singleType;
    const typeName = typeof type === "function" ? type.name : type;
    return typeName;
  } else {
    return typeof field;
  }
};

const parseImageUrl = value => {
  const isImage =
    [".png", ".jpg", ".gif"].indexOf(value.substr(-4)) !== -1 ||
    [".webp", ".jpeg"].indexOf(value.substr(-5)) !== -1;
  return isImage ? (
    <img style={{ width: "100%", maxWidth: 200 }} src={value} alt={value} />
  ) : (
    <LimitedString string={value} />
  );
};

const LimitedString = ({ string }) => (
  <div>
    {string.indexOf(" ") === -1 && string.length > 30 ? (
      <span title={string}>{string.substr(0, 30)}…</span>
    ) : (
      <span>{string}</span>
    )}
  </div>
);

export const getFieldValue = (value, typeName) => {
  if (typeof value === "undefined" || value === null) {
    return "";
  }

  if (Array.isArray(value)) {
    typeName = "Array";
  }

  if (typeof typeName === "undefined") {
    typeName = typeof value;
  }

  switch (typeName) {
    case "Boolean":
    case "boolean":
      return (
        <Checkbox
          checked={value}
          disabled
          style={{ width: "32px", height: "32px" }}
        />
      );

    case "Number":
    case "number":
    case "SimpleSchema.Integer":
      return <code>{value.toString()}</code>;

    case "Array":
      return (
        <ol>
          {value.map((item, index) => (
            <li key={index}>{getFieldValue(item, typeof item)}</li>
          ))}
        </ol>
      );

    case "Object":
    case "object":
      return (
        <Table>
          <TableBody>
            {_.map(value, (value, key) => (
              <TableRow key={key}>
                <TableCell>
                  <strong>{key}</strong>
                </TableCell>
                <TableCell>{getFieldValue(value, typeof value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );

    case "Date":
      return moment(new Date(value)).format("dddd, MMMM Do YYYY, h:mm:ss");

    default:
      return parseImageUrl(value);
  }
};

const CardItem = ({ label, value, typeName }) => (
  <TableRow>
    <TableCell padding="dense">{label}</TableCell>
    <TableCell padding="dense">{getFieldValue(value, typeName)}</TableCell>
  </TableRow>
);

const CardEdit = (props, context) => {
  const editTitle = context.intl.formatMessage({ id: "cards.edit" });
  return (
    <tr>
      <td colSpan="2">
        <Components.ModalTrigger
          label={editTitle}
          component={
            <IconButton aria-label={editTitle}>
              <EditIcon />
            </IconButton>
          }
        >
          <CardEditForm {...props} />
        </Components.ModalTrigger>
      </td>
    </tr>
  );
};

CardEdit.contextTypes = { intl: intlShape };

const CardEditForm = ({ collection, document, closeModal }) => (
  <Components.SmartForm
    collection={collection}
    documentId={document._id}
    showRemove={true}
    successCallback={document => {
      closeModal();
    }}
  />
);
const Card = (
  {
    className,
    collection,
    document,
    currentUser,
    fields,
    canEdit: forceCanEdit
  },
  { intl }
) => {
  const fieldNames = fields
    ? fields
    : _.without(_.keys(document), "__typename");
  const canEdit =
    typeof forceCanEdit !== "undefined"
      ? forceCanEdit
      : currentUser &&
        collection.options.mutations.edit.check(currentUser, document);
  return (
    <div
      className={classNames(
        className,
        "datacard",
        `datacard-${collection._name}`
      )}
    >
      <Table style={{ maxWidth: "100%" }}>
        <TableBody>
          {canEdit ? (
            <CardEdit collection={collection} document={document} />
          ) : null}
          {fieldNames.map((fieldName, index) => (
            <CardItem
              key={index}
              value={document[fieldName]}
              typeName={getTypeName(document[fieldName], fieldName, collection)}
              label={getLabel(document[fieldName], fieldName, collection, intl)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

Card.displayName = "Card";

Card.propTypes = {
  className: PropTypes.string,
  collection: PropTypes.object,
  document: PropTypes.object,
  currentUser: PropTypes.object,
  fields: PropTypes.array
};

Card.contextTypes = {
  intl: intlShape
};

replaceComponent("Card", Card);
