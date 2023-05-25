import { createContext, useReducer } from "react";
import { TodoInitialState, TodoReducer, TodoStateType } from "./reducers/todo";

type InitialStateType = {
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

const InitialState = {
    todos: TodoInitialState,
}

export const Context = createContext<ContextType>({
    state: InitialState,
    dispatch: () => null
})

type ContextProviderType = {
    children: JSX.Element;
}

const store = (state: InitialStateType, action: ActionType) => ({
    todos: TodoReducer(state.todos, action),
})

export const ContextProvider = ({ children }: ContextProviderType) => {
    const [state, dispatch] = useReducer(store, InitialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
}