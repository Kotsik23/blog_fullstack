import { Center, Spinner, Heading, List, ListItem, ListIcon, Text } from "@chakra-ui/react"
import { authorApi } from "features/Author/api/author"
import { useParams, Link as NavLink } from "react-router-dom"
import { MdOutlineArticle } from "react-icons/md"
import { ROUTES } from "shared/constants/routes"

const PostsList = () => {
	const { id } = useParams()
	const { data: posts, isLoading, isError, error } = authorApi.useGetPostsListQuery(+id!)

	if (isLoading) {
		return (
			<Center>
				<Spinner colorScheme="purple" size="xl" />
			</Center>
		)
	}

	if (isError) {
		console.log(error)
		return <Heading>Some error</Heading>
	}

	return posts?.length ? (
		<List spacing="4" fontSize={{ base: "lg", md: "xl" }}>
			{posts?.map(post => (
				<ListItem
					key={post.id}
					_hover={{ color: "primary" }}
					transition="color 0.3s ease"
					cursor="pointer"
					as={NavLink}
					to={`${ROUTES.POSTS}/${post.id}`}
					display="block"
				>
					<ListIcon as={MdOutlineArticle} color="primary" fontSize="2xl" />
					{post.title}
				</ListItem>
			))}
		</List>
	) : (
		<Text>Этот автор еще не опубликовал посты</Text>
	)
}

export default PostsList
