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
