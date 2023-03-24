import { Box, Flex, HStack, Image, Img, Stack, Text } from "@chakra-ui/react"
import { TestimonialItemProps } from "./TestimonialItem.props"
import { ImQuotesLeft } from "react-icons/im"

const TestimonialItem = (props: TestimonialItemProps) => {
	const { image, name, role, children } = props

	return (
		<Stack as="blockquote" direction="row" spacing={{ base: "0", md: "8" }} flex="1" {...props}>
			<Image
				display={{ base: "none", md: "block" }}
				mt="2"
				flexShrink={0}
				src={image}
				alt={name}
				objectFit="cover"
				w={{ base: "20", md: "32" }}
				h={{ base: "20", md: "32" }}
				rounded="full"
			/>
			<Flex w="full" direction="column">
				<Box mb="6">
					<Box as={ImQuotesLeft} color="primary" fontSize="xl" />
					<Text mt="3" fontSize="md" fontWeight="semibold" fontStyle="italic" maxW="38rem">
						{children}
					</Text>
				</Box>
				<HStack>
					<Img
						display={{ base: "block", md: "none" }}
						flexShrink={0}
						src={image}
						alt={name}
						objectFit="cover"
						w={{ base: "12", md: "32" }}
						h={{ base: "12", md: "32" }}
						rounded="full"
					/>
					<Box>
						<Text as="cite" fontStyle="normal" fontWeight="extrabold" color="primary">
							{name}
						</Text>
						<Text fontSize="sm" color="primary">
							{role}
						</Text>
					</Box>
				</HStack>
			</Flex>
		</Stack>
	)
}

export default TestimonialItem
