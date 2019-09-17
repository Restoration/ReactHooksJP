## ContextAPIとReact HooksによるReduxの実装

TypeScriptを使用して実装しています
カウントするためのプログラムで、コンポーネントを跨いだ状態でも、一箇所でstateの管理ができるように実装しています
擬似的にReduxに似せる実装


## 実行
```
$ npm i
$ npm start
```

## 実装内容
```CountComponent.tsx
import React, { useReducer, useContext, createContext } from "react";

type StateType = {
    count: number;
}

const initialState: StateType = {
    count: 0
}

type ActionType = {
    type : "INCREMENT"|"DECREMENT"|"RESET"
}

const reducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, count: state.count + 1 };
        case "DECREMENT":
            return { ...state, count: state.count - 1 };
        case "RESET":
            return initialState;
        default:
            return state;
    }
}

interface StoreContextProps {
    state: StateType,
    dispatch: ({type}: ActionType) => void;
}

export const StoreContext = createContext({} as StoreContextProps);

interface StoreProviderProps {
    children: JSX.Element | JSX.Element[];
}

export const StoreProvider: React.FC<StoreProviderProps> = (props: StoreProviderProps): JSX.Element => {
    const {children} = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export const useCountContext = () => useContext(StoreContext);
```

```App.tsx
import React　from "react";
import { useCountContext, StoreProvider } from "./CountComponent";

const ChildComponent: React.FC = (): JSX.Element => {
    const { state, dispatch } = useCountContext();
    return (
      <>
          <p>{state.count}</p>
          <button onClick={e => {
                  e.preventDefault();
                  dispatch({ type: "RESET" });
              }}
          >Reset</button>
      </>
    );
}

const ParentComponent: React.FC = (): JSX.Element => {
    const { dispatch } = useCountContext();
    return(
      <>
            <button onClick={e => {
                e.preventDefault();
                dispatch({ type: "INCREMENT" });
            }}
            >Increment</button>
            <button onClick={e => {
                e.preventDefault();
                dispatch({ type: "DECREMENT" });
            }}
            >Decrement</button>
            <ChildComponent />
      </>
    );
}

const App: React.FC = (): JSX.Element => {
    return (
        <StoreProvider>
            <ParentComponent />
        </StoreProvider>
    );
}

export default App;
```
