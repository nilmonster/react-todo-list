import {
	Box,
	Center,
	Flex,
	HStack,
	Heading,
	Icon,
} from "native-base";
import TodoDetails from "./details";
import IconFeather from "react-native-vector-icons/Feather";

export default function Todo() {
	const getGreeting = () => {
		var d = new Date();
		var time = d.getHours();

		if (time < 12) {
			return ["Good morning", "sun"];
		} else if (time < 18) {
			return ["good afternoon", "sun"];
		}

		return ["Good evening", "moon"];
	}

	const [greetingText, greetingIcon] = getGreeting();
	const color = greetingIcon === "sun" ? "amber.400" : "coolGray.800";

	return (
		<Flex w={"100%"} h={"100%"} alignItems="center">
			<Center w={"100%"} h={"20%"}>
				<HStack space={3}>
					<Icon
						as={IconFeather}
						size={35}
						name={greetingIcon}
						color={color}
						_dark={{
							color: "warmGray.50"
						}}
					/>
					<Heading size="lg" color={color} _dark={{ color: "warmGray.50" }}>
						{greetingText}
					</Heading>
				</HStack>
			</Center>
			<Center
				bg="coolGray.300"
				w={"100%"}
				rounded="lg"
				_dark={{
					backgroundColor: "coolGray.700"
				}}
			>
				<Box h="100%" maxW="300" w="100%" mt={10}>
					<TodoDetails />
				</Box>
			</Center>
		</Flex>
	);
}