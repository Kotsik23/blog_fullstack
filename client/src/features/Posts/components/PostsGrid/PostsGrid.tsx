import { Container, Stack, SimpleGrid, Center, Spinner } from "@chakra-ui/react"
import { postsApi } from "features/Posts/api/posts"
import PostCard from "../PostCard/PostCard"
import Error from "../Error/Error"

const PostsGrid = () => {
	const { data: posts, isLoading, isError, error } = postsApi.useGetAllPostsQuery()

	if (isLoading) {
		return (
			<Center p="14">
				<Spinner size="lg" colorScheme="purple" />
			</Center>
		)
	}

	if (isError) {
		console.log(error)
		return <Error />
	}
	return (
		<Container maxW="container.xl" pb={{ base: "16", md: "24" }} mt={{ base: "-16", md: "-24" }}>
			<Stack spacing={{ base: "12", md: "16" }}>
				<PostCard post={posts![0]} isHero />
				<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "12", lg: "8" }}>
					{posts!.slice(1, posts?.length).map(post => (
						<PostCard key={post.id} post={post} />
					))}
				</SimpleGrid>
			</Stack>
		</Container>
	)
}

export default PostsGrid
