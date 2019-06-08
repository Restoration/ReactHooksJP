# ReactHooks 日本語ドキュメント

## 目次
- [はじめに](#はじめに)
- [ReactHooksとは](#ReactHooksとは)
- [使うメリット](#使うメリット)
- [どのように使うのか？](#どのように使うのか？)
- [Hooksにおけるルール](#Hooksにおけるルール)
- [Context APIとは](#ContextAPIとは)
- [従来のコードとの比較](#従来のコードとの比較)
- [Redux](#Redux)
- [参考リンク](#参考リンク)

## はじめに
React Hooksについて取り上げたリポジトリになります。2019年6月現在では、React Hooksに関して、あまり日本語の情報がなかったため日本語で情報配信をするためにもここに書いていきます。公式とは一切関係なく、あくまで自分が勉強した内容を記載しています。もしも間違っている箇所や認識が違っていたりしたら気軽にPRを送っていただければと思います。

またリポジトリだけでなくWikiにもコードを記載しているので、コードだけ読みたい方は[こちら](https://github.com/Restoration/ReactHooksJP/wiki)へ


## ReactHooksとは 
Version 16.8から追加された新機能。ざっくりと言えば、関数でもステート管理ができるようになった。  
従来のReactのfunction componentはステートレスな関数でstate管理ができなかった。  
なのでstate管理をしたい場合は、class componentを使う必要があったがfunction componentでも使えるようになった。  
基本的なコンセプトは変わっていないので、props, state, context, refs, and lifecycleはHooksで書いても使えます。  

[公式ドキュメント](https://github.com/reactjs/reactjs.org/blob/master/content/docs/hooks-intro.md)

[React Today and Tomorrow and 90% Cleaner React With Hooks](https://www.youtube.com/watch?v=dpw9EHDh2bM)  
動画の31:14秒あたりのコードが参考になります。


## 使うメリット
- 関数での記述で細かく分解できるのでコンポーネントの肥大化を防ぎ、テストがしやすくなる
- 複雑なデザインパターンをしなくてもよくなる（render propsやHOC）
- コード量がclassに比べて少ない、classよりも綺麗に書ける


Hooksを使用することでコンポーネント内のロジックを再利用可能な独立した単位としてまとめることができる。つまり、Hooksを使用することでReact本来の思想（明示的なデータフローと構成）に近づく。

また、クラスやHOC、render propsの代わりに常に関数を使用するので　__コードの書き方も関数で統一されて規則的になる。__
そのため複雑化しないので見通しがよくなります。

## どのように使うのか？
まず基本となるHooks関数を理解する必要があります。  
ポイントとして抑えておくべきは以下の３つ

- [useState](https://reactjs.org/docs/hooks-state.html)
- [useEffect](https://reactjs.org/docs/hooks-effect.html)
- [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)

他のAPIについては公式サイトを参照してください  
[Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)

### useState  
関数内で状態管理をするために必要なHook関数になります、useStateの引数でstateを定義しており、引数に渡された値が初期値にあたります。
classコンポーネントでいうコンストラクタ内で定義するthis.stateにあたります。  
useStateとthis.stateを比較したコードは[コチラ](https://reactjs.org/docs/hooks-state.html)

次に、useStateは関数に含まれている現在の値と更新する関数の２つを返します、この2つはペアで返ってきます。
```javascript
import React, { useState } from 'react';

function Example() {
  // const = [現在の値, 更新用の関数] = useState(初期値);
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useEffect
ライフサイクルメソッドのComponentDidMountにあたる関数で、デフォルトでは常にレンダー終了時に関数を実行させています。  
オプショナルとして第二引数には変数の配列を渡すことが可能で、第二引数を使った場合はuseEffectの関数は第二引数の値が変更されたタイミングで実行されます。  
また、第二引数は空の配列を渡すことも可能です、もし空配列を渡した場合は一回だけ実行されます。

```javascript
// 第二引数なし
useEffect(() => {
  console.log('常にレンダー終了後に実行');
});

// 第二引数あり
useEffect(() => {
  console.log('paramで渡された値が変更されたとき実行');
}, [param]);

// 空で渡した場合
useEffect(() => {
  console.log('一回だけ実行');
}, []);
```

### useContext

## Hooksにおけるルール
Hooksを使用する上で気をつけないといけないポイントがあります。以下の３つのルールがあります。

- Hooksを呼び出すのはトップレベルのみ、つまりrenderなどでの呼び出しは不可
- ネストした関数やループ内、if文での条件で呼び出すことは不可
- Hooksが呼び出せるのはReactFunction、つまりクラスでの呼び出しや標準のJavaScript関数では不可

### ESLintによるチェックの追加
[公式サイト](https://reactjs.org/docs/hooks-rules.html)より引用
```
$ npm install eslint-plugin-react-hooks --save-dev
```

```
// Your ESLint configuration
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  }
}
```

## ContextAPIとは
[Context](https://reactjs.org/docs/context.html)  
Context APIはReactにおいては標準搭載なので外部のプラグイン等のインストールは不要です。Context APIとはいわゆる __グローバルで扱えるprops__ に当たります。従来のpropsではコンポーネントごとに渡す必要がありましたが、Context APIを使用した場合は、以下のようにどこからでも呼び出しが可能となります。  

以下の図を見てもらえば理解しやすいです。
[引用元](https://blog.bitsrc.io/why-you-should-consider-the-new-context-api-in-react-a-deep-dive-d588b66c57b5)  
![Context API](https://cdn-images-1.medium.com/max/2400/1*Jx8BCxZFN2SCuhQtZqfgMQ.jpeg "Context API")


## 従来のコードとの比較
`app`ディレクトリに実際に比較したコードが入っているので確認してください。
```
$ git clone https://github.com/Restoration/ReactHooksJP
$ cd ReactHooksJP/app
$ npm i
$ npm start
```
マウスの位置情報を取得するコードをHOCとrender propsで書き、Hooksで代用してみます。
参照元は[コチラ](https://dev.to/exodevhub/react-hooks-making-it-easier-to-compose-reuse-and-share-react-code-5he9)。

### HOC
```withMousePosition.jsx
import React from 'react';

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
```

```App.js
import React from "react";
import withMousePosition from "./withMousePosition";

function App(props) {
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
export default withMousePosition(App);
```

### render props
```MousePosition.jsx
import React from "react";

class MousePosition extends React.Component {
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
      <div
        style={{ height: "100%", width: "100%" }}
        onMouseMove={this.handleMouseMove}
      >
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default MousePosition;
```

```App.jsx
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
```


### Hooks
```useMousePosition.js
import React, { useState, useEffect } from 'react';

// Using Hooks
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(event) {
    setMousePosition({
      x: event.clientX,
      y: event.clientY
    });
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

export default useMousePosition;
```

```App.js
import React from "react";
import useMousePosition from "./useMousePosition";

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
```

## Redux
Reduxの代用はできるのか？結論からしてReduxの代用にはなる。ただし、もともとのコンセプトが違う。
HooksとContext APIを使用してReduxのような動きをさせるというものになる。
なのでReduxを使うのかReactHooks+Context APIによる実装でReduxの代用するかはプロジェクトに依存する。
現状ステートの一元管理をするのであれば以下の３パターンが考えられる

- [React Class Component with Redux](https://react-redux.js.org/introduction/quick-start)
- [React Hooks with Redux](https://react-redux.js.org/next/api/hooks)
- [React Hooks with Context API]()

まずは、Hooksを使用した最小構成のReduxコードを見てみましょう。  
Reduxのnpmパッケージは含まず、HooksだけでReduxの動きを完結させます。
```javascript
// useReducerはReact内に含まれます
import React, { useReducer } from 'react';

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
  // const [現在の値, 更新用関数] = useReducer(reducer関数, 初期値);
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

複数に対して
```javascript
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
  // 処理は一緒なのでここでフックさせてる
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
```


## 参考リンク
- [Making Sense of React Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)
- [React Hooks: Making it easier to compose, reuse, and share React code ](https://dev.to/exodevhub/react-hooks-making-it-easier-to-compose-reuse-and-share-react-code-5he9)
- [State Management with React Hooks — No Redux or Context API](https://medium.com/javascript-in-plain-english/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8)
- [How to use useReducer in React Hooks for performance optimization](https://medium.com/crowdbotics/how-to-use-usereducer-in-react-hooks-for-performance-optimization-ecafca9e7bf5)


## Author
[RyotArch](https://www.developer-ryota.com/)