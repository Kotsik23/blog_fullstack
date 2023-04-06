import { Stack } from "@chakra-ui/react"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { CreatePostForm } from "features/Posts"
import { useTranslation } from "react-i18next"

const CreatePostPage = () => {
	const { t } = useTranslation()

	return (
		<Stack>
			<SectionHeader>{t("createPost.heading")}</SectionHeader>
			<CreatePostForm />
		</Stack>
	)
}

export default CreatePostPage
