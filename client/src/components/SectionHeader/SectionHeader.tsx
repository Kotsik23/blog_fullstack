import { Stack, Divider, Text, Box, Heading, VStack } from "@chakra-ui/react"
import { SectiobHeaderProps } from "./SectionHeader.props"

const SectionHeader = ({ children, description }: SectiobHeaderProps) => {
	return (
		<Box as="section" py={{ base: "4", md: "8" }}>
			<Stack spacing={{ base: "3", md: "5" }}>
				<VStack spacing="1" align="flex-start">
					<Heading fontSize="xl" fontWeight="semibold">
						{children}
					</Heading>
					{description && <Text color="muted">{description}</Text>}
				</VStack>
				<Divider />
			</Stack>
		</Box>
	)
}

export default SectionHeader
