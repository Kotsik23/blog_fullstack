import { Tooltip, IconButton, useDisclosure, useToast } from "@chakra-ui/react"
import { postsApi } from "features/Posts/api/posts"
import { useTranslation } from "react-i18next"
import { MdDeleteOutline } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import { ROUTES } from "shared/constants/routes"
import { TOAST_DEFAULT_OPTIONS } from "shared/constants/toast"
import ConfirmDeleteAlert from "./ConfirmDeleteAlert/ConfirmDeleteAlert"

const DeleteButton = () => {
	const { t } = useTranslation()
	const { id } = useParams()
	const { isOpen, onClose, onOpen } = useDisclosure()
	const navigate = useNavigate()
	const toast = useToast(TOAST_DEFAULT_OPTIONS)

	const [deletePost, { isLoading }] = postsApi.useDeletePostMutation()

	const onDeleteClick = async () => {
		try {
			await deletePost(+id!).unwrap()
			toast({
				status: "info",
				title: t("toast.success"),
				description: t("toast.deletePost"),
			})
			navigate(ROUTES.POSTS)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Tooltip label={t("onePost.tooltipDelete")}>
				<IconButton
					aria-label="delete-post"
					colorScheme="red"
					icon={<MdDeleteOutline />}
					variant="outline"
					onClick={onOpen}
				/>
			</Tooltip>
			<ConfirmDeleteAlert isOpen={isOpen} onClose={onClose} onClickHandler={onDeleteClick} isLoading={isLoading} />
		</>
	)
}

export default DeleteButton
