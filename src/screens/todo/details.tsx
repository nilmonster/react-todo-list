import { Checkbox, HStack, IconButton, Text } from "native-base";
import { TodoType } from "../../@types/todo";
import Icon from "react-native-vector-icons/Feather";
import { useObject, useRealm } from "../../contexts/db";
import { Todo as TodoSchema } from "../../schemas/todo";
import { TodoActions } from "../../contexts/reducers/todo";
import { useContext } from "react";
import { Context } from "../../contexts";

type Props = {
    item: TodoType;
    index: number;
}

export default function TodoDetails({ item, index }: Props) {
    const realm = useRealm();
    const obj = useObject(TodoSchema, item._id);
    const { deleteTodo, changeTodo } = TodoActions();
    const { state: { todos: { todos } } } = useContext(Context);
    
    const handleDelete = (index: number) => {
        // console.log("delete :" + index)
        realm.write(() => realm.delete(obj));
        deleteTodo(index);
    };

    const handleStatusChange = (index: number) => {
        // console.log("change :" + index)
        realm.write(() => {
            if (obj) {
                obj.is_completed = !todos[index].is_completed;
            }
        })
        changeTodo(index);
    };

    return (
        <HStack
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            key={item._id}
        >
            <Checkbox
                aria-label="check"
                isChecked={item.is_completed}
                onChange={() => handleStatusChange(index)}
                value={item.title}
                _dark={{
                    backgroundColor: "#f3f3f3"
                }}
            />
            <Text
                width="100%"
                flexShrink={1}
                textAlign="left"
                mx="2"
                strikeThrough={item.is_completed}
                onPress={() => handleStatusChange(index)}
                color={"white"}
            >
                {item.title}
            </Text>
            <IconButton
                size="sm"
                colorScheme="trueGray"
                icon={<Icon name="trash" size={20} color="#ccc" />}
                onPress={() => handleDelete(index)}
            />
        </HStack>
    );
}