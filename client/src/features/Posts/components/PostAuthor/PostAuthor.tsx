import { useColorModeValue, Flex, Text, Avatar } from "@chakra-ui/react"

import { Link } from "react-router-dom"
import { ROUTES } from "shared/constants/routes"
import { IUser } from "shared/types/user"

interface PostAuthorProps {
	author: IUser
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
			to={`${ROUTES.AUTHOR}/${author.id}`}
		>
			<Avatar size="md" src={author.avatarUrl} />
			<Text color="muted" fontSize="sm">
				{author.email}
			</Text>
		</Flex>
	)
}

export default PostAuthor
