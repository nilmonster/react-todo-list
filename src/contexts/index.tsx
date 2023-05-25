import { createContext, useReducer } from "react";
import { InitialState, store } from "./store";
import { TodoStateType } from "./reducers/todo";

export type InitialStateType = {
    todos: TodoStateType;
}

export type ActionType = {
    type: string;
    payload: {
        [key: string]: any;
    };
}

type ContextType = {
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}

export const Context = createContext<ContextType>({
    state: InitialState,
    dispatch: () => null
})

type ContextProviderType = {
    children: JSX.Element;
}

export const ContextProvider = ({ children }: ContextProviderType) => {
    const [state, dispatch] = useReducer(store, InitialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
}