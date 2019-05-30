# ReactHooksJP



## ReactHooksとは
Version 16.8から追加された新機能。ざっくりと言えば、関数でもステート管理ができるようになった。
従来のReactのfunction componentはステートレスな関数でstate管理ができなかった。
なのでstate管理をしたい場合は、class componentを使う必要があったがfunction componentでも使えるようになった。


[React Today and Tomorrow and 90% Cleaner React With Hooks](https://www.youtube.com/watch?v=dpw9EHDh2bM)
動画の31:14秒あたりのコードがすごく参考になる



## 使うメリット
- 関数での記述で細かく分解できるのでコンポーネントの肥大化を防ぎ、テストがしやすくなる
- 複雑なデザインパターンをしなくてもよくなる（render propsやHOC）
- コード量がclassに比べて少ない、classよりも綺麗に書ける


Hooksを使用することでコンポーネント内のロジックを再利用可能な独立した単位としてまとめることができる。
これはつまり、Hooksを使用することでReact本来の思想（明示的なデータフローと構成）に近づく

そんなに関数ばかり書いてたら肥大化するんじゃないのか？
結論からしてむしろ減る。
Hooksを使用することでクラスやHOC、render propsの代わりに常に関数を使用する。
コードの書き方も関数ベースで進むので複雑化しないため規則的になる。

## どのように使うのか？
HOC、render props, Reduxを例に使い方を見ていく。

### HOCの代用
実際にHooksでHOCを代用した例を[サンプルコード](https://dev.to/exodevhub/react-hooks-making-it-easier-to-compose-reuse-and-share-react-code-5he9)と一緒に見てみる。
Higher Order Componentを使用してマウスの位置情報を取得する。
```withMousePosition.jsx
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
```


App.js側で使用する
```App.js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import withMousePosition from './withMousePosition';

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

次にHooksで書いた例
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


App.js側で実行する
```App.js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import useMousePosition from './useMousePosition';

// For React Hooks
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

まず目に止まるのがHOCと比べてコード量が減るという点。コードが読みやすいの明らかに後者。
次に気になる点としてはuseStateとuseEffectが何をしているのか？

- [useState](https://reactjs.org/docs/hooks-state.html)
- [useEffect](https://reactjs.org/docs/hooks-effect.html)


useState_  
関数内でステート管理をするために必要で、useStateの引数にてstateを定義しており、初期値にあたります。

```JavaScript
// useState({ x: 0, y: 0 })は初期値の設定でclassでいうコンストラクタの部分にあたる
constructor(props) {
    super(props);
    this.state = {
        x: 0,
        y: 0,
    };
}
```

useStateはこの関数に含まれているstateを更新する２つの関数をを返します
```JavaScript
const [mousePosition, setMousePosition]
```

- mousePosition 状態値
- setMousePosition 値を更新する関数

関数の下部からreturnでmousePositionが返ってきてるのがわかります。

### render propsの代用


### Reduxの代用
Reduxの代用はできるのか？結論からしてReduxの代用にはなる。ただし、もともとのコンセプトが違う。
HooksとContext APIを使用してReduxのような動きをさせるというものになる。
なのでReduxを使うのかReactHooks+Context APIによる実装でReduxの代用するかはプロジェクトに依存する。




## 参考リンク
- [Making Sense of React Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)
- [React Hooks: Making it easier to compose, reuse, and share React code ](https://dev.to/exodevhub/react-hooks-making-it-easier-to-compose-reuse-and-share-react-code-5he9)
