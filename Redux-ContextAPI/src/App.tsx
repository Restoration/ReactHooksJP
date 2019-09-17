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
