import { Avatar, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { dateAgo } from "shared/utils/dateAgo"
import { CommentItemProps } from "./CommentItem.props"

const CommentItem = ({ comment }: CommentItemProps) => {
	return (
		<Flex align="center" gap="6" p="4" rounded="md" boxShadow="md" bg={useColorModeValue("gray.50", "gray.800")}>
			<Avatar size="md" src={comment.user.avatarUrl} alignSelf="flex-start" />
			<Stack>
				<Flex gap={{ base: 1, md: 3 }} align={{ md: "center" }} direction={{ base: "column", md: "row" }}>
					<Text size="sm" fontWeight="medium">
						{comment.user.email}
					</Text>
					<Text color="muted">{dateAgo(new Date(comment.createdAt))}</Text>
				</Flex>
				<Text>{comment.body}</Text>
			</Stack>
		</Flex>
	)
}

export default CommentItem
