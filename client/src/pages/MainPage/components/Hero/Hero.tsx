import { Button, Heading, Text, Image, Badge, Box, Container, Stack } from "@chakra-ui/react"
import { ArrowForwardIcon, ArrowDownIcon } from "@chakra-ui/icons"
import { Link as NavLink } from "react-router-dom"
import { ROUTES } from "shared/constants/routes"

const Hero = () => {
	return (
		<Box position="relative" height={{ lg: "720px" }} as="section">
			<Container maxW="container.xl" py={{ base: "16", md: "24" }} height="full">
				<Stack direction={{ base: "column", lg: "row" }} spacing="16" align={{ lg: "center" }} height="full">
					<Stack spacing={{ base: "8", md: "12" }}>
						<Stack spacing="4" align="flex-start">
							<Badge
								colorScheme="purple"
								variant="subtle"
								fontSize="md"
								rounded="full"
								px="2"
								fontWeight="semibold"
							>
								Наш Блог
							</Badge>
							<Stack spacing={{ base: "4", md: "6" }} maxW={{ md: "xl", lg: "md", xl: "xl" }}>
								<Heading size={{ base: "md", md: "2xl" }} lineHeight={{ base: "unset", md: "64px" }}>
									Сосредоточьтесь на себе и расскажите об этом другим
								</Heading>
								<Text fontSize={{ base: "lg", md: "2xl" }} color="muted">
									Воплоти идею в жизнь.
								</Text>
							</Stack>
						</Stack>
						<Stack direction={{ base: "column", md: "row" }} spacing="3">
							<Button
								colorScheme="purple"
								rightIcon={<ArrowForwardIcon />}
								size="lg"
								as={NavLink}
								to={ROUTES.REGISTER}
							>
								Начать
							</Button>
							<Button variant="outline" rightIcon={<ArrowDownIcon />} size="lg">
								Подробнее
							</Button>
						</Stack>
					</Stack>
					<Box
						pos={{ lg: "absolute" }}
						right="0"
						bottom="0"
						w={{ base: "full", lg: "50%" }}
						height={{ base: "96", lg: "full" }}
						sx={{
							clipPath: { lg: "polygon(7% 0%, 100% 0%, 100% 100%, 0% 100%)" },
						}}
					>
						<Image boxSize="full" objectFit="cover" src="./assets/writer.jpg" alt="Man by printing machine" />
					</Box>
				</Stack>
			</Container>
		</Box>
		// <Flex
		// 	justify="space-between"
		// 	align="center"
		// 	direction={["column", null, null, "row"]}
		// 	gap="6"
		// 	minH="calc(100vh - 99px)"
		// >
		// 	<Flex gap="5" justify="center" align="center" direction="column" flex="1">
		// <Badge colorScheme="purple" variant="subtle" fontSize="md" rounded="full" px="2" fontWeight="semibold">
		// 	Наш Блог
		// </Badge>
		// 		<Heading
		// 			size={["2xl", null, null, "3xl"]}
		// 			textAlign="center"
		// 			lineHeight={["64px", null, null, "80px"]}
		// 			maxW="1100px"
		// 		>
		// 			Сосредоточьтесь на себе и расскажите об этом другим
		// 		</Heading>
		// 		<Text color={sloganTextColor} fontSize="xl">
		// 			Воплоти идею в жизнь.
		// 		</Text>

		// 		<Flex align="center" gap="6" mt="8">
		// <Button
		// 	colorScheme="purple"
		// 	rightIcon={<ArrowForwardIcon />}
		// 	flex="1"
		// 	size="lg"
		// 	as={NavLink}
		// 	to={ROUTES.REGISTER}
		// >
		// 	Начать
		// </Button>
		// <Button variant="outline" rightIcon={<ArrowDownIcon />} flex="1" size="lg">
		// 	Подробнее
		// </Button>
		// 		</Flex>
		// 	</Flex>

		// 	<Flex flex="0.8" position="relative">
		// 		<GlowingBalls />
		// 		<Image src="./assets/writer.svg" alt="writer" />
		// 	</Flex>
		// </Flex>
	)
}

export default Hero
