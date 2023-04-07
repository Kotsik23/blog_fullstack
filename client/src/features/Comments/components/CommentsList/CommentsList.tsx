import { Center, Spinner, Stack, Text } from "@chakra-ui/react"
import { commentsApi } from "features/Comments/api/comments"
import { useParams } from "react-router-dom"
import CommentItem from "../CommentItem/CommentItem"

const CommentsList = () => {
	const { id } = useParams()
	const { data: comments, isLoading, isError, error } = commentsApi.useGetCommenstByPostQuery(+id!)

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
		<Stack spacing="3" py={{ base: "8", md: "12" }}>
			<Stack spacing="4">
				{comments?.map(comment => (
					<CommentItem key={comment.id} comment={comment} />
				))}
			</Stack>
		</Stack>
	)
}

export default CommentsList
