import React from "react";
import useMousePosition from "./useMousePosition";

// For React Hooks
//-------------------------------------------------------------------------
function App() {
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
export default App;

