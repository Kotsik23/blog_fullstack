import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Image, Heading, Text, VStack, Stack, Button, Highlight, HStack } from "@chakra-ui/react"

const Error = () => {
	return (
		<Stack spacing="12" align="center">
			<Image src="./assets/void.svg" alt="void" width="full" height="full" objectFit="contain" maxH="400px" />
			<VStack textAlign="center" spacing="4">
				<Heading size="lg">Упс. Кажется, произошла ошибка...</Heading>
				<Text color="muted">Мы не смогли загрузить посты для вас</Text>
			</VStack>

			<Button variant="outline" colorScheme="purple" rounded="full" role="group" size="sm">
				<HStack spacing="1" align="center">
					<Text fontSize="md">
						<Highlight
							query="пустоту"
							styles={{ px: "1", py: "0.5", rounded: "full", bg: "primary", color: "on-primary" }}
						>
							Превратите пустоту в свое творчество
						</Highlight>
					</Text>
					<ArrowForwardIcon
						boxSize="5"
						_groupHover={{ transform: "translateX(5px)" }}
						transition="all 0.3s ease"
					/>
				</HStack>
			</Button>
		</Stack>
	)
}

export default Error
