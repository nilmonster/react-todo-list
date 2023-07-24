import { useContext } from "react"
import { TodoType } from "../../../@types"
import { StoreContext } from "../provider"

export const TodoActions = () => {
    const { dispatch } = useContext(StoreContext)

    return {
        setTasks: (data: TodoType[]) => {
            dispatch({
                type: "SET_TASKS",
                payload: {
                    tasks: data
                }
            })
        },
        addTask: (data: TodoType) => {
            dispatch({
                type: "ADD_TASK",
                payload: {
                    task: data
                }
            })
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