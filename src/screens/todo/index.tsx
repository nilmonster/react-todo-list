import {
	Box,
	Center,
	Flex,
	HStack,
	Heading,
	Icon,
} from "native-base";
import TodoDetails from "./details";
import { useEffect, useState } from "react";
import IconFeather from "react-native-vector-icons/Feather";

export default function Todo() {
	const [greeting, setGreeting] = useState("");
	const [icon, setIcon] = useState("");

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

	useEffect(() => {
		const [greetingText, greetingIcon] = getGreeting();
		setGreeting(greetingText);
		setIcon(greetingIcon);
	}, [])

	return (
		<Flex w={"100%"} h={"100%"} alignItems="center">
			<Center w={"100%"} h={"20%"}>
				<HStack space={3}>
					<Icon
						as={<IconFeather name={icon} />}
						size={35}
						name="greetingIcon"
						color="coolGray.800"
						_dark={{
							color: "warmGray.50"
						}}
					/>
					<Heading size="lg">
						{greeting}
					</Heading>
				</HStack>
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