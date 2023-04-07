import { Box } from "@chakra-ui/react"
import { AllPostsHeading, AllPostsGrid } from "features/Posts"

const PostsPage = () => {
	return (
		<Box w="full" as="section" mt="8">
			<AllPostsHeading />
			<AllPostsGrid />
		</Box>
	)
}

export default PostsPage
