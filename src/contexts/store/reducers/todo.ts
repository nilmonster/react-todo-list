import { useContext } from "react"
import { TodoType } from "../../../@types/todo"
import { ActionType } from "../provider"

export type TodoStateType = {
    tasks: TodoType[]
}

export const TodoInitialState: TodoStateType = {
    tasks: []
}

export const TodoReducer = (state: TodoStateType, action: ActionType) => {
    switch (action.type) {
        case "SET_TASKS":
            return {
                ...state,
                tasks: action.payload.tasks
            }
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload.task]
            }
        case "COMPLETE_TASK":
            const updated = [...state.tasks];
            updated[action.payload.index].is_completed = !updated[action.payload.index].is_completed
            return {
                ...state,
                tasks: updated
            }
        case "DELETE_TASK":
            const deleted = state.tasks.filter((_, index) => index !== action.payload.index)
            return {
                ...state,
                tasks: deleted
            }
        default:
            return state
    }
}