import { useBreakpointValue, Container, Stack, Heading, StackDivider, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import StatItem from "./StatItem/StatItem"

const Stats = () => {
	const { t } = useTranslation()
	const isMobile = useBreakpointValue({ base: true, md: false })
	return (
		<Container maxW="container.xl" py={{ base: "16", md: "24" }} as="section" id="stats">
			<Stack spacing={{ base: "12", md: "16" }} textAlign="center" align="center">
				<Stack spacing={{ base: "4", md: "5" }}>
					<Heading size="lg">{t("stats.heading")}</Heading>
					<Text fontSize={{ base: "lg", md: "xl" }} color="muted" maxW="3xl">
						{t("stats.description")}
					</Text>
				</Stack>
				<Stack
					direction={{ base: "column", md: "row" }}
					maxW="3xl"
					width="full"
					spacing={{ base: "8", md: "4" }}
					{...(!isMobile ? { divider: <StackDivider /> } : {})}
				>
					<StatItem flex="1" label={t("stats.subscribers")} value="12K+" />
					<StatItem flex="1" label={t("stats.emotions")} value="88%" />
					<StatItem flex="1" label={t("stats.visitors")} value="15K+" />
				</Stack>
			</Stack>
		</Container>
	)
}

export default Stats
