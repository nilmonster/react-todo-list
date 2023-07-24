import { createContext, useReducer } from "react"
import { TodoInitialState, TodoReducer, TodoStateType } from "./reducers/todo"

type InitialStateType = {
    todo: TodoStateType
}

export type ActionType = {
    type: string
    payload: {
        [key: string]: any
    }
}

type StoreContextType = {
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}

const InitialState = {
    todo: TodoInitialState,
}

export const StoreContext = createContext<StoreContextType>({
    state: InitialState,
    dispatch: () => null
})

type StoreContextProviderType = {
    children: JSX.Element
}

const Store = (state: InitialStateType, action: ActionType) => ({
    todo: TodoReducer(state.todo, action),
})

export const StoreContextProvider = ({ children }: StoreContextProviderType) => {
    const [state, dispatch] = useReducer(Store, InitialState)

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
}