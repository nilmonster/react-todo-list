import {
	Box,
	Center,
	Flex,
	Heading,
} from "native-base";
import TodoDetails from "./details";

export default function Todo() {
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
					<TodoDetails />
				</Box>
			</Center>
		</Flex>
	);
}