import React from 'react';

// Using Higher Order Component
function withMousePosition(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { x: 0, y: 0 };
    }

    componentDidMount() {
      window.addEventListener("mousemove", this.handleMouseMove);
    }

    componentWillUnmount() {
      window.removeEventListener("mousemove", this.handleMouseMove);
    }

    handleMouseMove = event => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          mousePosition={this.state}
        />
      );
    }
  };
}
export default withMousePosition;
