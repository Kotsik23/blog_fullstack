import { Button, Flex, Heading, Text, useColorModeValue, Image, Badge } from "@chakra-ui/react"
import { ArrowForwardIcon, ArrowDownIcon } from "@chakra-ui/icons"
import { Link as NavLink } from "react-router-dom"
import GlowingBalls from "./GlowingBalls/GlowingBalls"
import { ROUTES } from "../../../../constants/routes.constants"

const Hero = () => {
	const sloganTextColor = useColorModeValue("gray.600", "gray.200")

	return (
		<Flex
			justify="space-between"
			align="center"
			direction={["column", null, null, "row"]}
			gap="6"
			minH="calc(100vh - 99px)"
		>
			<Flex gap="5" justify="center" align="center" direction="column" flex="1">
				<Badge colorScheme="purple" variant="subtle" fontSize="md" rounded="full" px="2" fontWeight="semibold">
					Наш Блог
				</Badge>
				<Heading
					size={["2xl", null, null, "3xl"]}
					textAlign="center"
					lineHeight={["64px", null, null, "80px"]}
					maxW="1100px"
				>
					Сосредоточьтесь на себе и расскажите об этом другим
				</Heading>
				<Text color={sloganTextColor} fontSize="xl">
					Воплоти идею в жизнь.
				</Text>

				<Flex align="center" gap="6" mt="8">
					<Button
						colorScheme="purple"
						rightIcon={<ArrowForwardIcon />}
						flex="1"
						size="lg"
						as={NavLink}
						to={ROUTES.REGISTER}
					>
						Начать
					</Button>
					<Button variant="outline" rightIcon={<ArrowDownIcon />} flex="1" size="lg">
						Подробнее
					</Button>
				</Flex>
			</Flex>

			<Flex flex="0.8" position="relative">
				<GlowingBalls />
				<Image src="./assets/writer.svg" alt="writer" />
			</Flex>
		</Flex>
	)
}

export default Hero
