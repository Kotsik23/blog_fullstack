import { Box, Center, Container, Heading, Spinner, Stack, Text, Image } from "@chakra-ui/react"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { postsApi } from "features/Posts/api/posts"
import { useParams } from "react-router-dom"
import { formatDate } from "shared/utils/formatDate"
import PostAuthor from "../PostAuthor/PostAuthor"
import parse from "html-react-parser"

const PostPage = () => {
	const { id } = useParams()

	const { data: post, isLoading, isError, error } = postsApi.useGetPostByIdQuery(id!)

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
		<Box w="full" as="section">
			<Stack pt={{ base: "14", md: "24" }}>
				<Container maxW="container.md" w="full">
					<Stack spacing={{ base: "4", md: "6" }} textAlign="center" alignItems="center">
						<Text as="span" fontWeight="semibold" color="primary">
							Опубликовано {formatDate(post?.createdAt!)}
						</Text>
						<Heading size={{ base: "lg", md: "xl" }}>{post?.title}</Heading>
						<PostAuthor author={post?.author!} />
					</Stack>
				</Container>
				<Box overflow="hidden" py={{ base: "6", md: "12" }}>
					<Image
						src={post?.imageUrl}
						alt={post?.title}
						width="full"
						height={{ base: "15rem", md: "xl" }}
						objectFit="cover"
						transition="all 0.2s"
						_groupHover={{ transform: "scale(1.05)" }}
					/>
				</Box>

				<Container maxW="container.xl">
					<Stack>
						<SectionHeader>Содержание</SectionHeader>
						<Box as="article" textAlign="justify">
							{parse(post?.content!)}
						</Box>
					</Stack>
				</Container>
			</Stack>
		</Box>
	)
}

export default PostPage
