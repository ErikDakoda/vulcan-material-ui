import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import { Components, registerComponent } from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import ArrowDownwardIcon from 'material-ui-icons/ArrowDownward';
import MoreIcon from 'material-ui-icons/More';
import ScrollTrigger from './ScrollTrigger';
import classNames from 'classnames';


const styles = theme => ({
  root: {
    textAlign: 'center',
    flexBasis: '100%',
  },
  textButton: {
    marginTop: theme.spacing.unit * 2,
  },
  iconButton: {},
  caption: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  tooltip: {
    margin: 0,
  }
});


const LoadMore = ({
                    classes,
                    count,
                    totalCount,
                    loadMore,
                    networkStatus,
                    showNoMore,
                    useTextButton,
                    className,
                    infiniteScroll,
                  }, { intl }) => {
  
  const isLoadingMore = networkStatus === 2;
  const loadMoreText = intl.formatMessage({ id: 'common.load_more' });
  const title = `${loadMoreText} (${count}/${totalCount})`;
  
  return (
    <div className={classNames('load-more', classes.root, className)}>
      {
        isLoadingMore
          
          ?
          
          <Components.Loading/>
          
          :
          
          totalCount > count
            
            ?
            
            infiniteScroll
              
              ?
              
              <ScrollTrigger onEnter={() => loadMore()}>
                <MoreIcon/>
              </ScrollTrigger>
              
              :
              
              useTextButton
                
                ?
                
                <Button className={classes.textButton} onClick={() => loadMore()}>
                  {title}
                </Button>
                
                :
                
                <Tooltip id="tooltip-more"
                         classes={{ tooltip: classes.tooltip }}
                         title={title}
                         placement="top"
                >
                  <IconButton className={classes.iconButton} onClick={() => loadMore()}>
                    <ArrowDownwardIcon/>
                  </IconButton>
                </Tooltip>
            
            :
            
            showNoMore &&
            
            <Typography type="caption" className={classes.caption}>
              <FormattedMessage
                id="common.no_more"
                defaultMessage="No more items"
              />
            </Typography>
      }
    </div>
  );
};


LoadMore.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number,
  totalCount: PropTypes.number,
  loadMore: PropTypes.func,
  networkStatus: PropTypes.number,
  showNoMore: PropTypes.bool,
  useTextButton: PropTypes.bool,
  className: PropTypes.string,
  infiniteScroll: PropTypes.bool,
};


LoadMore.contextTypes = {
  intl: intlShape.isRequired,
};


LoadMore.displayName = 'LoadMore';


registerComponent('LoadMore', LoadMore, [withStyles, styles]);

