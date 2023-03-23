import { ArrowDownIcon } from "@chakra-ui/icons"
import { Button, Divider, Flex, Heading, SimpleGrid, Spinner, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { postsApi } from "../../../../store/api/posts.api"
import PostCard from "../PostCard/PostCard"

const Posts = () => {
	const dividerColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300")
	const { data: posts, isLoading, isError, error } = postsApi.useGetAllPostsQuery()

	if (isLoading) {
		return (
			<Flex align="center" justify="center" p="14">
				<Spinner size="md" colorScheme="purple" />
			</Flex>
		)
	}

	if (isError) {
		console.log(error)
		return <Text>Some error</Text>
	}

	return (
		<Flex direction="column" align="center" justify="center" as="section">
			<Stack w="full" gap="3">
				<Heading size="xl" fontWeight="semibold" whiteSpace="nowrap" justifySelf="center">
					Все посты
				</Heading>
				<Divider borderColor={dividerColor} />
			</Stack>
			<SimpleGrid columns={[1, 2, 3]} spacingX="10" spacingY="20" my="16">
				{posts?.map(post => (
					<PostCard key={post.id} post={post} />
				))}
			</SimpleGrid>

			<Button colorScheme="purple" variant="outline" leftIcon={<ArrowDownIcon />}>
				Загрузить еще
			</Button>
		</Flex>
	)
}

export default Posts
