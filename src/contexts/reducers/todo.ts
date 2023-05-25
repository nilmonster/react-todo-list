import { useContext } from "react";
import { TodoType } from "../../@types/todo";
import { ActionType, Context } from "..";

export type TodoStateType = {
    todos: TodoType[];
}

export const TodoInitialState: TodoStateType = {
    todos: []
}

export const TodoReducer = (state: TodoStateType, action: ActionType) => {
    switch (action.type) {
        case "SET_TODOS":
            return {
                ...state,
                todos: action.payload.todos
            };
        case "ADD_TODO":
            return {
                ...state,
                todos: [...state.todos, action.payload.todo]
            }
        case "COMPLETE_TODO":
            console.log(action.payload.index)
            const updated = [...state.todos];
            const completed = !updated[action.payload.index].is_completed;
            updated[action.payload.index].is_completed = completed;
            return {
                ...state,
                todos: updated
            };
        case "DELETE_TODO":
            const deleted = state.todos.filter((_, index) => index !== action.payload.index);
            return {
                ...state,
                todos: deleted
            };
        default:
            return state;
    }
}

export const TodoActions = () => {
    const { dispatch } = useContext(Context);

    return {
        setTodos: (data: TodoType[]) => {
            dispatch({
                type: "SET_TODOS",
                payload: {
                    todos: data
                }
            });
        },
        addTodo: (data: TodoType) => {
            dispatch({
                type: "ADD_TODO",
                payload: {
                    todo: data
                }
            });
        },
        changeTodo: (idx: number) => {
            dispatch({
                type: "COMPLETE_TODO",
                payload: {
                    index: idx
                }
            })
        },
        deleteTodo: (idx: number) => {
            dispatch({
                type: "DELETE_TODO",
                payload: {
                    index: idx
                }
            })
        }
    }
}