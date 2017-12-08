import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import _throttle from 'lodash/throttle';


class ScrollTrigger extends Component {
  
  constructor (props) {
    super();
    
    this.onScroll = _throttle(this.onScroll.bind(this), 100, {
      leading: true,
      trailing: true,
    });
    
    this.onResize = _throttle(this.onResize.bind(this), 100, {
      leading: true,
      trailing: true,
    });
    
    this.inViewport = false;
    this.progress = 0;
    this.lastScrollPosition = null;
    this.lastScrollTime = null;
  }
  
  componentDidMount () {
    this.scroller = document.getElementById('main');
    this.scroller.addEventListener('resize', this.onResize);
    this.scroller.addEventListener('scroll', this.onScroll);
  
    this.inViewport = false;
    this.progress = 0;
    this.lastScrollPosition = null;
    this.lastScrollTime = null;

    if (this.props.triggerOnLoad) {
      this.checkStatus();
    }
  }
  
  componentWillUnmount () {
    if (!this.scroller) return;
    this.scroller.removeEventListener('resize', this.onResize);
    this.scroller.removeEventListener('scroll', this.onScroll);
    this.scroller = null;
  }
  
  onResize () {
    this.checkStatus();
  }
  
  onScroll () {
    this.checkStatus();
  }
  
  checkStatus () {
    if (!this.scroller) return;
  
    const {
      onEnter,
      onExit,
      onProgress,
    } = this.props;
    
    //eslint-disable-next-line
    const element = ReactDOM.findDOMNode(this.element);
    const elementRect = element.getBoundingClientRect();
    const viewportStart = 0;
    const viewportEnd = this.scroller.clientHeight + this.props.preload;
    const inViewport = elementRect.top < viewportEnd && elementRect.bottom > viewportStart;
    
    const position = this.scroller.scrollTop;
    const velocity = this.lastScrollPosition && this.lastScrollTime
      ? Math.abs((this.lastScrollPosition - position) / (this.lastScrollTime - Date.now()))
      : null;
  
    if (inViewport) {
      const progress = Math.max(0,
        Math.min(1, 1 - (elementRect.bottom / (viewportEnd + elementRect.height))));
      
      if (!this.inViewport) {
        this.inViewport = true;
        
        onEnter({
          progress,
          velocity,
        }, this);
      }
      
      this.lastScrollPosition = position;
      this.lastScrollTime = Date.now();
      
      onProgress({
        progress,
        velocity,
      }, this);
      return;
    } else {
      if (this.inViewport) {
        this.inViewport = false;
      }
    }
    
    if (this.inViewport) {
      const progress = elementRect.top <= viewportEnd ? 1 : 0;
      
      this.lastScrollPosition = position;
      this.lastScrollTime = Date.now();
      this.progress = progress;
      
      onProgress({
        progress,
        velocity,
      }, this);
      
      onExit({
        progress,
        velocity,
      }, this);
    }
  }
  
  render () {
    const {
      children,
    } = this.props;
    
    return (
      <div ref={(element) => {this.element = element;}}>
        {children}
      </div>
    );
  }
}


ScrollTrigger.propTypes = {
  scrollerId: PropTypes.string,
  triggerOnLoad: PropTypes.bool,
  preload: PropTypes.number,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  onProgress: PropTypes.func,
};


ScrollTrigger.defaultProps = {
  scrollerId: 'main',
  preload: 1000,
  triggerOnLoad: true,
  onEnter: () => {},
  onExit: () => {},
  onProgress: () => {},
};


export default ScrollTrigger;
