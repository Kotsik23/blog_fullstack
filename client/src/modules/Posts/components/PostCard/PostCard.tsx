import {
	Flex,
	Heading,
	HStack,
	Image,
	Link,
	Stack,
	Tag,
	TagLabel,
	TagLeftIcon,
	Text,
	useColorModeValue,
} from "@chakra-ui/react"
import format from "date-fns/format"
import { ru } from "date-fns/locale"
import { IPostCardProps } from "./PostCard.types"
import { Link as NavLink } from "react-router-dom"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { MdComment, MdFavorite } from "react-icons/md"

const PostCard = ({ post }: IPostCardProps) => {
	const authorDateTextColor = useColorModeValue("purple.500", "purple.200")
	const contentColor = useColorModeValue("gray.500", "gray.200")

	return (
		<Flex direction="column" as="article" role="group">
			<Image src={post.imageUrl} alt={post.title} h="100%" objectFit="cover" />
			<Stack spacing="3" w="full" alignItems="flex-start" mt="8">
				<Text fontWeight="semibold" color={authorDateTextColor}>
					<Link as={NavLink} to={"/email"}>
						{post.author.email}
					</Link>{" "}
					• {format(new Date(post.createdAt), "dd MMMM yyyy", { locale: ru })}
				</Text>
				<Flex align="center" justify="space-between" w="full">
					<Heading size="md">{post.title}</Heading>
					<Link
						as={NavLink}
						to={"/"}
						alignSelf="flex-start"
						_groupHover={{ transform: "scale(1.3) rotate(12deg)" }}
					>
						<ExternalLinkIcon fontSize="xl" />
					</Link>
				</Flex>

				<Text color={contentColor} fontWeight="semibold" noOfLines={2}>
					{post.content}
				</Text>

				<HStack spacing="3">
					<Tag size={"md"} variant="subtle" colorScheme="purple">
						<TagLeftIcon boxSize="12px" as={MdComment} />
						<TagLabel>{post._count.comments}</TagLabel>
					</Tag>
					<Tag size={"md"} variant="subtle" colorScheme="orange">
						<TagLeftIcon boxSize="12px" as={MdFavorite} />
						<TagLabel>{post._count.likes}</TagLabel>
					</Tag>
				</HStack>
			</Stack>
		</Flex>
	)
}

export default PostCard
