# ReactHooksJP



## ReactHooksとは
Version 16.8から追加された新機能。ざっくりと言えば、関数でもステート管理ができるようになった。
従来のReactのfunction componentはステートレスな関数でstate管理ができなかった。
なのでstate管理をしたい場合は、class componentを使う必要があったがfunction componentでも使えるようになった。
基本的なコンセプトは変わっていないので、props, state, context, refs, and lifecycleはHooksで書いても使えます。

[公式ドキュメント](https://github.com/reactjs/reactjs.org/blob/master/content/docs/hooks-intro.md)



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
まず基本となるHooks関数を理解する必要があります。

- [useState](https://reactjs.org/docs/hooks-state.html)
- [useEffect](https://reactjs.org/docs/hooks-effect.html)

### useState_  
関数内で状態管理をするために必要なHook関数になります、useStateの引数でstateを定義しており、引数に渡された値が初期値にあたります。
classコンポーネントでいうコンストラクタ内で定義するthis.stateにあたります。
useStateとthis.stateを比較したコードは[コチラ](https://reactjs.org/docs/hooks-state.html)

次に、useStateは関数に含まれている現在の値と更新する関数の２つを返します、この2つはペアで返ってきます。
```
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

## useEffect



## 従来のコードとの比較
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

### Reduxの代用
Reduxの代用はできるのか？結論からしてReduxの代用にはなる。ただし、もともとのコンセプトが違う。
HooksとContext APIを使用してReduxのような動きをさせるというものになる。
なのでReduxを使うのかReactHooks+Context APIによる実装でReduxの代用するかはプロジェクトに依存する。



## 参考リンク
- [Making Sense of React Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)
- [React Hooks: Making it easier to compose, reuse, and share React code ](https://dev.to/exodevhub/react-hooks-making-it-easier-to-compose-reuse-and-share-react-code-5he9)
