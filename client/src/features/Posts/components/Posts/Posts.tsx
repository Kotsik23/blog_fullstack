import { ArrowDownIcon } from "@chakra-ui/icons"
import { Box, Center, Container, Heading, Highlight, HStack, SimpleGrid, Spinner, Stack, Text } from "@chakra-ui/react"
import { postsApi } from "features/Posts/api/posts"
import Error from "../Error/Error"
import PostCard from "../PostCard/PostCard"

const Posts = () => {
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
		<Box w="full" as="section" mt="8">
			<Box bg="bg-surface" role="group">
				<Container w="full" pt={{ base: "16", md: "24" }} pb={{ base: "32", md: "48" }}>
					<Stack spacing={{ base: "4", md: "6" }} textAlign="center" alignItems="center">
						<Heading size="xl">Все посты</Heading>
						<HStack spacing="2">
							<Text fontSize="lg">
								<Highlight
									query="слова"
									styles={{ px: "2", py: "1", rounded: "full", bg: "primary", color: "on-primary" }}
								>
									Свобода слова начинается здесь
								</Highlight>
							</Text>
							<ArrowDownIcon
								boxSize="4"
								_groupHover={{ transform: "translateY(5px)" }}
								transition="all 0.3s ease"
							/>
						</HStack>
					</Stack>
				</Container>
			</Box>
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
		</Box>
	)
}

export default Posts
