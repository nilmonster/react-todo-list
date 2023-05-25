import { useContext } from "react";
import { TodoType } from "../../@types/todo";
import { ActionType, Context } from "..";

export type TodoStateType = {
    tasks: TodoType[];
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
            };
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload.task]
            }
        case "COMPLETE_TASK":
            const updated = [...state.tasks];
            const completed = !updated[action.payload.index].is_completed;
            updated[action.payload.index].is_completed = completed;
            return {
                ...state,
                tasks: updated
            };
        case "DELETE_TASK":
            const deleted = state.tasks.filter((_, index) => index !== action.payload.index);
            return {
                ...state,
                tasks: deleted
            };
        default:
            return state;
    }
}

export const TodoActions = () => {
    const { dispatch } = useContext(Context);

    return {
        setTasks: (data: TodoType[]) => {
            dispatch({
                type: "SET_TASKS",
                payload: {
                    tasks: data
                }
            });
        },
        addTask: (data: TodoType) => {
            dispatch({
                type: "ADD_TASK",
                payload: {
                    task: data
                }
            });
        },
        completeTask: (idx: number) => {
            dispatch({
                type: "COMPLETE_TASK",
                payload: {
                    index: idx
                }
            })
        },
        deleteTask: (idx: number) => {
            dispatch({
                type: "DELETE_TASK",
                payload: {
                    index: idx
                }
            })
        }
    }
}