import { createContext, useReducer } from "react";
import { TodoInitialState, TodoReducer, TodoStateType } from "./reducers/todo";

type InitialStateType = {
    todo: TodoStateType;
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
    todo: TodoInitialState,
}

export const Context = createContext<ContextType>({
    state: InitialState,
    dispatch: () => null
})

type ContextProviderType = {
    children: JSX.Element;
}

const store = (state: InitialStateType, action: ActionType) => ({
    todo: TodoReducer(state.todo, action),
})

export const ContextProvider = ({ children }: ContextProviderType) => {
    const [state, dispatch] = useReducer(store, InitialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
}