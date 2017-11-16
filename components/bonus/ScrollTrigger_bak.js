import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import omit from 'lodash/omit';
import throttle from 'lodash/throttle';
import cleanProps from './cleanProps';


class ScrollTrigger extends Component {

  constructor(props) {
    super(props);

    this.onScroll = throttle(this.onScroll.bind(this), 100, {
      trailing: true,
    });

    this.onResize = throttle(this.onResize.bind(this), 100, {
      trailing: true,
    });

    this.state = {
      inViewport: false,
      progress: 0,
      lastScrollPosition: null,
      lastScrollTime: null,
    };
  }

  componentDidMount() {
    this.scroller = document.getElementsByClassName('main')[0];
    this.scroller.addEventListener('resize', this.onResize);
    this.scroller.addEventListener('scroll', this.onScroll);

    if (this.props.triggerOnLoad) {
      this.checkStatus();
    }
  }

  componentWillUnmount() {
    if (!this.scroller) return;
    this.scroller.removeEventListener('resize', this.onResize);
    this.scroller.removeEventListener('scroll', this.onScroll);
    this.scroller = null;
  }

  onResize() {
    this.checkStatus();
  }

  onScroll() {
    this.checkStatus();
  }

  checkStatus() {
    if (!this.scroller) return;
    
    const {
      onEnter,
      onExit,
      onProgress,
    } = this.props;

    const {
      lastScrollPosition,
      lastScrollTime,
    } = this.state;
  
    const element = ReactDOM.findDOMNode(this.element);
    const elementRect = element.getBoundingClientRect();
    const viewportStart = 0;
    const viewportEnd = this.scroller.clientHeight;
    const inViewport = elementRect.top < viewportEnd && elementRect.bottom > viewportStart;

    const position = this.scroller.scrollTop;
    const velocity = lastScrollPosition && lastScrollTime
      ? Math.abs((lastScrollPosition - position) / (lastScrollTime - Date.now()))
      : null;

    if (inViewport) {
      const progress = Math.max(0, Math.min(1, 1 - (elementRect.bottom / (viewportEnd + elementRect.height))));

      if (!this.state.inViewport) {
        this.setState({
          inViewport,
        });

        onEnter({
          progress,
          velocity,
        }, this);
      }

      this.setState({
        lastScrollPosition: position,
        lastScrollTime: Date.now(),
      });

      onProgress({
        progress,
        velocity,
      }, this);
      return;
    }

    if (this.state.inViewport) {
      const progress = elementRect.top <= viewportEnd ? 1 : 0;

      this.setState({
        lastScrollPosition: position,
        lastScrollTime: Date.now(),
        inViewport,
        progress,
      });

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

  render() {
    const {
      children,
    } = this.props;

    return (
      <div
        {...omit(cleanProps(this.props), ['onProgress'])}
        ref={(element) => {
          this.element = element;
        }}
      >
        {children}
      </div>
    );
  }
}

ScrollTrigger.propTypes = {
  triggerOnLoad: PropTypes.bool,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  onProgress: PropTypes.func,
};

ScrollTrigger.defaultProps = {
  triggerOnLoad: true,
  onEnter: () => {},
  onExit: () => {},
  onProgress: () => {},
};

export default ScrollTrigger;
