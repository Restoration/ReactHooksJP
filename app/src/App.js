import React from 'react';
import logo from './logo.svg';
import './App.css';
import withMousePosition from './withMousePosition';
import useMousePosition from './useMousePosition';

// For Higher Order Component
function AppHOC(props) {
  const { x, y } = props.mousePosition;

  return (
    <div className="App">
      <h1>Higher-Order Component Method</h1>
      <h2>Move the mouse around!</h2>
      <p style={{ background: "orange" }}>
        The current mouse position is ({x}, {y})
      </p>
    </div>
  );
}

// For React Hooks
function AppHOOKS() {
  const { x, y } = useMousePosition();

  return (
    <div className="App">
      <h1>React Hook Method</h1>
      <h2>Move the mouse around!</h2>
      <p style={{ background: "palegreen" }}>
        The current mouse position is ({x}, {y})
      </p>
    </div>
  );
}

//export default withMousePosition(AppHOC); // HOCを使用する
export default AppHOOKS; // Hooksを使用する
