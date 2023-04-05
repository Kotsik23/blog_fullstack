import { Box, Heading, HStack, Image, Link, Stack, Tag, TagLabel, TagLeftIcon, Text, Icon } from "@chakra-ui/react"
import { Link as NavLink } from "react-router-dom"
import { IPostCardProps } from "./PostCard.types"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { MdComment, MdFavorite } from "react-icons/md"
import { VscCircleFilled } from "react-icons/vsc"
import { formatDate } from "shared/utils/formatDate"
import { ROUTES } from "shared/constants/routes"
import parse from "html-react-parser"

const PostCard = (props: IPostCardProps) => {
	const { post, isHero } = props

	return (
		<Link _hover={{ textDecor: "none" }} role="group" as={NavLink} to={ROUTES.POSTS + `/${post.id}`}>
			<Stack spacing="8">
				<Box overflow="hidden">
					<Image
						src={post.imageUrl}
						alt={post.title}
						width="full"
						height={{ base: "15rem", md: isHero ? "md" : "15rem" }}
						objectFit="cover"
						transition="all 0.2s"
						_groupHover={{ transform: "scale(1.05)" }}
					/>
				</Box>
				<Stack spacing="4">
					<HStack spacing="1" fontSize="sm" fontWeight="semibold" color="primary">
						<Text>{post.author.email}</Text>
						<Icon as={VscCircleFilled} boxSize="2" />
						<Text> {formatDate(post.createdAt)}</Text>
					</HStack>
					<HStack justify="space-between">
						<Heading size={{ base: "sm", md: isHero ? "lg" : "md" }}>{post.title}</Heading>
						<Icon
							as={ExternalLinkIcon}
							_groupHover={{ transform: "scale(1.3) rotate(12deg)" }}
							transition="all 0.2s ease"
							alignSelf="flex-start"
						/>
					</HStack>
					<Text color="muted" fontWeight="semibold" noOfLines={2} fontSize="sm" as="span">
						{parse(post.content)}
					</Text>
					<HStack spacing="3">
						<Tag size={"md"} variant="subtle" colorScheme="cyan">
							<TagLeftIcon boxSize="12px" as={MdComment} />
							<TagLabel>{post._count.comments}</TagLabel>
						</Tag>
						<Tag size={"md"} variant="subtle" colorScheme="orange">
							<TagLeftIcon boxSize="12px" as={MdFavorite} />
							<TagLabel>{post._count.likes}</TagLabel>
						</Tag>
					</HStack>
				</Stack>
			</Stack>
		</Link>
	)
}

export default PostCard
