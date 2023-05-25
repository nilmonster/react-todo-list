import { ActionType, InitialStateType } from "."
import { TodoInitialState, TodoReducer } from "./reducers/todo"

export const InitialState = {
    todos: TodoInitialState,
}

export const store = (state: InitialStateType, action: ActionType) => ({
    todos: TodoReducer(state.todos, action),
})