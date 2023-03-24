import { useBreakpointValue, Container, Stack, Heading, StackDivider, Box, Text } from "@chakra-ui/react"
import StatItem from "./StatItem/StatItem"
import { stats } from "./Stats.constants"

const Stats = () => {
	const isMobile = useBreakpointValue({ base: true, md: false })
	return (
		<Container maxW="container.xl" py={{ base: "16", md: "24" }} as="section">
			<Stack spacing={{ base: "12", md: "16" }} textAlign="center" align="center">
				<Stack spacing={{ base: "4", md: "5" }}>
					<Heading size="lg">Почему Блоггинг?</Heading>
					<Text fontSize={{ base: "lg", md: "xl" }} color="muted" maxW="3xl">
						Блог может стать либо средством заработка, либо отличным способом популяризации своей деятельности или
						бренда с помощью продвижения через интернет.
					</Text>
				</Stack>
				<Stack
					direction={{ base: "column", md: "row" }}
					maxW="3xl"
					width="full"
					spacing={{ base: "8", md: "4" }}
					{...(!isMobile ? { divider: <StackDivider /> } : {})}
				>
					{stats.map((stat, id) => (
						<StatItem key={id} flex="1" {...stat} />
					))}
				</Stack>
			</Stack>
		</Container>
	)
}

export default Stats
