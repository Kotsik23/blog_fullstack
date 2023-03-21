import { Button, Flex, Heading, Text, useColorModeValue, Image, Stack, Badge } from "@chakra-ui/react"
import { FC } from "react"
import { ArrowForwardIcon, ArrowDownIcon } from "@chakra-ui/icons"
import GlowingBalls from "./GlowingBalls/GlowingBalls"

const Hero: FC = () => {
	const sloganTextColor = useColorModeValue("gray.600", "gray.200")

	return (
		<Flex justify="space-between" align="center" direction="row" gap="10" minH="calc(100vh - 99px)">
			<Flex gap="5" justify="center" align="center" direction="column" flex="1">
				<Badge colorScheme="purple" variant="subtle" fontSize="md" rounded="full" px="2" fontWeight="semibold">
					Наш Блог
				</Badge>
				<Heading size="2xl" textAlign="center" lineHeight="64px" maxW="1100px">
					Сосредоточьтесь на себе и расскажите об этом другим
				</Heading>
				<Text color={sloganTextColor} fontSize="xl">
					Воплоти идею в жизнь.
				</Text>

				<Flex align="center" gap="6" mt="8">
					<Button colorScheme="purple" rightIcon={<ArrowForwardIcon />} flex="1" size="lg">
						Начать
					</Button>
					<Button variant="outline" rightIcon={<ArrowDownIcon />} flex="1" size="lg">
						Все посты
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
