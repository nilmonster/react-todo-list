import { useContext } from "react";
import { TodoType } from "../../@types/todo";
import { ActionType } from "..";

export type TodoStateType = {
    todos: TodoType[];
}

export const TodoInitialState: TodoStateType = {
    todos: []
}

export const TodoReducer = (state: TodoStateType, action: ActionType) => {
    switch (action.type) {
        case 'SET_TODOS':
            return { ...state, todos: action.payload.todos };
    }
    return state;
}

// export const TodoActions = () => {
//     const { state, dispatch } = useContext(Context);
//     const navigate = useNavigate();

//     return {
//         switchRole: (role: string) => {
//             dispatch({
//                 type: 'CHANGE_ROLE',
//                 payload: {
//                     role: role
//                 }
//             });
//         },
//         logout: () => {
//             navigate('/signin');
//             localStorage.setItem('token', '');
//             dispatch({
//                 type: 'CHANGE_ROLE',
//                 payload: {
//                     role: ''
//                 }
//             });
//             return null;
//         }
//     }
// }