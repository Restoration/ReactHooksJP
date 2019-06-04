# Redux + Hooks 日本語版


## Reducer
ReactHooksはReact Functionでのみ使用が可能です。ReduxにおいてReducerを使用する際は標準のJavaScript関数を使用しています。Hooksにおいては`useReducer`を使用します。

```javascript
import React, { useReducer } from 'react';

const initialState = 0;

// 標準のJavaScript関数
const reducer = (state, action) => {
  switch (action) {
    case 'increment': return state + 1;
    case 'decrement': return state - 1;
    case 'reset': return 0;
    default: throw new Error('Unexpected action');
  }
};

const  App = () => {
  // const [現在の値, 更新用関数] = useReducer(reducer用関数, 初期値);
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
```


## 参考
[How to use useReducer in React Hooks for performance optimization](https://medium.com/crowdbotics/how-to-use-usereducer-in-react-hooks-for-performance-optimization-ecafca9e7bf5)