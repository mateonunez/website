// basically react-keyframes v1.0.0-canary.3
// with an added onEnd prop for the Keyframes component
import React from 'react';

export function Frame({ component, ...rest }) {
  return React.createElement(component, rest);
}

export class Keyframes extends React.Component {
  timer;

  constructor(props) {
    super(props);
    this.state = {
      frameNum: 0
    };
  }

  shouldComponentUpdate(_nextProps, nextState) {
    const { frameNum } = nextState;
    if (this.state.frameNum === frameNum) {
      return false;
    }
    return frameNum >= 0 && frameNum < this.props.children.length;
  }

  componentDidMount() {
    this.requestNextFrame();
  }

  componentDidUpdate() {
    this.requestNextFrame();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const frame = this.getFrame();
    if (!frame) {
      return null;
    }

    // eslint-disable-next-line no-unused-vars
    const { component = 'span', children, onEnd, ...rest } = this.props;

    return React.cloneElement(frame, { component, ...rest, ...frame.props });
  }

  requestNextFrame() {
    this.waitForDelay(() => {
      const frameNum = this.state.frameNum + 1;
      if (this.props.children.length <= frameNum) {
        if (this.props.onEnd) {
          this.props.onEnd();
        }
        return;
      }

      this.setState({ frameNum });
    });
  }

  waitForDelay(fn) {
    const currentFrame = this.getFrame();
    // Defaults duration to 0
    const delay = currentFrame.props.duration || 0;
    clearTimeout(this.timer);
    this.timer = setTimeout(fn, delay);
  }

  getFrame() {
    return this.props.children[this.state.frameNum];
  }
}
