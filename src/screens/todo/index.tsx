import {
	Box,
	Center,
	Flex,
	HStack,
	Heading,
	IconButton,
	Input,
	ScrollView,
	VStack,
	useToast
} from "native-base";
import { useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { useRealm } from "../../contexts/db";
import { TodoType } from "../../@types/todo";
import uuid from "react-native-uuid";
import TodoDetails from "./details";
import { TodoActions } from "../../contexts/reducers/todo";
import { Context } from "../../contexts";

export default function Todo() {
	// const [list, setList] = useState<TodoType[]>([]);
	const [inputValue, setInputValue] = useState("");

	const realm = useRealm();
	const toast = useToast();
	const { setTodos, addTodo } = TodoActions();
	const { state: { todos: { todos } } } = useContext(Context);

	const clearInput = () => setInputValue("");

	const addItem = (title: string) => {
		if (title === "") {
			toast.show({
				render: () => (
					<Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
						enter value
					</Box>
				),
			});
			return;
		}

		const data = realm.write<TodoType>(() => realm.create("Todo", {
			_id: uuid.v4().toString(),
			title: title,
			is_completed: false,
			created_at: new Date()
		}));

		// setList(old => ([...old, data]));
		addTodo(data);
	};

	const getTodos = () => {
		const todos = realm.objects<TodoType[]>("Todo").toJSON();
		// setList(todos as TodoType[]);
		setTodos(todos as TodoType[])
	}

	// const getTodoById = (id: string) => {
	// 	return realm.objects("Todo").filtered("_id == $0", id);
	// }

	useEffect(() => {
		getTodos();
	}, [])

	return (
		<Flex w={"100%"} h={"100%"} alignItems="center">
			<Center w={"100%"} h={"20%"}>
				<Heading size="lg">
					TodoList
				</Heading>
			</Center>
			<Center
				bg="primary.700"
				_dark={{
					bg: "primary.900"
				}}
				w={"100%"}
				rounded="lg"
			>
				<Box h="100%" maxW="300" w="100%" mt={10}>
					<VStack space={4}>
						<HStack space={2}>
							<Input
								flex={1}
								onChangeText={v => setInputValue(v)}
								value={inputValue}
								placeholder="Add Task"
								onSubmitEditing={() => {
									addItem(inputValue);
									clearInput();
								}}
								_dark={{
									borderColor: "white",
									color: "white",
									placeholderTextColor: "white"
								}}
							/>
							<IconButton
								borderRadius="sm"
								variant="solid"
								icon={<Icon name="plus" size={20} color="#ccc" />}
								onPress={() => {
									addItem(inputValue);
									clearInput();
								}} />
						</HStack>
						<ScrollView w={"300"} h={"300"}>
							<VStack space={2}>
								{todos.map((item, index) => (
									<TodoDetails
										key={item._id}
										item={item}
										index={index}
									/>
								))}
							</VStack>
						</ScrollView>
					</VStack>
				</Box>
			</Center>
		</Flex>
	);
}