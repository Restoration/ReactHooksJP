/*
import * as React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
*/


/*
useReducer テスト

import React, { useReducer } from 'react'; // useReducerはHooks内に含まれます

const initialState = 0;
const reducer = (state, action) => {
  switch (action) {
    case 'increment': return state + 1;
    case 'decrement': return state - 1;
    case 'reset': return 0;
    default: throw new Error('Unexpected action');
  }
};

const  App = () => {
  const [count, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      {count}
      <button onClick={() => dispatch('increment')}>+1</button>
      <button onClick={() => dispatch('decrement')}>-1</button>
      <button onClick={() => dispatch('reset')}>reset</button>
    </div>
  );
};

export default App;
*/


/*
// 複数の値にたいするReducer
// 複数を結合したもの
import React, { useReducer } from 'react';

const initialState = {
  count1: 0,
  count2: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment1': return { ...state, count1: state.count1 + 1 };
    case 'decrement1': return { ...state, count1: state.count1 - 1 };
    case 'set1': return { ...state, count1: action.count };
    case 'increment2': return { ...state, count2: state.count2 + 1 };
    case 'decrement2': return { ...state, count2: state.count2 - 1 };
    case 'set2': return { ...state, count2: action.count };
    default: throw new Error('Unexpected action');
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <div>
        {state.count1}
        <button onClick={() => dispatch({ type: 'increment1' })}>+1</button>
        <button onClick={() => dispatch({ type: 'decrement1' })}>-1</button>
        <button onClick={() => dispatch({ type: 'set1', count: 0 })}>reset</button>
      </div>
      <div>
        {state.count2}
        <button onClick={() => dispatch({ type: 'increment2' })}>+1</button>
        <button onClick={() => dispatch({ type: 'decrement2' })}>-1</button>
        <button onClick={() => dispatch({ type: 'set2', count: 0 })}>reset</button>
      </div>
    </>
  );
};

export default App;
*/


import React, { useReducer } from 'react';

const initialState = 0;
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return state + 1;
    case 'decrement': return state - 1;
    case 'set': return action.count;
    default: throw new Error('Unexpected action');
  }
};

const App = () => {
  const [count1, dispatch1] = useReducer(reducer, initialState);
  const [count2, dispatch2] = useReducer(reducer, initialState);
  return (
    <>
      <div>
        {count1}
        <button onClick={() => dispatch1({ type: 'increment' })}>+1</button>
        <button onClick={() => dispatch1({ type: 'decrement' })}>-1</button>
        <button onClick={() => dispatch1({ type: 'set', count: 0 })}>reset</button>
      </div>
      <div>
        {count2}
        <button onClick={() => dispatch2({ type: 'increment' })}>+1</button>
        <button onClick={() => dispatch2({ type: 'decrement' })}>-1</button>
        <button onClick={() => dispatch2({ type: 'set', count: 0 })}>reset</button>
      </div>
    </>
  );
};

export default App;