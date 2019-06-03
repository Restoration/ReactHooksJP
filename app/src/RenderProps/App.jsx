import React from "react";
import MousePosition from "./MousePosition";

function App() {
  return (
    <div className="App">
      <h1>Render Props Method</h1>
      <h2>Move the mouse around!</h2>
      <MousePosition
        render={mousePosition => (
          <p style={{ background: "skyblue" }}>
            The current mouse position is ({mousePosition.x}, {mousePosition.y})
          </p>
        )}
      />
    </div>
  );
}

export default App;

