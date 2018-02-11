import React, { Component } from "react";
import PropTypes from "prop-types";
import { getCanvasPosition } from "./utils/formulas";
import Canvas from "./components/Canvas";

class App extends Component {
  constructor(props) {
    super(props);
    this.trackMouse = this.trackMouse.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    this.update();
    window.onresize = () => {
      const cnv = document.getElementById("aliens-go-home-canvas");
      cnv.style.width = `${window.innerWidth}px`;
      cnv.style.height = `${window.innerHeight}px`;
    };
    window.onresize();
  }
  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event);
  }
  render() {
    return (
      <Canvas
        angle={this.props.angle}
        trackMouse={event => this.trackMouse(event)}
      />
    );
  }
  update() {
    this.props.moveObjects(this.canvasMousePosition);
    requestAnimationFrame(() => {
      this.update();
    });
  }
}

App.propTypes = {
  angle: PropTypes.number.isRequired,
  moveObjects: PropTypes.func.isRequired
};

export default App;
