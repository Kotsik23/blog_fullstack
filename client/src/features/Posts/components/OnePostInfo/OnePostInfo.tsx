import { postsApi } from "../../api/posts"
import { formatDate } from "shared/utils/formatDate"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { useTranslation } from "react-i18next"
import { useParams, Link as NavLink } from "react-router-dom"
import { Box, Center, Container, Heading, Spinner, Stack, Text, Image, Button, Flex } from "@chakra-ui/react"
import parse from "html-react-parser"
import LikeButton from "../LikeButton/LikeButton"
import PostAuthor from "../PostAuthor/PostAuthor"
import { useAppSelector } from "shared/utils/redux"
import { FiEdit } from "react-icons/fi"
import { ROUTES } from "shared/constants/routes"
import DeleteButton from "../DeleteButon/DeleteButton"
import { checkAccessByRole } from "shared/utils/checkAccessByRole"
import { ROLES } from "shared/constants/roles"

const OnePostInfo = () => {
	const { t } = useTranslation()
	const { id } = useParams()

	const user = useAppSelector(state => state.auth.user)
	const { data: post, isLoading, isError, error } = postsApi.useGetPostByIdQuery(id!)

	const isAuthor = post?.author.id === user?.id
	const isAccessByRole = checkAccessByRole(user, [ROLES.ADMIN, ROLES.MANAGER])

	if (isLoading) {
		return (
			<Center p="14">
				<Spinner size="lg" colorScheme="purple" />
			</Center>
		)
	}

	if (isError) {
		console.log(error)
		return <Text>Some error</Text>
	}

	return (
		<>
			<Container maxW="container.md" w="full">
				<Stack spacing={{ base: "4", md: "6" }} textAlign="center" alignItems="center">
					<Text as="span" fontWeight="semibold" color="primary">
						{t("onePost.published")} {formatDate(post?.createdAt!)}
					</Text>
					<Heading size={{ base: "lg", md: "xl" }}>{post?.title}</Heading>
					<PostAuthor author={post?.author!} />
					{(isAuthor || isAccessByRole) && (
						<Flex gap="4">
							<Button
								as={NavLink}
								to={`${ROUTES.EDIT}/${id}`}
								variant="outline"
								colorScheme="gray"
								leftIcon={<FiEdit />}
							>
								{t("onePost.editBtn")}
							</Button>
							<DeleteButton />
						</Flex>
					)}
				</Stack>
			</Container>
			<Box overflow="hidden" py={{ base: "6", md: "12" }}>
				<Image
					src={post?.imageUrl}
					alt={post?.title}
					width="full"
					height={{ base: "15rem", sm: "25rem", md: "xl" }}
					objectFit="cover"
					transition="all 0.2s"
					_groupHover={{ transform: "scale(1.05)" }}
				/>
			</Box>

			<Container maxW="container.xl">
				<Stack>
					<SectionHeader>{t("onePost.content")}</SectionHeader>
					<Box as="article" textAlign="justify">
						{parse(post?.content!)}
					</Box>
				</Stack>
			</Container>

			<LikeButton likes={post?.likes!} />
		</>
	)
}

export default OnePostInfo
