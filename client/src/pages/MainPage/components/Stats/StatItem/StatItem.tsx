import { Stack, Heading, Text } from "@chakra-ui/react"
import { StatItemProps } from "./StatItem.props"

const StatItem = (props: StatItemProps) => {
	const { label, value, ...stackProps } = props
	return (
		<Stack spacing="3" textAlign="center" {...stackProps}>
			<Heading size={{ base: "lg", md: "xl" }} color="primary">
				{value}
			</Heading>
			<Text fontSize="lg" fontWeight="medium" color="muted">
				{label}
			</Text>
		</Stack>
	)
}

export default StatItem
