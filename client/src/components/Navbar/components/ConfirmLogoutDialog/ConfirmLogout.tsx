import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from "@chakra-ui/react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { ConfirmLogoutProps } from "./ConfirmLogout.props"

const ConfirmLogout = ({ isOpen, isLoading, onClose, onClickHandler }: ConfirmLogoutProps) => {
	const cancelRef = useRef<HTMLButtonElement>(null)
	const { t } = useTranslation()

	return (
		<AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="semibold">
						{t("confirmLogout.heading")}
					</AlertDialogHeader>

					<AlertDialogBody>{t("confirmLogout.body")}</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							{t("confirmLogout.cancel")}
						</Button>
						<Button colorScheme="red" onClick={onClickHandler} isLoading={isLoading} ml="3">
							{t("confirmLogout.logout")}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}

export default ConfirmLogout
