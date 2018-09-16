import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import { Components, registerComponent } from 'meteor/vulcan:core';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowDownIcon from 'mdi-material-ui/ArrowDown';
import MoreIcon from 'mdi-material-ui/More';
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
  const loadMoreText = intl.formatMessage({ id: 'global.load_more' });
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
                    <ArrowDownIcon/>
                  </IconButton>
                </Tooltip>
            
            :
            
            showNoMore &&
            
            <Typography variant="caption" className={classes.caption}>
              <FormattedMessage
                id="global.no_more"
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

