import { Box, Card, CardBody, CardHeader, Flex, Heading, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import { StatisticsCardProps } from "./StatisticsCard.props"

const StatisticsCard = ({ icon, description, value, color }: StatisticsCardProps) => {
	return (
		<Card>
			<CardHeader pb="0">
				<Flex align="center" gap="4">
					<Box
						rounded="lg"
						bgColor={useColorModeValue("gray.100", "gray.800")}
						p="2"
						display="flex"
						alignItems="center"
						justifyContent="center"
					>
						<Icon as={icon} fontSize="28" color={color} />
					</Box>
					<Heading size="md">{value}</Heading>
				</Flex>
			</CardHeader>
			<CardBody>
				<Text fontWeight="semibold">{description}</Text>
			</CardBody>
		</Card>
		// <Flex
		// 	align="flex-start"
		// 	justify="center"
		// 	rounded="lg"
		// 	shadow="md"
		// 	p="6"
		// 	direction="column"
		// 	gap="12"
		// 	bgColor={color}
		// >
		// <Flex align="center" gap="4">
		// 	<Box
		// 		rounded="lg"
		// 		bgColor={useColorModeValue("white", "gray.800")}
		// 		p="2"
		// 		display="flex"
		// 		alignItems="center"
		// 		justifyContent="center"
		// 	>
		// 		<Icon as={icon} fontSize="20" color={color} />
		// 	</Box>
		// 	<Heading size="md">{value}</Heading>
		// </Flex>
		// <Text>{description}</Text>
		// </Flex>
	)
}

export default StatisticsCard
