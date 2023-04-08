import { Button, Heading, Text, Image, Badge, Box, Container, Stack } from "@chakra-ui/react"
import { ArrowForwardIcon, ArrowDownIcon } from "@chakra-ui/icons"
import { Link as NavLink } from "react-router-dom"
import { ROUTES } from "shared/constants/routes"
import { useTranslation } from "react-i18next"

const Hero = () => {
	const { t } = useTranslation()

	const handleMoreClick = () => {
		document.getElementById("stats")?.scrollIntoView()
	}

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
								{t("hero.badge")}
							</Badge>
							<Stack spacing={{ base: "4", md: "6" }} maxW={{ md: "xl", lg: "md", xl: "xl" }}>
								<Heading size={{ base: "md", md: "2xl" }} lineHeight={{ base: "unset", md: "64px" }}>
									{t("hero.heading")}
								</Heading>
								<Text fontSize={{ base: "lg", md: "2xl" }} color="muted">
									{t("hero.subtitle")}
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
								{t("hero.start")}
							</Button>
							<Button variant="outline" rightIcon={<ArrowDownIcon />} size="lg" onClick={handleMoreClick}>
								{t("hero.more")}
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
	)
}

export default Hero
