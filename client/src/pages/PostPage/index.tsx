import { Flex } from "@chakra-ui/react"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { AddCommentForm, CommentsList } from "features/Comments"
import { OnePostInfo } from "features/Posts"
import { useTranslation } from "react-i18next"

const PostPage = () => {
	const { t } = useTranslation()

	return (
		<Flex pt={{ base: "14", md: "24" }} direction="column" as="section">
			<OnePostInfo />

			<SectionHeader>{t("onePost.comments")}</SectionHeader>
			<AddCommentForm />
			<CommentsList />
		</Flex>
	)
}

export default PostPage
