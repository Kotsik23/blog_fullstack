import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Image, Heading, Text, VStack, Stack, Button, HStack, Center } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { ROUTES } from "shared/constants/routes"

const Error = () => {
	const { t } = useTranslation()
	return (
		<Center h="80vh">
			<Stack spacing="12" align="center">
				<Image src="./assets/void.svg" alt="void" width="full" height="full" objectFit="contain" maxH="400px" />
				<VStack textAlign="center" spacing="4">
					<Heading size="lg">{t("postError.heading")}</Heading>
					<Text color="muted">{t("postError.text")}</Text>
				</VStack>

				<Button
					variant="outline"
					colorScheme="purple"
					rounded="full"
					role="group"
					size="sm"
					as={Link}
					to={ROUTES.CREATE}
				>
					<HStack spacing="1" align="center">
						<Text fontSize="md">{t("postError.action")}</Text>
						<ArrowForwardIcon
							boxSize="5"
							_groupHover={{ transform: "translateX(5px)" }}
							transition="all 0.3s ease"
						/>
					</HStack>
				</Button>
			</Stack>
		</Center>
	)
}

export default Error
