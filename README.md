# ReactHooksJP


## 参考リンク
 - [Making Sense of React Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)

## ReactHooksとは
Version 16.8から追加された新機能。ざっくりと言えば、関数でもステート管理ができるようになった。
従来のReactのfunction componentはステートレスな関数でstate管理ができなかった。
なのでstate管理をしたい場合は、class componentを使う必要があった。
classを使って書くよりも綺麗に書けるし、コード自体もかなり見やすくなる。

[React Today and Tomorrow and 90% Cleaner React With Hooks](https://www.youtube.com/watch?v=dpw9EHDh2bM)
動画の31:14秒あたりのコードがすごく参考になる



## 使うメリット
- 関数での記述で細かく分解できるのでコンポーネントの肥大化を防ぎ、テストがしやすくなる
- 複雑なデザインパターンをしなくてもよくなる（render propsやHOC）



Hooksを使用することでコンポーネント内のロジックを再利用可能な独立した単位としてまとめることができる。
これはつまり、Hooksを使用することでReact本来の思想（明示的なデータフローと構成）に近づく


そんなに関数ばかり書いてたら肥大化するんじゃないのか？
結論からしてむしろ減る。
Hooksを使用することでクラスやHOC、render propsの代わりに常に関数を使用する。


## Reduxの代用になるのか？

