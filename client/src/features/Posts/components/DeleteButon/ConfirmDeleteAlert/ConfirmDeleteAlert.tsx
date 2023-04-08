import {
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	Button,
} from "@chakra-ui/react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { ConfirmDeleteProps } from "./ConfirmDeleteAlert.props"

const ConfirmDeleteAlert = ({ isLoading, isOpen, onClickHandler, onClose }: ConfirmDeleteProps) => {
	const cancelRef = useRef<HTMLButtonElement>(null)
	const { t } = useTranslation()

	return (
		<AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="semibold">
						{t("confirmDeletePost.heading")}
					</AlertDialogHeader>

					<AlertDialogBody>{t("confirmDeletePost.body")}</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							{t("confirmDeletePost.cancel")}
						</Button>
						<Button colorScheme="red" onClick={onClickHandler} isLoading={isLoading} ml="3">
							{t("confirmDeletePost.delete")}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}

export default ConfirmDeleteAlert
