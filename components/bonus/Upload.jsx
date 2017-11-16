/*

This component supports either uploading and storing a single image, or
an array of images.

Note also that an image can be stored as a simple string, or as an array of formats
(each format being itself an object).

*/
import { Components, getSetting, registerSetting, replaceComponent } from 'meteor/vulcan:lib';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import 'cross-fetch/polyfill'; // patch for browser which don't have fetch implemented
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { FormControl, FormLabel } from 'material-ui/Form';
import withStyles from 'material-ui/styles/withStyles';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';


registerSetting('cloudinary.cloudName', null, 'Cloudinary cloud name (for image uploads)');

/**
 * Get a URL from an image or an array of images
 */
const getImageUrl = imageOrImageArray => {
  // if image is actually an array of formats, use first format
  const image = Array.isArray(imageOrImageArray) ? imageOrImageArray[0] : imageOrImageArray;
  // if image is an object, return secure_url; else return image itself
  const imageUrl = typeof image === 'string' ? image : image.secure_url;
  return imageUrl;
};

/*

Remove the nth item from an array

*/
const removeNthItem = (array, n) => [..._.first(array, n), ..._.rest(array, n + 1)];

/*

Display a single image

*/
class Image extends PureComponent {
  
  constructor () {
    super();
    this.clearImage = this.clearImage.bind(this);
  }
  
  clearImage (e) {
    e.preventDefault();
    this.props.clearImage(this.props.index);
  }
  
  render () {
    const {image, classes} = this.props;
    const removeTitle = 'Remove image';
    
    return (
      <div className={classes.uploadImage}>
        <div className={classes.uploadImageContents}>
          <img className={classes.uploadImageImg} src={getImageUrl(image)}/>
          {
            image.loading &&
            
            <div className="upload-loading"><Components.Loading/></div>
          }
        </div>
        <Tooltip className={classes.tooltip} title={removeTitle} placement="left">
          <IconButton onClick={this.clearImage} aria-label={removeTitle}>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

/*

Cloudinary Image Upload component

*/
const styles = theme => ({
  root: {},
  label: {},
  uploadField: {
    marginTop: theme.spacing.unit,
  },
  dropzoneBase: {
    border: `3px dashed ${theme.palette.common.lightBlack}`,
    padding: '30px 60px',
    transition: 'all 0.5s',
    cursor: 'pointer',
    color: theme.palette.common.lightBlack,
    position: 'relative',
    textAlign: 'center',
  },
  uploadState: {},
  uploadImages: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  uploadImage: { textAlign: 'center' },
  uploadImageContents: { marginBottom: '-8px'},
  uploadImageImg: {
    maxHeight: '100px',
    maxWidth: '100%',
  },
  uploadLoading: {},
  tooltip: {
    margin: 0,
  }
});


class Upload extends PureComponent {
  
  constructor (props, context) {
    super(props);
    
    this.onDrop = this.onDrop.bind(this);
    this.clearImage = this.clearImage.bind(this);
    this.enableMultiple = this.enableMultiple.bind(this);
    
    const isEmpty = !props.value || (this.enableMultiple() && props.value.length === 0);
    const emptyValue = this.enableMultiple() ? [] : '';
    
    this.state = {
      preview: '',
      uploading: false,
      value: isEmpty ? emptyValue : props.value,
    };
  }
  
  /*

  Add to autofilled values so SmartForms doesn't think the field is empty
  if the user submits the form without changing it

  */
  componentWillMount () {
    const isEmpty = !this.props.value || (this.enableMultiple() && this.props.value.length === 0);
    const emptyValue = this.enableMultiple() ? [] : '';
    this.context.addToAutofilledValues(
      { [this.props.name]: isEmpty ? emptyValue : this.props.value });
  }
  
  /*

  Check the field's type to decide if the component should handle
  multiple image uploads or not

  */
  enableMultiple () {
    return this.props.datatype.definitions[0].type === Array;
  }
  
  /*

  When an image is uploaded

  */
  onDrop (files) {
    
    const preview = { secure_url: files[0].preview, loading: true };
    
    // set the component in upload mode with the preview
    this.setState({
      preview: this.enableMultiple() ? [...this.state.preview, preview] : preview,
      uploading: true,
    });
    
    // request url to cloudinary
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${getSetting(
      'cloudinary.cloudName')}/upload`;
    
    // request body
    const body = new FormData();
    body.append('file', files[0]);
    body.append('upload_preset', this.props.options.preset);
    
    // post request to cloudinary
    fetch(cloudinaryUrl, {
      method: 'POST',
      body,
    })
    .then(res => res.json()) // json-ify the readable strem
    .then(body => {
      // use the https:// url given by cloudinary; or eager property if using transformations
      const imageUrl = body.eager ? body.eager : body.secure_url;
      const newValue = this.enableMultiple() ? [...this.state.value, imageUrl] : imageUrl;
      
      // set the uploading status to false
      this.setState({
        preview: '',
        uploading: false,
        value: newValue,
      });
      
      // tell vulcanForm to catch the value
      this.context.addToAutofilledValues({ [this.props.name]: newValue });
    })
    .catch(err => console.log('err', err));
  }
  
  /*

  Remove the image at `index` (or just remove image if no index is passed)

  */
  clearImage (index) {
    const newValue = this.enableMultiple() ? removeNthItem(this.state.value, index) : '';
    this.context.addToAutofilledValues({ [this.props.name]: newValue });
    this.setState({
      preview: newValue,
      value: newValue,
    });
  }
  
  render () {
    const { uploading, preview, value } = this.state;
    const { label, classes } = this.props;
    
    // show the actual uploaded image or the preview
    const imageData = this.enableMultiple() ? (preview ? value.concat(preview) : value) :
      value || preview;
    
    return (
      <FormControl component="fieldset" fullWidth={true} className={classes.root}>
        <FormLabel component="legend" className={classes.label}>
          {label}
        </FormLabel>
        <div className={classes.uploadField}>
          {
            (!imageData || this.enableMultiple()) &&
            
            <Dropzone ref="dropzone"
                      multiple={this.enableMultiple()}
                      onDrop={this.onDrop}
                      accept="image/*"
                      className={classes.dropzoneBase}
                      activeClassName="dropzone-active"
                      rejectClassName="dropzone-reject"
            >
              <div>
                <FormattedMessage id="upload.prompt"/>
              </div>
              {
                uploading &&
                
                <div className="upload-uploading">
                  <span><FormattedMessage id="upload.uploading"/></span>
                </div>
              }
            </Dropzone>
          }
          {
            imageData &&
            
            <div className={classes.uploadImages}>
              {
                this.enableMultiple()
                  ?
                  imageData.map((image, index) =>
                    <Image clearImage={this.clearImage}
                           key={index}
                           index={index}
                           image={image}
                           classes={classes}
                    />)
                  :
                  <Image clearImage={this.clearImage}
                         image={imageData}
                         classes={classes}
                  />
              }
            </div>
          }
        </div>
      </FormControl>
    );
  }
}


Upload.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  classes: PropTypes.object.isRequired,
};


Upload.contextTypes = {
  addToAutofilledValues: PropTypes.func,
};


replaceComponent('Upload', Upload, [withStyles, styles]);
