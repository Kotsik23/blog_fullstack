import { useColorModeValue, Flex, Text } from "@chakra-ui/react"
import { UserAvatar } from "features/Profile"
import { Link } from "react-router-dom"
import { Author } from "shared/types/post"

interface PostAuthorProps {
	author: Author
}

const PostAuthor = ({ author }: PostAuthorProps) => {
	const authorHoverColor = useColorModeValue("gray.100", "gray.700")

	return (
		<Flex
			gap="3"
			align="center"
			_hover={{ bg: authorHoverColor }}
			transition="all 0.3s ease"
			p="2"
			rounded="lg"
			cursor="pointer"
			as={Link}
			to={"/author"}
		>
			<UserAvatar size="md" src="https://bit.ly/code-beast" />
			<Text color="muted" fontSize="sm">
				{author.email}
			</Text>
		</Flex>
	)
}

export default PostAuthor
