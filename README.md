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
- コード量がclassに比べて少ない
- classよりも綺麗に書ける



Hooksを使用することでコンポーネント内のロジックを再利用可能な独立した単位としてまとめることができる。
これはつまり、Hooksを使用することでReact本来の思想（明示的なデータフローと構成）に近づく


そんなに関数ばかり書いてたら肥大化するんじゃないのか？
結論からしてむしろ減る。
Hooksを使用することでクラスやHOC、render propsの代わりに常に関数を使用する。

## どのように使うのか？

### HOCの代用
Higher Order Componentの代用は以下のように使用する。
以下は、マウスの位置情報を取得するコード
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
import useMousePosition from './useMousePosition';

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


### Render propsの代用


## Reduxの代用になるのか？
結論からしてReduxの代用にはなる。ただし、もともとのコンセプトが違う。
なのでReduxを使うのかReactHooks+Context APIによる実装で代用するかはプロジェクトに依存する。



## 参考リンク
- [Making Sense of React Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)
- [React Hooks: Making it easier to compose, reuse, and share React code ](https://dev.to/exodevhub/react-hooks-making-it-easier-to-compose-reuse-and-share-react-code-5he9)
