import { ArrowDownIcon } from "@chakra-ui/icons"
import { Container, Stack, HStack, Highlight, Box, Heading as ChakraHeading, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

const Heading = () => {
	const { t } = useTranslation()

	return (
		<Box bg="bg-surface" role="group">
			<Container w="full" pt={{ base: "16", md: "24" }} pb={{ base: "32", md: "48" }}>
				<Stack spacing={{ base: "4", md: "6" }} textAlign="center" alignItems="center">
					<ChakraHeading size="xl">{t("allPosts.heading")}</ChakraHeading>
					<HStack spacing="2">
						<Text fontSize="lg">
							<Highlight
								query={["слова", "speech"]}
								styles={{
									px: "2",
									py: "1",
									rounded: "full",
									bg: "primary",
									color: "on-primary",
								}}
							>
								{t("allPosts.subtitle")!}
							</Highlight>
						</Text>
						<ArrowDownIcon
							boxSize="4"
							_groupHover={{ transform: "translateY(5px)" }}
							transition="all 0.3s ease"
						/>
					</HStack>
				</Stack>
			</Container>
		</Box>
	)
}

export default Heading
