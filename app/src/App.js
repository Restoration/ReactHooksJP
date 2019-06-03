import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import AppHooks from "./Hooks/App";
import AppHOC from "./HOC/App";
import AppRenderProps from "./RenderProps/App";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          <li><NavLink to="/" className="App-link">App</NavLink></li>
          <li><NavLink to="/hoc" className="App-link">HOC</NavLink></li>
          <li><NavLink to="/renderprops" className="App-link">RenderProps</NavLink></li>
          <li><NavLink to="/hooks" className="App-link">Hooks</NavLink></li>
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function Main() {
  return (
      <BrowserRouter>
        <div>
          <div className="content">
            <Route exact path="/" component={App}/>
            <Route path="/hooks" component={AppHooks}/>
            <Route path="/renderprops"  render={(props) => <AppRenderProps {...props}/>} />
            <Route path="/hoc" render={(props) => <AppHOC {...props}/>} />
          </div>
        </div>
      </BrowserRouter>
  );
}
export default Main;
