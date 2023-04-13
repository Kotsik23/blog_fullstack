import { Alert, AlertIcon, Flex, Link } from "@chakra-ui/react"
import SectionHeader from "components/SectionHeader/SectionHeader"
import { AddCommentForm, CommentsList } from "features/Comments"
import { OnePostInfo } from "features/Posts"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "shared/utils/redux"
import { Link as NavLink } from "react-router-dom"
import { ROUTES } from "shared/constants/routes"

const PostPage = () => {
	const user = useAppSelector(state => state.auth.user)
	const { t } = useTranslation()

	return (
		<Flex pt={{ base: "14", md: "24" }} direction="column" as="section">
			<OnePostInfo />

			<SectionHeader>{t("onePost.comments")}</SectionHeader>
			{!user && (
				<Alert status="warning" rounded="md" alignItems="center">
					<AlertIcon />
					{t("onePost.alert")}
					<Link ml="4" color="primary" fontWeight="bold" as={NavLink} to={ROUTES.LOGIN}>
						{t("auth.loginAction")}
					</Link>
				</Alert>
			)}
			{user && <AddCommentForm />}
			<CommentsList />
		</Flex>
	)
}

export default PostPage
