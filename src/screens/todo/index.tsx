import { Box, Center, Checkbox, Flex, HStack, Heading, IconButton, Input, ScrollView, Text, VStack, useToast } from "native-base";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { useRealm } from "../../contexts/db";
import { TodoType } from "../../@types/todo";
import uuid from "react-native-uuid";

export default function Todo() {
	const [list, setList] = useState<TodoType[]>([]);
	const [inputValue, setInputValue] = useState("");

	const realm = useRealm();
	const toast = useToast();

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

		setList(old => ([...old, data]));
	};

	const getTodos = () => {
		const todos = realm.objects<TodoType[]>("Todo").toJSON();
		setList(todos as TodoType[]);
	}

	const getTodoById = (id: string) => {
		return realm.objects("Todo").filtered("_id == $0", id);
	}

	const handleDelete = (index: number) => {
		const obj = getTodoById(list[index]._id);
		realm.write(() => realm.delete(obj));

		setList(old => old.filter((_, idx) => idx !== index));
	};

	const handleStatusChange = (index: number) => {
		const obj = getTodoById(list[index]._id);
		realm.write(() => {
			obj.update("is_completed", !list[index].is_completed);
		})

		setList(old => {
			const newList = [...old];
			newList[index].is_completed = !newList[index].is_completed;
			return newList;
		});
	};

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
								{list.map((item, index) => (
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
								))}
							</VStack>
						</ScrollView>
					</VStack>
				</Box>
			</Center>
		</Flex>
	);
}