import {
	Container,
	Stack,
	Heading,
	Box,
	Image,
	Text,
	FormControl,
	Input,
	FormHelperText,
	Button,
	useColorModeValue,
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

const Newsletter = () => {
	const primary = useColorModeValue("purple.500", "purple.200")

	const { t } = useTranslation()

	return (
		<Container maxW="container.xl" py={{ base: "16", md: "24" }} as="section">
			<Stack
				spacing={{ base: "6", sm: "12", md: "16" }}
				direction={{ base: "column", md: "row" }}
				align={{ base: "start", md: "center" }}
			>
				<Stack spacing={{ base: "8", md: "10" }} width="full">
					<Stack spacing={{ base: "4", md: "6" }}>
						<Heading size={{ base: "sm", md: "lg" }}>{t("newsletter.heading")}</Heading>
						<Text fontSize={{ base: "lg", md: "xl" }} color="muted">
							{t("newsletter.text")}
						</Text>
					</Stack>
					<Stack direction={{ base: "column", sm: "row" }} width="full" maxW={{ md: "lg" }} spacing="4">
						<FormControl flex="1">
							<Input
								type="email"
								size="lg"
								placeholder={t("newsletter.placeholder")!}
								focusBorderColor={primary}
							/>
							<FormHelperText color="muted">{t("newsletter.policy")}</FormHelperText>
						</FormControl>
						<Button variant="solid" colorScheme="purple" size="lg">
							{t("newsletter.subscribe")}
						</Button>
					</Stack>
				</Stack>
				<Box width="full" height={{ base: "xs", md: "md" }}>
					<Image
						boxSize="full"
						alt="Subscribe to newsletter image"
						src="./assets/newsletter.jpg"
						objectFit="cover"
					/>
				</Box>
			</Stack>
		</Container>
	)
}

export default Newsletter
