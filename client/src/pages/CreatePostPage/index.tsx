import { Stack } from "@chakra-ui/react"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { CreatePostForm } from "features/Posts"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

const CreatePostPage = () => {
	const { id } = useParams()
	const isEdit = Boolean(id)
	const { t } = useTranslation()

	return (
		<Stack>
			<SectionHeader>{isEdit ? `Редактирование поста #${id}` : t("createPost.heading")}</SectionHeader>
			<CreatePostForm />
		</Stack>
	)
}

export default CreatePostPage
