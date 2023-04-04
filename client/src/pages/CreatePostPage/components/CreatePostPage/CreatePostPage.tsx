import { Stack } from "@chakra-ui/react"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { CreatePostForm } from "features/Posts"

const CreatePostPage = () => {
	return (
		<Stack>
			<SectionHeader>Создание нового поста</SectionHeader>
			<CreatePostForm />
		</Stack>
	)
}

export default CreatePostPage
