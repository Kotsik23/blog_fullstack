import {
	Box,
	Heading,
	HStack,
	Image,
	Link,
	Stack,
	Tag,
	TagLabel,
	TagLeftIcon,
	Text,
	Icon,
	Skeleton,
	SkeletonText,
} from "@chakra-ui/react"
import { Link as NavLink } from "react-router-dom"
import { PostCardProps } from "./PostCard.types"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { MdComment, MdFavorite } from "react-icons/md"
import { VscCircleFilled } from "react-icons/vsc"
import { formatDate } from "shared/utils/formatDate"
import { ROUTES } from "shared/constants/routes"
import parse from "html-react-parser"
import { useState } from "react"

const PostCard = (props: PostCardProps) => {
	const { post, isHero } = props

	const [isLoading, setIsLoading] = useState(true)

	const handleLoad = () => {
		setIsLoading(false)
	}

	return (
		<Link _hover={{ textDecor: "none" }} role="group" as={NavLink} to={ROUTES.POSTS + `/${post?.id}`}>
			<Stack spacing="8">
				<Skeleton isLoaded={!isLoading}>
					<Box overflow="hidden">
						<Image
							src={post?.imageUrl}
							alt={post?.title}
							width="full"
							height={{ base: "15rem", md: isHero ? "md" : "15rem" }}
							objectFit="cover"
							transition="all 0.2s"
							_hover={{ transform: "scale(1.05)" }}
							onLoad={handleLoad}
						/>
					</Box>
				</Skeleton>
				<Stack spacing="4">
					<SkeletonText isLoaded={!isLoading} skeletonHeight="4" noOfLines={1}>
						<HStack spacing="1" fontSize="sm" fontWeight="semibold" color="primary">
							<Text>{post?.author.email}</Text>
							<Icon as={VscCircleFilled} boxSize="2" />
							<Text>{formatDate(post?.createdAt)}</Text>
						</HStack>
					</SkeletonText>
					<Skeleton isLoaded={!isLoading}>
						<HStack justify="space-between">
							<Heading size={{ base: "sm", md: isHero ? "lg" : "md" }}>{post?.title}</Heading>
							<Icon
								as={ExternalLinkIcon}
								_groupHover={{ transform: "scale(1.3) rotate(12deg)" }}
								transition="all 0.2s ease"
								alignSelf="flex-start"
							/>
						</HStack>
					</Skeleton>
					<SkeletonText isLoaded={!isLoading} skeletonHeight="4" noOfLines={2}>
						<Text color="muted" fontWeight="semibold" noOfLines={2} fontSize="sm" as="span">
							{parse(post?.content || "")}
						</Text>
					</SkeletonText>
					<HStack spacing="3">
						<Skeleton isLoaded={!isLoading}>
							<Tag size={"md"} variant="subtle" colorScheme="cyan">
								<TagLeftIcon boxSize="12px" as={MdComment} />
								<TagLabel>{post?._count.comments}</TagLabel>
							</Tag>
						</Skeleton>
						<Skeleton isLoaded={!isLoading}>
							<Tag size={"md"} variant="subtle" colorScheme="orange">
								<TagLeftIcon boxSize="12px" as={MdFavorite} />
								<TagLabel>{post?._count.likes}</TagLabel>
							</Tag>
						</Skeleton>
					</HStack>
				</Stack>
			</Stack>
		</Link>
	)
}

export default PostCard
