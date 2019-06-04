# ReactHooksJP

## <a id="index" href="#index">目次</a>
- [ReactHooksとは](#section1)
- [使うメリット](#section2)
- [どのように使うのか？](#section3)
- [Hooksにおけるルール](section4)
- [Context APIとは](#section5)
- [従来のコードとの比較](#section6)
- [参考リンク](#section7)


## <a id="section1" href="#section1">ReactHooksとは</a>  
Version 16.8から追加された新機能。ざっくりと言えば、関数でもステート管理ができるようになった。  
従来のReactのfunction componentはステートレスな関数でstate管理ができなかった。  
なのでstate管理をしたい場合は、class componentを使う必要があったがfunction componentでも使えるようになった。  
基本的なコンセプトは変わっていないので、props, state, context, refs, and lifecycleはHooksで書いても使えます。  

[公式ドキュメント](https://github.com/reactjs/reactjs.org/blob/master/content/docs/hooks-intro.md)

[React Today and Tomorrow and 90% Cleaner React With Hooks](https://www.youtube.com/watch?v=dpw9EHDh2bM)  
動画の31:14秒あたりのコードが参考になります。


## <a id="section2" href="#section2">使うメリット</a>  
- 関数での記述で細かく分解できるのでコンポーネントの肥大化を防ぎ、テストがしやすくなる
- 複雑なデザインパターンをしなくてもよくなる（render propsやHOC）
- コード量がclassに比べて少ない、classよりも綺麗に書ける


Hooksを使用することでコンポーネント内のロジックを再利用可能な独立した単位としてまとめることができる。つまり、Hooksを使用することでReact本来の思想（明示的なデータフローと構成）に近づく。

そんなに関数ばかり書いてたら肥大化するんじゃないのか？__結論からしてむしろ減る。__  
Hooksを使用することでクラスやHOC、render propsの代わりに常に関数を使用する。
__コードの書き方も関数ベースで進むので複雑化しないため規則的になる。__

## <a id="section3" href="#section3">どのように使うのか？</a>  
まず基本となるHooks関数を理解する必要があります。ポイントとして抑えておくべきは以下の３つ

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

## <a id="section4" href="#section4">Hooksにおけるルール</a>  
Hooksを使用する上で気をつけないといけないポイントがあります。以下の３つのルールがあります。
- Hooksを呼び出すのはトップレベルのみ、つまりrenderなどでの呼び出しは不可
- ネストした関数やループ内、if文での条件で呼び出すことは不可
- Hooksが呼び出せるのはReact Functionのみ、つまりクラスでの呼び出しや標準のJavaScript関数では不可

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

## <a id="section5" href="#section5">Context APIとは</a> 
[Context](https://reactjs.org/docs/context.html)
Context APIはReactにおいては標準搭載なので外部のプラグイン等のインストールは不要です。Context APIとはいわゆる __グローバルで扱えるprops__ に当たります。従来のpropsではコンポーネントごとに渡す必要がありましたが、Context APIを使用した場合は、以下のようにどこからでも呼び出しが可能となります。  
以下の図を見てもらえば理解しやすいです。
[引用元](https://blog.bitsrc.io/why-you-should-consider-the-new-context-api-in-react-a-deep-dive-d588b66c57b5)
![Context API](https://cdn-images-1.medium.com/max/2400/1*Jx8BCxZFN2SCuhQtZqfgMQ.jpeg "Context API")


## <a id="section6" href="#section6">従来のコードとの比較</a> 
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

### Redux
Reduxの代用はできるのか？結論からしてReduxの代用にはなる。ただし、もともとのコンセプトが違う。
HooksとContext APIを使用してReduxのような動きをさせるというものになる。
なのでReduxを使うのかReactHooks+Context APIによる実装でReduxの代用するかはプロジェクトに依存する。
現状ステートの一元管理をするのであれば以下の３パターンが考えられる

- [React Class Component with Redux](https://react-redux.js.org/introduction/quick-start)
- [React Hooks with Redux](https://react-redux.js.org/next/api/hooks)
- [React Hooks with Context API]()


## <a id="section7" href="#section7">参考リンク</a> 
- [Making Sense of React Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)
- [React Hooks: Making it easier to compose, reuse, and share React code ](https://dev.to/exodevhub/react-hooks-making-it-easier-to-compose-reuse-and-share-react-code-5he9)
- [State Management with React Hooks — No Redux or Context API](https://medium.com/javascript-in-plain-english/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8)

