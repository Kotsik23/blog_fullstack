import { Container, Stack, SimpleGrid, Center, Spinner, Box } from "@chakra-ui/react"
import { postsApi } from "features/Posts/api/posts"
import PostCard from "../PostCard/PostCard"
import Error from "../Error/Error"
import Pagination from "../Pagination/Pagination"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

const PER_PAGE = 7

const PostsGrid = () => {
	const [searchParams] = useSearchParams()

	const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get("page")) || 1)
	const { data, isLoading, isError, error } = postsApi.useGetAllPostsQuery({ page: currentPage, perPage: PER_PAGE })

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

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

	const pageContent =
		currentPage === 1 ? (
			<Stack spacing={{ base: "12", md: "16" }}>
				<PostCard post={data?.posts[0]!} isHero />
				<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "12", lg: "8" }}>
					{data?.posts!.slice(1, data.posts?.length).map(post => (
						<PostCard key={post.id} post={post} />
					))}
				</SimpleGrid>
			</Stack>
		) : (
			<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "12", lg: "8" }}>
				{data?.posts.map(post => (
					<PostCard key={post.id} post={post} />
				))}
			</SimpleGrid>
		)

	return (
		<Container maxW="container.xl" pb={{ base: "16", md: "24" }} mt={{ base: "-16", md: "-24" }}>
			<Stack align="center" spacing="24">
				<Box minH="50vh">{pageContent}</Box>
				<Pagination
					currentPage={currentPage}
					onPageChange={handlePageChange}
					totalPages={Math.ceil(data?.total! / PER_PAGE)}
				/>
			</Stack>
		</Container>
	)
}

export default PostsGrid
